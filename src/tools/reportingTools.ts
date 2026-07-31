import { z } from 'zod';

export const reportingTools = [
  {
    name: 'generate_xml_report_writer',
    description: 'Generate Xml_Record_Writer_SYS PL/SQL code block for building nested XML report data trees in IFS Operational Report RDF packages.',
    parameters: z.object({
      reportName: z.string().describe('Report name e.g. CUSTOMER_ORDER_REP'),
      parentBlock: z.string().describe('Parent XML block element name e.g. ORDERS'),
      childBlock: z.string().describe('Child XML block element name e.g. ORDER_LINE')
    }),
    execute: async (args: { reportName: string; parentBlock: string; childBlock: string }) => {
      return {
        code: `
-----------------------------------------------------------------------------
-- Xml_Record_Writer_SYS Nested XML Dataset Assembler
-----------------------------------------------------------------------------
Xml_Record_Writer_SYS.Create_Report_Header(xml_, '${args.reportName}', '${args.reportName}');
Xml_Record_Writer_SYS.Start_Element(xml_, '${args.parentBlock}');

FOR head_rec_ IN get_headers_ LOOP
   Xml_Record_Writer_SYS.Start_Element(xml_, 'ORDER');
   Xml_Record_Writer_SYS.Add_Element(xml_, 'ORDER_NO', head_rec_.order_no);
   Xml_Record_Writer_SYS.Add_Element(xml_, 'DESCRIPTION', head_rec_.description);

   Xml_Record_Writer_SYS.Start_Element(xml_, '${args.childBlock}S');
   FOR line_rec_ IN get_lines_(head_rec_.order_no) LOOP
      Xml_Record_Writer_SYS.Start_Element(xml_, '${args.childBlock}');
      Xml_Record_Writer_SYS.Add_Element(xml_, 'LINE_NO', line_rec_.line_no);
      Xml_Record_Writer_SYS.Add_Element(xml_, 'PRICE', line_rec_.sale_unit_price);
      Xml_Record_Writer_SYS.End_Element(xml_, '${args.childBlock}');
   END LOOP;
   Xml_Record_Writer_SYS.End_Element(xml_, '${args.childBlock}S');

   Xml_Record_Writer_SYS.End_Element(xml_, 'ORDER');
END LOOP;

Xml_Record_Writer_SYS.End_Element(xml_, '${args.parentBlock}');
Xml_Record_Writer_SYS.End_String(xml_, '${args.reportName}');
`
      };
    }
  },
  {
    name: 'generate_rdl',
    description: 'Generate Microsoft SSRS / IFS Report Designer layout RDL XML snippet.',
    parameters: z.object({
      reportTitle: z.string().describe('Report title')
    }),
    execute: async (args: { reportTitle: string }) => {
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
    execute: async (args: { reportLu: string }) => {
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
    execute: async (args: { tableName: string }) => {
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
    execute: async (args: { paramName: string }) => {
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
    execute: async (args: { layoutName: string }) => {
      return {
        layoutConfig: { layoutName: args.layoutName, paperType: 'A4', orientation: 'Portrait' }
      };
    }
  }
];
