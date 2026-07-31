import { z } from 'zod';

export const integrationTools = [
  {
    name: 'generate_rest_examples',
    description: 'Generate REST API payload and HTTP examples for IFS Connect or Projections.',
    parameters: z.object({
      endpoint: z.string().describe('IFS OData / REST Endpoint')
    }),
    execute: async (args: { endpoint: string }) => {
      return {
        curlExample: `curl -X GET "https://ifs.example.com${args.endpoint}" -H "Authorization: Bearer <JWT_TOKEN>" -H "Accept: application/json"`
      };
    }
  },
  {
    name: 'generate_odata_queries',
    description: 'Generate OData $filter, $select, and $expand queries for Aurena Projections.',
    parameters: z.object({
      entitySet: z.string().describe('EntitySet name'),
      filterField: z.string().describe('Field to filter')
    }),
    execute: async (args: { entitySet: string; filterField: string }) => {
      return {
        query: `${args.entitySet}?$filter=${args.filterField} eq 'ACTIVE'&$select=Objkey,${args.filterField}&$expand=ChildArray`
      };
    }
  },
  {
    name: 'generate_transformer',
    description: 'Generate IFS Connect XML to JSON or XSLT Transformer.',
    parameters: z.object({
      transformerName: z.string().describe('Transformer name')
    }),
    execute: async (args: { transformerName: string }) => {
      return {
        xsltTemplate: `<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">\n  <xsl:template match="/">\n    <output><xsl:value-of select="//data"/></output>\n  </xsl:template>\n</xsl:stylesheet>`
      };
    }
  },
  {
    name: 'generate_message_processor',
    description: 'Generate IFS Connect Message Receiver / Processor PL/SQL package template.',
    parameters: z.object({
      processorName: z.string().describe('Message processor package name')
    }),
    execute: async (args: { processorName: string }) => {
      return {
        code: `PROCEDURE ${args.processorName} (in_msg_ IN CLOB) IS\nBEGIN\n   -- Parse incoming XML / JSON message payload\n   NULL;\nEND ${args.processorName};`
      };
    }
  },
  {
    name: 'generate_ifs_connect_configuration',
    description: 'Generate routing rule and routing address configuration XML for IFS Connect.',
    parameters: z.object({
      ruleName: z.string().describe('Routing rule name')
    }),
    execute: async (args: { ruleName: string }) => {
      return {
        configXml: `<RoutingRule name="${args.ruleName}">\n  <Condition>MESSAGE_TYPE = 'INBOUND_ORDER'</Condition>\n  <Address>REST_SENDER_1</Address>\n</RoutingRule>`
      };
    }
  }
];
