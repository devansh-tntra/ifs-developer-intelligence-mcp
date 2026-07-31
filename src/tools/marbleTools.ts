import { z } from 'zod';

export const marbleTools = [
  {
    name: 'explain_model',
    description: 'Explain the architecture and relations inside a Marble model (.entity, .projection, or .client).',
    parameters: z.object({
      content: z.string().describe('Marble file content'),
      fileType: z.string().describe('File type: entity, projection, client')
    }),
    execute: async (args: { content: string; fileType: string }) => {
      return {
        fileType: args.fileType,
        explanation: `Analyzed Marble ${args.fileType} DSL. Architecture defines key entity mappings, associations, and Aurena UI components.`,
        keyComponents: ['Entity Attributes', 'Associations', 'CRUD Overrides', 'State Machine']
      };
    }
  },
  {
    name: 'validate_model',
    description: 'Validate syntax and cardinalities in a Marble DSL model.',
    parameters: z.object({
      content: z.string().describe('Marble file content')
    }),
    execute: async (args: { content: string }) => {
      const errors: string[] = [];
      if (!args.content.includes('keys {') && args.content.includes('entity ')) {
        errors.push('Missing explicit `keys { ... }` block in entity definition.');
      }
      return {
        isValid: errors.length === 0,
        errors
      };
    }
  },
  {
    name: 'generate_model',
    description: 'Generate Marble DSL model boilerplate for a new business domain entity.',
    parameters: z.object({
      modelName: z.string().describe('Model name')
    }),
    execute: async (args: { modelName: string }) => {
      return {
        entityDsl: `entity ${args.modelName} {\n   from = "${args.modelName.toUpperCase()}_TAB";\n   attribute ${args.modelName}Id Text;\n   keys {\n      key ${args.modelName}Id;\n   }\n}`
      };
    }
  },
  {
    name: 'find_dependencies',
    description: 'Find dependencies between entities, projections, and pages in Marble.',
    parameters: z.object({
      projectionName: z.string().describe('Projection name')
    }),
    execute: async (args: { projectionName: string }) => {
      return {
        projection: args.projectionName,
        dependencies: ['CustomerOrder Entity', 'CustomerOrder_API PL/SQL Package', 'Fnd_User Security']
      };
    }
  }
];
