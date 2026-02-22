import { cn } from "@/lib/utils.ts";
import { FeedbackDeleteSection } from "@/pages/Feedback/components/FeedbackDeleteSection.tsx";
import { IFeedback } from "@/services/getFeedbackService/useGetFeedbackService.types.ts";
import { STATUS_CONFIG, TStatus } from "@/utils/statusColorConfig.ts";
import {
  Button,
  CopyButton,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Ellipsis,
  ExternalLink,
} from "lucide-react";
import moment from "moment";
import { Link, useParams } from "react-router";

export const columns: ColumnDef<IFeedback>[] = [
  {
    id: "status-dot",
    header: "",
    size: 20,
    cell: ({ row }) => {
      const status = (row.getValue("status") as TStatus) || "NIL";
      const { dotClass } = STATUS_CONFIG[status] || STATUS_CONFIG.NIL;

      return (
        <div className="flex items-center justify-center">
          <div className={`h-2 w-2 rounded-full ${dotClass}`} />
        </div>
      );
    },
  },

  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => {
      const message = row.getValue("message") as string;

      return (
        <p className="max-w-[450px] truncate text-xs text-muted-foreground">
          {message}
        </p>
      );
    },
  },

  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email: string = row.getValue("email");

      return (
        <div className="flex items-center gap-2">
          <span className="truncate max-w-[200px] text-xs text-muted-foreground">
            {email}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "url",
    header: "Page",
    cell: ({ row }) => {
      const url = row.getValue("url") as string;

      return (
        <div className="inline-flex items-center gap-x-2">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            {url}
            <ExternalLink className="size-3" />
          </a>
          <CopyButton value={url} />
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = (row.getValue("status") as TStatus) || "NIL";
      const {
        icon: Icon,
        color,
        label,
      } = STATUS_CONFIG[status] || STATUS_CONFIG.NIL;

      return (
        <div className="flex items-center gap-1.5">
          <Icon className={`size-3.5 stroke-3 ${color}`} />
          <span className="text-xs font-medium text-muted-foreground">
            {label}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "updatedAt",
    header: "Last Activity",
    cell: ({ row }) => {
      const dateStr = row.getValue("updatedAt") as string;

      return (
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="size-3" />
          <span className="text-xs">{moment(dateStr).fromNow()}</span>
        </div>
      );
    },
  },

  {
    id: "actions",
    header: "",
    cell: ({ row, table }) => {
      const feedbackId = row.original.id;
      const { domainId } = useParams<{ domainId: string }>();
      const { onEdit, onDelete } = table.options.meta as any;
      return (
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="outline"
            className="h-7 px-2 cursor-pointer text-[11px] text-muted-foreground hover:text-foreground"
            asChild
          >
            <Link to={`/dashboard/${domainId}/feedbacks/${feedbackId}`}>
              View
              <ArrowRight className="size-3.5 ml-1" />
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 cursor-pointer text-muted-foreground hover:text-foreground"
              >
                <Ellipsis className="size-3.5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="border-border">
              <DropdownMenuItem
                className={cn(
                  `focus:bg-neutral-200 text-neutral-700! hover:bg-muted! hover:text-neutral-700! font-medium group`,
                )}
                onClick={() => {
                  onEdit({
                    status: "RESOLVED",
                    feedbackId,
                  });
                }}
              >
                Mark as resolved
              </DropdownMenuItem>

              <DropdownMenuItem
                className={cn(
                  `focus:bg-neutral-200 text-destructive! hover:bg-muted! hover:text-destructive! font-medium group`,
                )}
                onClick={() => {
                  onDelete({ feedbackId });
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
