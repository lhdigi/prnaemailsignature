"use client";

import { useMemo, useRef, useState } from "react";

const ASSETS = {
  logo: "https://www.prna.com.au/hosted/org/333/imgs/104332.png",
  christmasLogo: "https://www.prna.com.au/hosted/org/333/imgs/104335.png",
  christmasLights: "https://www.prna.com.au/hosted/org/333/imgs/104320.png",
  christmasBanner: "https://www.prna.com.au/hosted/org/333/imgs/104099.jpg",
  sponsorBanner: "https://www.prna.com.au/hosted/org/333/imgs/104331.png",
  address: "https://www.prna.com.au/hosted/org/333/imgs/104319.png",
  phone: "https://www.prna.com.au/hosted/org/333/imgs/104327.png",
  email: "https://www.prna.com.au/hosted/org/333/imgs/104321.png",
  website: "https://www.prna.com.au/hosted/org/333/imgs/104334.png",
  values: [
    "https://www.prna.com.au/hosted/org/333/imgs/104322.png",
    "https://www.prna.com.au/hosted/org/333/imgs/104326.png",
    "https://www.prna.com.au/hosted/org/333/imgs/104325.png",
    "https://www.prna.com.au/hosted/org/333/imgs/104333.png",
  ],
  flags: "https://www.prna.com.au/hosted/org/333/imgs/104323.png",
  social: [
    {
      name: "Facebook",
      icon: "https://www.prna.com.au/hosted/org/333/imgs/104328.png",
      url: "https://www.facebook.com/prna.netball",
    },
    {
      name: "Instagram",
      icon: "https://www.prna.com.au/hosted/org/333/imgs/104329.png",
      url: "https://www.instagram.com/pineriversnetballassoc",
    },
    {
      name: "TikTok",
      icon: "https://www.prna.com.au/hosted/org/333/imgs/104330.png",
      url: "https://www.tiktok.com/@pineriversofficial1",
    },
  ],
};

type Details = {
  name: string;
  title: string;
  email: string;
  phone: string;
  address: string;
};

const initialDetails: Details = {
  name: "Alex Morgan",
  title: "Community Programs Coordinator",
  email: "alex.morgan@prna.com.au",
  phone: "07 3881 1107",
  address: "PO Box 332 Strathpine, Qld, 4500",
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

type SignatureTemplate = "standard" | "christmas";

function signatureMarkup(details: Details, template: SignatureTemplate) {
  const d = Object.fromEntries(
    Object.entries(details).map(([key, value]) => [key, escapeHtml(value.trim())]),
  ) as Details;
  const phoneHref = details.phone.replace(/[^\d+]/g, "");

  const signatureTop = `<tr><td style="padding-bottom:14px;">
    <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="440" style="width:440px;border-collapse:collapse;table-layout:fixed;"><tr>
      <td width="138" style="width:138px;vertical-align:top;padding:0 18px 0 0;">
        <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="120" style="width:120px;border-collapse:collapse;">
          <tr><td align="center" style="padding:0 0 10px 0;font-size:0;line-height:0;"><img src="${template === "christmas" ? ASSETS.christmasLogo : ASSETS.logo}" width="${template === "christmas" ? "120" : "100"}" height="${template === "christmas" ? "120" : "100"}" alt="${template === "christmas" ? "PRNA Christmas Logo" : "PRNA Logo"}" style="display:block;border:0;width:${template === "christmas" ? "120" : "100"}px;height:${template === "christmas" ? "120" : "100"}px;"></td></tr>
          <tr><td align="center" style="padding:0;font-size:0;line-height:0;"><table cellpadding="0" cellspacing="0" border="0" role="presentation" width="100" style="width:100px;border-collapse:collapse;table-layout:fixed;">
          <tr>
            <td width="52" height="52" style="width:52px;height:52px;padding:0 4px 4px 0;font-size:0;line-height:0;"><img src="${ASSETS.values[0]}" width="48" height="48" alt="PRNA commitment value" style="display:block;border:0;width:48px;height:48px;"></td>
            <td width="48" height="52" style="width:48px;height:52px;padding:0 0 4px 0;font-size:0;line-height:0;"><img src="${ASSETS.values[1]}" width="48" height="48" alt="PRNA respect value" style="display:block;border:0;width:48px;height:48px;"></td>
          </tr>
          <tr>
            <td width="52" height="48" style="width:52px;height:48px;padding:0 4px 0 0;font-size:0;line-height:0;"><img src="${ASSETS.values[2]}" width="48" height="48" alt="PRNA inclusion value" style="display:block;border:0;width:48px;height:48px;"></td>
            <td width="48" height="48" style="width:48px;height:48px;padding:0;font-size:0;line-height:0;"><img src="${ASSETS.values[3]}" width="48" height="48" alt="PRNA resilience value" style="display:block;border:0;width:48px;height:48px;"></td>
          </tr>
          </table></td></tr>
        </table>
      </td>
      <td width="302" style="width:302px;vertical-align:top;padding:0;">
        <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="302" style="width:302px;border-collapse:collapse;table-layout:fixed;font-family:Arial,sans-serif;">
          <tr><td width="302" style="width:302px;padding:0 0 2px 0;font-size:20px;line-height:24px;mso-line-height-rule:exactly;font-weight:bold;color:#32a34e;">${d.name || "Full name"}</td></tr>
          <tr><td width="302" style="width:302px;padding:0 0 6px 0;font-size:11px;line-height:15px;mso-line-height-rule:exactly;font-weight:bold;color:#333333;letter-spacing:2px;text-transform:uppercase;">${d.title || "Job title"}</td></tr>
          ${template === "christmas"
            ? `<tr><td width="302" style="width:302px;padding:0 0 5px 0;font-size:0;line-height:0;"><img src="${ASSETS.christmasLights}" width="260" height="33" alt="Christmas lights" style="display:block;border:0;width:260px;height:33px;"></td></tr>`
            : `<tr><td width="302" height="14" style="width:302px;height:14px;padding:0;border-top:2px solid #f9c126;font-size:0;line-height:0;"></td></tr>`}
          <tr height="27"><td width="302" height="27" style="width:302px;height:27px;padding:0;vertical-align:middle;font-size:13px;line-height:18px;mso-line-height-rule:exactly;color:#333333;"><img src="${ASSETS.address}" width="18" height="18" alt="" style="display:inline-block;border:0;width:18px;height:18px;vertical-align:middle;">&nbsp;&nbsp;${d.address || "Address"}</td></tr>
          <tr height="27"><td width="302" height="27" style="width:302px;height:27px;padding:0;vertical-align:middle;font-size:13px;line-height:18px;mso-line-height-rule:exactly;"><img src="${ASSETS.phone}" width="18" height="18" alt="" style="display:inline-block;border:0;width:18px;height:18px;vertical-align:middle;">&nbsp;&nbsp;<a href="tel:${phoneHref}" style="color:#333333;text-decoration:none;">${d.phone || "Phone number"}</a></td></tr>
          <tr height="27"><td width="302" height="27" style="width:302px;height:27px;padding:0;vertical-align:middle;font-size:13px;line-height:18px;mso-line-height-rule:exactly;"><img src="${ASSETS.email}" width="18" height="18" alt="" style="display:inline-block;border:0;width:18px;height:18px;vertical-align:middle;">&nbsp;&nbsp;<a href="mailto:${d.email}" style="color:#333333;text-decoration:none;">${d.email || "Email address"}</a></td></tr>
          <tr height="27"><td width="302" height="27" style="width:302px;height:27px;padding:0;vertical-align:middle;font-size:13px;line-height:18px;mso-line-height-rule:exactly;"><img src="${ASSETS.website}" width="18" height="18" alt="" style="display:inline-block;border:0;width:18px;height:18px;vertical-align:middle;">&nbsp;&nbsp;<a href="https://www.prna.com.au" style="color:#333333;text-decoration:none;">www.prna.com.au</a></td></tr>
          <tr><td width="302" style="width:302px;padding:7px 0 0 0;font-size:0;line-height:0;"><table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;"><tr>${ASSETS.social.map((item, index) => `<td width="${index < ASSETS.social.length - 1 ? "27" : "20"}" height="20" style="width:${index < ASSETS.social.length - 1 ? "27" : "20"}px;height:20px;padding:0 ${index < ASSETS.social.length - 1 ? "7px" : "0"} 0 0;font-size:0;line-height:0;"><a href="${item.url}" target="_blank" style="text-decoration:none;"><img src="${item.icon}" width="20" height="20" alt="${item.name}" style="display:block;border:0;width:20px;height:20px;"></a></td>`).join("")}</tr></table></td></tr>
        </table>
      </td>
    </tr></table>
  </td></tr>`;

  return `<table cellpadding="0" cellspacing="0" border="0" role="presentation" width="440" style="font-family:Arial,sans-serif;font-size:14px;color:#333333;width:440px;border-collapse:collapse;table-layout:fixed;">
  ${signatureTop}
  ${template === "christmas" ? `<tr><td style="padding-bottom:12px;"><img src="${ASSETS.christmasBanner}" width="400" height="50" alt="Merry Christmas and Happy Holidays" style="display:block;border:0;width:400px;height:50px;min-width:400px;max-width:400px;"></td></tr>` : ""}
  <tr><td width="440" height="14" style="width:440px;height:14px;padding:0;border-top:1px solid #dddddd;font-size:0;line-height:0;"></td></tr>
  <tr><td align="left" style="padding:0 0 14px 0;text-align:left;"><img src="${ASSETS.sponsorBanner}" width="280" height="63" alt="Proudly sponsored by Village Motors" style="display:block;border:0;width:280px;height:63px;min-width:280px;max-width:280px;"></td></tr>
  <tr><td width="440" height="14" style="width:440px;height:14px;padding:0;border-top:1px solid #dddddd;font-size:0;line-height:0;"></td></tr>
  <tr><td><table cellpadding="0" cellspacing="0" border="0" role="presentation"><tr>
    <td width="100" height="35" style="width:100px;height:35px;vertical-align:middle;padding:0 10px 0 0;font-size:0;line-height:0;"><img src="${ASSETS.flags}" width="90" height="35" alt="Aboriginal and Torres Strait Islander flags" style="display:block;border:0;width:90px;height:35px;"></td>
    <td width="340" style="width:340px;vertical-align:middle;padding:0;font-size:11px;line-height:15px;mso-line-height-rule:exactly;color:#555555;">We acknowledge the Traditional Custodians of the land on which we live, work and play. We pay our respects to Elders, past, present and emerging.</td>
  </tr></table></td></tr>
</table>`;
}

export default function Home() {
  const [details, setDetails] = useState(initialDetails);
  const [template, setTemplate] = useState<SignatureTemplate>("standard");
  const [status, setStatus] = useState("Ready to copy");
  const [guide, setGuide] = useState<"web" | "desktop" | "mobile">("web");
  const previewRef = useRef<HTMLDivElement>(null);
  const html = useMemo(() => signatureMarkup(details, template), [details, template]);

  function update(field: keyof Details, value: string) {
    setDetails((current) => ({ ...current, [field]: value }));
    setStatus("Ready to copy");
  }

  async function copySignature() {
    try {
      if (typeof ClipboardItem !== "undefined") {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": new Blob([html], { type: "text/html" }),
            "text/plain": new Blob(
              [`${details.name}\n${details.title}\n${details.phone}\n${details.email}\n${details.address}\nwww.prna.com.au`],
              { type: "text/plain" },
            ),
          }),
        ]);
      } else {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(previewRef.current!);
        selection?.removeAllRanges();
        selection?.addRange(range);
        document.execCommand("copy");
        selection?.removeAllRanges();
      }
      setStatus("Copied — paste it into Outlook");
    } catch {
      setStatus("Select the preview, then copy");
    }
  }

  function downloadHtml() {
    const documentHtml = `<!doctype html><html><body>${html}</body></html>`;
    const url = URL.createObjectURL(new Blob([documentHtml], { type: "text/html" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${details.name.trim().replace(/\s+/g, "-").toLowerCase() || "prna"}-email-signature.html`;
    link.click();
    URL.revokeObjectURL(url);
  }

  const guides = {
    web: ["Delete the old signature and create a completely blank new one.", "Return to this website and click Copy signature — never copy it from an email.", "In Outlook, open Settings → Account → Signatures, paste once, then save.", "Send yourself a test email and check the received message before using it."],
    desktop: ["Open Outlook Settings → Signatures and completely remove the old signature.", "Return to this website and click Copy signature — never copy it from an email.", "Create a blank signature in Outlook, paste once without editing or resizing, then save.", "Send yourself a test email and check the received message before using it."],
    mobile: ["Open Outlook Settings → Signature and remove every part of the existing signature.", "Return to this website and click Copy signature — never copy it from an email.", "Paste once into the empty signature box without editing or resizing, then save.", "Send yourself a test email and check the received message on another device."],
  };

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#" aria-label="PRNA Signature Builder home">
          <span className="brand-mark">P</span>
          <span>PRNA <strong>Signature Builder</strong></span>
        </a>
        <span className="private-note"><i /> Your details stay in this browser</span>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">Professional. Consistent. Ready in a minute.</p>
          <h1>Your PRNA signature,<br /><em>made simple.</em></h1>
          <p className="intro">Add your details, preview your official signature, then copy it straight into Outlook.</p>
        </div>
        <div className="step-row" aria-label="Three steps">
          <span><b>1</b> Add details</span><span className="line" /><span><b>2</b> Preview</span><span className="line" /><span><b>3</b> Copy & paste</span>
        </div>
      </section>

      <section className="workspace">
        <form className="editor" onSubmit={(event) => event.preventDefault()}>
          <div className="section-heading"><span>01</span><div><h2>Your details</h2><p>Everything updates as you type.</p></div></div>
          <fieldset className="template-picker">
            <legend>Signature style</legend>
            <div>
              <button type="button" className={template === "standard" ? "active" : ""} aria-pressed={template === "standard"} onClick={() => { setTemplate("standard"); setStatus("Ready to copy"); }}>
                <span className="style-swatch standard-swatch" />
                <span><b>Standard</b><small>Official PRNA signature</small></span>
              </button>
              <button type="button" className={template === "christmas" ? "active" : ""} aria-pressed={template === "christmas"} onClick={() => { setTemplate("christmas"); setStatus("Ready to copy"); }}>
                <span className="style-swatch christmas-swatch">✦</span>
                <span><b>Christmas</b><small>Festive seasonal signature</small></span>
              </button>
            </div>
          </fieldset>
          <label>Full name<input value={details.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Taylor Nguyen" autoComplete="name" /></label>
          <label>Job title<input value={details.title} onChange={(e) => update("title", e.target.value)} placeholder="e.g. Community Support Officer" autoComplete="organization-title" /></label>
          <label>Email address<input type="email" value={details.email} onChange={(e) => update("email", e.target.value)} placeholder="name@prna.com.au" autoComplete="email" /></label>
          <div className="field-pair">
            <label>Phone number<input type="tel" value={details.phone} onChange={(e) => update("phone", e.target.value)} placeholder="07 0000 0000" autoComplete="tel" /></label>
            <label>Address<input value={details.address} onChange={(e) => update("address", e.target.value)} placeholder="PO Box or street address" autoComplete="street-address" /></label>
          </div>
          <button className="reset" type="button" onClick={() => { setDetails(initialDetails); setStatus("Ready to copy"); }}>Reset example details</button>
        </form>

        <section className="preview-panel">
          <div className="section-heading"><span>02</span><div><h2>Signature preview</h2><p>This is what recipients will see.</p></div></div>
          <div className="email-window">
            <div className="email-chrome"><i /><i /><i /><small>NEW MESSAGE</small></div>
            <div className="email-body">
              <p>Kind regards,</p>
              <div ref={previewRef} className="signature-preview" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>
          <div className="actions">
            <button className="copy" type="button" onClick={copySignature}><span>⧉</span> Copy signature</button>
            <button className="download" type="button" onClick={downloadHtml}>Download HTML</button>
          </div>
          <p className="copy-status" aria-live="polite">{status}</p>
        </section>
      </section>

      <section className="guide">
        <div>
          <p className="eyebrow">Almost there</p>
          <h2>Paste it into Outlook</h2>
          <p>Choose where you use Outlook and follow these steps carefully.</p>
        </div>
        <div className="guide-card">
          <div className="tabs" role="tablist" aria-label="Outlook version">
            {(["web", "desktop", "mobile"] as const).map((item) => (
              <button key={item} type="button" role="tab" aria-selected={guide === item} onClick={() => setGuide(item)}>
                {item === "web" ? "Browser" : item === "desktop" ? "Desktop app" : "Phone"}
              </button>
            ))}
          </div>
          <ol>{guides[guide].map((step, index) => <li key={step}><b>{index + 1}</b><span>{step}</span></li>)}</ol>
          <p className="tip"><strong>Important:</strong> Always copy directly from this website. Never copy a signature from an old or received email, as Outlook may carry broken formatting with it.</p>
        </div>
      </section>

      <footer>
        <a href="https://www.lukehockeydigital.com.au/" target="_blank" rel="noreferrer">Built by lhdigi</a>
      </footer>
    </main>
  );
}
