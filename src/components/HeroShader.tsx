import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from 'shaders/react'

/**
 * Full-screen animated shader overlay for the Hero. Kept subtle (opacity-60 on
 * the wrapper, pointer-events-none) so it reads as a living texture over cream.
 *
 * Stacked as sibling nodes inside a single <Shader> root: base swirl gradient,
 * a chroma-flow liquid tint in brand green, a fluted-glass refraction pass, and
 * a fine film grain on top.
 */
export function HeroShader() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 opacity-60">
      <Shader style={{ width: '100%', height: '100%' }}>
        <Swirl colorA="#F7F5F0" colorB="#EBE8DF" detail={1.7} />
        <ChromaFlow
          baseColor="#F7F5F0"
          downColor="#0C3A30"
          leftColor="#0C3A30"
          rightColor="#0C3A30"
          upColor="#0C3A30"
          momentum={13}
          radius={3.5}
        />
        <FlutedGlass
          aberration={0.61}
          angle={31}
          frequency={8}
          highlight={0.12}
          highlightSoftness={0}
          lightAngle={-90}
          refraction={4}
          shape="rounded"
          softness={1}
          speed={0.15}
        />
        <FilmGrain strength={0.05} />
      </Shader>
    </div>
  )
}
