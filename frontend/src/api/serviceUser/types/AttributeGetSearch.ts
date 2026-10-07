import type { AttributeSearchSuggestionDto } from "./AttributeSearchSuggestionDto";

 export type AttributeGetSearchQueryParams = {
    /**
     * @type string | undefined
    */
    attributeName?: string;
    /**
     * @type string | undefined
    */
    keyword?: string;
    /**
     * @default 5
     * @type integer, int32
    */
    size?: number | null;
};
export type AttributeGetSearchHeaderParams = {
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
export type AttributeGetSearch200 = AttributeSearchSuggestionDto[];
/**
 * @description Request failed because of an exception.
*/
export type AttributeGetSearch400 = string;
/**
 * @description Request successful.
*/
export type AttributeGetSearchQueryResponse = AttributeSearchSuggestionDto[];
export type AttributeGetSearchQuery = {
    Response: AttributeGetSearchQueryResponse;
    QueryParams: AttributeGetSearchQueryParams;
    HeaderParams: AttributeGetSearchHeaderParams;
    Errors: AttributeGetSearch400;
};