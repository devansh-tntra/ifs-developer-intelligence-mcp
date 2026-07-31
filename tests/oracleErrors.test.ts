import { describe, it, expect } from 'vitest';
import { getOracleErrorDetails, searchOracleErrors } from '../src/oracle_kb/oracleErrors.js';

describe('Oracle Error Knowledge Base Tests', () => {
  it('should return specific remediation for ORA-04063', () => {
    const error = getOracleErrorDetails('ORA-04063');
    expect(error).toBeDefined();
    expect(error?.title).toContain('View or Package Has Errors');
    expect(error?.remediationSteps.length).toBeGreaterThan(0);
  });

  it('should search error knowledge base by keyword', () => {
    const results = searchOracleErrors('unique constraint');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].errorCode).toBe('ORA-00001');
  });
});
