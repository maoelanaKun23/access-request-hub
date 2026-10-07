import type { PermissionListDto } from "./PermissionListDto";

 export type PermissionUpdateQueryParams = {
    /**
     * @type string, guid
    */
    applicationId?: string | null;
};
export type PermissionUpdateHeaderParams = {
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
export type PermissionUpdate200 = PermissionListDto;
export type PermissionUpdateMutationRequest = PermissionListDto;
export type PermissionUpdateMutationResponse = PermissionListDto;
export type PermissionUpdateMutation = {
    Response: PermissionUpdateMutationResponse;
    Request: PermissionUpdateMutationRequest;
    QueryParams: PermissionUpdateQueryParams;
    HeaderParams: PermissionUpdateHeaderParams;
};