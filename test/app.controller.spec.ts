import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HttpStatus } from '@nestjs/common';
import { AppController } from '../src/app.controller';
import { KafkaClienteService } from '../src/services/kafka-cliente/kafka-cliente.service';
import { PathParams } from '../src/schemas/path-params';
import { CatcherEvent } from '../src/schemas/catcher-event';
import { TestException } from '../src/exceptions/test-exception';
import { GeneralResponse } from '../src/models/general-response';

describe('AppController', () => {
  let appController: AppController;
  let kafkaService: KafkaClienteService;
  let configService: ConfigService;

  beforeEach(async () => {


    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue(''),
          },
        },
        KafkaClienteService],
    }).compile();

    appController = module.get<AppController>(AppController);
    kafkaService = module.get<KafkaClienteService>(KafkaClienteService);
  });

  describe('catchetEvent', () => {

    it('should throw TestException with 400 status code if validation fails name Detail', async () => {
      const pathParams: PathParams = { consumer: '28' };
      const event: CatcherEvent =
      {
        event_data: {
          detail: [
            { name: '', value: 'test' }
          ],
        },
        event_header: {
          subscriber: '1',
          accountid: '1',
          event_type: '1',
          event_name: '1',
          event_source: '1',
          event_id: '1',
          event_time: '1',
          domain: '1',
          version: '1'
        }
      };
      try {
        await appController.catchetEvent(pathParams, event);
      } catch (error: any) {
        expect(error).toBeInstanceOf(TestException);
        expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
        expect(error.response.status).toEqual('ERROR');
        expect(error.response.code).toEqual('400');
        expect(error.response.message).toEqual('El campo name no puede estar vacio.');

      }
    });

    it('should throw TestException with 400 status code if validation fails consumer Path Param', async () => {
      const pathParams: PathParams = { consumer: 'PP' };
      const event: CatcherEvent =
      {
        event_data: {
          detail: [
            { name: 'test', value: 'test' }
          ],
        },
        event_header: {
          subscriber: '1',
          accountid: '1',
          event_type: '1',
          event_name: '1',
          event_source: '1',
          event_id: '1',
          event_time: '1',
          domain: '1',
          version: '1'
        },
      };
      try {
        await appController.catchetEvent(pathParams, event);
      } catch (error: any) {
        expect(error).toBeInstanceOf(TestException);
        expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
        expect(error.response.status).toEqual('ERROR');
        expect(error.response.code).toEqual('400');
        expect(error.response.message).toEqual('El consumer no es valido.');

      }
    });

    it('should throw TestException with 400 status code if validation fails value Detail', async () => {
      const pathParams: PathParams = { consumer: '28' };
      const event: CatcherEvent =
      {
        event_data: {
          detail: [
            { name: 'test', value: '' }
          ],
        },
        event_header: {
          subscriber: '1',
          accountid: '1',
          event_type: '1',
          event_name: '1',
          event_source: '1',
          event_id: '1',
          event_time: '1',
          domain: '1',
          version: '1'
        },
      };
      try {
        await appController.catchetEvent(pathParams, event);
      } catch (error: any) {
        expect(error).toBeInstanceOf(TestException);
        expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
        expect(error.response.status).toEqual('ERROR');
        expect(error.response.code).toEqual('400');
        expect(error.response.message).toEqual('El campo value no puede estar vacio.');

      }
    });

    it('should send message to Kafka service and return GeneralResponse with 200 status code', async () => {
      const pathParams: PathParams = { consumer: '28' };
      const event: CatcherEvent =
      {
        event_data: {
          detail: [
            { name: 'test', value: 'testValue' }
          ],
        },
        event_header: {
          subscriber: '1',
          accountid: '1',
          event_type: '1',
          event_name: '1',
          event_source: '1',
          event_id: '1',
          event_time: '1',
          domain: '1',
          version: '1'
        },
      };
      jest.spyOn(kafkaService, 'sendMessage').mockImplementation();

      const result = await appController.catchetEvent(pathParams, event);

      expect(result).toBeInstanceOf(GeneralResponse);
      expect(result.status).toEqual('OK');
      expect(result.code).toEqual('200');
      expect(result.message).toEqual('Service has been Completed Successfully');
    });
  });
});