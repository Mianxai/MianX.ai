"use client";

/**
 * Consistent Founder page structure:
 * happening → attention → will happen → will not → primary action → progress → results → advanced
 */
export default function FounderPageLayout({
  title,
  happening = null,
  attention = null,
  willHappen = null,
  willNotHappen = null,
  primaryAction = null,
  progress = null,
  results = null,
  advanced = null,
  children = null,
  className = "",
}) {
  return (
    <div className={`founder-page-layout ${className}`.trim()} data-testid="founder-page-layout">
      {title ? <h1 className="founder-page-title">{title}</h1> : null}

      {happening ? (
        <section className="cc-card founder-page-section" data-testid="founder-what-happening">
          <h2>What is happening</h2>
          <div className="cc-muted">{happening}</div>
        </section>
      ) : null}

      {attention ? (
        <section className="cc-card founder-page-section" data-testid="founder-what-attention">
          <h2>What needs my attention</h2>
          <div>{attention}</div>
        </section>
      ) : null}

      {(willHappen || willNotHappen) ? (
        <section className="cc-card founder-page-section" data-testid="founder-what-next">
          {willHappen ? (
            <>
              <h2>What will happen after clicking</h2>
              <div className="cc-muted">{willHappen}</div>
            </>
          ) : null}
          {willNotHappen ? (
            <>
              <h2>What will not happen</h2>
              <div className="cc-muted">{willNotHappen}</div>
            </>
          ) : null}
        </section>
      ) : null}

      {primaryAction ? (
        <section className="founder-page-primary" data-testid="founder-primary-action">
          {primaryAction}
        </section>
      ) : null}

      {progress ? (
        <section className="cc-card founder-page-section" data-testid="founder-progress">
          <h2>Progress</h2>
          {progress}
        </section>
      ) : null}

      {results ? (
        <section className="cc-card founder-page-section" data-testid="founder-results">
          <h2>Results</h2>
          {results}
        </section>
      ) : null}

      {children}

      {advanced ? (
        <details className="cc-card founder-page-advanced" data-testid="founder-advanced">
          <summary>Advanced / Technical details</summary>
          <div className="founder-page-advanced-body">{advanced}</div>
        </details>
      ) : null}
    </div>
  );
}
