import type { GroupDto } from "./GroupDto";

 export type GroupUpdatePathParams = {
    /**
     * @description Id of group object.
     * @type string, guid
    */
    id: string;
};
export type GroupUpdateHeaderParams = {
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
export type GroupUpdate200 = GroupDto;
/**
 * @description Model of group object.
*/
export type GroupUpdateMutationRequest = GroupDto;
/**
 * @description Request successful.
*/
export type GroupUpdateMutationResponse = GroupDto;
export type GroupUpdateMutation = {
    Response: GroupUpdateMutationResponse;
    Request: GroupUpdateMutationRequest;
    PathParams: GroupUpdatePathParams;
    HeaderParams: GroupUpdateHeaderParams;
};