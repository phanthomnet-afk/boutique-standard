# NEO Integration Guide - The Boutique Standard

## Overview

TBS exposes a secure REST API and outbound webhook system for NEO to read pipeline
data and trigger actions. TBS continues to work independently if NEO is unreachable.
The integration is additive - it is never a dependency.

Configure everything under /admin/settings - NEO Dashboard Integration.

---

## Authentication

Every inbound request from NEO must include:

```
X-Neo-Api-Key: [your-api-key]
```

Generate the API key in /admin/settings. It is stored in the TBS database (not env vars),
so keys can be rotated without redeployment.

---

## Base URL

```
https://[your-vercel-domain]/api/neo
```

The full URL is shown read-only in /admin/settings - NEO Dashboard Integration.

---

## Endpoints

### Dashboard data

```
GET /api/neo/dashboard
```

Returns the full TBS panel data: pipeline overview, weekly outreach plan,
recent activity, top prospects, and monthly stats. Cached for 5 minutes.

Response shape:
```json
{
  "pipeline": {
    "total": 42,
    "byStatus": {
      "prospect": 12,
      "enriched": 8,
      "outreach-ready": 5,
      "contacted": 10,
      "replied": 4,
      "booked": 2,
      "closed": 1
    }
  },
  "thisWeek": {
    "overdue": 3,
    "dueToday": 1,
    "dueThisWeek": 4,
    "readyToStart": 6
  },
  "recentActivity": [
    { "hotelName": "Hotel Miramar", "location": "Barcelona, ES", "event": "Touch 1 sent via email", "timestamp": "..." }
  ],
  "topProspects": [
    { "hotelId": "...", "hotelName": "...", "location": "...", "country": "...", "icpScore": 5, "status": "enriched", "gapSummary": "...", "hasContact": true }
  ],
  "stats": {
    "emailsSentThisMonth": 18,
    "repliesThisMonth": 4,
    "replyRate": 22,
    "bookedTotal": 2,
    "bookedThisMonth": 1
  },
  "lastUpdated": "2026-06-09T..."
}
```

---

### Get hotel detail

```
GET /api/neo/actions/get-hotel?hotelId=[id]
```

Returns full hotel record with intelligence summary, contacts, and outreach history.

---

### Trigger hotel analysis

```
POST /api/neo/actions/analyse
Content-Type: application/json

{ "hotelId": "...", "force": false }
```

Runs the full analysis pipeline (website, reviews, gap detection, ICP scoring).
If intelligence already exists, returns `status: "already_analysed"` unless `force: true`.

Returns: `{ success: true, status: "completed" | "already_analysed", icpScore: number }`

---

### Generate outreach draft

```
POST /api/neo/actions/generate-outreach
Content-Type: application/json

{ "hotelId": "...", "channel": "email" | "linkedin", "sequencePosition": 1 | 2 | 3 }
```

Generates an AI outreach draft and saves it as a draft record.

Returns: `{ success: true, outreachId: "...", bodyDraft: "...", subject: "..." }`

---

### Update hotel status

```
POST /api/neo/actions/update-status
Content-Type: application/json

{ "hotelId": "...", "status": "contacted", "notes": "optional note" }
```

Valid statuses: prospect, enriched, outreach-ready, contacted, replied, booked, closed, not-a-fit, dead

Returns: `{ success: true, hotel: { id, name, status } }`

---

## Outbound Webhooks (TBS fires to NEO)

Configure the NEO receiver URL in /admin/settings - NEO Dashboard Integration.

TBS fires webhooks on key events. Webhooks include an HMAC-SHA256 signature
for verification using the webhook secret.

### Verifying webhook authenticity

Each webhook includes a `signature` field. Verify it in NEO:

```javascript
const crypto = require("crypto")
const expected = crypto
  .createHmac("sha256", webhookSecret)
  .update(JSON.stringify({ event, timestamp, data }))  // payload WITHOUT signature field
  .digest("hex")
const isValid = expected === payload.signature
```

The `X-Tbs-Webhook-Secret` header also contains the secret for quick header-based verification.

### Event types

| Event | Triggered when |
|---|---|
| `hotel.created` | New hotel added to pipeline |
| `hotel.analysed` | Intelligence analysis completed |
| `hotel.status_changed` | Hotel status updated |
| `hotel.booked` | Hotel status set to "booked" |
| `outreach.generated` | Draft outreach created |
| `outreach.sent` | Outreach email or LinkedIn message sent |
| `outreach.replied` | Reply logged with sentiment |
| `test.ping` | Test webhook fired from settings |

### Webhook payload shape

```json
{
  "event": "hotel.status_changed",
  "timestamp": "2026-06-09T12:00:00.000Z",
  "data": {
    "hotelId": "cuid...",
    "hotelName": "Hotel Miramar",
    "location": "Barcelona, Spain",
    "country": "Spain",
    "icpScore": 4,
    "status": "contacted",
    "metadata": { "newStatus": "contacted" }
  },
  "signature": "sha256-hex-digest"
}
```

---

## Delivery logs

All webhook delivery attempts are logged. View the last 10 entries in
/admin/settings - NEO Dashboard Integration - Recent webhook deliveries.

Status values: `delivered`, `failed`, `skipped` (when NEO integration is disabled).

---

## Error handling

All NEO endpoints return standard HTTP status codes:
- `200` / `201` - success
- `400` - bad request (missing/invalid params)
- `401` - invalid or missing API key
- `404` - hotel not found
- `422` - unprocessable (e.g. hotel not analysed yet)
- `500` - server error

Error response shape: `{ "error": "description" }`

---

## Testing

Use the "Test webhook" button in /admin/settings to verify the webhook connection
before relying on it in production. It fires a `test.ping` event and reports
the HTTP status code returned by your NEO endpoint.
