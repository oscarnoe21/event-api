import { HttpException, HttpStatus } from "@nestjs/common";
import { GeneralResponse } from "src/models/general-response";

export class TestException extends HttpException{    
    constructor(
        mensajeError: GeneralResponse,
        httpStatus: HttpStatus,){
        super(mensajeError, httpStatus);
    }

}
