import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {validate} from "./config/validation.config";
import {TypeOrmModule} from "@nestjs/typeorm";
import { UsersModule } from './modules/users/users.module';
import {Users} from "./entities/Users";
import {Families} from "./entities/Families";
import {Invitations} from "./entities/Invitations";
import {FamilyAccess} from "./entities/FamilyAccess";
import {Images} from "./entities/Images";
import { InvitationsModule } from './modules/invitations/invitations.module';
import { FamiliesModule } from './modules/families/families.module';
import { FamilyAccessModule } from './modules/family-access/family-access.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables estén disponibles en toda la aplicación
      validate
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // Database type
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 5433),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Users, Families, Invitations, FamilyAccess, Images], // Load entities dynamically
      synchronize: false, // Disable in production
      logging: process.env.NODE_ENV === 'development', // Enable logging in development
      ssl: { 
        rejectUnauthorized: false 
      },
      extra: {
        max: 10, // Maximum number of connections in the pool
        min: 1,  // Minimum number of connections in the pool
        idleTimeoutMillis: 10000, // Timeout más corto
        connectionTimeoutMillis: 5000, // Timeout de conexión
        acquireTimeoutMillis: 30000, // Timeout para adquirir conexión        
        // Configuraciones específicas para Azure PostgreSQL
        ssl: {
          rejectUnauthorized: false,
          ca: undefined, // Azure maneja esto automáticamente
        },        
        // Configuración adicional para Azure
        application_name: 'wedding-invitation-app',
        keepAlive: true,
        keepAliveInitialDelayMillis: 0,
      },
      // Configuraciones adicionales para manejo de errores
      retryAttempts: 3,
      retryDelay: 3000,
    }),
    UsersModule,
    InvitationsModule,
    FamiliesModule,
    FamilyAccessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
