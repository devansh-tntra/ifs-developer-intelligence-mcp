import { startStdioServer, startSseServer } from './server.js';
import { config } from './config/environment.js';
const args = process.argv.slice(2);
const isSse = args.includes('--transport') && args[args.indexOf('--transport') + 1] === 'sse' || config.transport === 'sse';
if (isSse) {
    startSseServer().catch((err) => {
        console.error('Failed to start SSE Server:', err);
        process.exit(1);
    });
}
else {
    startStdioServer().catch((err) => {
        console.error('Failed to start STDIO Server:', err);
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map