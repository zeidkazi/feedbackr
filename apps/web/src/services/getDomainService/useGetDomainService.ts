import { handleGlobalGetRequestQuery } from "@/utils/httpFuntions.ts";
import { API_URLS } from "@repo/common/apiUrls";
import { CACHE_KEYS } from "@repo/common/queryCacheKeys";
import { useQuery } from "@tanstack/react-query";
import { IGetDomainsResponse } from "./useGetDomainService.types.ts";

const useGetDomainService = () => {
  const getDomainService = useQuery<IGetDomainsResponse>({
    queryKey: [CACHE_KEYS?.GET_DOMAINS],
    queryFn: () => handleGlobalGetRequestQuery({ url: API_URLS?.DOMAIN }),
    refetchOnMount: "always",
  });

  return {
    services: { getDomainService },
  };
};

export default useGetDomainService;
