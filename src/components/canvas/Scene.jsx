'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr, Float, Line, RoundedBox, Sparkles } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const floors = [
  { size: [5.6, 3.4], color: '#153644' },
  { size: [5.2, 3.1], color: '#0f6f70' },
  { size: [5.0, 3.0], color: '#37a8a1' },
  { size: [4.8, 2.8], color: '#d99f18' },
  { size: [4.6, 2.7], color: '#f4c542' },
]

function HospitalModel() {
  const group = useRef()
  const halo = useRef()
  const [mode, setMode] = useState('overview')

  useEffect(() => {
    const onMode = (event) => setMode(event.detail || 'overview')
    window.addEventListener('hospital-mode', onMode)
    return () => window.removeEventListener('hospital-mode', onMode)
  }, [])

  const journey = useMemo(() => [
    [-3.8, -1.1, 2.8], [-2.2, -0.7, 1.7], [-0.8, -0.1, 0.7],
    [0.4, 0.6, -0.2], [1.6, 1.15, -1.1], [3.1, 1.65, -2.1],
  ], [])

  useFrame((state, delta) => {
    if (!group.current) return
    const max = Math.max(1, document.body.scrollHeight - window.innerHeight)
    const p = Math.min(1, window.scrollY / max)
    const mobile = state.viewport.width < 8
    const targetScale = mobile ? 0.72 : 1

    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, -0.45 + p * 1.45, 2.4, delta)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -0.12 + Math.sin(p * Math.PI * 2) * 0.08, 2.4, delta)
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, mobile ? 0.15 : -0.1 + Math.sin(p * Math.PI * 3) * 0.22, 2.8, delta)
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, mobile ? 0 : 2.25 * Math.sin(p * Math.PI * 1.3), 2.5, delta)
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, targetScale, 3, delta))

    if (halo.current) {
      halo.current.rotation.z += delta * 0.12
      halo.current.rotation.x = 1.08 + Math.sin(state.clock.elapsedTime * 0.35) * 0.08
    }
  })

  const gap = mode === 'explode' ? 1.3 : mode === 'journey' ? 0.74 : 0.5
  const opacity = mode === 'site' ? 0.32 : 0.88

  return (
    <group ref={group} rotation={[-0.13, -0.35, 0]}>
      <mesh position={[0, -1.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[6.8, 64]} />
        <meshPhysicalMaterial color="#ffffff" transparent opacity={0.11} roughness={0.2} />
      </mesh>

      <group ref={halo} position={[0, 0.5, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[4.7, 0.018, 8, 120]} />
          <meshBasicMaterial color="#071018" transparent opacity={0.22} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, Math.PI / 3]}>
          <torusGeometry args={[5.3, 0.012, 8, 120]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.18} />
        </mesh>
      </group>

      {floors.map((floor, index) => (
        <Float key={index} speed={0.45 + index * 0.08} rotationIntensity={0.03} floatIntensity={mode === 'explode' ? 0.12 : 0.035}>
          <RoundedBox args={[floor.size[0], 0.3, floor.size[1]]} radius={0.13} smoothness={4} position={[0, -0.7 + index * gap, 0]}>
            <meshPhysicalMaterial color={floor.color} transparent opacity={opacity} roughness={0.34} metalness={0.12} transmission={mode === 'explode' ? 0.16 : 0.035} clearcoat={0.35} />
          </RoundedBox>
        </Float>
      ))}

      <Float speed={1.45} rotationIntensity={0.18} floatIntensity={0.34}>
        <RoundedBox args={[1.5, 0.82, 1.12]} radius={0.16} smoothness={4} position={[0.4, 2.82 + (mode === 'explode' ? 1.8 : 0), 0]}>
          <meshStandardMaterial color="#f4c542" emissive="#b27300" emissiveIntensity={0.5} />
        </RoundedBox>
      </Float>

      {mode === 'site' && <>
        <Line points={[[-5, -1.37, 2.8], [-2, -1.37, 2.8], [-2, -1.37, 0.8], [0, -1.37, 0.8]]} color="#071018" lineWidth={3} />
        <Line points={[[5, -1.36, -2.8], [2.7, -1.36, -2.8], [2.7, -1.36, -0.7], [1.6, -1.36, -0.7]]} color="#ff3d00" lineWidth={3} />
        <Line points={[[-4.8, -1.35, -3.7], [-1.7, -1.35, -3.7], [-1.7, -1.35, -2.2]]} color="#008c84" lineWidth={3} />
      </>}

      {mode === 'journey' && <>
        <Line points={journey} color="#071018" lineWidth={3.2} />
        {journey.map((point, index) => <Float key={index} speed={1.8 + index * .12} floatIntensity={.18}>
          <mesh position={point}>
            <sphereGeometry args={[0.12 + index * 0.009, 20, 20]} />
            <meshStandardMaterial color={index < 3 ? '#66d7cf' : '#f4c542'} emissive={index < 3 ? '#0f5f59' : '#875d08'} emissiveIntensity={0.7} />
          </mesh>
        </Float>)}
      </>}

      <Sparkles count={mode === 'overview' ? 65 : 32} scale={[9, 7, 7]} size={2} speed={0.32} color="#ffffff" />
    </group>
  )
}

function Rig() {
  useFrame((state, delta) => {
    const mobile = state.viewport.width < 8
    const px = mobile ? state.pointer.x * 0.12 : state.pointer.x * 0.5
    const py = mobile ? state.pointer.y * 0.08 : state.pointer.y * 0.28
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, px, 3, delta)
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, mobile ? 3.45 + py : 3.7 + py, 3, delta)
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, mobile ? 11.6 : 10.8, 3, delta)
    state.camera.lookAt(0, 0.55, 0)
  })
  return null
}

export default function Scene({ eventSource }) {
  return (
    <div className="canvas-layer" aria-hidden="true">
      <Canvas eventSource={eventSource} eventPrefix="client" dpr={[1, 1.35]} camera={{ position: [0, 3.5, 11.4], fov: 39 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
        <Suspense fallback={null}>
          <ambientLight intensity={1.4} />
          <directionalLight position={[5, 9, 7]} intensity={2.6} color="#fff8e8" />
          <pointLight position={[-6, 3, 4]} intensity={24} distance={13} color="#66d7cf" />
          <pointLight position={[6, 4, -4]} intensity={20} distance={12} color="#f4c542" />
          <HospitalModel />
          <Rig />
          <AdaptiveDpr pixelated />
        </Suspense>
      </Canvas>
    </div>
  )
}
