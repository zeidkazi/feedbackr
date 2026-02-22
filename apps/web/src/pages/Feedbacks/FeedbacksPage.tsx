import { ConfirmDialog } from "@/components/ConfirmDialog.tsx";
import { SectionLayout } from "@/components/Layouts/SectionLayout.tsx";
import {
  TopbarContainer,
  TopbarGroup,
} from "@/components/Layouts/TopbarLayout.tsx";
import PageLoader from "@/components/Loaders/PageLoader.tsx";
import MainPagesLayout from "@/components/MainPagesLayout.tsx";
import { useDeleteFeedback } from "@/hooks/useDeleteFeedback.ts";
import { useEditFeedback } from "@/hooks/useEditFeedback.ts";
import { queryClientGlobal } from "@/lib/tanstack-query/client.ts";
import useGetFeedbackService from "@/services/getFeedbackService/useGetFeedbackService.ts";
import { TFeedbackStatus } from "@/services/getFeedbackService/useGetFeedbackService.types.ts";
import { CACHE_KEYS } from "@repo/common/queryCacheKeys";
import {
  DataTable,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@repo/ui";
import { SearchIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useParams } from "react-router";
import { columns } from "./components/Columns.tsx";

export const FeedbacksPage = () => {
  const {
    mutations: { updateFeedbackStatusMutation },
  } = useEditFeedback();
  const params = useParams<{ domainId: string }>();
  const {
    services: { getFeedbackService },
  } = useGetFeedbackService({
    domainId: params.domainId ?? "",
  });

  const {
    mutations: { deleteFeedbackMutation },
  } = useDeleteFeedback();

  const [open, setOpen] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<
    string | undefined
  >();

  const feedbackData = getFeedbackService?.data?.data || [];

  const handleEdit = useCallback(
    ({
      status,
      feedbackId,
    }: {
      status: TFeedbackStatus;
      feedbackId: string;
    }) => {
      updateFeedbackStatusMutation.mutate({ status, feedbackId });
      queryClientGlobal.invalidateQueries({
        queryKey: [CACHE_KEYS.GET_FEEDBACKS, params.domainId ?? ""],
      });
    },
    [updateFeedbackStatusMutation],
  );

  const handleDelete = ({ feedbackId }: { feedbackId: string }) => {
    setOpen(true);
    setSelectedFeedbackId(feedbackId);
  };

  if (getFeedbackService?.isLoading) return <PageLoader />;
  return (
    <>
      <MainPagesLayout>
        <TopbarContainer title="Feedbacks">
          <TopbarGroup>
            <InputGroup className="h-8">
              <InputGroupInput
                placeholder="Search Feedback"
                className="placeholder:text-neutral-500 text-foreground"
              />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={"outline"}
                  size={"sm"}
                  className="cursor-pointer text-neutral-500 hover:text-neutral-600"
                >
                  <Funnel />
                  Filters
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="border-border">
                {filterOptions.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    asChild
                    className={cn(
                      `focus:bg-neutral-200 text-neutral-700! hover:bg-muted! hover:text-neutral-700! font-medium group`,
                    )}
                  >
                    <div className="flex justify-between w-full cursor-pointer">
                      <div className="flex items-center gap-x-1">
                        <p className="text-xs capitalize">{option}</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu> */}
          </TopbarGroup>
        </TopbarContainer>
        <SectionLayout>
          <div className="space-y-8">
            <div className="border border-border rounded-md">
              <DataTable
                columns={columns}
                data={feedbackData}
                meta={{
                  onEdit: handleEdit,
                  onDelete: handleDelete,
                }}
              />
            </div>
          </div>
        </SectionLayout>
        <ConfirmDialog
          open={open}
          onOpenChange={() => setOpen((prev) => !prev)}
          title="Delete feedback permanently?"
          description="This action will permanently delete the feedback and cannot be undone."
          confirmLabel="Delete"
          cancelLabel="Cancel"
          variant="ghost"
          onConfirm={() => {
            if (!selectedFeedbackId) return;
            deleteFeedbackMutation.mutate(
              { feedbackId: selectedFeedbackId },
              {
                onSuccess: () => {
                  queryClientGlobal.invalidateQueries({
                    queryKey: [CACHE_KEYS.GET_FEEDBACKS, params.domainId ?? ""],
                  });
                  setSelectedFeedbackId(undefined);
                },
              },
            );
          }}
        />
      </MainPagesLayout>
    </>
  );
};
