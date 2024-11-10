import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HttpStatus } from '@nestjs/common';
import { KafkaClienteService } from '../src/services/kafka-cliente/kafka-cliente.service';
import { KafkaUtils } from '@jimy.velasquez2/hn-innovation-utils';
import { TestException } from '../src/exceptions/test-exception';
import { GeneralResponse } from '../src/models/general-response';
import { logging } from '@jimy.velasquez/npm-logging-ts';
import { CatcherEvent } from '../src/schemas/catcher-event';

/*jest.mock('@jimy.velasquez2/hn-innovation-utils', () => ({
  KafkaUtils: {
    sendKafkaMessage: jest.fn()
  }
}));*/

describe('KafkaClienteService', () => {
  let service: KafkaClienteService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KafkaClienteService,
        ConfigService,
      ],
    }).compile();

    service = module.get<KafkaClienteService>(KafkaClienteService);
    configService = module.get<ConfigService>(ConfigService);

   /* (KafkaUtils.sendKafkaMessage as jest.Mock).mockClear();
    KafkaUtils.sendKafkaMessage = jest.fn();*/
  });


  describe('Envio de mensajes al Topico de Kafka', () => {
    it('should send Kafka message and log success', async () => {
      // Creo objeto que sera enviado al topico del Catcher
      const msgToSend: CatcherEvent =
      {
        event_data: {
          detail: [],
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
      const uti = 'mock-uti';
      
      const sendKafkaMessageSpy = jest.spyOn(KafkaUtils, 'sendKafkaMessage').mockReturnValue(Promise.resolve());
      const loggingBusinessSpy = jest.spyOn(logging, 'business').mockReturnValue();
      // Envio de mensaje al topico
      const messageSend: boolean = await service.sendMessage(msgToSend, uti);

      // Asserts
      logging.business('api catcher', 'Envio del mensaje al topico',msgToSend );
      expect(messageSend).toEqual(true);
      expect(loggingBusinessSpy).toHaveBeenCalledWith('api catcher', 'Envio del mensaje al topico', msgToSend);
      expect(sendKafkaMessageSpy).toHaveBeenCalledWith(
        configService.get('TOPIC_SERVER'),
        configService.get('TOPIC_NAME_PREFIX') + msgToSend.event_header.event_type.toLowerCase(),
        configService.get('TOPIC_CLIENT_ID'),
        JSON.stringify(msgToSend),uti);
    },10000);

    it('should throw TestException and log error when sending Kafka message fails', async () => {
      // Creo objeto que sera enviado al topico del Catcher
      const msgToSend: CatcherEvent =
      {
        event_data: {
          detail: [],
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
      const uti = 'mock-uti';
      const sendKafkaMessageSpy = jest.spyOn(KafkaUtils, 'sendKafkaMessage').mockRejectedValue(new Error('Kafka send error'));
      const loggingLogExceptionSpy = jest.spyOn(logging, 'logException').mockReturnValue();
      const generalResponseExpected = new GeneralResponse(uti, 'ERROR', '503', 'Error al enviar el mensaje al topico');
      const testExceptionExpected = new TestException(generalResponseExpected, HttpStatus.SERVICE_UNAVAILABLE);

      // Realizamos la validacion del metodo
      await expect(service.sendMessage(msgToSend, uti)).rejects.toThrowError(testExceptionExpected);
      expect(sendKafkaMessageSpy).toHaveBeenCalledWith(
        configService.get('TOPIC_SERVER'),
        configService.get('TOPIC_NAME_PREFIX') + msgToSend.event_header.event_type.toLowerCase(),
        configService.get('TOPIC_CLIENT_ID'),
        JSON.stringify(msgToSend),
        uti
      );
      expect(loggingLogExceptionSpy).toHaveBeenCalledWith('api catcher', expect.any(Error), 'Error al enviar el mensaje al topico');
    });
  });
});