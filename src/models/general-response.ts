export class GeneralResponse {

    /**
     * 
     * @param uti 
     * @param status 
     * @param code 
     * @param message 
     */
    constructor(
        uti: string,
        status: string,
        code: string,
        message: string,
    
    ) {
        this.uti = uti;
        this.status = status;
        this.code = code;
        this.message = message
    }
    uti: string;
    status: string;
    code: string;
    message: string;
}
