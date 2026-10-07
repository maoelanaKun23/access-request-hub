import type { AttributeValueDto } from "./AttributeValueDto";

 export type AttributeGetAttributeValueByIdPathParams = {
    /**
     * @description Id of AttributeTopic object.
     * @type string, guid
    */
    id: string;
};
export type AttributeGetAttributeValueByIdHeaderParams = {
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
export type AttributeGetAttributeValueById200 = AttributeValueDto;
/**
 * @description Request successful.
*/
export type AttributeGetAttributeValueByIdQueryResponse = AttributeValueDto;
export type AttributeGetAttributeValueByIdQuery = {
    Response: AttributeGetAttributeValueByIdQueryResponse;
    PathParams: AttributeGetAttributeValueByIdPathParams;
    HeaderParams: AttributeGetAttributeValueByIdHeaderParams;
};