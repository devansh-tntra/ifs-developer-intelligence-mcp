export function evaluateQualityGate(codeSnippet, fileType) {
    const violations = [];
    const code = codeSnippet.trim();
    // Rule 1: Cust Layer Check (No direct Core file modification)
    if (code.includes('layer Core;') && fileType === 'Cust') {
        violations.push({
            ruleId: 'IFS-ARCH-001',
            severity: 'CRITICAL',
            category: 'IFS Standard',
            message: 'Cust layer code must specify `layer Cust;` instead of `layer Core;`.',
            recommendation: 'Change `layer Core;` to `layer Cust;` in customization model files.'
        });
    }
    // Rule 2: Projection Action missing initialcheck implementation
    if (code.includes('action ') && !code.includes('initialcheck implementation;') && !code.includes('initialcheck none;')) {
        violations.push({
            ruleId: 'IFS-SEC-001',
            severity: 'CRITICAL',
            category: 'Security',
            message: 'Projection action definition is missing mandatory `initialcheck implementation;` declaration.',
            recommendation: 'Add `initialcheck implementation;` inside action definition block.'
        });
    }
    // Rule 3: Raw COMMIT or ROLLBACK in PL/SQL LU
    if (/\b(COMMIT|ROLLBACK)\b/i.test(code) && !code.includes('PRAGMA AUTONOMOUS_TRANSACTION')) {
        violations.push({
            ruleId: 'IFS-DB-001',
            severity: 'CRITICAL',
            category: 'IFS Standard',
            message: 'Raw `COMMIT` or `ROLLBACK` detected inside PL/SQL LU package method.',
            recommendation: 'Remove explicit transaction control (`COMMIT`/`ROLLBACK`). Let the IFS framework manage transaction boundaries, or use PRAGMA AUTONOMOUS_TRANSACTION for logging procedures.'
        });
    }
    // Rule 4: Dynamic SQL string concatenation risk
    if (/EXECUTE\s+IMMEDIATE\s+.*'\s*\|\|/i.test(code)) {
        violations.push({
            ruleId: 'IFS-SEC-002',
            severity: 'HIGH',
            category: 'Security',
            message: 'Dynamic SQL concatenation detected (potential SQL injection vulnerability).',
            recommendation: 'Use bind variables (`USING var1, var2`) with EXECUTE IMMEDIATE instead of concatenating strings.'
        });
    }
    // Calculate score
    let penalty = 0;
    for (const v of violations) {
        if (v.severity === 'CRITICAL')
            penalty += 25;
        else if (v.severity === 'HIGH')
            penalty += 15;
        else if (v.severity === 'MEDIUM')
            penalty += 10;
        else
            penalty += 5;
    }
    const qualityScore = Math.max(0, 100 - penalty);
    const passed = qualityScore >= 70 && !violations.some(v => v.severity === 'CRITICAL');
    return {
        passed,
        qualityScore,
        violations,
        summary: passed
            ? `Quality Gate PASSED with score ${qualityScore}/100. Code meets enterprise IFS Cloud standards.`
            : `Quality Gate FAILED with score ${qualityScore}/100. ${violations.length} violations detected requiring correction.`
    };
}
//# sourceMappingURL=qualityGateEngine.js.map