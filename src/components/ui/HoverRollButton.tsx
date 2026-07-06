import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

interface HoverRollButtonProps {
  text: string
  href?: string
  onClick?: () => void
  /** Root classes: background, hover background, text color, padding. */
  className?: string
  /** Text size utility (e.g. "text-[13px] sm:text-[14px]"). */
  textClassName?: string
  /** Arrow circle sizing + background. */
  circleClassName?: string
  /** Arrow icon color/size classes. */
  arrowClassName?: string
  /** Height of a single text row; the roll container is twice this. */
  rowHeight?: number
  ariaLabel?: string
}

/**
 * Button with an Axion-style text-roll hover animation: the label is duplicated
 * inside an overflow-hidden column that slides up on hover, while the arrow in
 * its circle rotates -45deg. Renders as <a> when `href` is provided.
 */
export function HoverRollButton({
  text,
  href,
  onClick,
  className = '',
  textClassName = 'text-[13px]',
  circleClassName = 'w-6 h-6 bg-[#F7F5F0]',
  arrowClassName = 'w-3.5 h-3.5 text-[#0F1A15]',
  rowHeight = 20,
  ariaLabel,
}: HoverRollButtonProps) {
  const content: ReactNode = (
    <>
      <span
        className={`relative flex flex-col overflow-hidden font-medium ${textClassName}`}
        style={{ height: rowHeight }}
      >
        <span
          className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2"
        >
          <span className="flex items-center" style={{ height: rowHeight }}>
            {text}
          </span>
          <span className="flex items-center" style={{ height: rowHeight }}>
            {text}
          </span>
        </span>
      </span>
      <span
        className={`grid shrink-0 place-items-center rounded-full ${circleClassName}`}
      >
        <ArrowRight
          className={`transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 ${arrowClassName}`}
        />
      </span>
    </>
  )

  const rootClasses = `group inline-flex items-center gap-3 rounded-full transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${className}`

  if (href) {
    return (
      <a href={href} onClick={onClick} aria-label={ariaLabel ?? text} className={rootClasses}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel ?? text} className={rootClasses}>
      {content}
    </button>
  )
}
