export declare function parseXmlContent(xmlString: string): any;
export declare function parseYamlContent(yamlString: string): any;
export declare function parseJsonContent(jsonString: string): any;
export declare function parseBuildLog(logContent: string): {
    errors: string[];
    warnings: string[];
    totalLines: number;
};
