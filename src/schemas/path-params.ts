import { IsNumberString } from "class-validator";

export class PathParams {
    @IsNumberString({}, { message: 'El consumer no es valido.' })
    consumer: string;
}
