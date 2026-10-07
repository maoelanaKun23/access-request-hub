import type { GroupStatus } from "./GroupStatus";
import type { PaginatedListOfGroupDto } from "./PaginatedListOfGroupDto";

 export type GroupGetAllPathParams = {
    /**
     * @description Id of Application.
     * @type string, guid
    */
    applicationId: string;
};
export type GroupGetAllQueryParams = {
    /**
     * @type integer | undefined
    */
    status?: GroupStatus;
};
export type GroupGetAllHeaderParams = {
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
export type GroupGetAll200 = PaginatedListOfGroupDto;
/**
 * @description Request successful.
*/
export type GroupGetAllQueryResponse = PaginatedListOfGroupDto;
export type GroupGetAllQuery = {
    Response: GroupGetAllQueryResponse;
    PathParams: GroupGetAllPathParams;
    QueryParams: GroupGetAllQueryParams;
    HeaderParams: GroupGetAllHeaderParams;
};