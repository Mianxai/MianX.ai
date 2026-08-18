/**
 * Honest durability descriptors for Phase I.3.
 */

export const INSTANCE_DURABILITY = {
  describe({ supabaseConfigured = false } = {}) {
    return {
      schemaPrepared: true,
      instancesDurable: Boolean(supabaseConfigured),
      leasesDurable: Boolean(supabaseConfigured),
      instancesNote: supabaseConfigured
        ? "project_agent_instances used when Supabase admin client available"
        : "Schema prepared; runtime uses memory Map until Supabase configured + migration applied",
      leasesNote: supabaseConfigured
        ? "agent_instance_leases written on allocate/release"
        : "Schema prepared; lease table unused until Supabase configured",
      label: supabaseConfigured
        ? "Instance durability: Postgres"
        : "Instance durability: memory fallback (Action required: configure Supabase + apply migration)",
    };
  },
};
