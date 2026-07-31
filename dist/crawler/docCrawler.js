import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import { db } from '../storage/db.js';
const turndown = new TurndownService();
export async function crawlIfsDocPage(url, version = '26R1') {
    try {
        const response = await fetch(url);
        if (!response.ok)
            return null;
        const html = await response.text();
        const $ = cheerio.load(html);
        const title = $('h1').first().text().trim() || $('title').text().trim() || 'IFS Cloud Technical Documentation';
        const mainContentHtml = $('main').html() || $('article').html() || $('body').html() || '';
        const markdown = turndown.turndown(mainContentHtml);
        const codeBlocks = [];
        $('pre code').each((_, el) => {
            codeBlocks.push($(el).text().trim());
        });
        const chunk = {
            id: url.replace(/[^a-zA-Z0-9]/g, '_'),
            title,
            url,
            category: 'Technical Documentation',
            version,
            content: markdown,
            codeBlocks
        };
        db.addDocChunk(chunk);
        return chunk;
    }
    catch (error) {
        console.error(`Failed to crawl IFS doc page at ${url}:`, error);
        return null;
    }
}
//# sourceMappingURL=docCrawler.js.map