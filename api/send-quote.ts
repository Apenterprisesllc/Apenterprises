import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(data: QuoteBody): string {
  const now = new Date();
  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const time = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const optionalRows: string[] = [];

  if (data.propertyType) {
    optionalRows.push(
      `<tr>
        <td style="padding:8px 0;color:#6B7280;font-size:13px;width:140px;vertical-align:top;">Property Type</td>
        <td style="padding:8px 0;color:#0A0A0A;font-size:14px;font-weight:500;">${escapeHtml(data.propertyType)}</td>
      </tr>`
    );
  }
  if (data.squareFootage) {
    optionalRows.push(
      `<tr>
        <td style="padding:8px 0;color:#6B7280;font-size:13px;width:140px;vertical-align:top;">Approx. Size</td>
        <td style="padding:8px 0;color:#0A0A0A;font-size:14px;font-weight:500;">${escapeHtml(data.squareFootage)}</td>
      </tr>`
    );
  }
  if (data.frequency) {
    optionalRows.push(
      `<tr>
        <td style="padding:8px 0;color:#6B7280;font-size:13px;width:140px;vertical-align:top;">Frequency</td>
        <td style="padding:8px 0;color:#0A0A0A;font-size:14px;font-weight:500;">${escapeHtml(data.frequency)}</td>
      </tr>`
    );
  }
  if (data.preferredDate) {
    optionalRows.push(
      `<tr>
        <td style="padding:8px 0;color:#6B7280;font-size:13px;width:140px;vertical-align:top;">Preferred Date</td>
        <td style="padding:8px 0;color:#0A0A0A;font-size:14px;font-weight:500;">${escapeHtml(data.preferredDate)}</td>
      </tr>`
    );
  }

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#F4F7FA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4F7FA;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Gold Top Bar -->
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,#C4973E,#A67C2E);border-radius:8px 8px 0 0;"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="background-color:#0A0A0A;padding:32px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <h1 style="margin:0 0 4px;font-size:20px;font-weight:700;color:#FFFFFF;letter-spacing:-0.02em;">AP ENTERPRISES</h1>
                    <p style="margin:0 0 2px;font-size:14px;color:#C4973E;font-weight:600;">New Quote Request</p>
                    <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.4);">Received ${escapeHtml(date)} at ${escapeHtml(time)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color:#FFFFFF;padding:32px 36px;">

              <!-- Contact Information -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="padding-bottom:14px;border-bottom:1px solid #F0F0F0;">
                    <p style="margin:0;font-size:11px;font-weight:700;color:#C4973E;text-transform:uppercase;letter-spacing:0.08em;">Contact Information</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:14px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 0;color:#6B7280;font-size:13px;width:140px;vertical-align:top;">Name</td>
                        <td style="padding:8px 0;color:#0A0A0A;font-size:14px;font-weight:500;">${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;color:#6B7280;font-size:13px;width:140px;vertical-align:top;">Email</td>
                        <td style="padding:8px 0;color:#0A0A0A;font-size:14px;font-weight:500;">
                          <a href="mailto:${escapeHtml(data.email)}" style="color:#C4973E;text-decoration:none;">${escapeHtml(data.email)}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;color:#6B7280;font-size:13px;width:140px;vertical-align:top;">Phone</td>
                        <td style="padding:8px 0;color:#0A0A0A;font-size:14px;font-weight:500;">
                          <a href="tel:${escapeHtml(data.phone)}" style="color:#C4973E;text-decoration:none;">${escapeHtml(data.phone)}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Service Details -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="padding-bottom:14px;border-bottom:1px solid #F0F0F0;">
                    <p style="margin:0;font-size:11px;font-weight:700;color:#C4973E;text-transform:uppercase;letter-spacing:0.08em;">Service Details</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:14px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 0;color:#6B7280;font-size:13px;width:140px;vertical-align:top;">Service</td>
                        <td style="padding:8px 0;color:#0A0A0A;font-size:14px;font-weight:600;">${escapeHtml(data.service)}</td>
                      </tr>
                      ${optionalRows.join("\n")}
                    </table>
                  </td>
                </tr>
              </table>

              ${
                data.message
                  ? `<!-- Additional Notes -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="padding-bottom:14px;border-bottom:1px solid #F0F0F0;">
                    <p style="margin:0;font-size:11px;font-weight:700;color:#C4973E;text-transform:uppercase;letter-spacing:0.08em;">Additional Notes</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:14px;">
                    <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;background-color:#F9FAFB;padding:16px;border-radius:8px;border:1px solid #F0F0F0;">${escapeHtml(data.message)}</p>
                  </td>
                </tr>
              </table>`
                  : ""
              }

              <!-- Reply Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-top:8px;">
                    <a href="mailto:${escapeHtml(data.email)}?subject=Re: Quote Request – ${escapeHtml(data.service)}&body=Hi ${escapeHtml(data.firstName)},%0D%0A%0D%0AThank you for your interest in our ${escapeHtml(data.service)} service.%0D%0A%0D%0A"
                      style="display:inline-block;padding:14px 32px;background-color:#0A0A0A;color:#FFFFFF;font-size:14px;font-weight:600;text-decoration:none;border-radius:8px;">
                      Reply to ${escapeHtml(data.firstName)}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#F9FAFB;padding:24px 36px;border-top:1px solid #F0F0F0;border-radius:0 0 8px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#0A0A0A;">AP Enterprises LLC</p>
                    <p style="margin:0 0 2px;font-size:12px;color:#9CA3AF;">South Florida's Premium Cleaning Service</p>
                    <p style="margin:0;font-size:12px;color:#9CA3AF;">(561) 385-1564 &nbsp;&middot;&nbsp; apentllc.com</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body as Partial<QuoteBody>;

  // Server-side validation
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

  try {
    const { error } = await resend.emails.send({
      from: "AP Enterprises <quotes@apentllc.com>",
      to: "apenterprisesllc.web@gmail.com",
      replyTo: data.email,
      subject: `New Quote Request – ${data.service} | ${data.firstName} ${data.lastName}`,
      html: buildEmailHtml(data),
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ error: "Failed to send email" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
