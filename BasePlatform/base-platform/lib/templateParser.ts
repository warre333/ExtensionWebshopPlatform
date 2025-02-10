import { Liquid } from 'liquidjs';
import * as fs from 'fs';
import * as path from 'path';

export async function parseTemplate(templateName: string, page: string, data: any) {
    const engine = new Liquid();
    const templatePath = path.join(process.cwd(), 'templates', templateName, `${page}.liquid`);
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    
    return await engine.parseAndRender(templateContent, data);
}