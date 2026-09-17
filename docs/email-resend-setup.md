# Email delivery — Resend + `apentllc.com`

Transactional email for the quote form (`api/send-quote.ts`) is sent through
[Resend](https://resend.com), signed as the root domain `apentllc.com`.

## Why the root domain, not a subdomain

The concern with registering the root is that `apentllc.com` already carries
Google Workspace mail:

| Record | Current value |
| --- | --- |
| MX | `aspmx.l.google.com` (+ 4 alt hosts, priorities 1–10) |
| TXT (SPF) | `v=spf1 include:_spf.google.com ~all` |

Resend does **not** touch either. It places its SPF and bounce-handling MX on
`send.apentllc.com` — a distinct name — and only adds a DKIM key at
`resend._domainkey.apentllc.com`. Nothing the team's inboxes depend on is
modified, and mail is signed as the real brand domain rather than a
`send.` subdomain, which reads better to recipients and to spam filters.

Open and click tracking are **disabled**. Both work by rewriting the message —
an invisible pixel, and every link pointed at a Resend redirector. For
transactional mail that only costs deliverability.

## DNS

DNS is managed in **Squarespace**, under
`Settings → Domains → apentllc.com → DNS → DNS Settings → Custom Records`.

> The nameservers read `ns-cloud-a1..a4.googledomains.com` and the SOA contact
> is `cloud-dns-hostmaster.google.com`, which looks like Google Cloud DNS but
> is not. Squarespace acquired Google Domains in 2023 and kept the underlying
> nameserver infrastructure; the registrar is `Squarespace Domains II LLC`.
> There is no Google Cloud project involved and no Cloud DNS console to visit.

Hosting is Vercel: the apex A record is `216.198.79.1` (Vercel) and `www` is a
CNAME to `*.vercel-dns-017.com`. Neither is affected by the records below.

Domain registered in Resend: `apentllc.com` (region `us-east-1`, return-path
`send`). All four records below were confirmed absent against the authoritative
nameserver before setup, so nothing existing was overwritten.

In Squarespace's Custom Records form, the **Host** column is the name *without*
`.apentllc.com` — enter `resend._domainkey`, `send`, `_dmarc`. Squarespace sets
TTL automatically, and the MX priority goes in its own field.

| Host | Type | Priority | Value |
| --- | --- | --- | --- |
| `resend._domainkey` | TXT | — | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCfMgFR3wNOiMzg9M20KKsW7VyZ3AfPNSdfcNGMqiikqM3mIcjbL8kUuVzYa9T0ur7mJm06N6hEl2LnMYIrAkimJ7jrAslcCMgKX2XPljEoP3PvWY9PvMFQ5JV9OrxxrWbM1R+nZtHFfS3N8kxOf4Rizy00jKRfXEjgzp7g7g9QRQIDAQAB` |
| `send` | TXT | — | `v=spf1 include:amazonses.com ~all` |
| `send` | MX | 10 | `feedback-smtp.us-east-1.amazonses.com` |
| `_dmarc` | TXT | — | `v=DMARC1; p=none; rua=mailto:dmarc@apentllc.com` |

The MX on `send.apentllc.com` receives bounce and complaint reports. It is a
different name from the apex MX, so Google Workspace delivery is untouched.

### About the DMARC record

Resend does not ask for `_dmarc`, but Gmail and Yahoo require a DMARC policy
from automated senders, and its absence weakens deliverability for every
message the domain sends — including the human Google Workspace mail. It goes
on the root and is inherited by subdomains.

Start at `p=none` (monitor only — changes nothing about delivery). After a few
weeks of clean reports, tighten to `p=quarantine`.

## Environment variables

Set these in Vercel → Project Settings → Environment Variables, for
Production, Preview and Development. See `.env.example`.

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | Sending-access key `apentllc-web-quotes`, restricted to `apentllc.com` |
| `EMAIL_FROM` | `AP Enterprises <quotes@apentllc.com>` |
| `EMAIL_TO` | Inbox for internal quote notifications |

`EMAIL_FROM` and `EMAIL_TO` have working defaults in code, so a missing value
degrades gracefully; `RESEND_API_KEY` is required and throws if absent.

The key is scoped to **Sending access** and restricted to this domain. A
full-access key in a serverless env var can create and delete domains; a
sending key cannot.

> These belong to the Vercel project that actually serves `www.apentllc.com`.
> There is a similarly named `apenterprises` project under a different Vercel
> account that does **not** serve this site — check `vercel whoami` and confirm
> the project's domains before setting anything.

## Verifying

1. Resend dashboard → Domains → `apentllc.com` shows **Verified**
   (propagation is usually minutes, up to 72h).
2. Submit the quote form and confirm both messages arrive: the internal
   notification and the client confirmation.
3. Check the headers of a received message — `SPF: PASS`, `DKIM: PASS` and
   `DMARC: PASS` should all be present.
4. Confirm Google Workspace mail still flows: send a message to a
   `@apentllc.com` mailbox from an outside address.
