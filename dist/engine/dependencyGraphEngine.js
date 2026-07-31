import { db } from '../storage/db.js';
export function analyzeObjectImpact(objectName) {
    const nameUpper = objectName.toUpperCase().replace(/\.(entity|projection|client|api|apy)$/, '');
    const assets = db.getAllWorkspaceAssets();
    const downstreamAffectedObjects = [];
    const directUpstreamDependencies = [];
    // Core IFS LU Naming Conventions
    const tableName = `${nameUpper}_TAB`;
    const viewName = `${nameUpper}`;
    const apiPackage = `${nameUpper}_API`;
    const projectionName = `${nameUpper}Handling`;
    // Model relationships
    directUpstreamDependencies.push({ name: tableName, type: 'Table' });
    directUpstreamDependencies.push({ name: 'FND_SESSION_API', type: 'Package' });
    downstreamAffectedObjects.push({ name: viewName, type: 'View' });
    downstreamAffectedObjects.push({ name: apiPackage, type: 'Package' });
    downstreamAffectedObjects.push({ name: projectionName, type: 'Projection' });
    downstreamAffectedObjects.push({ name: `/main/ifsadmin/projection/v1/${projectionName}.svc/`, type: 'ODataEndpoint' });
    downstreamAffectedObjects.push({ name: `GRANT EXECUTE ON ${projectionName} TO FND_ENDUSER`, type: 'SecurityGrant' });
    // Search workspace for files referencing this object
    const matchingAssets = assets.filter(a => a.content.toUpperCase().includes(nameUpper));
    for (const asset of matchingAssets) {
        let type = 'Package';
        if (asset.extension === 'entity')
            type = 'Entity';
        else if (asset.extension === 'projection')
            type = 'Projection';
        else if (asset.extension === 'client' || asset.extension === 'page')
            type = 'Entity';
        if (!downstreamAffectedObjects.some(d => d.name === asset.filename)) {
            downstreamAffectedObjects.push({ name: asset.filename, type });
        }
    }
    let riskLevel = 'MEDIUM';
    if (downstreamAffectedObjects.length > 5)
        riskLevel = 'CRITICAL';
    else if (downstreamAffectedObjects.length > 3)
        riskLevel = 'HIGH';
    return {
        targetObject: objectName,
        objectType: 'Logical Unit / Entity Model',
        directUpstreamDependencies,
        downstreamAffectedObjects,
        riskLevel,
        impactSummary: `Modifying '${objectName}' impacts ${downstreamAffectedObjects.length} downstream objects including PL/SQL packages (*_API), database views, Projections, and Aurena client pages.`,
        recommendedValidationSteps: [
            `1. Recompile PL/SQL package body ${apiPackage} (*.apy).`,
            `2. Verify Aurena OData Projection ${projectionName} metadata.`,
            `3. Execute Dictionary_SYS.Rebuild_Dictionary_() to refresh cache.`,
            `4. Verify Security Grants for ${projectionName} endpoint.`
        ]
    };
}
//# sourceMappingURL=dependencyGraphEngine.js.map