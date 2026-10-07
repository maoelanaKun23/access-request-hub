export type UserChangeStatusMfaPathParams = {
    /**
     * @type string, guid
    */
    userApplicationId: string;
    /**
     * @type boolean
    */
    status: boolean;
};
export type UserChangeStatusMfaHeaderParams = {
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
export type UserChangeStatusMfa200 = Blob;
export type UserChangeStatusMfaMutationResponse = Blob;
export type UserChangeStatusMfaMutation = {
    Response: UserChangeStatusMfaMutationResponse;
    PathParams: UserChangeStatusMfaPathParams;
    HeaderParams: UserChangeStatusMfaHeaderParams;
};