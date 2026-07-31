import { z } from 'zod';

export const gitTools = [
  {
    name: 'explain_commit',
    description: 'Explain changes in a Git commit for an IFS customization repository.',
    parameters: z.object({
      commitHash: z.string().describe('Git commit hash or reference')
    }),
    execute: async (args: { commitHash: string }) => {
      return {
        commit: args.commitHash,
        summary: 'Updated Marble entity attributes and added custom PL/SQL validation in Check_Insert___.'
      };
    }
  },
  {
    name: 'generate_commit',
    description: 'Generate standardized Git commit message for IFS code changes.',
    parameters: z.object({
      component: z.string().describe('Component code e.g. ORDER'),
      taskRef: z.string().describe('Jira or task reference e.g. IFS-1042'),
      description: z.string().describe('Short description of changes')
    }),
    execute: async (args: { component: string; taskRef: string; description: string }) => {
      return {
        commitMessage: `[${args.component}] ${args.taskRef}: ${args.description}\n\n- Updated *.entity attribute definitions.\n- Recompiled PL/SQL package body *.apy.`
      };
    }
  },
  {
    name: 'review_pull_request',
    description: 'Perform PR code review on IFS customization commits.',
    parameters: z.object({
      prDiff: z.string().describe('Git diff text')
    }),
    execute: async (args: { prDiff: string }) => {
      return {
        recommendations: [
          'Verify database scripts *.storage precede *.views in deployment order.',
          'Check that no direct SELECT * statements exist in PR diff.'
        ]
      };
    }
  }
];
