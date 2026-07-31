import { crawlIfsDocPage } from '../crawler/docCrawler.js';
import { config } from '../config/environment.js';
async function main() {
    console.log(`Starting crawl of IFS Technical Documentation at: ${config.docsUrl}`);
    const samplePages = [
        `${config.docsUrl}26r1/marble_overview.htm`,
        `${config.docsUrl}26r1/plsql_standards.htm`,
        `${config.docsUrl}26r1/security_overview.htm`
    ];
    for (const page of samplePages) {
        console.log(`Crawling: ${page}`);
        await crawlIfsDocPage(page, config.docsVersion);
    }
    console.log('Crawl finished successfully.');
}
main();
//# sourceMappingURL=crawlDocs.js.map