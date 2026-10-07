import type { AttributeTopicSorting } from "./AttributeTopicSorting";
import type { PaginatedListOfAttributeTopicDto } from "./PaginatedListOfAttributeTopicDto";

 export type AttributeGetTopicQueryParams = {
    /**
     * @description The keyword which filter the list.
     * @default ""
     * @type string
    */
    keyword?: string | null;
    /**
     * @description The page number to be opened (default to 1).
     * @default 1
     * @type integer | undefined, int32
    */
    page?: number;
    /**
     * @description The keyword which filter the list.
     * @default 10
     * @type integer | undefined, int32
    */
    pageSize?: number;
    /**
     * @type integer | undefined
    */
    sorting?: AttributeTopicSorting;
};
export type AttributeGetTopicHeaderParams = {
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
export type AttributeGetTopic200 = PaginatedListOfAttributeTopicDto;
/**
 * @description Request successful.
*/
export type AttributeGetTopicQueryResponse = PaginatedListOfAttributeTopicDto;
export type AttributeGetTopicQuery = {
    Response: AttributeGetTopicQueryResponse;
    QueryParams: AttributeGetTopicQueryParams;
    HeaderParams: AttributeGetTopicHeaderParams;
};