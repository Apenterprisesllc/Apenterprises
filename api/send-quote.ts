import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

let resend: Resend | null = null;

function getResend(): Resend {
  if (!resend) {
    const key = (process.env.RESEND_API_KEY || "").trim();
    if (!key) throw new Error("RESEND_API_KEY is not configured");
    resend = new Resend(key);
  }
  return resend;
}

interface QuoteBody {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  propertyType?: string;
  squareFootage?: string;
  frequency?: string;
  preferredDate?: string;
  message?: string;
}

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ───────────────────────── Internal notification email ───────────────────────── */
function buildInternalHtml(data: QuoteBody): string {
  const now = new Date();
  const date = now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

  const detailRow = (label: string, value: string, highlight = false) =>
    `<tr>
      <td style="padding:10px 16px;color:#999999;font-size:13px;width:150px;vertical-align:top;border-bottom:1px solid #2A2A2A;">${label}</td>
      <td style="padding:10px 16px;color:${highlight ? "#FFFFFF" : "#E0E0E0"};font-size:14px;font-weight:${highlight ? "600" : "500"};border-bottom:1px solid #2A2A2A;">${value}</td>
    </tr>`;

  const optionalRows: string[] = [];
  if (data.propertyType) optionalRows.push(detailRow("Property Type", esc(data.propertyType)));
  if (data.squareFootage) optionalRows.push(detailRow("Approx. Size", esc(data.squareFootage)));
  if (data.frequency) optionalRows.push(detailRow("Frequency", esc(data.frequency)));
  if (data.preferredDate) optionalRows.push(detailRow("Preferred Date", esc(data.preferredDate)));

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0A0A0A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A;">
    <tr><td align="center" style="padding:48px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Decorative gold line -->
        <tr><td style="height:3px;background:linear-gradient(90deg,#C4973E 0%,#D4AF5A 50%,#C4973E 100%);border-radius:12px 12px 0 0;"></td></tr>

        <!-- Logo -->
        <tr><td style="background-color:#111111;padding:28px 40px 0;" align="center">
          <img src="https://apenterprises-xi.vercel.app/favicon.png" alt="AP Enterprises" width="120" style="display:block;width:120px;height:auto;" />
        </td></tr>

        <!-- Header -->
        <tr><td style="background-color:#111111;padding:20px 40px 28px;border-bottom:1px solid #1E1E1E;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <h1 style="margin:0;font-size:22px;font-weight:700;color:#FFFFFF;letter-spacing:-0.02em;">New Quote Request</h1>
              </td>
              <td align="right" style="vertical-align:top;">
                <p style="margin:0;font-size:11px;color:#777777;line-height:1.5;">${esc(date)}<br/>${esc(time)}</p>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Client info section -->
        <tr><td style="background-color:#111111;padding:28px 40px 8px;">
          <p style="margin:0 0 16px;font-size:10px;font-weight:700;color:#C4973E;text-transform:uppercase;letter-spacing:0.15em;">Client Information</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A;border-radius:10px;border:1px solid #1E1E1E;">
            ${detailRow("Name", `${esc(data.firstName)} ${esc(data.lastName)}`, true)}
            ${detailRow("Email", `<a href="mailto:${esc(data.email)}" style="color:#C4973E;text-decoration:none;">${esc(data.email)}</a>`)}
            ${detailRow("Phone", `<a href="tel:${esc(data.phone)}" style="color:#C4973E;text-decoration:none;">${esc(data.phone)}</a>`)}
          </table>
        </td></tr>

        <!-- Service details section -->
        <tr><td style="background-color:#111111;padding:24px 40px 8px;">
          <p style="margin:0 0 16px;font-size:10px;font-weight:700;color:#C4973E;text-transform:uppercase;letter-spacing:0.15em;">Service Details</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A;border-radius:10px;border:1px solid #1E1E1E;">
            ${detailRow("Service Requested", esc(data.service), true)}
            ${optionalRows.join("\n")}
          </table>
        </td></tr>

        ${data.message ? `
        <!-- Notes section -->
        <tr><td style="background-color:#111111;padding:24px 40px 8px;">
          <p style="margin:0 0 16px;font-size:10px;font-weight:700;color:#C4973E;text-transform:uppercase;letter-spacing:0.15em;">Additional Notes</p>
          <div style="background-color:#0A0A0A;border-radius:10px;border:1px solid #1E1E1E;padding:16px 20px;">
            <p style="margin:0;font-size:14px;color:#CCCCCC;line-height:1.7;font-style:italic;">"${esc(data.message)}"</p>
          </div>
        </td></tr>` : ""}

        <!-- Action button -->
        <tr><td style="background-color:#111111;padding:28px 40px 36px;" align="center">
          <a href="mailto:${esc(data.email)}?subject=Re: Your Quote Request – ${esc(data.service)}&body=Hi ${esc(data.firstName)},%0D%0A%0D%0AThank you for your interest in our ${esc(data.service)} service.%0D%0A%0D%0A"
            style="display:inline-block;padding:14px 40px;background:linear-gradient(135deg,#C4973E,#A67C2E);color:#FFFFFF;font-size:14px;font-weight:600;text-decoration:none;border-radius:8px;letter-spacing:0.02em;">
            Reply to ${esc(data.firstName)}
          </a>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background-color:#0A0A0A;padding:24px 40px;border-top:1px solid #1E1E1E;border-radius:0 0 12px 12px;" align="center">
          <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#555555;">AP Enterprises LLC</p>
          <p style="margin:0;font-size:11px;color:#3A3A3A;">South Florida's Premium Cleaning Service &nbsp;·&nbsp; (561) 385-1564</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ───────────────────────── Client confirmation email ───────────────────────── */
function buildClientHtml(data: QuoteBody): string {
  const serviceRows: string[] = [];
  serviceRows.push(`<tr>
    <td style="padding:10px 20px;color:#8A8A8A;font-size:13px;width:140px;vertical-align:top;border-bottom:1px solid #F0F0F0;">Service</td>
    <td style="padding:10px 20px;color:#1A1A1A;font-size:14px;font-weight:600;border-bottom:1px solid #F0F0F0;">${esc(data.service)}</td>
  </tr>`);
  if (data.propertyType) serviceRows.push(`<tr>
    <td style="padding:10px 20px;color:#8A8A8A;font-size:13px;width:140px;vertical-align:top;border-bottom:1px solid #F0F0F0;">Property Type</td>
    <td style="padding:10px 20px;color:#1A1A1A;font-size:14px;font-weight:500;border-bottom:1px solid #F0F0F0;">${esc(data.propertyType)}</td>
  </tr>`);
  if (data.frequency) serviceRows.push(`<tr>
    <td style="padding:10px 20px;color:#8A8A8A;font-size:13px;width:140px;vertical-align:top;border-bottom:1px solid #F0F0F0;">Frequency</td>
    <td style="padding:10px 20px;color:#1A1A1A;font-size:14px;font-weight:500;border-bottom:1px solid #F0F0F0;">${esc(data.frequency)}</td>
  </tr>`);
  if (data.preferredDate) serviceRows.push(`<tr>
    <td style="padding:10px 20px;color:#8A8A8A;font-size:13px;width:140px;vertical-align:top;">Preferred Date</td>
    <td style="padding:10px 20px;color:#1A1A1A;font-size:14px;font-weight:500;">${esc(data.preferredDate)}</td>
  </tr>`);

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#F7F7F7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F7F7F7;">
    <tr><td align="center" style="padding:48px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Gold accent -->
        <tr><td style="height:3px;background:linear-gradient(90deg,#C4973E 0%,#D4AF5A 50%,#C4973E 100%);border-radius:12px 12px 0 0;"></td></tr>

        <!-- Header -->
        <tr><td style="background-color:#0A0A0A;padding:40px 40px 36px;" align="center">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#C4973E;text-transform:uppercase;letter-spacing:0.2em;">AP Enterprises</p>
          <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#FFFFFF;letter-spacing:-0.02em;">Thank You, ${esc(data.firstName)}!</h1>
          <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.5);line-height:1.5;">We've received your quote request and will be in touch shortly.</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background-color:#FFFFFF;padding:36px 40px;">

          <!-- Message -->
          <p style="margin:0 0 24px;font-size:15px;color:#333333;line-height:1.7;">
            Thank you for choosing AP Enterprises for your <strong style="color:#1A1A1A;">${esc(data.service)}</strong> needs. Our team is currently reviewing your request and will prepare a personalized quote tailored to your requirements.
          </p>

          <!-- What to expect -->
          <div style="background-color:#FAFAFA;border-radius:10px;border:1px solid #EEEEEE;padding:24px 24px 16px;margin-bottom:28px;">
            <p style="margin:0 0 16px;font-size:10px;font-weight:700;color:#C4973E;text-transform:uppercase;letter-spacing:0.15em;">What Happens Next</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:0 0 12px;font-size:14px;color:#555555;line-height:1.6;">
                  <strong style="color:#C4973E;">1.</strong>&nbsp;&nbsp;Our team reviews your request within 24 hours<br/>
                  <strong style="color:#C4973E;">2.</strong>&nbsp;&nbsp;We prepare a detailed, no-obligation quote<br/>
                  <strong style="color:#C4973E;">3.</strong>&nbsp;&nbsp;A specialist contacts you to finalize the details
                </td>
              </tr>
            </table>
          </div>

          <!-- Request summary -->
          <p style="margin:0 0 16px;font-size:10px;font-weight:700;color:#C4973E;text-transform:uppercase;letter-spacing:0.15em;">Your Request Summary</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAFAFA;border-radius:10px;border:1px solid #EEEEEE;margin-bottom:28px;">
            ${serviceRows.join("\n")}
          </table>

          <!-- CTA -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center" style="padding:4px 0 0;">
              <p style="margin:0 0 16px;font-size:14px;color:#777777;">Need immediate assistance?</p>
              <a href="tel:+15613851564"
                style="display:inline-block;padding:14px 40px;background:linear-gradient(135deg,#C4973E,#A67C2E);color:#FFFFFF;font-size:14px;font-weight:600;text-decoration:none;border-radius:8px;letter-spacing:0.02em;">
                Call (561) 385-1564
              </a>
            </td></tr>
          </table>

        </td></tr>

        <!-- Footer -->
        <tr><td style="background-color:#0A0A0A;padding:28px 40px;border-radius:0 0 12px 12px;" align="center">
          <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#FFFFFF;">AP Enterprises LLC</p>
          <p style="margin:0 0 12px;font-size:12px;color:#555555;">South Florida's Premium Cleaning Service</p>
          <p style="margin:0;font-size:11px;color:#3A3A3A;">
            <a href="tel:+15613851564" style="color:#C4973E;text-decoration:none;">(561) 385-1564</a>
            &nbsp;&nbsp;·&nbsp;&nbsp;
            <a href="mailto:andres@apentllc.com" style="color:#C4973E;text-decoration:none;">andres@apentllc.com</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ───────────────────────── API Handler ───────────────────────── */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body as Partial<QuoteBody>;

  if (!body.firstName || !body.lastName || !body.email || !body.phone || !body.service) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const data: QuoteBody = {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phone: body.phone,
    service: body.service,
    propertyType: body.propertyType || undefined,
    squareFootage: body.squareFootage || undefined,
    frequency: body.frequency || undefined,
    preferredDate: body.preferredDate || undefined,
    message: body.message || undefined,
  };

  const sender = process.env.EMAIL_FROM || "AP Enterprises <onboarding@resend.dev>";

  try {
    const client = getResend();

    // Send internal notification
    const internal = await client.emails.send({
      from: sender,
      to: "apenterprisesllc.web@gmail.com",
      replyTo: data.email,
      subject: `New Quote Request – ${data.service} | ${data.firstName} ${data.lastName}`,
      html: buildInternalHtml(data),
    });

    if (internal.error) {
      console.error("Resend internal error:", internal.error);
      return res.status(500).json({ error: "Failed to send email" });
    }

    // Client confirmation – only if a custom domain is configured
    if (sender !== "AP Enterprises <onboarding@resend.dev>") {
      const confirmation = await client.emails.send({
        from: sender,
        to: data.email,
        subject: `Thank you for your request – AP Enterprises`,
        html: buildClientHtml(data),
      });
      if (confirmation.error) {
        console.error("Resend confirmation error:", confirmation.error);
      }
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
