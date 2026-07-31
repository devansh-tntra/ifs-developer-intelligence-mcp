export function computeConfidenceScore(consensus, queryContextLength) {
    let score = 50; // base score
    const missingContextFlags = [];
    // Evaluate evidence volume
    if (consensus.evidenceCollected.length >= 4) {
        score += 30;
    }
    else if (consensus.evidenceCollected.length >= 2) {
        score += 20;
    }
    else if (consensus.evidenceCollected.length === 1) {
        score += 10;
    }
    else {
        missingContextFlags.push('Zero indexed documentation or workspace assets matched query.');
    }
    // Evaluate source diversity
    const sourceTypes = new Set(consensus.evidenceCollected.map(e => e.sourceType));
    if (sourceTypes.size >= 3) {
        score += 20;
    }
    else if (sourceTypes.size === 2) {
        score += 10;
    }
    // Query length check
    if (queryContextLength < 10) {
        score -= 15;
        missingContextFlags.push('Query prompt is brief; specific IFS LU or Component context is recommended.');
    }
    // Cap score
    score = Math.min(100, Math.max(0, score));
    let grade = 'C';
    if (score >= 90)
        grade = 'A+';
    else if (score >= 80)
        grade = 'A';
    else if (score >= 70)
        grade = 'B';
    else if (score >= 50)
        grade = 'C';
    else
        grade = 'D';
    let recommendation = 'PROCEED';
    if (score < 50)
        recommendation = 'REQUEST_MORE_CONTEXT';
    else if (score < 70)
        recommendation = 'WARNING';
    return {
        confidencePercentage: score,
        qualityGrade: grade,
        evidenceQualityScore: score,
        missingContextFlags,
        recommendation
    };
}
//# sourceMappingURL=confidenceEngine.js.map