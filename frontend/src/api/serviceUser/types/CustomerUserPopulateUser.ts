import type { UserLdapDto } from "./UserLdapDto";

 export type CustomerUserPopulateUserPathParams = {
    /**
     * @description Username of user.
     * @type string
    */
    userName: string;
};
export type CustomerUserPopulateUserQueryParams = {
    /**
     * @description Id of application.
     * @type string | undefined, guid
    */
    applicationId?: string;
};
export type CustomerUserPopulateUserHeaderParams = {
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
export type CustomerUserPopulateUser200 = UserLdapDto;
/**
 * @description Request successful.
*/
export type CustomerUserPopulateUserQueryResponse = UserLdapDto;
export type CustomerUserPopulateUserQuery = {
    Response: CustomerUserPopulateUserQueryResponse;
    PathParams: CustomerUserPopulateUserPathParams;
    QueryParams: CustomerUserPopulateUserQueryParams;
    HeaderParams: CustomerUserPopulateUserHeaderParams;
};