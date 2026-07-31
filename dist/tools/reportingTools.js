import { z } from 'zod';
export const reportingTools = [
    {
        name: 'generate_rdl',
        description: 'Generate Microsoft SSRS / IFS Report Designer layout RDL XML snippet.',
        parameters: z.object({
            reportTitle: z.string().describe('Report title')
        }),
        execute: async (args) => {
            return {
                rdlSnippet: `<Report xmlns="http://schemas.microsoft.com/sqlserver/reporting/2016/01/reportdefinition">\n  <ReportSections><ReportSection><Body><Height>2in</Height></Body></ReportSection></ReportSections>\n</Report>`
            };
        }
    },
    {
        name: 'generate_rdf',
        description: 'Generate IFS Operational Report RDF data assembly script.',
        parameters: z.object({
            reportLu: z.string().describe('Report Logical Unit name')
        }),
        execute: async (args) => {
            return {
                rdfScript: `DEFINE REPORT_NAME = "${args.reportLu}_REP"\nPROMPT Creating ${args.reportLu}_RPI package body...`
            };
        }
    },
    {
        name: 'generate_report_dataset',
        description: 'Generate SQL dataset query for IFS Report Designer.',
        parameters: z.object({
            tableName: z.string().describe('Table or View name')
        }),
        execute: async (args) => {
            return {
                datasetSql: `SELECT order_no, customer_id, total_amount, rowkey FROM ${args.tableName} WHERE rowstate != 'Cancelled'`
            };
        }
    },
    {
        name: 'generate_report_parameters',
        description: 'Generate parameter specification block for IFS Operational Report.',
        parameters: z.object({
            paramName: z.string().describe('Parameter name e.g. COMPANY_ID')
        }),
        execute: async (args) => {
            return {
                paramDef: `Report_SYS.Define_Report_Method_ ( '${args.paramName}', 'Get_Company_Lov', 'Company ID', 'STRING', 'MANDATORY' );`
            };
        }
    },
    {
        name: 'generate_report_layout',
        description: 'Generate Report Plugin layout metadata file.',
        parameters: z.object({
            layoutName: z.string().describe('Layout name e.g. CustomInvoice.rdlc')
        }),
        execute: async (args) => {
            return {
                layoutConfig: { layoutName: args.layoutName, paperType: 'A4', orientation: 'Portrait' }
            };
        }
    }
];
//# sourceMappingURL=reportingTools.js.map