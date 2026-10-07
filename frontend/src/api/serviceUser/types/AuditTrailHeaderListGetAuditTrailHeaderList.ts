import type { AuditTrailListSorting } from "./AuditTrailListSorting";
import type { AuditTrailHeaderDto } from "./AuditTrailHeaderDto";

 export type AuditTrailHeaderListGetAuditTrailHeaderListQueryParams = {
    /**
     * @type string, guid
    */
    id?: string | null;
    /**
     * @default ""
     * @type string | undefined
    */
    Menu?: string;
    /**
     * @default ""
     * @type string | undefined
    */
    UserName?: string;
    /**
     * @default ""
     * @type string | undefined
    */
    Action?: string;
    /**
     * @default ""
     * @type string | undefined
    */
    ResultCode?: string;
    /**
     * @default ""
     * @type string | undefined
    */
    CreateStartDate?: string;
    /**
     * @default ""
     * @type string | undefined
    */
    CreateEndDate?: string;
    /**
     * @default 1
     * @type integer | undefined, int32
    */
    page?: number;
    /**
     * @default 10
     * @type integer | undefined, int32
    */
    pageSize?: number;
    /**
     * @type integer | undefined
    */
    sorting?: AuditTrailListSorting;
};
export type AuditTrailHeaderListGetAuditTrailHeaderListHeaderParams = {
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
export type AuditTrailHeaderListGetAuditTrailHeaderList200 = AuditTrailHeaderDto[];
export type AuditTrailHeaderListGetAuditTrailHeaderListQueryResponse = AuditTrailHeaderDto[];
export type AuditTrailHeaderListGetAuditTrailHeaderListQuery = {
    Response: AuditTrailHeaderListGetAuditTrailHeaderListQueryResponse;
    QueryParams: AuditTrailHeaderListGetAuditTrailHeaderListQueryParams;
    HeaderParams: AuditTrailHeaderListGetAuditTrailHeaderListHeaderParams;
};