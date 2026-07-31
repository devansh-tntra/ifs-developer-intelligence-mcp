import { XMLParser } from 'fast-xml-parser';
import yaml from 'yaml';

export function parseXmlContent(xmlString: string): any {
  try {
    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });
    return parser.parse(xmlString);
  } catch (err) {
    return { error: 'Invalid XML', raw: xmlString.slice(0, 500) };
  }
}

export function parseYamlContent(yamlString: string): any {
  try {
    return yaml.parse(yamlString);
  } catch (err) {
    return { error: 'Invalid YAML', raw: yamlString.slice(0, 500) };
  }
}

export function parseJsonContent(jsonString: string): any {
  try {
    return JSON.parse(jsonString);
  } catch (err) {
    return { error: 'Invalid JSON', raw: jsonString.slice(0, 500) };
  }
}

export function parseBuildLog(logContent: string): { errors: string[]; warnings: string[]; totalLines: number } {
  const lines = logContent.split(/\r?\n/);
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const line of lines) {
    if (line.includes('ERROR:') || line.includes('ORA-') || line.includes('PLS-') || line.includes('BUILD FAILED')) {
      errors.push(line.trim());
    } else if (line.includes('WARNING:') || line.includes('WARN:')) {
      warnings.push(line.trim());
    }
  }

  return {
    errors,
    warnings,
    totalLines: lines.length
  };
}
