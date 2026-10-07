export type UserChangeStatusPathParams = {
    /**
     * @type string, guid
    */
    userApplicationId: string;
    /**
     * @type boolean
    */
    status: boolean;
};
export type UserChangeStatusHeaderParams = {
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
export type UserChangeStatus200 = Blob;
/**
 * @description Request successful.
*/
export type UserChangeStatusMutationResponse = Blob;
export type UserChangeStatusMutation = {
    Response: UserChangeStatusMutationResponse;
    PathParams: UserChangeStatusPathParams;
    HeaderParams: UserChangeStatusHeaderParams;
};