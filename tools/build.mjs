#!/usr/bin/env node
/**
 * Static site generator for eternlearning.com.
 *
 * Reads the content modules, renders every page to plain HTML and writes the
 * files next to this folder. Node's standard library only — no dependencies,
 * no lockfile, nothing to install.
 *
 *   node tools/build.mjs
 *
 * The generated .html files are committed, so the site is servable straight
 * from the repository without ever running this script.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { renderPage, SITE_URL } from "./layout.mjs";
import { JOURNAL_POSTS, PROGRAMS } from "./content-etern.mjs";
import { ACTIVITIES } from "./content-activities.mjs";

import { homePage } from "./pages/home.mjs";
import {
  aboutPage,
  howItWorksPage,
  notFoundPage,
  parentsPage,
  privacyPage,
  termsPage,
  videosPage,
} from "./pages/marketing.mjs";
import {
  activitiesIndexPage,
  activityDetailPage,
  journalDetailPage,
  journalIndexPage,
  programDetailPage,
  programsIndexPage,
} from "./pages/catalog.mjs";
import { bookDemoPage } from "./pages/book-demo.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const pages = [
  homePage(),
  aboutPage(),
  programsIndexPage(),
  ...PROGRAMS.map(programDetailPage),
  howItWorksPage(),
  activitiesIndexPage(),
  ...ACTIVITIES.map(activityDetailPage),
  parentsPage(),
  journalIndexPage(),
  ...JOURNAL_POSTS.map(journalDetailPage),
  videosPage(),
  bookDemoPage(),
  privacyPage(),
  termsPage(),
  notFoundPage(),
];

function sitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .filter((page) => page.canonical !== "/404")
    .map(
      (page) => `  <url>
    <loc>${SITE_URL}${page.canonical}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page.canonical === "/" ? "1.0" : "0.7"}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

async function write(relative, contents) {
  const target = join(ROOT, relative);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, contents, "utf8");
}

const written = [];
for (const page of pages) {
  await write(page.file, renderPage(page));
  written.push(page.file);
}
await write("sitemap.xml", sitemap());

console.log(`Built ${written.length} pages + sitemap.xml`);
for (const file of written) console.log(`  ${file}`);
