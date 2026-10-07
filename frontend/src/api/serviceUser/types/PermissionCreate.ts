import type { PermissionAddDto } from "./PermissionAddDto";

 export type PermissionCreateQueryParams = {
    /**
     * @type string, guid
    */
    applicationId?: string | null;
};
export type PermissionCreateHeaderParams = {
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
export type PermissionCreate200 = string;
export type PermissionCreateMutationRequest = PermissionAddDto;
export type PermissionCreateMutationResponse = string;
export type PermissionCreateMutation = {
    Response: PermissionCreateMutationResponse;
    Request: PermissionCreateMutationRequest;
    QueryParams: PermissionCreateQueryParams;
    HeaderParams: PermissionCreateHeaderParams;
};