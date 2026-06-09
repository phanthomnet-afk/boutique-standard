#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const [,, tag, name, timestamp] = process.argv

const snapshotsPath = path.join(__dirname, '..', 'SNAPSHOTS.md')

let existing = ''
try {
  existing = fs.readFileSync(snapshotsPath, 'utf8')
} catch {
  existing = '# Project Snapshots\n\nCheckpoint history.\n\n---\n\n'
}

const entry = `## ${name}
- **Tag:** \`${tag}\`
- **Created:** ${timestamp}
- **Restore all:** \`git checkout ${tag}\`
- **Restore website:** \`git checkout ${tag} -- apps/web/\`
- **Restore components:** \`git checkout ${tag} -- apps/web/components/\`

---

`

// Insert after the header
const headerEnd = existing.indexOf('---\n\n') + 5
const newContent = existing.slice(0, headerEnd) +
  entry +
  existing.slice(headerEnd)

fs.writeFileSync(snapshotsPath, newContent)
console.log('SNAPSHOTS.md updated.')
