import type { AuditTrailHeaderMenuDto } from "./AuditTrailHeaderMenuDto";

 export type AuditTrailHeaderListGetAuditTraiHeaderMenuListQueryParams = {
    /**
     * @default ""
     * @type string | undefined
    */
    Menu?: string;
};
export type AuditTrailHeaderListGetAuditTraiHeaderMenuListHeaderParams = {
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
export type AuditTrailHeaderListGetAuditTraiHeaderMenuList200 = AuditTrailHeaderMenuDto[];
export type AuditTrailHeaderListGetAuditTraiHeaderMenuListQueryResponse = AuditTrailHeaderMenuDto[];
export type AuditTrailHeaderListGetAuditTraiHeaderMenuListQuery = {
    Response: AuditTrailHeaderListGetAuditTraiHeaderMenuListQueryResponse;
    QueryParams: AuditTrailHeaderListGetAuditTraiHeaderMenuListQueryParams;
    HeaderParams: AuditTrailHeaderListGetAuditTraiHeaderMenuListHeaderParams;
};