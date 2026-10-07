import type { UserPlantDto } from "./UserPlantDto";

 export type UserGetUserPlantsHeaderParams = {
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
export type UserGetUserPlants200 = UserPlantDto[];
/**
 * @description Request successful.
*/
export type UserGetUserPlantsQueryResponse = UserPlantDto[];
export type UserGetUserPlantsQuery = {
    Response: UserGetUserPlantsQueryResponse;
    HeaderParams: UserGetUserPlantsHeaderParams;
};