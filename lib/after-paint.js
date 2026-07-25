// Schedules work after the browser has had a chance to paint.
// Used so click/pending UI (inline loader, disabled state) can commit before
// network or other async work begins. Does not invent artificial delay beyond
 // the next two animation frames (or a 0ms timeout when rAF is unavailable).

export function afterNextPaint() {
  return new Promise((resolve) => {
    if (typeof requestAnimationFrame !== "function") {
      setTimeout(resolve, 0);
      return;
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
}
