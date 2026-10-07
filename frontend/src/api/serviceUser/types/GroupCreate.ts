import type { GroupDto } from "./GroupDto";

 export type GroupCreateHeaderParams = {
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
export type GroupCreate200 = GroupDto;
/**
 * @description Model of group object.
*/
export type GroupCreateMutationRequest = GroupDto;
/**
 * @description Request successful.
*/
export type GroupCreateMutationResponse = GroupDto;
export type GroupCreateMutation = {
    Response: GroupCreateMutationResponse;
    Request: GroupCreateMutationRequest;
    HeaderParams: GroupCreateHeaderParams;
};