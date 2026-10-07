export type GroupChangeStatusPathParams = {
    /**
     * @description Id of group object.
     * @type string, guid
    */
    id: string;
    /**
     * @description Status of group.
     * @type boolean
    */
    status: boolean;
};
export type GroupChangeStatusHeaderParams = {
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
export type GroupChangeStatus200 = Blob;
/**
 * @description Request successful.
*/
export type GroupChangeStatusMutationResponse = Blob;
export type GroupChangeStatusMutation = {
    Response: GroupChangeStatusMutationResponse;
    PathParams: GroupChangeStatusPathParams;
    HeaderParams: GroupChangeStatusHeaderParams;
};