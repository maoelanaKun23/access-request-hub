import type { CustomerApplicationDto } from "./CustomerApplicationDto";

 export type CustomerApplicationUpdatePathParams = {
    /**
     * @description Id of role object.
     * @type string, guid
    */
    id: string;
};
export type CustomerApplicationUpdateHeaderParams = {
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
export type CustomerApplicationUpdate200 = CustomerApplicationDto;
/**
 * @description Model of customer application object.
*/
export type CustomerApplicationUpdateMutationRequest = CustomerApplicationDto;
/**
 * @description Request successful.
*/
export type CustomerApplicationUpdateMutationResponse = CustomerApplicationDto;
export type CustomerApplicationUpdateMutation = {
    Response: CustomerApplicationUpdateMutationResponse;
    Request: CustomerApplicationUpdateMutationRequest;
    PathParams: CustomerApplicationUpdatePathParams;
    HeaderParams: CustomerApplicationUpdateHeaderParams;
};