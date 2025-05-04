import { SVGProps } from "react";

export const CrossOutline = ({
  className,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    className={className}
    {...props}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      d="m6 6l12 12m0-12L6 18"
    ></path>
  </svg>
);
export const ChatBubbleBottomCenterText16Solid = ({
  className,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width="1em"
    height="1em"
    {...props}
    className={className}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1 8.74c0 .983.713 1.825 1.69 1.943q1.357.163 2.737.243c.363.02.688.231.85.556l1.052 2.103a.75.75 0 0 0 1.342 0l1.052-2.103c.162-.325.487-.535.85-.556q1.38-.08 2.738-.243C14.287 10.565 15 9.723 15 8.74V4.259c0-.982-.713-1.824-1.69-1.942a44.5 44.5 0 0 0-10.62 0C1.712 2.435 1 3.277 1 4.26zm3-3.49a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 4 5.25M4.75 7a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5z"
      clipRule="evenodd"
    ></path>
  </svg>
);
