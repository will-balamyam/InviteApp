import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
    @IsNumber()
    PORT: number;

    @IsString()
    DB_HOST: string;

    @IsNumber()
    DB_PORT: number;

    @IsString()
    DB_USERNAME: string;

    @IsString()
    DB_PASSWORD: string;

    @IsString()
    DB_NAME: string;

    @IsString()
    NODE_ENV: string;

    @IsString()
    TWILIO_ACCOUNT_SID: string;

    @IsString()
    TWILIO_AUTH_TOKEN: string;

    @IsString()
    TWILIO_WHATSAPP_NUMBER: string;

    @IsString()
    TWILIO_TEMPLATE_SID: string;

    @IsString()
    URL_FRONTEND: string;
}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}
