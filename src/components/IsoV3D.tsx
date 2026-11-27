import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import isoSvg from '../assets/vinculo-iso.svg?raw'

/**
 * Real 3D isotipo: the Vínculo "V" extruded into a solid gold volume that
 * tumbles on multiple axes (so it reads from every side) and reacts to the
 * cursor. WebGL via three.js.
 *
 * Graceful fallback: if WebGL is unavailable (hardware acceleration off, GPU
 * blocklisted, too many live contexts, or the context is lost at runtime) the
 * gold isotipo PNG is shown instead, so the "V" never simply vanishes.
 */
export function IsoV3D({ className = '' }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let width = mount.clientWidth || 320
    let height = mount.clientHeight || 320

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000)
    camera.position.set(0, 0, 300)

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    } catch {
      setFailed(true) // no WebGL — show the static gold isotipo instead
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    mount.appendChild(renderer.domElement)

    // If the GPU drops the context at runtime, swap to the static fallback.
    const onContextLost = (e: Event) => {
      e.preventDefault()
      setFailed(true)
    }
    renderer.domElement.addEventListener('webglcontextlost', onContextLost)

    // Lighting tuned for a warm gold read.
    scene.add(new THREE.AmbientLight(0xffffff, 0.75))
    const key = new THREE.DirectionalLight(0xfff1d4, 2.1)
    key.position.set(120, 180, 260)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0xc8a45a, 1.1)
    rim.position.set(-200, -60, -140)
    scene.add(rim)
    const fill = new THREE.DirectionalLight(0xffffff, 0.5)
    fill.position.set(-120, 120, 160)
    scene.add(fill)

    // Build the extruded mesh from the traced SVG outline.
    const loader = new SVGLoader()
    const data = loader.parse(isoSvg)
    const shapes: THREE.Shape[] = []
    for (const path of data.paths) {
      for (const shape of SVGLoader.createShapes(path)) shapes.push(shape)
    }
    const geometry = new THREE.ExtrudeGeometry(shapes, {
      depth: 64,
      bevelEnabled: true,
      bevelThickness: 9,
      bevelSize: 6,
      bevelSegments: 5,
      curveSegments: 28,
    })
    geometry.center()
    geometry.computeBoundingSphere()
    const radius = geometry.boundingSphere?.radius ?? 200

    const material = new THREE.MeshStandardMaterial({
      color: 0xc8a45a,
      metalness: 0.45,
      roughness: 0.34,
      emissive: 0x1c1408,
      emissiveIntensity: 0.5,
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.scale.y = -1 // SVG Y axis points down

    const group = new THREE.Group()
    group.add(mesh)
    // Normalise size using the (rotation-invariant) bounding sphere.
    group.scale.setScalar(95 / radius)
    scene.add(group)

    // Cursor interactivity.
    let targetTiltX = 0
    let steerY = 0
    const onMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect()
      targetTiltX = ((e.clientY - r.top) / r.height - 0.5) * 1.3
      steerY = ((e.clientX - r.left) / r.width - 0.5) * 1.6
    }
    const onLeave = () => {
      targetTiltX = 0
      steerY = 0
    }
    mount.addEventListener('pointermove', onMove)
    mount.addEventListener('pointerleave', onLeave)

    let raf = 0
    let t = 0
    let autoY = 0
    let curTiltX = 0
    let curSteerY = 0
    const animate = () => {
      t += 0.016
      autoY += 0.01
      // Ease pointer influence.
      curTiltX += (targetTiltX - curTiltX) * 0.06
      curSteerY += (steerY - curSteerY) * 0.06
      // Abstract multi-axis tumble.
      group.rotation.y = autoY + curSteerY
      group.rotation.x = Math.sin(t * 0.45) * 0.5 + curTiltX
      group.rotation.z = Math.cos(t * 0.3) * 0.16
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      width = mount.clientWidth || width
      height = mount.clientHeight || height
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    const ro = new ResizeObserver(onResize)
    ro.observe(mount)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      mount.removeEventListener('pointermove', onMove)
      mount.removeEventListener('pointerleave', onLeave)
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div className={className} style={{ touchAction: 'none' }}>
      {/* three.js mounts its <canvas> here */}
      <div ref={mountRef} className="h-full w-full" />
      {/* Shown only when WebGL is unavailable / the context is lost. */}
      {failed && (
        <img
          src="/logos/vinculo-isotipo-gold.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-contain"
        />
      )}
    </div>
  )
}
