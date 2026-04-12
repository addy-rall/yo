import { useEffect, useRef } from 'react'
import * as THREE from 'three'


/* ─── Interactive 3D globe (geodesic sphere + network lines) ─── */
function GlobeScene() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 50)
    camera.position.z = 5.5

    const RED   = 0xE62B1E
    const WHITE = 0xF4EFE9

    /* ── Geodesic sphere ── */
    const sphereGroup = new THREE.Group()
    scene.add(sphereGroup)

    for (let lat = -75; lat <= 75; lat += 15) {
      const r   = Math.cos((lat * Math.PI) / 180) * 2.0
      const y   = Math.sin((lat * Math.PI) / 180) * 2.0
      const pts = []
      for (let i = 0; i <= 64; i++) {
        const a = (i / 64) * Math.PI * 2
        pts.push(new THREE.Vector3(r * Math.cos(a), y, r * Math.sin(a)))
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts)
      const mat = new THREE.LineBasicMaterial({
        color: lat === 0 ? RED : WHITE,
        transparent: true,
        opacity: lat === 0 ? 0.55 : 0.12,
      })
      sphereGroup.add(new THREE.Line(geo, mat))
    }

    for (let lon = 0; lon < 180; lon += 15) {
      const pts = []
      for (let i = 0; i <= 64; i++) {
        const lat = -Math.PI / 2 + (i / 64) * Math.PI
        const a   = (lon * Math.PI) / 180
        pts.push(new THREE.Vector3(
          2.0 * Math.cos(lat) * Math.cos(a),
          2.0 * Math.sin(lat),
          2.0 * Math.cos(lat) * Math.sin(a)
        ))
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts)
      const mat = new THREE.LineBasicMaterial({ color: WHITE, transparent: true, opacity: 0.10 })
      sphereGroup.add(new THREE.Line(geo, mat))
    }

    /* ── Network nodes ── */
    const nodeData = [
      { lat: 28.6, lon: 77.2,  r: 0.09, col: RED   },
      { lat: 26.8, lon: 80.9,  r: 0.12, col: RED   },
      { lat: 19.0, lon: 72.8,  r: 0.08, col: WHITE },
      { lat: 13.0, lon: 80.2,  r: 0.07, col: WHITE },
      { lat: 22.5, lon: 88.3,  r: 0.07, col: WHITE },
      { lat: 51.5, lon:-0.12,  r: 0.07, col: WHITE },
      { lat: 40.7, lon:-74.0,  r: 0.07, col: WHITE },
      { lat: 35.6, lon:139.6,  r: 0.08, col: RED   },
      { lat:-33.8, lon:151.2,  r: 0.06, col: WHITE },
      { lat: 48.8, lon:  2.3,  r: 0.06, col: WHITE },
      { lat: 37.7, lon:-122.4, r: 0.06, col: RED   },
      { lat: 55.7, lon: 37.6,  r: 0.06, col: WHITE },
      { lat:  1.3, lon:103.8,  r: 0.06, col: WHITE },
      { lat:-23.5, lon: -46.6, r: 0.06, col: WHITE },
    ]

    const toXYZ = (lat, lon, radius = 2.0) => {
      const φ = (lat  * Math.PI) / 180
      const λ = (lon * Math.PI) / 180
      return new THREE.Vector3(
        radius * Math.cos(φ) * Math.cos(λ),
        radius * Math.sin(φ),
        radius * Math.cos(φ) * Math.sin(λ)
      )
    }

    const nodes = nodeData.map(n => {
      const pos  = toXYZ(n.lat, n.lon)
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(n.r, 8, 8),
        new THREE.MeshBasicMaterial({ color: n.col })
      )
      mesh.position.copy(pos)
      sphereGroup.add(mesh)

      if (n.r === 0.12) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.22, 0.008, 8, 32),
          new THREE.MeshBasicMaterial({ color: RED, transparent: true, opacity: 0.6 })
        )
        ring.position.copy(pos)
        ring.lookAt(new THREE.Vector3(0, 0, 0))
        ring.rotateX(Math.PI / 2)
        ring.userData.isPulse = true
        sphereGroup.add(ring)
      }
      return { pos, col: n.col }
    })

    const connections = [
      [0,1],[1,2],[1,5],[1,10],[0,5],[2,3],[3,13],[5,9],[6,10],[7,12],[8,12],[9,5],[11,4],[12,3],[13,6]
    ]
    connections.forEach(([a, b]) => {
      if (!nodes[a] || !nodes[b]) return
      const p1  = nodes[a].pos.clone().multiplyScalar(1.03)
      const p2  = nodes[b].pos.clone().multiplyScalar(1.03)
      const mid = p1.clone().add(p2).multiplyScalar(0.5).normalize().multiplyScalar(2.35)
      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2)
      const geo   = new THREE.BufferGeometry().setFromPoints(curve.getPoints(32))
      const isRed = nodes[a].col === RED || nodes[b].col === RED
      sphereGroup.add(new THREE.Line(geo, new THREE.LineBasicMaterial({
        color: isRed ? RED : WHITE,
        transparent: true,
        opacity: isRed ? 0.45 : 0.14,
      })))
    })

    /* ── Star particles ── */
    const N   = 180
    const pos = new Float32Array(N * 3)
    const col = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const th = Math.random() * Math.PI * 2
      const ph = Math.acos(2 * Math.random() - 1)
      const r  = 4 + Math.random() * 4
      pos[i*3]   = r * Math.sin(ph) * Math.cos(th)
      pos[i*3+1] = r * Math.sin(ph) * Math.sin(th)
      pos[i*3+2] = r * Math.cos(ph)
      const isR  = Math.random() < 0.2
      col[i*3]   = isR ? 0.9 : 0.95
      col[i*3+1] = isR ? 0.17 : 0.93
      col[i*3+2] = isR ? 0.12 : 0.92
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    pGeo.setAttribute('color',    new THREE.BufferAttribute(col, 3))
    scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
      size: 0.03, vertexColors: true, transparent: true, opacity: 0.5
    })))

    /* ── Outer orbit ring ── */
    const orbitRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.85, 0.007, 6, 100),
      new THREE.MeshBasicMaterial({ color: RED, transparent: true, opacity: 0.2 })
    )
    orbitRing.rotation.x = Math.PI / 2.8
    scene.add(orbitRing)

    /* ── Resize ── */
    const parent = canvas.parentElement
    const onResize = () => {
      if (!parent) return
      const w = parent.clientWidth, h = parent.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    onResize()
    window.addEventListener('resize', onResize, { passive: true })

    let isDragging   = false
    let lastX        = 0
    let velocity     = 0
    let idleSpeed    = 0.0006
    let spinY        = 0
    const FRICTION   = 0.93
    const DRAG_SCALE = 0.012

    let isHovered = false
    canvas.addEventListener('mouseenter', () => { isHovered = true;  canvas.style.cursor = 'grab' })
    canvas.addEventListener('mouseleave', () => { isHovered = false; canvas.style.cursor = 'default'; isDragging = false })

    const onMouseDown = (e) => { isDragging = true; lastX = e.clientX; velocity = 0; canvas.style.cursor = 'grabbing' }
    const onMouseMove = (e) => { if (!isDragging) return; const dx = e.clientX - lastX; velocity = dx * DRAG_SCALE; spinY += velocity; lastX = e.clientX }
    const onMouseUp   = () => { isDragging = false; canvas.style.cursor = isHovered ? 'grab' : 'default' }

    const onTouchStart = (e) => { isDragging = true; lastX = e.touches[0].clientX; velocity = 0 }
    const onTouchMove  = (e) => { if (!isDragging) return; const dx = e.touches[0].clientX - lastX; velocity = dx * DRAG_SCALE; spinY += velocity; lastX = e.touches[0].clientX }
    const onTouchEnd   = () => { isDragging = false }

    canvas.addEventListener('mousedown',  onMouseDown)
    window.addEventListener('mousemove',  onMouseMove, { passive: true })
    window.addEventListener('mouseup',    onMouseUp)
    canvas.addEventListener('touchstart', onTouchStart, { passive: true })
    canvas.addEventListener('touchmove',  onTouchMove,  { passive: true })
    canvas.addEventListener('touchend',   onTouchEnd)

    let visible = true
    document.addEventListener('visibilitychange', () => { visible = !document.hidden })

    let raf, t = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      t += 0.004

      if (!isDragging) {
        velocity  *= FRICTION
        spinY     += velocity
        const idleContrib = idleSpeed * (1 - Math.min(Math.abs(velocity) / 0.02, 1))
        spinY += idleContrib
      }

      sphereGroup.rotation.y = spinY
      sphereGroup.rotation.x = 0
      orbitRing.rotation.z = t * 0.18

      sphereGroup.children.forEach(c => {
        if (c.userData.isPulse) {
          c.material.opacity = 0.3 + Math.sin(t * 2.5) * 0.3
          const s = 1 + Math.sin(t * 2.5) * 0.12
          c.scale.setScalar(s)
        }
      })

      camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      canvas.removeEventListener('mousedown',  onMouseDown)
      window.removeEventListener('mousemove',  onMouseMove)
      window.removeEventListener('mouseup',    onMouseUp)
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchmove',  onTouchMove)
      canvas.removeEventListener('touchend',   onTouchEnd)
      window.removeEventListener('resize',     onResize)
      renderer.dispose()
      pGeo.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} style={{ width:'100%', height:'100%', display:'block' }} />
}

export default function ChiefSection() {
  return (
    <section className="chief-section">

      {/* ── LEFT: interactive 3D globe ── */}
      <div className="chief-globe-wrap">
        <div className="chief-globe-canvas">
          <GlobeScene />
        </div>

        <div className="chief-globe-labels">
          <span className="cgl cgl--connect">CONNECTING</span>
          <span className="cgl cgl--lucknow">LUCKNOW</span>
          <span className="cgl cgl--ideas">IDEAS</span>
          <span className="cgl cgl--world">THE WORLD</span>
        </div>

        <div className="chief-globe-frame">
          <div className="cgf cgf--tl" />
          <div className="cgf cgf--tr" />
          <div className="cgf cgf--bl" />
          <div className="cgf cgf--br" />
        </div>

        <div className="chief-globe-badge">
          <span className="cgb-num">26.8°N · 80.9°E</span>
          <span className="cgb-label">Lucknow, India</span>
        </div>
      </div>

      {/* ── RIGHT: quote + content ── */}
      <div className="chief-content">
        <blockquote className="chief-quote">
          "The most powerful idea<br />
          is the one that makes you<br />
          <em>rethink everything</em> else."
        </blockquote>

        <p className="chief-body">
          At TEDxBBAU, we believe that every breakthrough — every invention, every movement, every revolution — began as a single spoken idea. We are building the stage where Central India's most curious, daring, and visionary minds come to speak and be heard.
        </p>

        <div className="chief-stats">
          <div className="chief-stat">
            <span className="chief-stat__num">500<sup>+</sup></span>
            <span className="chief-stat__lbl">Minds in one room</span>
          </div>
          <div className="chief-stat">
            <span className="chief-stat__num">1</span>
            <span className="chief-stat__lbl">University. One voice.</span>
          </div>
          <div className="chief-stat">
            <span className="chief-stat__num">∞</span>
            <span className="chief-stat__lbl">Ideas unleashed</span>
          </div>
        </div>
      </div>

    </section>
  )
}