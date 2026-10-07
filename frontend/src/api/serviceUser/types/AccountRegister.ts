import type { UserRegisterDto } from "./UserRegisterDto";

 export type AccountRegisterHeaderParams = {
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
export type AccountRegister200 = Blob;
/**
 * @description Model of user register object.
*/
export type AccountRegisterMutationRequest = UserRegisterDto;
/**
 * @description Request successful.
*/
export type AccountRegisterMutationResponse = Blob;
export type AccountRegisterMutation = {
    Response: AccountRegisterMutationResponse;
    Request: AccountRegisterMutationRequest;
    HeaderParams: AccountRegisterHeaderParams;
};