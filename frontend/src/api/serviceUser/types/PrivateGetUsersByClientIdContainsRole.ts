import type { UserRoleDto } from "./UserRoleDto";

 export type PrivateGetUsersByClientIdContainsRolePathParams = {
    /**
     * @type string
    */
    clientId: string;
    /**
     * @type string
    */
    roleCode: string;
};
export type PrivateGetUsersByClientIdContainsRoleHeaderParams = {
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
export type PrivateGetUsersByClientIdContainsRole200 = UserRoleDto[];
export type PrivateGetUsersByClientIdContainsRoleQueryResponse = UserRoleDto[];
export type PrivateGetUsersByClientIdContainsRoleQuery = {
    Response: PrivateGetUsersByClientIdContainsRoleQueryResponse;
    PathParams: PrivateGetUsersByClientIdContainsRolePathParams;
    HeaderParams: PrivateGetUsersByClientIdContainsRoleHeaderParams;
};