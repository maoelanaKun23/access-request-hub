import type { RoleLevelAuthorityDto } from "./RoleLevelAuthorityDto";

 export type RoleGetRoleLevelByApplicationIdPathParams = {
    /**
     * @description Guid
     * @type string, guid
    */
    applicationId: string;
};
export type RoleGetRoleLevelByApplicationIdHeaderParams = {
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
export type RoleGetRoleLevelByApplicationId200 = RoleLevelAuthorityDto;
/**
 * @description Request successful.
*/
export type RoleGetRoleLevelByApplicationIdQueryResponse = RoleLevelAuthorityDto;
export type RoleGetRoleLevelByApplicationIdQuery = {
    Response: RoleGetRoleLevelByApplicationIdQueryResponse;
    PathParams: RoleGetRoleLevelByApplicationIdPathParams;
    HeaderParams: RoleGetRoleLevelByApplicationIdHeaderParams;
};