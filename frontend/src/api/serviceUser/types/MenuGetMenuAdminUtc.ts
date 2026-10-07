import type { CustomerDto } from "./CustomerDto";

 export type MenuGetMenuAdminUtcPathParams = {
    /**
     * @type string
    */
    menu: string;
};
export type MenuGetMenuAdminUtcHeaderParams = {
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
export type MenuGetMenuAdminUtc200 = CustomerDto[];
export type MenuGetMenuAdminUtcQueryResponse = CustomerDto[];
export type MenuGetMenuAdminUtcQuery = {
    Response: MenuGetMenuAdminUtcQueryResponse;
    PathParams: MenuGetMenuAdminUtcPathParams;
    HeaderParams: MenuGetMenuAdminUtcHeaderParams;
};