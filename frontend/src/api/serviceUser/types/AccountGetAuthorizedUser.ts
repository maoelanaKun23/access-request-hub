import type { AuthUserDto } from "./AuthUserDto";

 export type AccountGetAuthorizedUserHeaderParams = {
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
export type AccountGetAuthorizedUser200 = AuthUserDto;
export type AccountGetAuthorizedUserQueryResponse = AuthUserDto;
export type AccountGetAuthorizedUserQuery = {
    Response: AccountGetAuthorizedUserQueryResponse;
    HeaderParams: AccountGetAuthorizedUserHeaderParams;
};