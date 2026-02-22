import {
  Ban,
  CircleCheckBig,
  CircleDotDashed,
  Ellipsis,
  X,
  LucideIcon,
} from "lucide-react";

export const STATUS_FILTERS = [
  "NIL",
  "PENDING",
  "RESOLVED",
  "REJECTED",
  "INVALID",
] as const;

export type TStatus = (typeof STATUS_FILTERS)[number];

export interface IStatusConfig {
  label: string;
  icon: LucideIcon;
  color: string;
  dotClass: string;
}

export const STATUS_CONFIG: Record<TStatus, IStatusConfig> = {
  PENDING: {
    label: "Pending",
    icon: CircleDotDashed,
    color: "stroke-yellow-400",
    dotClass: "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]",
  },
  RESOLVED: {
    label: "Resolved",
    icon: CircleCheckBig,
    color: "stroke-green-400",
    dotClass: "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]",
  },
  REJECTED: {
    label: "Rejected",
    icon: Ban,
    color: "stroke-red-400",
    dotClass: "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]",
  },
  INVALID: {
    label: "Invalid",
    icon: X,
    color: "stroke-red-400",
    dotClass: "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]",
  },
  NIL: {
    label: "Select Status",
    icon: Ellipsis,
    color: "stroke-neutral-400",
    dotClass: "bg-neutral-300",
  },
};
