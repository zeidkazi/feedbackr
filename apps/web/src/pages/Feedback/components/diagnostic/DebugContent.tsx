import { highlight } from "@/lib/shiki-highlight/index.ts";
import { cn } from "@/lib/utils.ts";
import { cva } from "class-variance-authority";
import React, { useEffect, useState } from "react";
import { BundledTheme, StringLiteralUnion } from "shiki";

export const DebugContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={cn(
        `bg-white px-6 py-8 rounded-lg w-full h-full grid md:grid-cols-1 lg:grid-cols-[400px_1fr]`,
        className,
      )}
    >
      {children}
    </section>
  );
};
export const DebugTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <h1 className={cn(`text-sm capitalize`, className)}>{children}</h1>;
};
export const DebugDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span className={cn(`text-sm text-neutral-500`, className)}>
      {children}
    </span>
  );
};
export const DebugLeftSide = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn(`pt-2`, className)}>{children}</div>;
};
export const DebugRightSide = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`pt-2 flex flex-col gap-4 sm:mt-3 md:mt-0`, className)}>
      {children}
    </div>
  );
};
export const CodeSnippet = ({
  children,
  className,
  variant,
  theme,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
  theme?: StringLiteralUnion<BundledTheme, string>;
}) => {
  const variants = cva(
    "text-sm rounded-lg border border-border flex flex-col flex-wrap max-h-[330px] overflow-auto p-4",
    {
      variants: {
        variant: {
          light: "bg-white text-neutral-600 ",
          dark: "bg-foreground text-neutral-400",
        },
      },
      defaultVariants: {
        variant: "light",
      },
    },
  );

  const [code, setCode] = useState("");

  useEffect(() => {
    const fetcher = async () => {
      const highlightedCode = await highlight(
        children?.toString() ?? "",
        theme,
      );
      setCode(highlightedCode);
    };
    fetcher();
  }, []);

  return (
    <>
      {/* <div dangerouslySetInnerHTML={{ __html: code }}></div> */}
      <code
        className={cn(variants({ variant, className }))}
        dangerouslySetInnerHTML={{ __html: code }}
      />
    </>
  );
};
