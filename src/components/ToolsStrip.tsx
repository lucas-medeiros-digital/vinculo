import { StaggerGroup, StaggerItem } from './ui/motion'

interface Tool {
  name: string
  src: string
}

// Tools Vínculo works with (shown for identification of the stack).
const TOOLS: Tool[] = [
  { name: 'Meta Ads', src: '/logos/tools/meta.png' },
  { name: 'Google Ads', src: '/logos/tools/googleads.png' },
  { name: 'Canva', src: '/logos/tools/canva.png' },
  { name: 'Adobe Illustrator', src: '/logos/tools/illustrator.png' },
  { name: 'Adobe Photoshop', src: '/logos/tools/photoshop.png' },
  { name: 'CapCut', src: '/logos/tools/capcut.png' },
  { name: 'Google Data Studio', src: '/logos/tools/datastudio.png' },
  { name: 'Manychat', src: '/logos/tools/manychat.png' },
  { name: 'Mailchimp', src: '/logos/tools/mailchimp.png' },
  { name: 'HighLevel', src: '/logos/tools/highlevel.png' },
  { name: 'n8n', src: '/logos/tools/n8n.png' },
  { name: 'Hostinger', src: '/logos/tools/hostinger.png' },
  { name: 'Claude', src: '/logos/tools/claude.png' },
]

export function ToolsStrip({ className = '' }: { className?: string }) {
  return (
    <StaggerGroup
      amount={0.05}
      className={`flex flex-wrap items-center justify-center gap-x-7 gap-y-6 sm:gap-x-10 lg:gap-x-12 ${className}`}
    >
      {TOOLS.map((tool) => (
        <StaggerItem key={tool.name} className="flex items-center justify-center">
          <img
            src={tool.src}
            alt={tool.name}
            className="h-6 w-auto object-contain opacity-75 transition-opacity duration-300 hover:opacity-100 sm:h-7"
          />
        </StaggerItem>
      ))}
    </StaggerGroup>
  )
}
