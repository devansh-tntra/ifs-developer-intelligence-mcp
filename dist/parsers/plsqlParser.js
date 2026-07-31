export function parsePlsqlPackage(content, filename) {
    const pkgMatch = content.match(/PACKAGE\s+(BODY\s+)?([A-Za-z0-9_]+_API)/i);
    const name = pkgMatch ? pkgMatch[2] : filename.replace(/\.(api|apy|plsql)$/, '');
    const type = filename.endsWith('.api') ? 'api' : 'apy';
    const procedures = [];
    const procRegex = /PROCEDURE\s+([A-Za-z0-9_]+)\s*(\(([^)]*)\))?/gi;
    let m;
    while ((m = procRegex.exec(content)) !== null) {
        const procName = m[1];
        const rawParams = m[3] || '';
        const params = rawParams.split(',').filter(Boolean).map(p => {
            const parts = p.trim().split(/\s+/);
            return {
                name: parts[0] || 'param',
                mode: p.toUpperCase().includes('IN OUT') ? 'IN OUT' : p.toUpperCase().includes('OUT') ? 'OUT' : 'IN',
                type: parts[parts.length - 1] || 'VARCHAR2'
            };
        });
        procedures.push({ name: procName, params });
    }
    const functions = [];
    const funcRegex = /FUNCTION\s+([A-Za-z0-9_]+)\s*(\(([^)]*)\))?\s*RETURN\s+([A-Za-z0-9_%]+)/gi;
    while ((m = funcRegex.exec(content)) !== null) {
        const funcName = m[1];
        const rawParams = m[3] || '';
        const returnType = m[4];
        const params = rawParams.split(',').filter(Boolean).map(p => {
            const parts = p.trim().split(/\s+/);
            return {
                name: parts[0] || 'param',
                mode: p.toUpperCase().includes('IN OUT') ? 'IN OUT' : p.toUpperCase().includes('OUT') ? 'OUT' : 'IN',
                type: parts[parts.length - 1] || 'VARCHAR2'
            };
        });
        functions.push({ name: funcName, params, returnType });
    }
    return {
        name,
        component: 'UNKNOWN',
        type,
        procedures,
        functions
    };
}
export function extractErrorSysMessages(content) {
    const errors = [];
    const errRegex = /Error_SYS\.Record_General\s*\(\s*[^,]+,\s*'([^:]+):\s*([^']+)'/gi;
    let m;
    while ((m = errRegex.exec(content)) !== null) {
        errors.push({ key: m[1], text: m[2] });
    }
    return errors;
}
//# sourceMappingURL=plsqlParser.js.map