import type { ServiceAllDto } from "./ServiceAllDto";

 export type ServiceGetAllByApplicationIdQueryParams = {
    /**
     * @type string | undefined, guid
    */
    applicationId?: string;
};
export type ServiceGetAllByApplicationIdHeaderParams = {
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
export type ServiceGetAllByApplicationId200 = ServiceAllDto[];
/**
 * @description Request successful.
*/
export type ServiceGetAllByApplicationIdQueryResponse = ServiceAllDto[];
export type ServiceGetAllByApplicationIdQuery = {
    Response: ServiceGetAllByApplicationIdQueryResponse;
    QueryParams: ServiceGetAllByApplicationIdQueryParams;
    HeaderParams: ServiceGetAllByApplicationIdHeaderParams;
};