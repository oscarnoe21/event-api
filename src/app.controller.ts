import { ArgumentMetadata, Body, Controller, HttpStatus, Param, Post, ValidationPipe } from '@nestjs/common';
import { TestException } from './exceptions/test-exception';
import { v4 as uuid } from 'uuid';
import { KafkaClienteService } from './services/kafka-cliente/kafka-cliente.service';
import { PathParams } from './schemas/path-params';
import { CatcherEvent } from './schemas/catcher-event';
import { GeneralResponse } from './models/general-response';
import { MiscUtil } from '@jimy.velasquez2/hn-innovation-utils';

@Controller('v1/api/event')
export class AppController {
  constructor(
    private readonly kafkaService: KafkaClienteService,
  ) { }



  @Post('notify/:consumer')
  async catchetEvent(
    @Param() pathParams: PathParams,
    @Body() event: CatcherEvent): Promise<GeneralResponse> {
    const uti = uuid();
    let validationPipe: ValidationPipe;
    validationPipe = new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => 
        new TestException
        (
          new GeneralResponse('test', 'ERROR', '400', this.exploreError(errors)),
          HttpStatus.BAD_REQUEST,

        )
    });

    try {
      let metadata: ArgumentMetadata = {
        type: 'param',
        metatype: PathParams,
        data: '',
      };
      let result = await validationPipe.transform(pathParams, metadata);
      console.log(result);

      let metadata2: ArgumentMetadata = {
        type: 'body',
        metatype: CatcherEvent,
        data: '',
      };
      result = await validationPipe.transform(event, metadata2);
      console.log(result);
    }
    catch (error) {
      console.log(error);
      let generalResponse: GeneralResponse = new GeneralResponse(
        uti,
        'ERROR',
        '400',
        error.message,
      );
      throw new TestException(
        generalResponse,
        HttpStatus.BAD_REQUEST,
      );
    }


    let generalResponse: GeneralResponse = new GeneralResponse(
      uti,
      '',
      '',
      '',
    );


    event.event_data.detail.forEach(d => {

      if (MiscUtil.isNullOrWhitespace(d.name)) {
        generalResponse.uti = uti;
        generalResponse.status = 'ERROR';
        generalResponse.code = '400';
        generalResponse.message = 'El campo name no puede estar vacio.';
        throw new TestException(
          generalResponse,
          HttpStatus.BAD_REQUEST,
        );
      }
      if (MiscUtil.isNullOrWhitespace(d.value)) {
        generalResponse.uti = uti;
        generalResponse.status = 'ERROR';
        generalResponse.code = '400';
        generalResponse.message = 'El campo value no puede estar vacio.';
        throw new TestException(
          generalResponse,
          HttpStatus.BAD_REQUEST,
        );
      }
    });

    if (event.event_header.subscriber.startsWith('504')) {
      event.event_header.subscriber = event.event_header.subscriber.substring(3);
    }
    await this.kafkaService.sendMessage(event, uti);

    generalResponse.uti = uti;
    generalResponse.message = 'Service has been Completed Successfully';
    generalResponse.status = 'OK';
    generalResponse.code = '200';
    return generalResponse;
  }

  exploreError( errors ): string
  {
    let retorno = '';
    if(errors[0].constraints)
    {
      retorno = errors[0].constraints[Object.keys(errors[0].constraints)[0]]
      return retorno;
    }
    else if(errors[0].children)
    {
      retorno = this.exploreError(errors[0].children);
      return retorno;
    }
    else
    {
      return retorno;
    }
  }
 
}
