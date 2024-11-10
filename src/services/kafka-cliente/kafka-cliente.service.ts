import { KafkaUtils, MiscUtil } from '@jimy.velasquez2/hn-innovation-utils';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CatcherEvent } from '../../schemas/catcher-event';
import { logging } from '@jimy.velasquez/npm-logging-ts';
import { TestException } from '../../exceptions/test-exception';
import { GeneralResponse } from '../../models/general-response';

@Injectable()
export class KafkaClienteService {

    /**
     * 
     * @param configService 
     */

    constructor(private readonly configService: ConfigService) {

    }

    /**
     * 
     * @param msgToSend 
     * @param uti 
     */
    async sendMessage(msgToSend: CatcherEvent, uti: string): Promise<boolean> {
        try {
            let value = '';
            for (let d of msgToSend.event_data.detail) {
                if (d.name === 'enrichment_event') {
                    value = d.value;
                    break;
                }
            }
            if (MiscUtil.existsInList(this.configService.get('LIST_EVENTS_ENRICHCEMENT'), msgToSend.event_header.event_name, ',') && value !== 'true') {
                await KafkaUtils.sendKafkaMessage(
                    this.configService.get('TOPIC_SERVER'),
                    this.configService.get('TOPIC_NAME_ENRICH'),
                    this.configService.get('TOPIC_CLIENT_ID'),
                    JSON.stringify(msgToSend),
                    uti);
            }
            else
            {
                await KafkaUtils.sendKafkaMessage(
                    this.configService.get('TOPIC_SERVER'),
                    this.configService.get('TOPIC_NAME_PREFIX') + msgToSend.event_header.event_name.toLowerCase(),
                    this.configService.get('TOPIC_CLIENT_ID'),
                    JSON.stringify(msgToSend),
                    uti);
            }
            
            logging.business('api catcher', 'Envio del mensaje al topico', msgToSend);

        }
        catch (error) {
            logging.logException('api catcher', error, 'Error al enviar el mensaje al topico');
            let generalResponse: GeneralResponse = new GeneralResponse(uti, 'ERROR', '503', 'Error al enviar el mensaje al topico');
            throw new TestException(
                generalResponse,
                HttpStatus.SERVICE_UNAVAILABLE,)
        }
        return true;

    }
}
