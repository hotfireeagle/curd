import * as fs from 'fs';
import * as dotenv from 'dotenv';
import * as joi from 'joi';

export interface EnvConfig {
    [key: string]: string;
}

export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(filePath: string) {
        const config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validateConfig(config);
    }

    private validateConfig(config: EnvConfig): EnvConfig {
        const configSchema: joi.ObjectSchema = joi.object({
            DATABASENAME: joi.string().valid(['blog', 'nestBlog']).default('blog')
        });

        const { error, value: configResult } = joi.validate(config, configSchema);
        if (error) {
            throw new Error(`${error}`);
        }
        return configResult;
    }

    get basename(): string {
        return this.envConfig.DATABASENAME;
    }
}