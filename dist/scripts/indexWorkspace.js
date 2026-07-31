import { indexWorkspaceDirectory } from '../indexer/workspaceIndexer.js';
import { config } from '../config/environment.js';
async function main() {
    console.log(`Indexing local IFS workspace directory: ${config.workspacePath}`);
    const count = await indexWorkspaceDirectory(config.workspacePath);
    console.log(`Successfully indexed ${count} IFS workspace assets.`);
}
main();
//# sourceMappingURL=indexWorkspace.js.map