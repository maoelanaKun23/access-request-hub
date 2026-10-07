export type UserResetMfaPathParams = {
    /**
     * @type string, guid
    */
    userApplicationId: string;
};
export type UserResetMfaHeaderParams = {
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
export type UserResetMfa200 = Blob;
export type UserResetMfaMutationResponse = Blob;
export type UserResetMfaMutation = {
    Response: UserResetMfaMutationResponse;
    PathParams: UserResetMfaPathParams;
    HeaderParams: UserResetMfaHeaderParams;
};