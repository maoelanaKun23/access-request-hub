import type { ServiceDto } from "./ServiceDto";

 export type ServiceGetByIdPathParams = {
    /**
     * @description Id of service object.
     * @type string, guid
    */
    id: string;
};
export type ServiceGetByIdHeaderParams = {
    /**
     * @description Client ID
     * @type string | undefined
    */
    "client-id"?: string;
    /**
     * @description Client Secret
     * @type string | undefined
    */
    "client-secret"?: string;
};
/**
 * @description Request successful.
*/
export type ServiceGetById200 = ServiceDto;
/**
 * @description Request successful.
*/
export type ServiceGetByIdQueryResponse = ServiceDto;
export type ServiceGetByIdQuery = {
    Response: ServiceGetByIdQueryResponse;
    PathParams: ServiceGetByIdPathParams;
    HeaderParams: ServiceGetByIdHeaderParams;
};