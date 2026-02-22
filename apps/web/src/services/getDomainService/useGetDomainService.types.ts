import { ApiResponse } from "@repo/common/types";

export type ApiDomainStatus = "ACTIVE" | "INACTIVE" | "PAUSED";

export type TDomainStatusUpdateResponse = {
  data: {
    name: string;
    status: ApiDomainStatus;

    updatedAt: Date;
  };
  message: string;
  status: number;
};

export interface IDomainType {
  id: string;
  clientId: string;
  name: string;
  url: string;
  userId: string;
  status: ApiDomainStatus;
  feedbacksCount: number;
  createdAt: string;
  updatedAt: string;
}

export type IGetDomainsResponse = ApiResponse<IDomainType[]>;

interface IDomainResponse {
  data: {
    clientId: string;
    domainId: string;
  };
  message: string;
  status: number;
}

export type { IDomainResponse };
