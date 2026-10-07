import type { CustomerApplicationDto } from "./CustomerApplicationDto";

 export type CustomerApplicationGetByIdPathParams = {
    /**
     * @description Id of role object.
     * @type string, guid
    */
    id: string;
};
export type CustomerApplicationGetByIdHeaderParams = {
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
export type CustomerApplicationGetById200 = CustomerApplicationDto;
/**
 * @description Request successful.
*/
export type CustomerApplicationGetByIdQueryResponse = CustomerApplicationDto;
export type CustomerApplicationGetByIdQuery = {
    Response: CustomerApplicationGetByIdQueryResponse;
    PathParams: CustomerApplicationGetByIdPathParams;
    HeaderParams: CustomerApplicationGetByIdHeaderParams;
};