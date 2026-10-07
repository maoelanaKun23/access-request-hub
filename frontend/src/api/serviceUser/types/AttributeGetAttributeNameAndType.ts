import type { AttributeNameAndTypeDto } from "./AttributeNameAndTypeDto";

 export type AttributeGetAttributeNameAndTypeHeaderParams = {
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
export type AttributeGetAttributeNameAndType200 = AttributeNameAndTypeDto[];
/**
 * @description Request successful.
*/
export type AttributeGetAttributeNameAndTypeQueryResponse = AttributeNameAndTypeDto[];
export type AttributeGetAttributeNameAndTypeQuery = {
    Response: AttributeGetAttributeNameAndTypeQueryResponse;
    HeaderParams: AttributeGetAttributeNameAndTypeHeaderParams;
};