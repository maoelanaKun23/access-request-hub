import type { UserDeviceInfoDto } from "./UserDeviceInfoDto";

 export type PrivateGetDevicesIdByUserPathParams = {
    /**
     * @description Id of user object.
     * @type string, guid
    */
    userId: string;
    /**
     * @description Id of client object.
     * @type string
    */
    clientId: string;
};
export type PrivateGetDevicesIdByUserHeaderParams = {
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
export type PrivateGetDevicesIdByUser200 = UserDeviceInfoDto;
/**
 * @description Request successful.
*/
export type PrivateGetDevicesIdByUserQueryResponse = UserDeviceInfoDto;
export type PrivateGetDevicesIdByUserQuery = {
    Response: PrivateGetDevicesIdByUserQueryResponse;
    PathParams: PrivateGetDevicesIdByUserPathParams;
    HeaderParams: PrivateGetDevicesIdByUserHeaderParams;
};