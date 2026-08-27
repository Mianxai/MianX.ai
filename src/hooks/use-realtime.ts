'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// ─── Types (mirror server types from @/lib/realtime) ───

export interface RealtimeLead {
  id: string;
  organizationId: string | null;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  source: string;
  status: string;
  score: number;
  value: string;
  message: string | null;
  assignedTo: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RealtimeActivity {
  id: string;
  organizationId: string | null;
  agent: string;
  action: string;
  leadId: string | null;
  status: string;
  metadata: string | null;
  createdAt: string;
}

export interface DashboardStats {
  totalLeads: number;
  hotLeads: number;
  warmLeads: number;
  newLeads: number;
  coldLeads: number;
  convertedLeads: number;
  lostLeads: number;
  totalValue: number;
  avgScore: number;
  conversionRate: number;
  activeAgents: number;
  conversions: number;
  recentLeads: number;
  weeklyGrowth: number;
  uniqueSources: number;
  avgValue: number;
}

interface RealtimeUpdates {
  leads: RealtimeLead[];
  activities: RealtimeActivity[];
  stats: DashboardStats;
  timestamp: string;
}

export interface UseRealtimeReturn {
  leads: RealtimeLead[];
  activities: RealtimeActivity[];
  stats: DashboardStats | null;
  isConnected: boolean;
  lastUpdate: string | null;
  error: string | null;
}

// ─── Constants ───

const DEFAULT_INTERVAL = 15_000; // 15 seconds
const MAX_BACKOFF_MS = 120_000; // 2 minutes max backoff
const BASE_BACKOFF_MS = 2_000; // 2 seconds base backoff

// ─── Hook ───

export function useRealtime(intervalMs: number = DEFAULT_INTERVAL): UseRealtimeReturn {
  const [leads, setLeads] = useState<RealtimeLead[]>([]);
  const [activities, setActivities] = useState<RealtimeActivity[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Refs for stable values inside the polling loop
  const lastUpdateRef = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);
  const consecutiveErrorsRef = useRef(0);

  const poll = useCallback(async () => {
    // Use the ISO date from the last successful response, or a far-past date for the first poll
    const since = lastUpdateRef.current ?? new Date(0).toISOString();

    try {
      const res = await fetch(`/api/realtime?since=${encodeURIComponent(since)}`);

      if (!mountedRef.current) return;

      if (res.status === 401) {
        // Not authenticated — stop polling silently
        setIsConnected(false);
        setError('Not authenticated');
        return;
      }

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data: RealtimeUpdates = await res.json();

      if (!mountedRef.current) return;

      // Reset error / backoff on success
      setError(null);
      setIsConnected(true);
      consecutiveErrorsRef.current = 0;

      // Append new leads (avoid duplicates by id)
      if (data.leads.length > 0) {
        setLeads(prev => {
          const existingIds = new Set(prev.map(l => l.id));
          const unique = data.leads.filter(l => !existingIds.has(l.id));
          return [...prev, ...unique];
        });
      }

      // Append new activities (avoid duplicates by id)
      if (data.activities.length > 0) {
        setActivities(prev => {
          const existingIds = new Set(prev.map(a => a.id));
          const unique = data.activities.filter(a => !existingIds.has(a.id));
          return [...prev, ...unique];
        });
      }

      // Always update stats
      setStats(data.stats);

      // Update lastUpdate timestamp from the server response
      const newTimestamp = data.timestamp;
      lastUpdateRef.current = newTimestamp;
      setLastUpdate(newTimestamp);
    } catch (err) {
      if (!mountedRef.current) return;

      const message = err instanceof Error ? err.message : 'Polling error';
      setError(message);
      setIsConnected(false);
      consecutiveErrorsRef.current += 1;
    }
  }, []);

  // Schedule next poll with backoff on errors
  const scheduleNext = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const errors = consecutiveErrorsRef.current;
    const delay =
      errors === 0
        ? intervalMs
        : Math.min(BASE_BACKOFF_MS * Math.pow(2, errors - 1), MAX_BACKOFF_MS);

    timerRef.current = setTimeout(() => {
      poll().finally(() => {
        if (mountedRef.current) scheduleNext();
      });
    }, delay);
  }, [poll, intervalMs]);

  // Start polling on mount, stop on unmount
  useEffect(() => {
    mountedRef.current = true;
    setIsConnected(true);

    // Fire the first poll immediately, then schedule subsequent ones
    poll().finally(() => {
      if (mountedRef.current) scheduleNext();
    });

    return () => {
      mountedRef.current = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [poll, scheduleNext]);

  return { leads, activities, stats, isConnected, lastUpdate, error };
}
