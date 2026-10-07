import type { CustomerDto } from "./CustomerDto";

 export type CustomerGetAllAllHeaderParams = {
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
export type CustomerGetAllAll200 = CustomerDto[];
/**
 * @description Request successful.
*/
export type CustomerGetAllAllQueryResponse = CustomerDto[];
export type CustomerGetAllAllQuery = {
    Response: CustomerGetAllAllQueryResponse;
    HeaderParams: CustomerGetAllAllHeaderParams;
};