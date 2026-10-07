import type { UserDto } from "./UserDto";

 export type CustomerUserGetByIdPathParams = {
    /**
     * @description UserApplicationId of Application.
     * @type string, guid
    */
    userApplicationId: string;
};
export type CustomerUserGetByIdHeaderParams = {
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
export type CustomerUserGetById200 = UserDto;
/**
 * @description Request successful.
*/
export type CustomerUserGetByIdQueryResponse = UserDto;
export type CustomerUserGetByIdQuery = {
    Response: CustomerUserGetByIdQueryResponse;
    PathParams: CustomerUserGetByIdPathParams;
    HeaderParams: CustomerUserGetByIdHeaderParams;
};