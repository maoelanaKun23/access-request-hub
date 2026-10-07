import type { UserEmailInfoDto } from "./UserEmailInfoDto";

 export type PrivateGetEmailByUserPathParams = {
    /**
     * @description Id of user object.
     * @type string, guid
    */
    userId: string;
};
export type PrivateGetEmailByUserHeaderParams = {
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
export type PrivateGetEmailByUser200 = UserEmailInfoDto;
/**
 * @description Request successful.
*/
export type PrivateGetEmailByUserQueryResponse = UserEmailInfoDto;
export type PrivateGetEmailByUserQuery = {
    Response: PrivateGetEmailByUserQueryResponse;
    PathParams: PrivateGetEmailByUserPathParams;
    HeaderParams: PrivateGetEmailByUserHeaderParams;
};