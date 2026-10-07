import type { EmailNotifUsersListDto } from "./EmailNotifUsersListDto";

 export type PrivateGetListNotificationEmailPathParams = {
    /**
     * @type string
    */
    branchCode: string;
};
export type PrivateGetListNotificationEmailQueryParams = {
    /**
     * @type string | undefined
    */
    type?: string;
};
export type PrivateGetListNotificationEmailHeaderParams = {
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
export type PrivateGetListNotificationEmail200 = EmailNotifUsersListDto;
export type PrivateGetListNotificationEmailQueryResponse = EmailNotifUsersListDto;
export type PrivateGetListNotificationEmailQuery = {
    Response: PrivateGetListNotificationEmailQueryResponse;
    PathParams: PrivateGetListNotificationEmailPathParams;
    QueryParams: PrivateGetListNotificationEmailQueryParams;
    HeaderParams: PrivateGetListNotificationEmailHeaderParams;
};