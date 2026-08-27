import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { withAuth, err } from '@/lib/api-guard';

const CSV_HEADERS = [
  'ID',
  'Name',
  'Email',
  'Phone',
  'Company',
  'Source',
  'Status',
  'Score',
  'Value',
  'Message',
  'Assigned To',
  'Created At',
];

function escapeCsvField(value: unknown): string {
  const str = String(value ?? '');
  // If the field contains a comma, quote, or newline, wrap in double quotes
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

// GET /api/leads/export?format=csv&status=all&dateFrom=2026-01-01&dateTo=2026-08-18
export const GET = withAuth(async (req, { orgId }) => {
  const format = req.nextUrl.searchParams.get('format') || 'csv';
  const status = req.nextUrl.searchParams.get('status');
  const dateFrom = req.nextUrl.searchParams.get('dateFrom');
  const dateTo = req.nextUrl.searchParams.get('dateTo');

  if (format !== 'csv') {
    return err('Only CSV format is supported. Use ?format=csv', 400);
  }

  // Build where clause scoped to user's organization
  const where: Record<string, unknown> = { organizationId: orgId };
  if (status && status !== 'all') where.status = status;

  // Date range filtering
  if (dateFrom || dateTo) {
    const createdAt: Record<string, unknown> = {};
    if (dateFrom) createdAt.gte = new Date(dateFrom + 'T00:00:00.000Z');
    if (dateTo) createdAt.lte = new Date(dateTo + 'T23:59:59.999Z');
    where.createdAt = createdAt;
  }

  const leads = await db.lead.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    // Safety cap to prevent memory issues
    take: 10000,
  });

  // Build CSV content
  const rows = leads.map(lead =>
    CSV_HEADERS.map((_, i) => {
      switch (i) {
        case 0: return escapeCsvField(lead.id);
        case 1: return escapeCsvField(lead.name);
        case 2: return escapeCsvField(lead.email);
        case 3: return escapeCsvField(lead.phone);
        case 4: return escapeCsvField(lead.company);
        case 5: return escapeCsvField(lead.source);
        case 6: return escapeCsvField(lead.status);
        case 7: return escapeCsvField(lead.score);
        case 8: return escapeCsvField(lead.value);
        case 9: return escapeCsvField(lead.message);
        case 10: return escapeCsvField(lead.assignedTo);
        case 11: return escapeCsvField(lead.createdAt.toISOString());
        default: return '';
      }
    }).join(',')
  );

  const csvContent = [CSV_HEADERS.join(','), ...rows].join('\n');

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().slice(0, 10);
  const filename = `leads-export-${timestamp}.csv`;

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}, 'leads:read');
