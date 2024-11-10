import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { KafkaClienteService } from './services/kafka-cliente/kafka-cliente.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HttpInterceptor } from '@jimy.velasquez/npm-logging-ts';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../src/resources'),
      serveRoot: '/eventmanagement/resources',

    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpInterceptor,
    },
    KafkaClienteService, 
    ],
})
export class AppModule { }
