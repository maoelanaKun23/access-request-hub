import type { AttributeListDto } from "./AttributeListDto";

 export type AttributeGetQueryParams = {
    /**
     * @type string, guid
    */
    applicationId?: string | null;
};
export type AttributeGetHeaderParams = {
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
export type AttributeGet200 = AttributeListDto[];
export type AttributeGetQueryResponse = AttributeListDto[];
export type AttributeGetQuery = {
    Response: AttributeGetQueryResponse;
    QueryParams: AttributeGetQueryParams;
    HeaderParams: AttributeGetHeaderParams;
};