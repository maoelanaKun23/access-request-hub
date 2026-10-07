import type { ServiceAllDto } from "./ServiceAllDto";

 export type ServiceGetAllHeaderParams = {
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
export type ServiceGetAll200 = ServiceAllDto[];
/**
 * @description Request successful.
*/
export type ServiceGetAllQueryResponse = ServiceAllDto[];
export type ServiceGetAllQuery = {
    Response: ServiceGetAllQueryResponse;
    HeaderParams: ServiceGetAllHeaderParams;
};