export type UserUpdateUserApplicationPathParams = {
    /**
     * @type integer, int32
    */
    termVersion: number;
};
export type UserUpdateUserApplicationHeaderParams = {
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
export type UserUpdateUserApplication200 = Blob;
/**
 * @description Request successful.
*/
export type UserUpdateUserApplicationMutationResponse = Blob;
export type UserUpdateUserApplicationMutation = {
    Response: UserUpdateUserApplicationMutationResponse;
    PathParams: UserUpdateUserApplicationPathParams;
    HeaderParams: UserUpdateUserApplicationHeaderParams;
};