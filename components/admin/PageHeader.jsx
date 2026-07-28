"use client";

import Link from "next/link";

/**
 * Compact page header with optional breadcrumbs and actions.
 */
export default function PageHeader({
  title,
  description = null,
  breadcrumbs = null,
  actions = null,
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
          <h1 className="admin-page-title">{title}</h1>
          {description ? <p className="cc-muted">{description}</p> : null}
        </div>
        {actions ? <div className="admin-page-actions">{actions}</div> : null}
      </div>
    </header>
  );
}
