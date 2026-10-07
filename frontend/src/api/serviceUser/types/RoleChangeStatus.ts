export type RoleChangeStatusPathParams = {
    /**
     * @description Id of permission object.
     * @type string, guid
    */
    id: string;
    /**
     * @type boolean
    */
    status: boolean;
};
export type RoleChangeStatusHeaderParams = {
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
export type RoleChangeStatus200 = Blob;
/**
 * @description Request successful.
*/
export type RoleChangeStatusMutationResponse = Blob;
export type RoleChangeStatusMutation = {
    Response: RoleChangeStatusMutationResponse;
    PathParams: RoleChangeStatusPathParams;
    HeaderParams: RoleChangeStatusHeaderParams;
};