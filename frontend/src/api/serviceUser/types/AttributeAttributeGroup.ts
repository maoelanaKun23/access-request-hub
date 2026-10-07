import type { AttributeListDto } from "./AttributeListDto";

 export type AttributeAttributeGroupQueryParams = {
    /**
     * @type string, guid
    */
    applicationId?: string | null;
};
export type AttributeAttributeGroupHeaderParams = {
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
export type AttributeAttributeGroup200 = AttributeListDto[];
export type AttributeAttributeGroupQueryResponse = AttributeListDto[];
export type AttributeAttributeGroupQuery = {
    Response: AttributeAttributeGroupQueryResponse;
    QueryParams: AttributeAttributeGroupQueryParams;
    HeaderParams: AttributeAttributeGroupHeaderParams;
};