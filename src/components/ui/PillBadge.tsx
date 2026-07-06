interface PillBadgeProps {
  label: string
  className?: string
}

/**
 * Section eyebrow: a single bordered pill label.
 * Reused across sections 2 and 4. (The method timeline keeps its own numbered
 * circles; this badge is text-only.)
 */
export function PillBadge({ label, className = '' }: PillBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-[#EBE8DF] px-4 py-1.5 font-inter text-[13px] text-gray-700 ${className}`}
    >
      {label}
    </span>
  )
}
