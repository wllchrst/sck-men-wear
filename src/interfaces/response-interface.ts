export interface IResponse {
    message: string;
    success: boolean;
}

export function createResponse(message: string, success: boolean): IResponse {
    const response: IResponse = {
        message: message,
        success: success
    }

    return response
}