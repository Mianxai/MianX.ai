"use client";

const STATUS_LABEL = {
  working: "Working",
  idle: "Idle",
  waiting: "Waiting",
  blocked: "Blocked",
  approval_required: "Approval required",
  failed: "Failed",
  paused: "Paused",
};

/**
 * SVG hierarchy network — Founder → CEO → department agents.
 * Connections follow real reportsTo edges only.
 */
export default function CommandNetwork({
  hierarchy,
  agents,
  selectedSlug,
  onSelect,
}) {
  const width = 920;
  const height = 520;
  const cx = width / 2;

  const founder = { id: "founder", x: cx, y: 36, label: hierarchy.root.label };
  const ceo = {
    id: "executive-ceo",
    x: cx,
    y: 110,
    label: hierarchy.orchestrator.label,
  };

  // Group agents by department for layout rings
  const byDept = new Map();
  for (const a of agents) {
    if (!byDept.has(a.department)) byDept.set(a.department, []);
    byDept.get(a.department).push(a);
  }
  const deptKeys = [...byDept.keys()].sort();
  const positions = new Map();
  positions.set("founder", founder);
  positions.set("executive-ceo", ceo);

  const cSuite = agents.filter(
    (a) => a.reportsTo === "executive-ceo" || a.hierarchyLevel === "L2"
  );
  const rest = agents.filter((a) => !cSuite.some((c) => c.slug === a.slug));

  cSuite.forEach((a, i) => {
    const n = Math.max(cSuite.length, 1);
    const angle = Math.PI * (0.15 + (0.7 * i) / Math.max(n - 1, 1));
    positions.set(a.slug, {
      id: a.slug,
      x: cx + Math.cos(angle) * 280,
      y: 210 + Math.sin(angle) * 40,
      agent: a,
    });
  });

  rest.forEach((a, i) => {
    const cols = Math.min(8, Math.max(4, Math.ceil(Math.sqrt(rest.length))));
    const col = i % cols;
    const row = Math.floor(i / cols);
    positions.set(a.slug, {
      id: a.slug,
      x: 60 + col * ((width - 120) / Math.max(cols - 1, 1)),
      y: 300 + row * 56,
      agent: a,
    });
  });

  const edgePairs = hierarchy.edges
    .map((e) => {
      const from = positions.get(e.from);
      const to = positions.get(e.to);
      if (!from || !to) return null;
      return { ...e, from, to };
    })
    .filter(Boolean);

  const activeEdges = edgePairs.filter((e) => {
    const a = e.to.agent || e.from.agent;
    return a?.status === "working";
  });

  return (
    <section className="cc-card cc-network" aria-labelledby="cc-network-h">
      <h2 id="cc-network-h" className="sr-only">
        Agent network
      </h2>
      <p className="cc-muted cc-network-hint">
        Hierarchy: Founder → CEO → C-Suite / departments. Lines are real reporting edges.
        Departments in view: {deptKeys.length}.
      </p>
      <svg
        className="cc-network-svg"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="MianX agent hierarchy network"
      >
        <defs>
          <linearGradient id="cc-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(79,124,255,0.35)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0.35)" />
          </linearGradient>
        </defs>
        {edgePairs.map((e, i) => (
          <line
            key={`${e.from.id}-${e.to.id}-${i}`}
            x1={e.from.x}
            y1={e.from.y}
            x2={e.to.x}
            y2={e.to.y}
            className={
              activeEdges.includes(e) ? "cc-edge cc-edge-active" : "cc-edge"
            }
          />
        ))}
        <NetworkNode
          x={founder.x}
          y={founder.y}
          label="Founder"
          kind="human"
          status="authority"
        />
        <NetworkNode
          x={ceo.x}
          y={ceo.y}
          label="CEO"
          kind="executive"
          status={
            agents.find((a) => a.slug === "executive-ceo")?.status || "idle"
          }
          selected={selectedSlug === "executive-ceo"}
          onSelect={() => onSelect?.("executive-ceo")}
        />
        {[...positions.entries()]
          .filter(([id]) => id !== "founder" && id !== "executive-ceo")
          .map(([id, pos]) => (
            <NetworkNode
              key={id}
              x={pos.x}
              y={pos.y}
              label={pos.agent?.name?.split(" ")[0] || id}
              kind="agent"
              status={pos.agent?.status || "idle"}
              selected={selectedSlug === id}
              onSelect={() => onSelect?.(id)}
            />
          ))}
      </svg>
    </section>
  );
}

function NetworkNode({ x, y, label, kind, status, selected, onSelect }) {
  const r = kind === "human" ? 22 : kind === "executive" ? 20 : 14;
  const interactive = Boolean(onSelect);
  return (
    <g
      className={`cc-node cc-node-${kind} cc-status-${status}${selected ? " selected" : ""}`}
      transform={`translate(${x} ${y})`}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? "button" : undefined}
      aria-label={
        interactive
          ? `${label}, status ${STATUS_LABEL[status] || status}`
          : label
      }
      onClick={onSelect}
      onKeyDown={(e) => {
        if (!onSelect) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <circle r={r} className="cc-node-circle" />
      <text y={r + 14} textAnchor="middle" className="cc-node-label">
        {label.length > 14 ? `${label.slice(0, 12)}…` : label}
      </text>
      <title>{`${label} — ${STATUS_LABEL[status] || status}`}</title>
    </g>
  );
}
