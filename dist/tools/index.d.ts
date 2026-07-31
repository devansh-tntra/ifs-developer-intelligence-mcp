export declare const ALL_MCP_TOOLS: ({
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        query: import("zod").ZodString;
        version: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        query: string;
        version?: string | undefined;
    }, {
        query: string;
        version?: string | undefined;
    }>;
    execute: (args: {
        query: string;
        version?: string;
    }) => Promise<{
        query: string;
        searchedVersions: string;
        count: number;
        results: import("../rag/hybridSearch.js").HybridSearchResult[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        concept: import("zod").ZodString;
        fromVersion: import("zod").ZodString;
        toVersion: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        concept: string;
        fromVersion: string;
        toVersion: string;
    }, {
        concept: string;
        fromVersion: string;
        toVersion: string;
    }>;
    execute: (args: {
        concept: string;
        fromVersion: string;
        toVersion: string;
    }) => Promise<{
        concept: string;
        comparison: {
            fromVersion: {
                version: string;
                matchesFound: number;
                summary: string;
            };
            toVersion: {
                version: string;
                matchesFound: number;
                summary: string;
            };
        };
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        docId: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        docId: string;
    }, {
        docId: string;
    }>;
    execute: (args: {
        docId: string;
    }) => Promise<import("../types/ifs.js").DocChunk | {
        error: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        topic: import("zod").ZodString;
        version: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        topic: string;
        version?: string | undefined;
    }, {
        topic: string;
        version?: string | undefined;
    }>;
    execute: (args: {
        topic: string;
        version?: string;
    }) => Promise<{
        summary: string;
        topic?: undefined;
        title?: undefined;
        version?: undefined;
        codeSnippet?: undefined;
    } | {
        topic: string;
        title: string;
        version: string;
        summary: string;
        codeSnippet: string | null;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        concept: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        concept: string;
    }, {
        concept: string;
    }>;
    execute: (args: {
        concept: string;
    }) => Promise<{
        concept: string;
        related: {
            title: string;
            score: number;
            snippet: string;
        }[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        keyword: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        keyword: string;
    }, {
        keyword: string;
    }>;
    execute: (args: {
        keyword: string;
    }) => Promise<{
        keyword: string;
        count: number;
        snippets: {
            title: string;
            version: string;
            code: string;
        }[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        luName: import("zod").ZodString;
        methodName: import("zod").ZodString;
        description: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        luName: string;
        methodName: string;
        description: string;
    }, {
        luName: string;
        methodName: string;
        description: string;
    }>;
    execute: (args: {
        luName: string;
        methodName: string;
        description: string;
    }) => Promise<{
        code: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        luName: import("zod").ZodString;
        component: import("zod").ZodString;
        tableName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        luName: string;
        component: string;
        tableName: string;
    }, {
        luName: string;
        component: string;
        tableName: string;
    }>;
    execute: (args: {
        luName: string;
        component: string;
        tableName: string;
    }) => Promise<{
        luName: string;
        packageHeader: string;
        packageBody: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        cursorName: import("zod").ZodString;
        tableName: import("zod").ZodString;
        whereClause: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        tableName: string;
        cursorName: string;
        whereClause: string;
    }, {
        tableName: string;
        cursorName: string;
        whereClause: string;
    }>;
    execute: (args: {
        cursorName: string;
        tableName: string;
        whereClause: string;
    }) => Promise<{
        code: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        tableName: import("zod").ZodString;
        triggerName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        tableName: string;
        triggerName: string;
    }, {
        tableName: string;
        triggerName: string;
    }>;
    execute: (args: {
        tableName: string;
        triggerName: string;
    }) => Promise<{
        code: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        functionName: import("zod").ZodString;
        returnType: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        functionName: string;
        returnType: string;
    }, {
        functionName: string;
        returnType: string;
    }>;
    execute: (args: {
        functionName: string;
        returnType: string;
    }) => Promise<{
        code: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        viewName: import("zod").ZodString;
        tableName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        tableName: string;
        viewName: string;
    }, {
        tableName: string;
        viewName: string;
    }>;
    execute: (args: {
        viewName: string;
        tableName: string;
    }) => Promise<{
        code: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        tableName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        tableName: string;
    }, {
        tableName: string;
    }>;
    execute: (args: {
        tableName: string;
    }) => Promise<{
        code: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        entityName: import("zod").ZodString;
        component: import("zod").ZodString;
        tableName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        component: string;
        tableName: string;
        entityName: string;
    }, {
        component: string;
        tableName: string;
        entityName: string;
    }>;
    execute: (args: {
        entityName: string;
        component: string;
        tableName: string;
    }) => Promise<{
        content: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        projectionName: import("zod").ZodString;
        component: import("zod").ZodString;
        entityName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        component: string;
        entityName: string;
        projectionName: string;
    }, {
        component: string;
        entityName: string;
        projectionName: string;
    }>;
    execute: (args: {
        projectionName: string;
        component: string;
        entityName: string;
    }) => Promise<{
        content: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        clientName: import("zod").ZodString;
        component: import("zod").ZodString;
        projectionName: import("zod").ZodString;
        entityName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        component: string;
        entityName: string;
        projectionName: string;
        clientName: string;
    }, {
        component: string;
        entityName: string;
        projectionName: string;
        clientName: string;
    }>;
    execute: (args: {
        clientName: string;
        component: string;
        projectionName: string;
        entityName: string;
    }) => Promise<{
        content: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        reportName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        reportName: string;
    }, {
        reportName: string;
    }>;
    execute: (args: {
        reportName: string;
    }) => Promise<{
        code: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        modelName: import("zod").ZodString;
        component: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        component: string;
        modelName: string;
    }, {
        component: string;
        modelName: string;
    }>;
    execute: (args: {
        modelName: string;
        component: string;
    }) => Promise<{
        entityFile: string;
        projectionFile: string;
        clientFile: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        scriptType: import("zod").ZodString;
        tableName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        tableName: string;
        scriptType: string;
    }, {
        tableName: string;
        scriptType: string;
    }>;
    execute: (args: {
        scriptType: string;
        tableName: string;
    }) => Promise<{
        sql: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        lovName: import("zod").ZodString;
        entityName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        entityName: string;
        lovName: string;
    }, {
        entityName: string;
        lovName: string;
    }>;
    execute: (args: {
        lovName: string;
        entityName: string;
    }) => Promise<{
        code: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        fieldName: import("zod").ZodString;
        dataType: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        fieldName: string;
        dataType: string;
    }, {
        fieldName: string;
        dataType: string;
    }>;
    execute: (args: {
        fieldName: string;
        dataType: string;
    }) => Promise<{
        customFieldConfig: {
            attributeName: string;
            dataType: string;
            expression: string;
        };
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        actionName: import("zod").ZodString;
        projectionName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        projectionName: string;
        actionName: string;
    }, {
        projectionName: string;
        actionName: string;
    }>;
    execute: (args: {
        actionName: string;
        projectionName: string;
    }) => Promise<{
        projectionDef: string;
        plsqlHandler: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        commandName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        commandName: string;
    }, {
        commandName: string;
    }>;
    execute: (args: {
        commandName: string;
    }) => Promise<{
        code: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        projectionName: import("zod").ZodString;
        entitySet: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        projectionName: string;
        entitySet: string;
    }, {
        projectionName: string;
        entitySet: string;
    }>;
    execute: (args: {
        projectionName: string;
        entitySet: string;
    }) => Promise<{
        endpoint: string;
        method: string;
        headers: {
            'Content-Type': string;
            Authorization: string;
        };
        sampleBody: {
            Description: string;
        };
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        code: import("zod").ZodString;
        fileType: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        code: string;
        fileType?: string | undefined;
    }, {
        code: string;
        fileType?: string | undefined;
    }>;
    execute: (args: {
        code: string;
        fileType?: string;
    }) => Promise<{
        qualityScore: string;
        issues: string[];
        suggestions: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        code: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        code: string;
    }, {
        code: string;
    }>;
    execute: (args: {
        code: string;
    }) => Promise<{
        potentialBugs: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        sqlQuery: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        sqlQuery: string;
    }, {
        sqlQuery: string;
    }>;
    execute: (args: {
        sqlQuery: string;
    }) => Promise<{
        originalSql: string;
        optimizationAdvice: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        code: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        code: string;
    }, {
        code: string;
    }>;
    execute: (args: {
        code: string;
    }) => Promise<{
        recommendedPattern: string;
        codeSnippet: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        code: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        code: string;
    }, {
        code: string;
    }>;
    execute: (args: {
        code: string;
    }) => Promise<{
        unusedVariables: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        luName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        luName: string;
    }, {
        luName: string;
    }>;
    execute: (args: {
        luName: string;
    }) => Promise<{
        duplicateSummary: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        errorCode: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        errorCode: string;
    }, {
        errorCode: string;
    }>;
    execute: (args: {
        errorCode: string;
    }) => Promise<import("../types/ifs.js").OracleErrorDetail | {
        errorCode: string;
        title: string;
        standardCause: string;
        remediationSteps: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        messageKey: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        messageKey: string;
    }, {
        messageKey: string;
    }>;
    execute: (args: {
        messageKey: string;
    }) => Promise<{
        messageKey: string;
        type: string;
        explanation: string;
        remediation: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        stackTrace: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        stackTrace: string;
    }, {
        stackTrace: string;
    }>;
    execute: (args: {
        stackTrace: string;
    }) => Promise<{
        rootCauseLine: string;
        allMatchedErrors: string[];
        totalLinesParsed: number;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        errorContext: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        errorContext: string;
    }, {
        errorContext: string;
    }>;
    execute: (args: {
        errorContext: string;
    }) => Promise<{
        suggestedFixes: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        projectName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        projectName: string;
    }, {
        projectName: string;
    }>;
    execute: (args: {
        projectName: string;
    }) => Promise<{
        projectName: string;
        buildCommands: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        deliveryPath: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        deliveryPath: string;
    }, {
        deliveryPath: string;
    }>;
    execute: (args: {
        deliveryPath: string;
    }) => Promise<{
        status: string;
        checkedFiles: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        logContent: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        logContent: string;
    }, {
        logContent: string;
    }>;
    execute: (args: {
        logContent: string;
    }) => Promise<{
        errorCount: number;
        errors: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        targetEnv: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        targetEnv: string;
    }, {
        targetEnv: string;
    }>;
    execute: (args: {
        targetEnv: string;
    }) => Promise<{
        targetEnv: string;
        checklist: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        targetName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        targetName: string;
    }, {
        targetName: string;
    }>;
    execute: (args: {
        targetName: string;
    }) => Promise<{
        target: string;
        requiredGrants: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        projectionName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        projectionName: string;
    }, {
        projectionName: string;
    }>;
    execute: (args: {
        projectionName: string;
    }) => Promise<{
        projection: string;
        securityRules: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        objectName: import("zod").ZodString;
        roleName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        objectName: string;
        roleName: string;
    }, {
        objectName: string;
        roleName: string;
    }>;
    execute: (args: {
        objectName: string;
        roleName: string;
    }) => Promise<{
        sql: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        endpoint: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        endpoint: string;
    }, {
        endpoint: string;
    }>;
    execute: (args: {
        endpoint: string;
    }) => Promise<{
        curlExample: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        entitySet: import("zod").ZodString;
        filterField: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        entitySet: string;
        filterField: string;
    }, {
        entitySet: string;
        filterField: string;
    }>;
    execute: (args: {
        entitySet: string;
        filterField: string;
    }) => Promise<{
        query: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        transformerName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        transformerName: string;
    }, {
        transformerName: string;
    }>;
    execute: (args: {
        transformerName: string;
    }) => Promise<{
        xsltTemplate: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        processorName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        processorName: string;
    }, {
        processorName: string;
    }>;
    execute: (args: {
        processorName: string;
    }) => Promise<{
        code: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        ruleName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        ruleName: string;
    }, {
        ruleName: string;
    }>;
    execute: (args: {
        ruleName: string;
    }) => Promise<{
        configXml: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        reportTitle: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        reportTitle: string;
    }, {
        reportTitle: string;
    }>;
    execute: (args: {
        reportTitle: string;
    }) => Promise<{
        rdlSnippet: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        reportLu: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        reportLu: string;
    }, {
        reportLu: string;
    }>;
    execute: (args: {
        reportLu: string;
    }) => Promise<{
        rdfScript: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        tableName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        tableName: string;
    }, {
        tableName: string;
    }>;
    execute: (args: {
        tableName: string;
    }) => Promise<{
        datasetSql: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        paramName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        paramName: string;
    }, {
        paramName: string;
    }>;
    execute: (args: {
        paramName: string;
    }) => Promise<{
        paramDef: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        layoutName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        layoutName: string;
    }, {
        layoutName: string;
    }>;
    execute: (args: {
        layoutName: string;
    }) => Promise<{
        layoutConfig: {
            layoutName: string;
            paperType: string;
            orientation: string;
        };
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        content: import("zod").ZodString;
        fileType: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        fileType: string;
        content: string;
    }, {
        fileType: string;
        content: string;
    }>;
    execute: (args: {
        content: string;
        fileType: string;
    }) => Promise<{
        fileType: string;
        explanation: string;
        keyComponents: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        content: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        content: string;
    }, {
        content: string;
    }>;
    execute: (args: {
        content: string;
    }) => Promise<{
        isValid: boolean;
        errors: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        modelName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        modelName: string;
    }, {
        modelName: string;
    }>;
    execute: (args: {
        modelName: string;
    }) => Promise<{
        entityDsl: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        projectionName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        projectionName: string;
    }, {
        projectionName: string;
    }>;
    execute: (args: {
        projectionName: string;
    }) => Promise<{
        projection: string;
        dependencies: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        topic: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        topic: string;
    }, {
        topic: string;
    }>;
    execute: (args: {
        topic: string;
    }) => Promise<{
        topic: string;
        guidelines: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        targetType: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        targetType: string;
    }, {
        targetType: string;
    }>;
    execute: (args: {
        targetType: string;
    }) => Promise<{
        instructions: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        issueType: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        issueType: string;
    }, {
        issueType: string;
    }>;
    execute: (args: {
        issueType: string;
    }) => Promise<{
        steps: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        modelType: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        modelType: string;
    }, {
        modelType: string;
    }>;
    execute: (args: {
        modelType: string;
    }) => Promise<{
        bestPractices: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        wizardName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        wizardName: string;
    }, {
        wizardName: string;
    }>;
    execute: (args: {
        wizardName: string;
    }) => Promise<{
        wizardGuide: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        tableName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        tableName: string;
    }, {
        tableName: string;
    }>;
    execute: (args: {
        tableName: string;
    }) => Promise<{
        table: string;
        primaryKeys: string[];
        standardColumns: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        pattern: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        pattern: string;
    }, {
        pattern: string;
    }>;
    execute: (args: {
        pattern: string;
    }) => Promise<{
        matches: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        luName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        luName: string;
    }, {
        luName: string;
    }>;
    execute: (args: {
        luName: string;
    }) => Promise<{
        packages: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        objectName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        objectName: string;
    }, {
        objectName: string;
    }>;
    execute: (args: {
        objectName: string;
    }) => Promise<{
        object: string;
        dependencies: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        columnName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        columnName: string;
    }, {
        columnName: string;
    }>;
    execute: (args: {
        columnName: string;
    }) => Promise<{
        column: string;
        tablesContainingColumn: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        tableName: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        tableName: string;
    }, {
        tableName: string;
    }>;
    execute: (args: {
        tableName: string;
    }) => Promise<{
        tableName: string;
        referencingTables: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        commitHash: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        commitHash: string;
    }, {
        commitHash: string;
    }>;
    execute: (args: {
        commitHash: string;
    }) => Promise<{
        commit: string;
        summary: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        component: import("zod").ZodString;
        taskRef: import("zod").ZodString;
        description: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        description: string;
        component: string;
        taskRef: string;
    }, {
        description: string;
        component: string;
        taskRef: string;
    }>;
    execute: (args: {
        component: string;
        taskRef: string;
        description: string;
    }) => Promise<{
        commitMessage: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        prDiff: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        prDiff: string;
    }, {
        prDiff: string;
    }>;
    execute: (args: {
        prDiff: string;
    }) => Promise<{
        recommendations: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        query: import("zod").ZodString;
        assetType: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        query: string;
        assetType?: string | undefined;
    }, {
        query: string;
        assetType?: string | undefined;
    }>;
    execute: (args: {
        query: string;
        assetType?: string;
    }) => Promise<{
        query: string;
        count: number;
        results: {
            filename: string;
            path: string;
            assetType: "entity" | "projection" | "client" | "page" | "fragment" | "plsql" | "views" | "storage" | "xml" | "rdl" | "other";
            snippet: string;
        }[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        searchTerm: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        searchTerm: string;
    }, {
        searchTerm: string;
    }>;
    execute: (args: {
        searchTerm: string;
    }) => Promise<{
        count: number;
        matches: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        keyword: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        keyword: string;
    }, {
        keyword: string;
    }>;
    execute: (args: {
        keyword: string;
    }) => Promise<{
        totalFound: number;
        files: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        logQuery: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        logQuery: string;
    }, {
        logQuery: string;
    }>;
    execute: (args: {
        logQuery: string;
    }) => Promise<{
        query: string;
        matches: never[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        term: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        term: string;
    }, {
        term: string;
    }>;
    execute: (args: {
        term: string;
    }) => Promise<{
        term: string;
        pdfMatches: never[];
    }>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        xmlContent: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        xmlContent: string;
    }, {
        xmlContent: string;
    }>;
    execute: (args: {
        xmlContent: string;
    }) => Promise<any>;
} | {
    name: string;
    description: string;
    parameters: import("zod").ZodObject<{
        jsonContent: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        jsonContent: string;
    }, {
        jsonContent: string;
    }>;
    execute: (args: {
        jsonContent: string;
    }) => Promise<any>;
})[];
