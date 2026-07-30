import type { IconName } from "@/lib/tools";

const PATHS: Record<IconName, React.ReactNode> = {
  bolt: <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" />,
  shield: (
    <>
      <path d="M12 3 5 6v5.5c0 4.3 2.9 8.3 7 9.5 4.1-1.2 7-5.2 7-9.5V6l-7-3Z" />
      <path d="m9.2 12.2 2 2 3.6-3.9" />
    </>
  ),
  hd: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M7.5 9.5v5M7.5 12h3m0-2.5v5M14 9.5v5h1.6a2.4 2.4 0 0 0 2.4-2.4v-.2a2.4 2.4 0 0 0-2.4-2.4H14Z" />
    </>
  ),
  devices: (
    <>
      <rect x="2.5" y="5" width="13" height="10" rx="2" />
      <path d="M6 19h6" />
      <rect x="17" y="9" width="5" height="10" rx="1.6" />
    </>
  ),
  free: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9h5M9 12.5h4M9 15.5V9" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" />
      <path d="m4 12.5 8 4.5 8-4.5" />
      <path d="m4 17 8 4.5 8-4.5" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V6.5l10-2V16" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="16" r="2.5" />
    </>
  ),
  avatar: (
    <>
      <circle cx="12" cy="9" r="3.5" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
      <circle cx="12" cy="12" r="9.2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.3l3.3 2" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </>
  ),
};

export function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
