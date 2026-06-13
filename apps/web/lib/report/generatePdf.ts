import puppeteer from "puppeteer-core"
import chromium from "@sparticuz/chromium-min"

export async function generateReportPdf(
  reportUrl: string,
  token: string
): Promise<Buffer> {

  const isLocal = process.env.NODE_ENV === "development"

  const browser = await puppeteer.launch({
    args: isLocal
      ? []
      : chromium.args,
    defaultViewport: { width: 1200, height: 900 },
    executablePath: isLocal
      ? undefined
      : await chromium.executablePath(
          "https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar"
        ),
    headless: true,
  })

  const page = await browser.newPage()

  // Set the auth cookie so the report loads
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
    || "https://boutiquestandard.com"
  const domain = new URL(baseUrl).hostname

  await page.setCookie({
    name: `tbs_report_${token}`,
    value: "authenticated",
    domain,
    path: "/",
    httpOnly: true,
  })

  // Load the report page
  await page.goto(`${baseUrl}/client/${token}/report`, {
    waitUntil: "networkidle0",
    timeout: 60000,
  })

  // Wait for content to render
  await page.waitForSelector("[data-report-loaded]",
    { timeout: 30000 }
  ).catch(() => {})

  await new Promise(r => setTimeout(r, 3000))

  // Generate PDF with proper pagination
  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
    },
    displayHeaderFooter: false,
  })

  await browser.close()
  return Buffer.from(pdf)
}
