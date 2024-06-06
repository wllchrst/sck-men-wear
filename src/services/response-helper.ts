import { IResponse } from "../interfaces/response-interface";

export default class ResponseHelper {
    static create (message: string, success: boolean) {
        const response : IResponse = {
            message: message,
            success: success
        }

        return response;
    }
}