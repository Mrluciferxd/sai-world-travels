import type { SVGProps } from "react";

export type ArrowIconProps = Omit<
  SVGProps<SVGSVGElement>,
  "aria-hidden" | "children" | "viewBox"
>;

export function ArrowIcon(props: ArrowIconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" {...props}>
      <path d="M4 10h11m-4-4 4 4-4 4" />
    </svg>
  );
}
