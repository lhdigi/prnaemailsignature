"use client";

import { useMemo, useRef, useState } from "react";

const ASSETS = {
  logo: "https://www.prna.com.au/hosted/org/333/imgs/104076.png",
  christmasLogo: "https://www.prna.com.au/hosted/org/333/imgs/104111.png",
  christmasLights: "https://www.prna.com.au/hosted/org/333/imgs/104097.png",
  christmasBanner: "https://www.prna.com.au/hosted/org/333/imgs/104099.jpg",
  sponsorBanner: "https://www.prna.com.au/hosted/org/333/imgs/104112.jpg",
  address: "https://www.prna.com.au/hosted/org/333/imgs/104086.png",
  phone: "https://www.prna.com.au/hosted/org/333/imgs/104083.png",
  email: "https://www.prna.com.au/hosted/org/333/imgs/104084.png",
  website: "https://www.prna.com.au/hosted/org/333/imgs/104085.png",
  values: [
    "https://www.prna.com.au/hosted/org/333/imgs/104077.png",
    "https://www.prna.com.au/hosted/org/333/imgs/104080.png",
    "https://www.prna.com.au/hosted/org/333/imgs/104078.png",
    "https://www.prna.com.au/hosted/org/333/imgs/104079.png",
  ],
  flags: "https://www.prna.com.au/hosted/org/333/imgs/104081.png",
  social: [
    {
      name: "Facebook",
      icon: "https://www.prna.com.au/hosted/org/333/imgs/104095.jpg",
      url: "https://www.facebook.com/prna.netball",
    },
    {
      name: "Instagram",
      icon: "https://www.prna.com.au/hosted/org/333/imgs/104094.jpg",
      url: "https://www.instagram.com/pineriversnetballassoc",
    },
    {
      name: "TikTok",
      icon: "https://www.prna.com.au/hosted/org/333/imgs/104093.jpg",
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

type SignatureTemplate = "standard" | "christmas" | "test";

function signatureMarkup(details: Details, template: SignatureTemplate) {
  const d = Object.fromEntries(
    Object.entries(details).map(([key, value]) => [key, escapeHtml(value.trim())]),
  ) as Details;
  const phoneHref = details.phone.replace(/[^\d+]/g, "");

  const contactRows = `<table cellpadding="0" cellspacing="0" border="0" role="presentation">
    <tr><td style="padding-bottom:5px;"><table cellpadding="0" cellspacing="0" border="0" role="presentation"><tr><td width="26" style="vertical-align:middle;"><img src="${ASSETS.address}" width="18" height="18" alt="" style="display:block;border:0;"></td><td style="vertical-align:middle;"><span style="color:#333333;font-size:13px;">${d.address || "Address"}</span></td></tr></table></td></tr>
    <tr><td style="padding-bottom:5px;"><table cellpadding="0" cellspacing="0" border="0" role="presentation"><tr><td width="26" style="vertical-align:middle;"><img src="${ASSETS.phone}" width="18" height="18" alt="" style="display:block;border:0;"></td><td style="vertical-align:middle;"><a href="tel:${phoneHref}" style="color:#333333;text-decoration:none;font-size:13px;">${d.phone || "Phone number"}</a></td></tr></table></td></tr>
    <tr><td style="padding-bottom:5px;"><table cellpadding="0" cellspacing="0" border="0" role="presentation"><tr><td width="26" style="vertical-align:middle;"><img src="${ASSETS.email}" width="18" height="18" alt="" style="display:block;border:0;"></td><td style="vertical-align:middle;"><a href="mailto:${d.email}" style="color:#333333;text-decoration:none;font-size:13px;">${d.email || "Email address"}</a></td></tr></table></td></tr>
    <tr><td style="padding-bottom:5px;"><table cellpadding="0" cellspacing="0" border="0" role="presentation"><tr><td width="26" style="vertical-align:middle;"><img src="${ASSETS.website}" width="18" height="18" alt="" style="display:block;border:0;"></td><td style="vertical-align:middle;"><a href="https://www.prna.com.au" style="color:#333333;text-decoration:none;font-size:13px;">www.prna.com.au</a></td></tr></table></td></tr>
  </table>`;

  const socialIcons = `<table cellpadding="0" cellspacing="0" border="0" role="presentation"><tr>
    ${ASSETS.social.map((item, index) => `<td style="${index < ASSETS.social.length - 1 ? "padding-right:8px;" : ""}"><a href="${item.url}" target="_blank" style="text-decoration:none;"><img src="${item.icon}" width="28" height="28" alt="${item.name}" style="display:block;border:0;"></a></td>`).join("")}
  </tr></table>`;

  const currentTop = `<tr><td style="padding-bottom:14px;">
    <p style="margin:0 0 2px 0;font-size:22px;line-height:26px;font-weight:bold;color:#32a34e;">${d.name || "Full name"}</p>
    <p style="margin:0 0 6px 0;font-size:12px;line-height:16px;font-weight:bold;color:#333333;letter-spacing:2px;text-transform:uppercase;">${d.title || "Job title"}</p>
    ${template === "christmas"
      ? `<img src="${ASSETS.christmasLights}" width="260" height="33" alt="Christmas lights" style="display:block;border:0;">`
      : `<table cellpadding="0" cellspacing="0" border="0" role="presentation"><tr><td style="background-color:#f9c126;height:2px;width:260px;font-size:0;line-height:0;">&nbsp;</td></tr></table>`}
  </td></tr>
  <tr><td style="padding-bottom:8px;">
    <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="420" style="width:420px;max-width:100%;"><tr>
      <td width="290" style="vertical-align:top;">${contactRows}</td>
      <td width="130" style="vertical-align:top;text-align:center;"><img src="${template === "christmas" ? ASSETS.christmasLogo : ASSETS.logo}" width="${template === "christmas" ? "120" : "100"}" height="${template === "christmas" ? "120" : "100"}" alt="${template === "christmas" ? "PRNA Christmas Logo" : "PRNA Logo"}" style="display:block;border:0;${template === "christmas" ? "margin:-20px auto 0;" : "margin:0 auto;"}"></td>
    </tr></table>
  </td></tr>
  <tr><td style="padding-bottom:8px;"><table cellpadding="0" cellspacing="0" border="0" role="presentation"><tr>
    ${ASSETS.values.map((src, index) => `<td style="${index < 3 ? "padding-right:8px;" : ""}"><img src="${src}" width="58" height="58" alt="PRNA core value" style="display:block;border:0;"></td>`).join("")}
  </tr></table></td></tr>
  <tr><td style="padding:0 0 12px 4px;">${socialIcons}</td></tr>`;

  const testTop = `<tr><td style="padding-bottom:14px;">
    <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="470" style="width:470px;max-width:100%;"><tr>
      <td width="145" style="vertical-align:top;padding-right:15px;">
        <img src="${ASSETS.logo}" width="110" height="110" alt="PRNA Logo" style="display:block;border:0;margin:0 0 8px 4px;">
        <table cellpadding="0" cellspacing="0" border="0" role="presentation">
          <tr>
            <td style="padding:0 6px 6px 0;"><img src="${ASSETS.values[3]}" width="56" height="56" alt="Resilience" style="display:block;border:0;"></td>
            <td style="padding:0 0 6px 0;"><img src="${ASSETS.values[1]}" width="56" height="56" alt="Respect" style="display:block;border:0;"></td>
          </tr>
          <tr>
            <td style="padding-right:6px;"><img src="${ASSETS.values[2]}" width="56" height="56" alt="Inclusion" style="display:block;border:0;"></td>
            <td><img src="${ASSETS.values[0]}" width="56" height="56" alt="Commitment" style="display:block;border:0;"></td>
          </tr>
        </table>
      </td>
      <td width="310" style="vertical-align:top;">
        <p style="margin:14px 0 2px 0;font-size:22px;line-height:26px;font-weight:bold;color:#32a34e;">${d.name || "Full name"}</p>
        <p style="margin:0 0 9px 0;font-size:11px;line-height:15px;font-weight:bold;color:#333333;letter-spacing:2.5px;text-transform:uppercase;">${d.title || "Job title"}</p>
        <table cellpadding="0" cellspacing="0" border="0" role="presentation"><tr><td style="background-color:#f9c126;height:3px;width:270px;font-size:0;line-height:0;">&nbsp;</td></tr></table>
        <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="margin-top:20px;"><tr><td>${contactRows}</td></tr></table>
        <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="margin:8px 0 0 26px;"><tr>
          ${ASSETS.social.map((item, index) => `<td style="${index < ASSETS.social.length - 1 ? "padding-right:6px;" : ""}"><a href="${item.url}" target="_blank" style="text-decoration:none;"><img src="${item.icon}" width="20" height="20" alt="${item.name}" style="display:block;border:0;"></a></td>`).join("")}
        </tr></table>
      </td>
    </tr></table>
  </td></tr>`;

  return `<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="font-family:Arial,sans-serif;font-size:14px;color:#333333;width:480px;max-width:100%;">
  ${template === "test" ? testTop : currentTop}
  ${template === "christmas" ? `<tr><td style="padding-bottom:12px;"><img src="${ASSETS.christmasBanner}" width="400" height="50" alt="Merry Christmas and Happy Holidays" style="display:block;border:0;max-width:100%;"></td></tr>` : ""}
  <tr><td width="440" style="border-top:1px solid #dddddd;font-size:0;line-height:0;height:14px;">&nbsp;</td></tr>
  <tr><td align="left" style="padding:0 0 14px 0;text-align:left;"><img src="${ASSETS.sponsorBanner}" width="320" height="71" alt="Proudly sponsored by Village Motors" style="display:block;border:0;max-width:100%;"></td></tr>
  <tr><td width="440" style="border-top:1px solid #dddddd;font-size:0;line-height:0;height:14px;">&nbsp;</td></tr>
  <tr><td><table cellpadding="0" cellspacing="0" border="0" role="presentation"><tr>
    <td style="vertical-align:middle;padding-right:10px;"><img src="${ASSETS.flags}" width="90" height="35" alt="Aboriginal and Torres Strait Islander flags" style="display:block;border:0;"></td>
    <td style="vertical-align:middle;"><p style="margin:0;font-size:11px;line-height:1.4;color:#555555;max-width:300px;">We acknowledge the Traditional Custodians of the land on which we live, work and play. We pay our respects to Elders, past, present and emerging.</p></td>
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
    web: ["Copy your signature above.", "In Outlook, open Settings → Account → Signatures.", "Create a new signature, paste, then save."],
    desktop: ["Copy your signature above.", "Open Outlook Settings → Signatures.", "Add a new signature, paste it in, then save."],
    mobile: ["Copy your signature above.", "In the Outlook app, open Settings → Signature.", "Remove the existing text, paste, then save."],
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
              <button type="button" className={template === "test" ? "active" : ""} aria-pressed={template === "test"} onClick={() => { setTemplate("test"); setStatus("Ready to copy"); }}>
                <span className="style-swatch test-swatch">T</span>
                <span><b>Test layout</b><small>Two-column signature concept</small></span>
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
          <p>Choose where you use Outlook and follow three quick steps.</p>
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
          <p className="tip">Tip: Send yourself a test email to check the result on desktop and mobile.</p>
        </div>
      </section>

      <footer>
        <a href="https://www.lukehockeydigital.com.au/" target="_blank" rel="noreferrer">Built by lhdigi</a>
      </footer>
    </main>
  );
}
