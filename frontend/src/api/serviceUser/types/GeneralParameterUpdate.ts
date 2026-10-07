import type { GeneralParameterDto } from "./GeneralParameterDto";

 export type GeneralParameterUpdatePathParams = {
    /**
     * @description Id of general parameter object.
     * @type string, guid
    */
    id: string;
};
export type GeneralParameterUpdateHeaderParams = {
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
export type GeneralParameterUpdate200 = GeneralParameterDto[];
/**
 * @description Model of  general parameter object.
*/
export type GeneralParameterUpdateMutationRequest = GeneralParameterDto;
/**
 * @description Request successful.
*/
export type GeneralParameterUpdateMutationResponse = GeneralParameterDto[];
export type GeneralParameterUpdateMutation = {
    Response: GeneralParameterUpdateMutationResponse;
    Request: GeneralParameterUpdateMutationRequest;
    PathParams: GeneralParameterUpdatePathParams;
    HeaderParams: GeneralParameterUpdateHeaderParams;
};