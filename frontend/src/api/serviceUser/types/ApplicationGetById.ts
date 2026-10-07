import type { ApplicationDto } from "./ApplicationDto";

 export type ApplicationGetByIdPathParams = {
    /**
     * @description Id of application object.
     * @type string, guid
    */
    id: string;
};
export type ApplicationGetByIdHeaderParams = {
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
export type ApplicationGetById200 = ApplicationDto;
/**
 * @description Request successful.
*/
export type ApplicationGetByIdQueryResponse = ApplicationDto;
export type ApplicationGetByIdQuery = {
    Response: ApplicationGetByIdQueryResponse;
    PathParams: ApplicationGetByIdPathParams;
    HeaderParams: ApplicationGetByIdHeaderParams;
};