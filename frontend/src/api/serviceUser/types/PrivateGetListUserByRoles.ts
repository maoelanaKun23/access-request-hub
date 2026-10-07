import type { UserEmailDto } from "./UserEmailDto";

 export type PrivateGetListUserByRolesQueryParams = {
    /**
     * @type string | undefined
    */
    roleCode?: string;
    /**
     * @default ""
     * @type string | undefined
    */
    keyword?: string;
    /**
     * @default 1
     * @type integer | undefined, int32
    */
    page?: number;
    /**
     * @default 10
     * @type integer | undefined, int32
    */
    pageSize?: number;
};
export type PrivateGetListUserByRolesHeaderParams = {
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
export type PrivateGetListUserByRoles200 = UserEmailDto[];
export type PrivateGetListUserByRolesQueryResponse = UserEmailDto[];
export type PrivateGetListUserByRolesQuery = {
    Response: PrivateGetListUserByRolesQueryResponse;
    QueryParams: PrivateGetListUserByRolesQueryParams;
    HeaderParams: PrivateGetListUserByRolesHeaderParams;
};