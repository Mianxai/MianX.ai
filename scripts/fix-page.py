#!/usr/bin/env python3
"""Fix page.tsx by reading and rewriting with proper template literals."""

with open('/home/z/my-project/src/app/page.tsx', 'r') as f:
    content = f.read()

# The issue: the build script created malformed template literals.
# We need to find and fix specific patterns.

# Check if the file has proper "use client" directive
if not content.startswith('"use client"'):
    print("ERROR: Missing 'use client' directive")
else:
    print("OK: 'use client' directive present")

# Count backticks
bt_count = content.count('`')
print(f"Backtick count: {bt_count}")

# Check for the specific problematic pattern on line 249
lines = content.split('\n')
for i, line in enumerate(lines):
    if 'className={' in line and 'rtConnected' in line:
        print(f"Line {i+1}: Found rtConnected className")
        # Check if it uses proper backtick template
        if '`' in line:
            print(f"  Has backtick: YES")
        else:
            print(f"  Has backtick: NO - needs fixing")

print("\nFile size:", len(content), "bytes")
print("Line count:", len(lines))
