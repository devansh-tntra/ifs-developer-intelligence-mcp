import { crawlIfsDocPage } from '../crawler/docCrawler.js';
import { config } from '../config/environment.js';
async function main() {
    console.log(`[IFS-CRAWLER] Starting comprehensive multi-version crawl across IFS TechDocs...`);
    const releases = [
        { code: '23r2', label: '23R2' },
        { code: '24r1', label: '24R1' },
        { code: '24r2', label: '24R2' },
        { code: '25r1', label: '25R1' },
        { code: '25r2', label: '25R2' },
        { code: '26r1', label: '26R1' }
    ];
    const topics = [
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
        for (const topic of topics) {
            const pageUrl = `${config.docsUrl}${rel.code}/${topic}`;
            console.log(`[IFS-CRAWLER] Crawling (${rel.label}): ${pageUrl}`);
            const chunk = await crawlIfsDocPage(pageUrl, rel.label);
            if (chunk) {
                crawledCount++;
            }
        }
    }
    console.log(`[IFS-CRAWLER] Successfully crawled and indexed ${crawledCount} technical documentation pages across IFS Cloud 23R2, 24R1, 24R2, 25R1, 25R2, 26R1.`);
}
main();
//# sourceMappingURL=crawlDocs.js.map