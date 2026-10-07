import type { GroupDto } from "./GroupDto";

 export type GroupGetByIdPathParams = {
    /**
     * @description Id of group object.
     * @type string, guid
    */
    id: string;
};
export type GroupGetByIdHeaderParams = {
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
export type GroupGetById200 = GroupDto;
/**
 * @description Request successful.
*/
export type GroupGetByIdQueryResponse = GroupDto;
export type GroupGetByIdQuery = {
    Response: GroupGetByIdQueryResponse;
    PathParams: GroupGetByIdPathParams;
    HeaderParams: GroupGetByIdHeaderParams;
};