import type { GroupApplicationDto } from "./GroupApplicationDto";

 export type UserGetApplicationGroupListHeaderParams = {
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
export type UserGetApplicationGroupList200 = GroupApplicationDto;
export type UserGetApplicationGroupListQueryResponse = GroupApplicationDto;
export type UserGetApplicationGroupListQuery = {
    Response: UserGetApplicationGroupListQueryResponse;
    HeaderParams: UserGetApplicationGroupListHeaderParams;
};