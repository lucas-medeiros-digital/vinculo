const CLIENTS = [
  { name: 'Pirez Aluminio', src: '/logos/clients/pirez.png' },
  { name: 'Clínica Vítola', src: '/logos/clients/vitola.png' },
  { name: 'Semillero de Innovación', src: '/logos/clients/semillero.png' },
  { name: 'RedOne — Redes Deportivas', src: '/logos/clients/redone.png' },
  { name: 'Merladett Construcciones', src: '/logos/clients/merladett.png' },
  { name: 'Expande Business & Trade', src: '/logos/clients/expande.png' },
  { name: 'Windoor Aluminios', src: '/logos/clients/windoor.png' },
]

/**
 * Webs we built. Fill with real projects: a screenshot in /public/work/ and the
 * live URL. The grid only renders once there is at least one entry.
 */
interface WebProject {
  name: string
  url: string
  image: string
}
const WEB_PROJECTS: WebProject[] = [
  // { name: 'Clínica Vítola', url: 'https://...', image: '/work/vitola.jpg' },
]

export function FeriaWork() {
  // Logos twice in a row so the marquee loops seamlessly.
  const loop = [...CLIENTS, ...CLIENTS]

  return (
    <section className="overflow-hidden bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <h2
          className="max-w-[20ch] font-fraunces font-medium leading-[1.08] tracking-[-0.02em] text-[#0C3A30]"
          style={{ fontSize: 'clamp(1.8rem, 4.4vw, 3.2rem)' }}
        >
          Marcas que ya crecen con nosotros.
        </h2>
      </div>

      <div className="group relative mt-12 flex w-max motion-safe:animate-[feria-marquee_38s_linear_infinite] hover:[animation-play-state:paused]">
        {loop.map((c, i) => (
          <div
            key={`${c.name}-${i}`}
            aria-hidden={i >= CLIENTS.length}
            className="mx-3 flex h-24 w-44 shrink-0 items-center justify-center rounded-xl border border-[#EBE8DF] px-6 sm:h-28 sm:w-52"
          >
            <img
              src={c.src}
              alt={i < CLIENTS.length ? c.name : ''}
              className="max-h-12 w-auto object-contain opacity-80"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {WEB_PROJECTS.length > 0 && (
        <div className="mx-auto mt-20 max-w-6xl px-5 sm:px-8 lg:px-12">
          <h3 className="font-fraunces text-2xl font-medium text-[#0C3A30]">Webs que hicimos</h3>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WEB_PROJECTS.map((p) => (
              <a
                key={p.url}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-xl border border-[#EBE8DF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0C3A30]"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#F7F5F0]">
                  <img
                    src={p.image}
                    alt={`Web de ${p.name}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="px-4 py-3 font-jakarta text-[15px] font-semibold text-[#0F1A15]">{p.name}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
