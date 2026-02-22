import { useQuery } from "@tanstack/react-query";
import { CACHE_KEYS } from "@repo/common/queryCacheKeys";
import { API_URLS } from "@repo/common/apiUrls";
import { handleGlobalGetRequestQuery } from "@/utils/httpFuntions.ts";
import { IFeedbacksResponse } from "./useGetFeedbackService.types.ts";

const useGetFeedbackService = ({ domainId }: { domainId: string }) => {
  const getFeedbackService = useQuery<IFeedbacksResponse>({
    queryKey: [CACHE_KEYS?.GET_FEEDBACKS, domainId],
    queryFn: () =>
      handleGlobalGetRequestQuery({
        url: API_URLS?.FEEDBACK,
        searchParams: { domainId: domainId },
      }),
    refetchOnMount: "always",
    enabled: !!domainId,
  });

  return {
    services: { getFeedbackService },
  };
};

export default useGetFeedbackService;
