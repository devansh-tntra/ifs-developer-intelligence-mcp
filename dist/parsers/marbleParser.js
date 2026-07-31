export function parseMarbleEntity(content, filename) {
    const entityMatch = content.match(/entity\s+([A-Za-z0-9_]+)/);
    const name = entityMatch ? entityMatch[1] : filename.replace('.entity', '');
    const fromMatch = content.match(/from\s*=\s*"([^"]+)"/);
    const tableName = fromMatch ? fromMatch[1] : `${name.toUpperCase()}_TAB`;
    const attributes = [];
    const attrRegex = /attribute\s+([A-Za-z0-9_]+)\s+([A-Za-z0-9_]+)\s*\{([^}]*)\}/g;
    let m;
    while ((m = attrRegex.exec(content)) !== null) {
        const attrName = m[1];
        const attrType = m[2];
        const body = m[3];
        attributes.push({
            name: attrName,
            type: attrType,
            isKey: body.includes('key') || body.includes('editable = [ETag = null]'),
            label: body.match(/label\s*=\s*"([^"]+)"/)?.[1]
        });
    }
    const associations = [];
    const assocRegex = /association\s+([A-Za-z0-9_]+)\s+for\s+([A-Za-z0-9_]+)/g;
    while ((m = assocRegex.exec(content)) !== null) {
        associations.push({
            name: m[1],
            targetEntity: m[2],
            cardinality: '1..*',
            keys: []
        });
    }
    return {
        name,
        component: 'UNKNOWN',
        tableName,
        attributes,
        associations
    };
}
export function parseMarbleProjection(content, filename) {
    const projMatch = content.match(/projection\s+([A-Za-z0-9_]+)/);
    const name = projMatch ? projMatch[1] : filename.replace('.projection', '');
    const compMatch = content.match(/component\s+([A-Za-z0-9_]+)/);
    const component = compMatch ? compMatch[1] : 'CORE';
    const entities = [];
    const entRegex = /entityset\s+([A-Za-z0-9_]+)\s+for\s+([A-Za-z0-9_]+)/g;
    let m;
    while ((m = entRegex.exec(content)) !== null) {
        entities.push(m[2]);
    }
    const actions = [];
    const actRegex = /action\s+([A-Za-z0-9_]+)/g;
    while ((m = actRegex.exec(content)) !== null) {
        actions.push(m[1]);
    }
    const functions = [];
    const funcRegex = /function\s+([A-Za-z0-9_]+)/g;
    while ((m = funcRegex.exec(content)) !== null) {
        functions.push(m[1]);
    }
    return {
        name,
        component,
        category: 'Integration/UX',
        entities,
        queries: entities.map(e => `${e}Set`),
        actions,
        functions
    };
}
export function parseMarbleClient(content, filename) {
    const clientMatch = content.match(/client\s+([A-Za-z0-9_]+)/);
    const name = clientMatch ? clientMatch[1] : filename.replace('.client', '');
    const pages = [];
    const pageRegex = /page\s+([A-Za-z0-9_]+)/g;
    let m;
    while ((m = pageRegex.exec(content)) !== null) {
        pages.push(m[1]);
    }
    const lists = [];
    const listRegex = /list\s+([A-Za-z0-9_]+)/g;
    while ((m = listRegex.exec(content)) !== null) {
        lists.push(m[1]);
    }
    const commands = [];
    const cmdRegex = /command\s+([A-Za-z0-9_]+)/g;
    while ((m = cmdRegex.exec(content)) !== null) {
        commands.push(m[1]);
    }
    return {
        name,
        component: 'CORE',
        pages,
        lists,
        selectors: [],
        dialogs: [],
        commands
    };
}
//# sourceMappingURL=marbleParser.js.map