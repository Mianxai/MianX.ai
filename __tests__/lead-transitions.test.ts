import { describe, it, expect } from 'vitest';
import {
  LEAD_STATUSES,
  VALID_TRANSITIONS,
  validateStatusTransition,
} from '@/lib/domain/lead-transitions';

describe('lead-transitions shared module', () => {
  // ─── LEAD_STATUSES constant ───
  describe('LEAD_STATUSES', () => {
    it('contains exactly 6 statuses', () => {
      expect(LEAD_STATUSES).toHaveLength(6);
    });

    it('includes all expected statuses', () => {
      expect(LEAD_STATUSES).toContain('new');
      expect(LEAD_STATUSES).toContain('hot');
      expect(LEAD_STATUSES).toContain('warm');
      expect(LEAD_STATUSES).toContain('cold');
      expect(LEAD_STATUSES).toContain('converted');
      expect(LEAD_STATUSES).toContain('lost');
    });
  });

  // ─── VALID_TRANSITIONS map structure ───
  describe('VALID_TRANSITIONS map', () => {
    it('has entries for all 6 statuses', () => {
      for (const status of LEAD_STATUSES) {
        expect(VALID_TRANSITIONS).toHaveProperty(status);
        expect(Array.isArray(VALID_TRANSITIONS[status])).toBe(true);
      }
    });

    it('converted is terminal (empty array)', () => {
      expect(VALID_TRANSITIONS['converted']).toEqual([]);
    });

    it('lost can only go to new', () => {
      expect(VALID_TRANSITIONS['lost']).toEqual(['new']);
    });

    it('non-terminal, non-lost statuses include themselves (same-status)', () => {
      // lost does not include itself in the map; same-status for lost is
      // handled by validateStatusTransition's early return (from === to).
      const selfIncluded = LEAD_STATUSES.filter((s) => s !== 'converted' && s !== 'lost');
      for (const status of selfIncluded) {
        expect(VALID_TRANSITIONS[status]).toContain(status);
      }
      // Verify lost specifically does NOT include itself but validator still allows it
      expect(VALID_TRANSITIONS['lost']).not.toContain('lost');
      expect(validateStatusTransition('lost', 'lost')).toBeNull();
    });
  });

  // ─── validateStatusTransition ───
  describe('validateStatusTransition', () => {
    // ── Same-status updates (idempotent) ──
    describe('same-status updates', () => {
      const statuses: string[] = [...LEAD_STATUSES];
      it.each(statuses)('allows %s → %s (same status)', (status) => {
        expect(validateStatusTransition(status, status)).toBeNull();
      });
    });

    // ── Valid transitions from each status ──
    describe('valid transitions from "new"', () => {
 const validTargets = ['hot', 'warm', 'cold', 'converted', 'lost'];
      it.each(validTargets)('allows new → %s', (to) => {
        expect(validateStatusTransition('new', to)).toBeNull();
      });
    });

    describe('valid transitions from "hot"', () => {
      const validTargets = ['warm', 'cold', 'converted', 'lost'];
      it.each(validTargets)('allows hot → %s', (to) => {
        expect(validateStatusTransition('hot', to)).toBeNull();
      });
    });

    describe('valid transitions from "warm"', () => {
      const validTargets = ['hot', 'cold', 'converted', 'lost'];
      it.each(validTargets)('allows warm → %s', (to) => {
        expect(validateStatusTransition('warm', to)).toBeNull();
      });
    });

    describe('valid transitions from "cold"', () => {
      const validTargets = ['warm', 'hot', 'converted', 'lost'];
      it.each(validTargets)('allows cold → %s', (to) => {
        expect(validateStatusTransition('cold', to)).toBeNull();
      });
    });

    // ── Invalid transitions ──
    describe('invalid transitions', () => {
      it('rejects unknown from-status', () => {
        const result = validateStatusTransition('unknown', 'hot');
        expect(result).not.toBeNull();
        expect(result).toContain('Invalid status transition');
      });

      it('rejects unknown to-status', () => {
        const result = validateStatusTransition('new', 'unknown');
        expect(result).not.toBeNull();
        expect(result).toContain('Invalid status transition');
      });
    });

    // ── Terminal state: converted ──
    describe('converted terminal behavior', () => {
      const allOther = LEAD_STATUSES.filter((s) => s !== 'converted');
      it.each(allOther)('rejects converted → %s', (to) => {
        const result = validateStatusTransition('converted', to);
        expect(result).not.toBeNull();
        expect(result).toContain('terminal');
      });

      it('allows converted → converted (same-status)', () => {
        expect(validateStatusTransition('converted', 'converted')).toBeNull();
      });
    });

    // ── Special: lost → new (re-open) ──
    describe('lost → new re-open', () => {
      it('allows lost → new', () => {
        expect(validateStatusTransition('lost', 'new')).toBeNull();
      });

      const nonNewTargets = LEAD_STATUSES.filter((s) => s !== 'new' && s !== 'lost');
      it.each(nonNewTargets)('rejects lost → %s', (to) => {
        const result = validateStatusTransition('lost', to);
        expect(result).not.toBeNull();
        expect(result).toContain('only "new"');
      });
    });

    // ── Cross-endpoint consistency guarantee ──
    describe('consistency: VALID_TRANSITIONS matches validateStatusTransition', () => {
      it('every (from, to) pair in VALID_TRANSITIONS is accepted by validateStatusTransition', () => {
        for (const [from, allowedTos] of Object.entries(VALID_TRANSITIONS)) {
          for (const to of allowedTos) {
            expect(validateStatusTransition(from, to)).toBeNull();
          }
        }
      });

      it('every status pair NOT in VALID_TRANSITIONS is rejected (excluding same-status)', () => {
        for (const from of LEAD_STATUSES) {
          for (const to of LEAD_STATUSES) {
            if (from === to) continue; // same-status always allowed
            const allowed = VALID_TRANSITIONS[from] || [];
            if (!allowed.includes(to)) {
              const result = validateStatusTransition(from, to);
              expect(result).not.toBeNull();
            }
          }
        }
      });
    });
  });
});
