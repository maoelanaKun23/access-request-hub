export type AccountCheckIsResetPasswordPathParams = {
    /**
     * @type string
    */
    username: string;
};
export type AccountCheckIsResetPasswordHeaderParams = {
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
export type AccountCheckIsResetPassword200 = Blob;
export type AccountCheckIsResetPasswordQueryResponse = Blob;
export type AccountCheckIsResetPasswordQuery = {
    Response: AccountCheckIsResetPasswordQueryResponse;
    PathParams: AccountCheckIsResetPasswordPathParams;
    HeaderParams: AccountCheckIsResetPasswordHeaderParams;
};