# Workforce Recovery Guide

- Lease expiry → recover expired jobs/instances; never double-run  
- Stuck runs → diagnostic tick + audit  
- Dead-letter → inspect error code; replay only with new idempotency key  
- Provider outage → jobs fail closed / requeue transient; never mark success  
- Scheduler: GitHub Actions cadence is approximate — use health last-tick timestamps  
