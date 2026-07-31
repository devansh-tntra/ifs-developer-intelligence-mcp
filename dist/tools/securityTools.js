import { z } from 'zod';
export const securityTools = [
    {
        name: 'permission_analysis',
        description: 'Analyze security permissions required for an IFS LU or Projection.',
        parameters: z.object({
            targetName: z.string().describe('Projection or LU name')
        }),
        execute: async (args) => {
            return {
                target: args.targetName,
                requiredGrants: [
                    `Grant projection ${args.targetName} to Permission Set FND_ENDUSER`,
                    `Grant procedure execution on ${args.targetName}_API to FND_ENDUSER`
                ]
            };
        }
    },
    {
        name: 'projection_permissions',
        description: 'Check required OData action and entity set permissions in IFS Cloud.',
        parameters: z.object({
            projectionName: z.string().describe('Projection name')
        }),
        execute: async (args) => {
            return {
                projection: args.projectionName,
                securityRules: [
                    'Read permissions enable GET queries on EntitySet.',
                    'Create/Update/Delete permissions required for CUD operations on EntitySet.'
                ]
            };
        }
    },
    {
        name: 'grant_generator',
        description: 'Generate SQL grant scripts for IFS Projections and Database Objects.',
        parameters: z.object({
            objectName: z.string().describe('Object name'),
            roleName: z.string().describe('IFS Permission Set / Role')
        }),
        execute: async (args) => {
            return {
                sql: `GRANT EXECUTE ON ${args.objectName} TO ${args.roleName};\nGRANT SELECT ON ${args.objectName}_TAB TO IFSSYS;`
            };
        }
    }
];
//# sourceMappingURL=securityTools.js.map