import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { db } from '../storage/db.js';
import { WorkspaceAsset } from '../types/ifs.js';

export async function indexWorkspaceDirectory(targetDir: string): Promise<number> {
  let dirToScan = targetDir;
  if (!fs.existsSync(dirToScan)) {
    console.log(`[IFS-MCP] Workspace path '${targetDir}' not found on cloud instance. Falling back to project root: ${process.cwd()}`);
    dirToScan = process.cwd();
  }

  const pattern = '**/*.{entity,projection,client,page,fragment,model,plsql,views,storage,api,apy,sql,ddl,dml,xml,json,yaml,rdl,rdf,config,md}';

  try {
    const files = await glob(pattern, { cwd: dirToScan, nodir: true, ignore: ['**/node_modules/**', '**/dist/**', '**/.git/**'] });
    let indexedCount = 0;

    for (const relPath of files) {
      const fullPath = path.join(dirToScan, relPath);
      const ext = path.extname(fullPath).toLowerCase().replace('.', '');
      const filename = path.basename(fullPath);

      let assetType: WorkspaceAsset['assetType'] = 'other';
      if (['entity', 'model'].includes(ext)) assetType = 'entity';
      else if (ext === 'projection') assetType = 'projection';
      else if (['client', 'page', 'fragment'].includes(ext)) assetType = 'client';
      else if (['api', 'apy', 'plsql'].includes(ext)) assetType = 'plsql';
      else if (ext === 'views') assetType = 'views';
      else if (ext === 'storage') assetType = 'storage';
      else if (ext === 'xml') assetType = 'xml';
      else if (['rdl', 'rdf'].includes(ext)) assetType = 'rdl';

      const stat = fs.statSync(fullPath);
      if (stat.size > 5 * 1024 * 1024) continue; // Skip files > 5MB

      const content = fs.readFileSync(fullPath, 'utf-8');

      const asset: WorkspaceAsset = {
        path: fullPath,
        filename,
        extension: ext,
        assetType,
        content,
        lastModified: stat.mtimeMs
      };

      db.addWorkspaceAsset(asset);
      indexedCount++;
    }

    return indexedCount;
  } catch (err) {
    console.error(`Error indexing workspace directory ${dirToScan}:`, err);
    return 0;
  }
}
