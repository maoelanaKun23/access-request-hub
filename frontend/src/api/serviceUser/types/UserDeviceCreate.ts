import type { UserApplicationDeviceDto } from "./UserApplicationDeviceDto";

 export type UserDeviceCreateHeaderParams = {
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
export type UserDeviceCreate200 = UserApplicationDeviceDto;
/**
 * @description Model of userDevice object.
*/
export type UserDeviceCreateMutationRequest = UserApplicationDeviceDto;
/**
 * @description Request successful.
*/
export type UserDeviceCreateMutationResponse = UserApplicationDeviceDto;
export type UserDeviceCreateMutation = {
    Response: UserDeviceCreateMutationResponse;
    Request: UserDeviceCreateMutationRequest;
    HeaderParams: UserDeviceCreateHeaderParams;
};