'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr, Float, Line, RoundedBox, Sparkles } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const floors = [
  { color: '#123844', accent: '#6adbd2' },
  { color: '#126d70', accent: '#7ee7df' },
  { color: '#35a6a0', accent: '#b1fff8' },
  { color: '#c68f15', accent: '#f6cf61' },
  { color: '#f5c842', accent: '#fff0ad' },
]

function AnimatedFloor({ index, mode, activeFloor }) {
  const ref = useRef()
  const selected = activeFloor === index
  const gap = mode === 'explode' ? 1.05 : mode === 'journey' ? 0.58 : 0.42
  const baseY = -0.9 + index * gap

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, baseY + (selected && mode === 'explode' ? 0.08 : 0), 5, delta)
    const target = selected && mode === 'explode' ? 1.055 : 1
    const s = THREE.MathUtils.damp(ref.current.scale.x, target, 5, delta)
    ref.current.scale.setScalar(s)
  })

  const opacity = mode === 'site' ? 0.26 : selected && mode === 'explode' ? 1 : 0.9
  const material = floors[index]

  return (
    <group ref={ref} position={[0, baseY, 0]}>
      <RoundedBox args={[5.2, 0.28, 2.1]} radius={0.12} smoothness={3}>
        <meshPhysicalMaterial color={material.color} transparent opacity={opacity} roughness={0.3} metalness={0.14} clearcoat={0.4} />
      </RoundedBox>
      <RoundedBox args={[2.15, 0.28, 1.55]} radius={0.1} smoothness={3} position={[-2.55, 0, 0.1]}>
        <meshPhysicalMaterial color={material.color} transparent opacity={opacity * .96} roughness={0.34} metalness={0.1} />
      </RoundedBox>
      <RoundedBox args={[2.0, 0.28, 1.42]} radius={0.1} smoothness={3} position={[2.5, 0, -0.18]}>
        <meshPhysicalMaterial color={material.color} transparent opacity={opacity * .96} roughness={0.34} metalness={0.1} />
      </RoundedBox>
      <mesh position={[0, 0.17, 1.055]}>
        <boxGeometry args={[4.5, 0.035, 0.035]} />
        <meshBasicMaterial color={material.accent} transparent opacity={mode === 'site' ? .18 : .72} />
      </mesh>
      <mesh position={[-2.5, 0.17, .89]}>
        <boxGeometry args={[1.65, 0.035, 0.035]} />
        <meshBasicMaterial color={material.accent} transparent opacity={mode === 'site' ? .18 : .62} />
      </mesh>
      <mesh position={[2.45, 0.17, .53]} rotation={[0,.18,0]}>
        <boxGeometry args={[1.5, 0.035, 0.035]} />
        <meshBasicMaterial color={material.accent} transparent opacity={mode === 'site' ? .18 : .62} />
      </mesh>
      {selected && mode === 'explode' && <mesh position={[0,-.19,0]} rotation={[-Math.PI/2,0,0]}>
        <ringGeometry args={[3.25,3.33,80]} />
        <meshBasicMaterial color="#071018" transparent opacity={.28} side={THREE.DoubleSide}/>
      </mesh>}
    </group>
  )
}

function SiteRoutes({ activeRoute }) {
  const routes = {
    public: { color: '#071018', points: [[-5.5,-1.31,2.8],[-3.3,-1.31,2.8],[-3.3,-1.31,1.1],[-1.25,-1.31,1.1]] },
    emergency: { color: '#ff5b35', points: [[5.5,-1.30,-2.8],[3.5,-1.30,-2.8],[3.5,-1.30,-1.0],[1.9,-1.30,-1.0]] },
    service: { color: '#0c948b', points: [[-5.2,-1.29,-3.7],[-2.5,-1.29,-3.7],[-2.5,-1.29,-1.8],[-1.2,-1.29,-1.8]] },
  }
  return <>{Object.entries(routes).map(([key, route]) => <group key={key}>
    <Line points={route.points} color={route.color} lineWidth={activeRoute === key ? 6 : 2.3} transparent opacity={activeRoute === key ? 1 : .22} />
    {activeRoute === key && route.points.slice(0,-1).map((p,i)=><Float key={i} speed={2+i*.2} floatIntensity={.12}><mesh position={p}><sphereGeometry args={[.11,18,18]}/><meshStandardMaterial color={route.color} emissive={route.color} emissiveIntensity={.55}/></mesh></Float>)}
  </group>)}</>
}

function JourneyPath({ playKey }) {
  const marker = useRef()
  const started = useRef(0)
  const points = useMemo(() => [
    new THREE.Vector3(-4.5,-1.15,2.7), new THREE.Vector3(-2.7,-.8,1.65), new THREE.Vector3(-1.4,-.15,.8),
    new THREE.Vector3(.1,.55,.1), new THREE.Vector3(1.65,1.2,-.95), new THREE.Vector3(3.35,1.9,-1.8),
  ], [])
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points])
  const linePoints = useMemo(() => curve.getPoints(80).map(v=>[v.x,v.y,v.z]), [curve])

  useEffect(() => { started.current = 0 }, [playKey])

  useFrame((state) => {
    if (!marker.current) return
    if (!started.current) started.current = state.clock.elapsedTime
    const t = ((state.clock.elapsedTime - started.current) / 6.2) % 1
    marker.current.position.copy(curve.getPointAt(t))
  })

  return <>
    <Line points={linePoints} color="#071018" lineWidth={3.4} />
    {points.map((point,index)=><mesh key={index} position={point}><sphereGeometry args={[.085,18,18]}/><meshStandardMaterial color={index<3?'#6adbd2':'#f5c842'} emissive={index<3?'#1a857f':'#996d00'} emissiveIntensity={.6}/></mesh>)}
    <Float speed={2.4} floatIntensity={.14}><mesh ref={marker}><sphereGeometry args={[.18,24,24]}/><meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.2}/></mesh></Float>
  </>
}

function HospitalModel() {
  const group = useRef()
  const halo = useRef()
  const [mode, setMode] = useState('overview')
  const [activeRoute, setActiveRoute] = useState('public')
  const [activeFloor, setActiveFloor] = useState(0)
  const [playKey, setPlayKey] = useState(0)

  useEffect(() => {
    const onMode = e => setMode(e.detail || 'overview')
    const onRoute = e => setActiveRoute(e.detail || 'public')
    const onFloor = e => setActiveFloor(Number(e.detail) || 0)
    const onJourney = e => setPlayKey(e.detail || Date.now())
    window.addEventListener('hospital-mode', onMode)
    window.addEventListener('hospital-route', onRoute)
    window.addEventListener('hospital-floor', onFloor)
    window.addEventListener('hospital-journey', onJourney)
    return () => {
      window.removeEventListener('hospital-mode', onMode)
      window.removeEventListener('hospital-route', onRoute)
      window.removeEventListener('hospital-floor', onFloor)
      window.removeEventListener('hospital-journey', onJourney)
    }
  }, [])

  useFrame((state, delta) => {
    if (!group.current) return
    const max = Math.max(1, document.body.scrollHeight - window.innerHeight)
    const p = Math.min(1, window.scrollY / max)
    const mobile = state.viewport.width < 8
    const targetScale = mobile ? .78 : 1
    const targetY = mobile ? 1.15 : .05
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, -.48 + p * 1.2, 2.8, delta)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -.16 + Math.sin(p * Math.PI * 2) * .06, 2.8, delta)
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY + Math.sin(p*Math.PI*3)*.12, 3, delta)
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, mobile ? 0 : 1.6 * Math.sin(p*Math.PI*1.4), 2.8, delta)
    const s = THREE.MathUtils.damp(group.current.scale.x, targetScale, 3.2, delta)
    group.current.scale.setScalar(s)
    if (halo.current) halo.current.rotation.z += delta * .08
  })

  return <group ref={group} rotation={[-.14,-.35,0]}>
    <mesh position={[0,-1.5,0]} rotation={[-Math.PI/2,0,0]}>
      <circleGeometry args={[7.1,80]}/><meshPhysicalMaterial color="#ffffff" transparent opacity={.12} roughness={.22}/>
    </mesh>
    <mesh position={[0,-1.48,0]} rotation={[-Math.PI/2,0,0]}>
      <ringGeometry args={[5.5,6.6,90]}/><meshBasicMaterial color="#071018" transparent opacity={.055} side={THREE.DoubleSide}/>
    </mesh>

    <group ref={halo} position={[0,.45,0]}>
      <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[4.8,.014,8,120]}/><meshBasicMaterial color="#071018" transparent opacity={.16}/></mesh>
      <mesh rotation={[Math.PI/2,0,Math.PI/3]}><torusGeometry args={[5.45,.009,8,120]}/><meshBasicMaterial color="#ffffff" transparent opacity={.22}/></mesh>
    </group>

    {floors.map((_,index)=><AnimatedFloor key={index} index={index} mode={mode} activeFloor={activeFloor}/>)}

    <RoundedBox args={[.82,3.35,.88]} radius={.12} smoothness={3} position={[.15,.25,-.2]}>
      <meshPhysicalMaterial color="#0b2530" transparent opacity={mode==='site'?.35:.93} roughness={.25} metalness={.18} clearcoat={.45}/>
    </RoundedBox>
    <mesh position={[.15,.25,.255]}><boxGeometry args={[.46,2.65,.025]}/><meshBasicMaterial color="#84eee5" transparent opacity={mode==='site'?.15:.55}/></mesh>

    <Float speed={1.2} rotationIntensity={.04} floatIntensity={.12}>
      <RoundedBox args={[1.45,.55,1.05]} radius={.15} smoothness={4} position={[.4,2.95 + (mode==='explode'?1.15:0),0]}>
        <meshStandardMaterial color="#f5c842" emissive="#8d6500" emissiveIntensity={.35}/>
      </RoundedBox>
    </Float>

    <group position={[-2.55,-1.02,1.75]}>
      <RoundedBox args={[2.2,.17,1.15]} radius={.1} smoothness={3}><meshStandardMaterial color="#f3eee4"/></RoundedBox>
      <mesh position={[0,-.16,.35]}><boxGeometry args={[1.35,.28,.08]}/><meshStandardMaterial color="#071018"/></mesh>
      <mesh position={[0,.11,.5]} rotation={[0,0,.03]}><boxGeometry args={[2.55,.08,1.4]}/><meshStandardMaterial color="#f5c842"/></mesh>
    </group>

    {mode==='site' && <SiteRoutes activeRoute={activeRoute}/>} 
    {mode==='journey' && <JourneyPath playKey={playKey}/>} 
    <Sparkles count={mode==='overview'?72:36} scale={[10,7,7]} size={1.8} speed={.25} color="#ffffff"/>
  </group>
}

function Rig() {
  useFrame((state, delta) => {
    const mobile = state.viewport.width < 8
    const px = mobile ? state.pointer.x * .08 : state.pointer.x * .45
    const py = mobile ? state.pointer.y * .05 : state.pointer.y * .22
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, px, 3, delta)
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, mobile ? 3.8 + py : 3.7 + py, 3, delta)
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, mobile ? 11.25 : 10.5, 3, delta)
    state.camera.lookAt(0, mobile ? 1.2 : .65, 0)
  })
  return null
}

export default function Scene({ eventSource }) {
  return <div className="canvas-layer" aria-hidden="true">
    <Canvas eventSource={eventSource} eventPrefix="client" dpr={[1,1.4]} camera={{position:[0,3.8,11.2],fov:40}} gl={{antialias:true,alpha:true,powerPreference:'high-performance'}}>
      <Suspense fallback={null}>
        <ambientLight intensity={1.35}/>
        <directionalLight position={[5,9,7]} intensity={2.8} color="#fff8ea"/>
        <pointLight position={[-6,4,5]} intensity={25} distance={14} color="#6adbd2"/>
        <pointLight position={[6,4,-4]} intensity={22} distance={13} color="#f5c842"/>
        <HospitalModel/><Rig/><AdaptiveDpr pixelated/>
      </Suspense>
    </Canvas>
  </div>
}
