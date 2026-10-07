import type { GeneralParameterDto } from "./GeneralParameterDto";

 export type GeneralParameterCreateHeaderParams = {
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
export type GeneralParameterCreate200 = GeneralParameterDto[];
/**
 * @description Model of general parameter object.
*/
export type GeneralParameterCreateMutationRequest = GeneralParameterDto;
/**
 * @description Request successful.
*/
export type GeneralParameterCreateMutationResponse = GeneralParameterDto[];
export type GeneralParameterCreateMutation = {
    Response: GeneralParameterCreateMutationResponse;
    Request: GeneralParameterCreateMutationRequest;
    HeaderParams: GeneralParameterCreateHeaderParams;
};