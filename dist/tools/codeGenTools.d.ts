import { z } from 'zod';
export declare const codeGenTools: ({
    name: string;
    description: string;
    parameters: z.ZodObject<{
        unitName: z.ZodString;
        testType: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        unitName: string;
        testType: string;
    }, {
        unitName: string;
        testType: string;
    }>;
    execute: (args: {
        unitName: string;
        testType: string;
    }) => Promise<{
        unitName: string;
        testType: string;
        testCode: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        procedureName: z.ZodString;
        tableName: z.ZodString;
        whereClause: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        procedureName: string;
        tableName: string;
        whereClause: string;
    }, {
        procedureName: string;
        tableName: string;
        whereClause: string;
    }>;
    execute: (args: {
        procedureName: string;
        tableName: string;
        whereClause: string;
    }) => Promise<{
        code: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        procedureName: z.ZodString;
        logTableName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        procedureName: string;
        logTableName: string;
    }, {
        procedureName: string;
        logTableName: string;
    }>;
    execute: (args: {
        procedureName: string;
        logTableName: string;
    }) => Promise<{
        code: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        luName: z.ZodString;
        methodName: z.ZodString;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
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
    parameters: z.ZodObject<{
        luName: z.ZodString;
        component: z.ZodString;
        tableName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        tableName: string;
        luName: string;
        component: string;
    }, {
        tableName: string;
        luName: string;
        component: string;
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
    parameters: z.ZodObject<{
        cursorName: z.ZodString;
        tableName: z.ZodString;
        whereClause: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        tableName: string;
        whereClause: string;
        cursorName: string;
    }, {
        tableName: string;
        whereClause: string;
        cursorName: string;
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
    parameters: z.ZodObject<{
        tableName: z.ZodString;
        triggerName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
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
    parameters: z.ZodObject<{
        functionName: z.ZodString;
        returnType: z.ZodString;
    }, "strip", z.ZodTypeAny, {
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
    parameters: z.ZodObject<{
        viewName: z.ZodString;
        tableName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
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
    parameters: z.ZodObject<{
        tableName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
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
    parameters: z.ZodObject<{
        entityName: z.ZodString;
        component: z.ZodString;
        tableName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        tableName: string;
        component: string;
        entityName: string;
    }, {
        tableName: string;
        component: string;
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
    parameters: z.ZodObject<{
        projectionName: z.ZodString;
        component: z.ZodString;
        entityName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
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
    parameters: z.ZodObject<{
        clientName: z.ZodString;
        component: z.ZodString;
        projectionName: z.ZodString;
        entityName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
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
    parameters: z.ZodObject<{
        reportName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
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
    parameters: z.ZodObject<{
        modelName: z.ZodString;
        component: z.ZodString;
    }, "strip", z.ZodTypeAny, {
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
    parameters: z.ZodObject<{
        scriptType: z.ZodString;
        tableName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
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
    parameters: z.ZodObject<{
        lovName: z.ZodString;
        entityName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
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
    parameters: z.ZodObject<{
        fieldName: z.ZodString;
        dataType: z.ZodString;
    }, "strip", z.ZodTypeAny, {
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
    parameters: z.ZodObject<{
        actionName: z.ZodString;
        projectionName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
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
    parameters: z.ZodObject<{
        commandName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
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
    parameters: z.ZodObject<{
        projectionName: z.ZodString;
        entitySet: z.ZodString;
    }, "strip", z.ZodTypeAny, {
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
})[];
