import type { RoleDto } from "./RoleDto";

 export type RoleGetByIdPathParams = {
    /**
     * @description Id of role object.
     * @type string, guid
    */
    id: string;
};
export type RoleGetByIdHeaderParams = {
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
export type RoleGetById200 = RoleDto;
/**
 * @description Request successful.
*/
export type RoleGetByIdQueryResponse = RoleDto;
export type RoleGetByIdQuery = {
    Response: RoleGetByIdQueryResponse;
    PathParams: RoleGetByIdPathParams;
    HeaderParams: RoleGetByIdHeaderParams;
};