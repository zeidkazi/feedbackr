interface IClientContext {
  os: string;
  browser: string;
}

interface IDebugContext {
  errors: [
    {
      type: string;
      error: string;
      stackTrace: string;
    },
  ];
  network: [
    {
      url: string;
      method: string;
      payload: Record<string, any>;
      response: any;
      status: number | string;
      duration: string;
    },
  ];
}

interface IDomain {
  name: string;
  status: string;
}

type TFeedbackStatus = "PENDING" | "RESOLVED" | "REJECTED" | "INVALID" | "NIL";
type TPriorityStatus = "URGENT" | "LOW" | "MEDIUM" | "HIGH" | "NIL";

interface IFeedback {
  id: string;
  url: string;
  message: string;
  email: string;
  status: TFeedbackStatus;
  priority: TPriorityStatus;
  comment: string;
  createdAt: string;
  updatedAt: string;
  clientContext: IClientContext;
  debugContext: IDebugContext;
  domainId: string;
  images: any[];
  domain: IDomain;
}

interface IFeedbacksResponse {
  data: IFeedback[];
  message: string;
}

export type {
  IClientContext,
  IDebugContext,
  IDomain,
  IFeedback,
  IFeedbacksResponse,
  TFeedbackStatus,
  TPriorityStatus,
};
