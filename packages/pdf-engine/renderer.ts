/**
 * THE BOUTIQUE STANDARD
 * PDF Engine — Main Renderer
 *
 * Generates the ~40-page luxury PDF client deliverable.
 * Consumes ReportCase JSON, assembles HTML sections,
 * renders via Puppeteer to A4.
 *
 * Usage:
 *   npm run generate --workspace=packages/pdf-engine
 *   npm run generate:mdr
 */

import puppeteer from "puppeteer";
import { ReportCase } from "@tbs/schema";
import { buildFullDocument } from "./layout";
import * as fs from "fs";
import * as path from "path";

export async function generatePDF(report: ReportCase): Promise<string> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Set A4 viewport
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

  const html = buildFullDocument(report);

  await page.setContent(html, {
    waitUntil: "networkidle0",
    timeout: 30000,
  });

  // Wait for fonts to load
  await page.evaluateHandle("document.fonts.ready");

  const outputPath = path.join(
    process.cwd(),
    "../../outputs/pdf",
    `${report.slug}-${report.auditMetadata.reportVersion}.pdf`
  );

  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    margin: {
      top: "18mm",
      right: "20mm",
      bottom: "22mm",
      left: "18mm",
    },
  });

  await browser.close();

  console.log(`✓ PDF generated: ${outputPath}`);
  return outputPath;
}

// CLI entry point
if (require.main === module) {
  const args = process.argv.slice(2);
  const reportArg = args.find((a) => a.startsWith("--report="));
  const reportSlug = reportArg ? reportArg.split("=")[1] : "maison-du-rivage";

  const dataPath = path.join(
    process.cwd(),
    "../../data/reports",
    `${reportSlug}.json`
  );

  if (!fs.existsSync(dataPath)) {
    console.error(`Report data not found: ${dataPath}`);
    process.exit(1);
  }

  const report: ReportCase = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  generatePDF(report).catch((err) => {
    console.error("PDF generation failed:", err);
    process.exit(1);
  });
}
