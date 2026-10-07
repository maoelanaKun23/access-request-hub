import type { CustomerApplicationDto } from "./CustomerApplicationDto";

 export type CustomerApplicationCreateHeaderParams = {
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
export type CustomerApplicationCreate200 = CustomerApplicationDto;
/**
 * @description Model of customer application object.
*/
export type CustomerApplicationCreateMutationRequest = CustomerApplicationDto;
/**
 * @description Request successful.
*/
export type CustomerApplicationCreateMutationResponse = CustomerApplicationDto;
export type CustomerApplicationCreateMutation = {
    Response: CustomerApplicationCreateMutationResponse;
    Request: CustomerApplicationCreateMutationRequest;
    HeaderParams: CustomerApplicationCreateHeaderParams;
};