"use client";

import Link from "next/link";
import ScopeBadge from "@/components/admin/ScopeBadge";

/**
 * Compact page header with optional breadcrumbs, scope, and actions.
 */
export default function PageHeader({
  title,
  description = null,
  breadcrumbs = null,
  actions = null,
  scope = null,
  scopeLabel = null,
  howThisWorks = null,
}) {
  return (
    <header className="admin-page-header">
      {breadcrumbs?.length ? (
        <nav className="admin-breadcrumbs" aria-label="Breadcrumb">
          <ol>
            {breadcrumbs.map((crumb, i) => (
              <li key={`${crumb.href || crumb.label}-${i}`}>
                {crumb.href ? (
                  <Link href={crumb.href}>{crumb.label}</Link>
                ) : (
                  <span aria-current="page">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      <div className="admin-page-header-row">
        <div>
          {scope ? (
            <div className="admin-page-scope-row">
              <ScopeBadge scope={scope} label={scopeLabel} />
            </div>
          ) : null}
          <h1 className="admin-page-title">{title}</h1>
          {description ? <p className="admin-page-lede cc-muted">{description}</p> : null}
          {howThisWorks ? (
            <p className="admin-page-how cc-muted" data-testid="page-how-this-works">
              {howThisWorks}
            </p>
          ) : null}
        </div>
        {actions ? <div className="admin-page-actions">{actions}</div> : null}
      </div>
    </header>
  );
}
