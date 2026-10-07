import type { UserDto } from "./UserDto";

 export type UserGetByIdPathParams = {
    /**
     * @type string, guid
    */
    userApplicationId: string;
};
export type UserGetByIdHeaderParams = {
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
export type UserGetById200 = UserDto;
/**
 * @description Request successful.
*/
export type UserGetByIdQueryResponse = UserDto;
export type UserGetByIdQuery = {
    Response: UserGetByIdQueryResponse;
    PathParams: UserGetByIdPathParams;
    HeaderParams: UserGetByIdHeaderParams;
};