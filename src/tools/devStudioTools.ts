import { z } from 'zod';

export const devStudioTools = [
  {
    name: 'project_help',
    description: 'Get help on IFS Developer Studio project setup, `.project` config, and module structures.',
    parameters: z.object({
      topic: z.string().describe('Setup topic e.g. "Create Project", "Component Setup"')
    }),
    execute: async (args: { topic: string }) => {
      return {
        topic: args.topic,
        guidelines: 'In IFS Developer Studio, projects must mirror the component folder structure (e.g. apps/order/model/order). Ensure database target connection parameters are configured in Project Properties.'
      };
    }
  },
  {
    name: 'deployment_help',
    description: 'Get help on deploying artifacts to target IFS Cloud database or mid-tier.',
    parameters: z.object({
      targetType: z.string().describe('Target type: Database, Midtier, Projection')
    }),
    execute: async (args: { targetType: string }) => {
      return {
        instructions: `To deploy ${args.targetType} from Developer Studio, use RMB -> Deploy. Ensure IFSSYS credentials have sysdba/dba privileges on target Oracle DB.`
      };
    }
  },
  {
    name: 'debug_help',
    description: 'Get help on debugging PL/SQL or OData requests in Developer Studio & PL/SQL Developer.',
    parameters: z.object({
      issueType: z.string().describe('Issue type e.g. "PL/SQL Breakpoints", "OData Error 500"')
    }),
    execute: async (args: { issueType: string }) => {
      return {
        steps: [
          '1. Enable server trace in Aurena Developer Tools (Ctrl+Shift+I).',
          '2. View server trace log in FND_TRACE_TAB.',
          '3. Set breakpoints in PL/SQL Developer using DBMS_DEBUG.'
        ]
      };
    }
  },
  {
    name: 'model_help',
    description: 'Get guidelines for modeling LUs, entities, and states in Developer Studio.',
    parameters: z.object({
      modelType: z.string().describe('Model type e.g. "State Machine", "Custom Attributes"')
    }),
    execute: async (args: { modelType: string }) => {
      return {
        bestPractices: [
          'Use finite state machines for LU status transitions.',
          'Always generate code after altering Marble entity attributes.'
        ]
      };
    }
  },
  {
    name: 'wizard_help',
    description: 'Guide for Developer Studio code generation wizards.',
    parameters: z.object({
      wizardName: z.string().describe('Wizard name e.g. "New Entity Wizard", "New Projection Wizard"')
    }),
    execute: async (args: { wizardName: string }) => {
      return {
        wizardGuide: `Open Developer Studio -> File -> New File -> Select ${args.wizardName}. Enter LU Name and Component.`
      };
    }
  }
];
