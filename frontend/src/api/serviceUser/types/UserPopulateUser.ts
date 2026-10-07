import type { UserLdapDto } from "./UserLdapDto";

 export type UserPopulateUserPathParams = {
    /**
     * @description Username of user application object.
     * @type string
    */
    userName: string;
};
export type UserPopulateUserQueryParams = {
    /**
     * @description Id of application.
     * @type string | undefined, guid
    */
    applicationId?: string;
};
export type UserPopulateUserHeaderParams = {
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
export type UserPopulateUser200 = UserLdapDto;
/**
 * @description Request successful.
*/
export type UserPopulateUserQueryResponse = UserLdapDto;
export type UserPopulateUserQuery = {
    Response: UserPopulateUserQueryResponse;
    PathParams: UserPopulateUserPathParams;
    QueryParams: UserPopulateUserQueryParams;
    HeaderParams: UserPopulateUserHeaderParams;
};