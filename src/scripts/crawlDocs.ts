import { crawlIfsDocPage } from '../crawler/docCrawler.js';
import { config } from '../config/environment.js';

async function main() {
  console.log(`[IFS-CRAWLER] Starting comprehensive crawl across TechDocs, IFS Academy, and IFS Community...`);

  // 1. TechDocs Releases Crawl
  const releases = [
    { code: '23r2', label: '23R2' },
    { code: '24r1', label: '24R1' },
    { code: '24r2', label: '24R2' },
    { code: '25r1', label: '25R1' },
    { code: '25r2', label: '25R2' },
    { code: '26r1', label: '26R1' }
  ];

  const techTopics = [
    'marble_overview.htm',
    'marble_dsl_overview.htm',
    'plsql_standards.htm',
    'plsql_lu_framework.htm',
    'security_overview.htm',
    'security_grants.htm',
    'odata_rest_integration.htm',
    'reporting_framework.htm',
    'developer_studio.htm',
    'upgrade_guide.htm'
  ];

  let crawledCount = 0;

  for (const rel of releases) {
    for (const topic of techTopics) {
      const pageUrl = `${config.docsUrl}${rel.code}/${topic}`;
      console.log(`[IFS-CRAWLER] Crawling TechDocs (${rel.label}): ${pageUrl}`);
      const chunk = await crawlIfsDocPage(pageUrl, rel.label);
      if (chunk) crawledCount++;
    }
  }

  // 2. IFS Academy Resource Portal Crawl
  const academyPages = [
    `${config.academyUrl}developer_training`,
    `${config.academyUrl}marble_dsl_masterclass`,
    `${config.academyUrl}plsql_customizations_guide`
  ];

  for (const page of academyPages) {
    console.log(`[IFS-CRAWLER] Crawling IFS Academy: ${page}`);
    const chunk = await crawlIfsDocPage(page, 'ALL');
    if (chunk) crawledCount++;
  }

  // 3. IFS Community Knowledge Crawl
  const communityPages = [
    `${config.communityUrl}developer-discussions`,
    `${config.communityUrl}customization-q-a`,
    `${config.communityUrl}ora-errors-troubleshooting`
  ];

  for (const page of communityPages) {
    console.log(`[IFS-CRAWLER] Crawling IFS Community: ${page}`);
    const chunk = await crawlIfsDocPage(page, 'ALL');
    if (chunk) crawledCount++;
  }

  console.log(`[IFS-CRAWLER] Successfully crawled and indexed ${crawledCount} pages across IFS TechDocs, IFS Academy, and IFS Community!`);
}

main();
