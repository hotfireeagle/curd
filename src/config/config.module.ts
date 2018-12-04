import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import * as path from 'path';

const envPath: string = path.join(`${process.cwd()}`, `env.dot`);

@Module({
    providers: [{
        provide: ConfigService,
        useValue: new ConfigService(envPath)
    }],
    exports: [ConfigService]
})
export class ConfigModule {}