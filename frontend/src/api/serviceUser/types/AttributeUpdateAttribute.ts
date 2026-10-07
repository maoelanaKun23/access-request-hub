import type { AttributeValueDto } from "./AttributeValueDto";

 export type AttributeUpdateAttributePathParams = {
    /**
     * @type string, guid
    */
    id: string;
};
export type AttributeUpdateAttributeHeaderParams = {
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
export type AttributeUpdateAttribute200 = string;
/**
 * @description Request failed because of an exception.
*/
export type AttributeUpdateAttribute400 = string;
export type AttributeUpdateAttributeMutationRequest = AttributeValueDto;
/**
 * @description Request successful.
*/
export type AttributeUpdateAttributeMutationResponse = string;
export type AttributeUpdateAttributeMutation = {
    Response: AttributeUpdateAttributeMutationResponse;
    Request: AttributeUpdateAttributeMutationRequest;
    PathParams: AttributeUpdateAttributePathParams;
    HeaderParams: AttributeUpdateAttributeHeaderParams;
    Errors: AttributeUpdateAttribute400;
};