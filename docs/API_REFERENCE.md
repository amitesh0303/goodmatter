# API Reference — GoodMatter

---

## Overview

GoodMatter uses **Next.js Server Actions** for form submissions and **Route Handlers** for auth callbacks. All data operations go through **Supabase** with Row Level Security (RLS) enforcing access control at the database level.

> [!NOTE]
> There is no standalone REST API server. All backend logic runs as Next.js server-side code (Server Actions, Route Handlers, Middleware).

---

## Server Actions

### `submitContactForm`

**File:** `src/app/contact/actions.ts`  
**Auth:** Public (no authentication required)

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | ✅ | Submitter's full name |
| `email` | `string` | ✅ | Email address |
| `phone` | `string` | ❌ | Phone number |
| `inquiry_type` | `string` | ✅ | One of: `investor_inquiry`, `founder_application`, `impact_studio`, `partnership`, `general` |
| `message` | `string` | ✅ | Message body |

**Returns:**
```typescript
{ success: true } | { success: false; error: string }
```

**Validation:**
- `name` must be non-empty, max 200 chars
- `email` must be valid email format
- `inquiry_type` must be one of the allowed values
- `message` must be non-empty, max 5000 chars

---

### `submitFounderApplication`

**File:** `src/app/founders/actions.ts`  
**Auth:** Public (no authentication required)

| Parameter | Type | Required | Description |
|---|---|---|---|
| `startup_name` | `string` | ✅ | Company name |
| `founder_name` | `string` | ✅ | Primary founder's name |
| `email` | `string` | ✅ | Contact email |
| `description` | `string` | ✅ | Startup description |
| `sector` | `string` | ❌ | Industry vertical |
| `stage` | `string` | ❌ | Funding stage |
| `raise_amount` | `string` | ❌ | Target raise amount |
| `pitch_deck` | `File` | ❌ | Pitch deck upload (PDF, max 10MB) |

**Returns:**
```typescript
{ success: true; applicationId: string } | { success: false; error: string }
```

**Behavior:**
1. Validates input fields
2. If pitch deck provided, uploads to Supabase Storage (`pitch-decks` bucket)
3. Inserts row into `founder_applications` table with `status: 'pending'`
4. Returns application ID for reference

---

### `requestIntroduction`

**File:** `src/app/investors/dashboard/[id]/actions.ts`  
**Auth:** Authenticated (investor must be logged in)

| Parameter | Type | Required | Description |
|---|---|---|---|
| `deal_id` | `string` (uuid) | ✅ | ID of the deal |
| `message` | `string` | ❌ | Optional note to include with the request |

**Returns:**
```typescript
{ success: true } | { success: false; error: string }
```

**Behavior:**
1. Verifies user is authenticated via `supabase.auth.getUser()`
2. Checks for existing request (prevent duplicates)
3. Inserts row into `introduction_requests` table
4. Returns success confirmation

---

### `signIn`

**File:** `src/app/investors/actions.ts`  
**Auth:** Public

| Parameter | Type | Required | Description |
|---|---|---|---|
| `email` | `string` | ✅ | Investor's email |
| `password` | `string` | ✅ | Password |

**Returns:**
```typescript
{ success: true } | { success: false; error: string }
```

**Behavior:**
1. Calls `supabase.auth.signInWithPassword({ email, password })`
2. On success, session cookies are set automatically by `@supabase/ssr`
3. Client-side code handles redirect to `/investors/dashboard`

---

### `signOut`

**File:** `src/app/investors/actions.ts`  
**Auth:** Authenticated

**Returns:**
```typescript
{ success: true } | { success: false; error: string }
```

**Behavior:**
1. Calls `supabase.auth.signOut()`
2. Clears session cookies
3. Client-side code redirects to `/investors`

---

## Route Handlers

### `GET /api/auth/callback`

**File:** `src/app/api/auth/callback/route.ts`  
**Purpose:** Handles Supabase auth redirects (email confirmations, OAuth callbacks)

**Query Parameters:**
| Param | Type | Description |
|---|---|---|
| `code` | `string` | Auth code from Supabase |
| `next` | `string` | Redirect URL after confirmation (default: `/`) |

**Behavior:**
1. Exchanges auth code for session via `supabase.auth.exchangeCodeForSession(code)`
2. Redirects to `next` URL

---

## Data Queries (Server Components)

### Fetch All Deals

**Used in:** `src/app/investors/dashboard/page.tsx`

```typescript
const { data: deals } = await supabase
  .from('deals')
  .select('id, startup_name, sector, stage, raise_amount, summary, logo_url')
  .order('created_at', { ascending: false })
```

**RLS:** Only returns rows if user is authenticated.

---

### Fetch Single Deal

**Used in:** `src/app/investors/dashboard/[id]/page.tsx`

```typescript
const { data: deal } = await supabase
  .from('deals')
  .select('*')
  .eq('id', dealId)
  .single()
```

**RLS:** Only returns if user is authenticated. Returns 404 if deal doesn't exist.

---

### Fetch Featured Deals (Public)

**Used in:** `src/app/page.tsx` (Home page, optional section)

```typescript
const { data: featuredDeals } = await supabase
  .from('deals')
  .select('startup_name, sector, stage, summary, logo_url')
  .eq('is_featured', true)
  .limit(6)
```

> [!NOTE]
> Featured deals require a separate RLS policy allowing public SELECT where `is_featured = true`, or use the service role key in a server-only context.

---

## Middleware

### `src/middleware.ts`

**Applies to:** `/investors/dashboard/:path*`

**Behavior:**
1. Creates Supabase server client
2. Calls `supabase.auth.getUser()` to validate session
3. If valid → pass request through
4. If invalid → redirect to `/investors?redirect={originalPath}`

```typescript
export const config = {
  matcher: ['/investors/dashboard/:path*']
}
```

---

## Error Codes

| Code | Meaning | Context |
|---|---|---|
| `VALIDATION_ERROR` | Input validation failed | Server Actions |
| `AUTH_REQUIRED` | User not authenticated | Middleware redirect |
| `SESSION_EXPIRED` | Auth session no longer valid | Middleware redirect |
| `NOT_FOUND` | Resource doesn't exist | Deal detail page |
| `DUPLICATE_REQUEST` | Introduction already requested | Request Introduction action |
| `UPLOAD_FAILED` | File upload to storage failed | Founder application |
| `INTERNAL_ERROR` | Unexpected server error | Any server-side operation |

---

## Rate Limits

| Endpoint | Limit | Enforced By |
|---|---|---|
| Sign In | 5 attempts / minute / IP | Supabase Auth |
| Contact Form | 10 submissions / hour / IP | Application logic |
| Founder Application | 3 submissions / day / email | Application logic |
| Introduction Request | 1 per deal per investor | Database unique constraint |
