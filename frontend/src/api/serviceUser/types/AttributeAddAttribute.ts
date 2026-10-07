import type { AttributeValueDto } from "./AttributeValueDto";

 export type AttributeAddAttributeHeaderParams = {
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
export type AttributeAddAttribute200 = string;
/**
 * @description Request failed because of an exception.
*/
export type AttributeAddAttribute400 = string;
export type AttributeAddAttributeMutationRequest = AttributeValueDto;
/**
 * @description Request successful.
*/
export type AttributeAddAttributeMutationResponse = string;
export type AttributeAddAttributeMutation = {
    Response: AttributeAddAttributeMutationResponse;
    Request: AttributeAddAttributeMutationRequest;
    HeaderParams: AttributeAddAttributeHeaderParams;
    Errors: AttributeAddAttribute400;
};