import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNotEmptyObject, IsNumberString, ValidateNested } from "class-validator";

export class Detail {
    @IsNotEmpty({ message: 'El campo name no puede estar vacio.' })
    name: string;

    @IsNotEmpty({ message: 'El campo value no puede estar vacio.' })
    value: string;
}

export class EventData {

    @IsArray({ message: 'El Detail debe ser un arreglo' })
    detail: Detail[];

    
    
}

export class EventHeader {
    @IsNumberString({}, { message: 'El subscriber no es valido.' })
    subscriber: string;

    @IsNumberString({}, { message: 'El accountid no es valido.' })
    accountid: string;

    @IsNotEmpty({ message: 'El campo event_type no puede estar vacio.' })
    event_type: string;

    @IsNotEmpty({ message: 'El campo event_name no puede estar vacio.' })
    event_name: string;

    @IsNotEmpty({ message: 'El campo event_source no puede estar vacio.' })
    event_source: string;

    @IsNotEmpty({ message: 'El campo event_id no puede estar vacio.' })
    event_id: string;

    @IsNotEmpty({ message: 'El campo event_time no puede estar vacio.' })
    event_time: string;

    @IsNotEmpty({ message: 'El campo domain no puede estar vacio.' })
    domain: string;

    @IsNotEmpty({ message: 'El campo version no puede estar vacio.' })
    version: string;
}
export class CatcherEvent {

    @ValidateNested()
    @Type(() => EventData)
    @IsNotEmptyObject({ nullable: false }, { message: 'El campo event_data no puede estar vacio.' })
    event_data: EventData;

    @ValidateNested()
    @Type(() => EventHeader)
    @IsNotEmptyObject({ nullable: false }, { message: 'El campo event_header no puede estar vacio.' })
     event_header: EventHeader;
  
}






