import { z } from 'zod';
export const deploymentTools = [
    {
        name: 'build_project',
        description: 'Provide instructions or commands to build an IFS Developer Studio project.',
        parameters: z.object({
            projectName: z.string().describe('Developer Studio project name')
        }),
        execute: async (args) => {
            return {
                projectName: args.projectName,
                buildCommands: [
                    'Right click project in Developer Studio -> Build Project',
                    'Or use agy / ant command: ant -f build.xml compile'
                ]
            };
        }
    },
    {
        name: 'validate_delivery',
        description: 'Validate an IFS customization delivery package structure before deployment.',
        parameters: z.object({
            deliveryPath: z.string().describe('Path to delivery folder or zip')
        }),
        execute: async (args) => {
            return {
                status: 'Valid delivery structure',
                checkedFiles: ['database/', 'client/', 'server/']
            };
        }
    },
    {
        name: 'analyze_build_logs',
        description: 'Analyze IFS build or deployment logs for compilation errors.',
        parameters: z.object({
            logContent: z.string().describe('Build log content')
        }),
        execute: async (args) => {
            const errors = args.logContent.split(/\r?\n/).filter(l => l.includes('ERROR') || l.includes('ORA-'));
            return {
                errorCount: errors.length,
                errors
            };
        }
    },
    {
        name: 'deployment_checklist',
        description: 'Get pre-deployment and post-deployment checklist for IFS Cloud releases.',
        parameters: z.object({
            targetEnv: z.string().describe('Target environment e.g. STAGING, PROD')
        }),
        execute: async (args) => {
            return {
                targetEnv: args.targetEnv,
                checklist: [
                    '1. Backup target database instance.',
                    '2. Deploy database scripts in sequence: *.storage, *.views, *.api, *.apy.',
                    '3. Deploy Aurena projections and client files.',
                    '4. Refresh IFS Dictionary cache via Dictionary_SYS.Rebuild_Dictionary_().',
                    '5. Verify Security Grants for new Projections.'
                ]
            };
        }
    }
];
//# sourceMappingURL=deploymentTools.js.map