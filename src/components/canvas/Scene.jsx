'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr, Float, Line, RoundedBox, Sparkles } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const floors = [
  { size: [5.6, 3.4], color: '#193545' },
  { size: [5.2, 3.1], color: '#1a4f59' },
  { size: [5.0, 3.0], color: '#24676d' },
  { size: [4.8, 2.8], color: '#b78314' },
  { size: [4.6, 2.7], color: '#d6a724' },
]

function HospitalModel() {
  const group = useRef()
  const [mode, setMode] = useState('overview')

  useEffect(() => {
    const onMode = (event) => setMode(event.detail || 'overview')
    window.addEventListener('hospital-mode', onMode)
    return () => window.removeEventListener('hospital-mode', onMode)
  }, [])

  const journey = useMemo(
    () => [
      [-3.8, -1.1, 2.8],
      [-2.2, -0.7, 1.7],
      [-0.8, -0.1, 0.7],
      [0.4, 0.6, -0.2],
      [1.6, 1.15, -1.1],
      [3.1, 1.65, -2.1],
    ],
    [],
  )

  useFrame((state, delta) => {
    if (!group.current) return
    const p = Math.min(1, window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight))
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, -0.35 + p * 0.9, 3, delta)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -0.14 + p * 0.18, 3, delta)
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, 0.15 - p * 0.45, 3, delta)
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, state.viewport.width < 8 ? 0 : 2.5, 3, delta)
  })

  const gap = mode === 'explode' ? 1.25 : mode === 'journey' ? 0.72 : 0.48
  const opacity = mode === 'site' ? 0.38 : 0.82

  return (
    <group ref={group} rotation={[-0.13, -0.35, 0]}>
      <gridHelper args={[14, 28, '#33515d', '#12242c']} position={[0, -1.55, 0]} />
      <mesh position={[0, -1.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#071017" transparent opacity={0.58} />
      </mesh>

      {floors.map((floor, index) => (
        <RoundedBox
          key={index}
          args={[floor.size[0], 0.28, floor.size[1]]}
          radius={0.12}
          smoothness={4}
          position={[0, -0.7 + index * gap, 0]}
        >
          <meshPhysicalMaterial
            color={floor.color}
            transparent
            opacity={opacity}
            roughness={0.4}
            metalness={0.15}
            transmission={mode === 'explode' ? 0.12 : 0.04}
          />
        </RoundedBox>
      ))}

      <Float speed={1.35} rotationIntensity={0.15} floatIntensity={0.28}>
        <RoundedBox args={[1.5, 0.8, 1.1]} radius={0.14} smoothness={4} position={[0.4, 2.8 + (mode === 'explode' ? 1.7 : 0), 0]}>
          <meshStandardMaterial color="#f0b429" emissive="#8a5d00" emissiveIntensity={0.45} />
        </RoundedBox>
      </Float>

      {mode === 'site' && (
        <>
          <Line points={[[-5, -1.37, 2.8], [-2, -1.37, 2.8], [-2, -1.37, 0.8], [0, -1.37, 0.8]]} color="#f0b429" lineWidth={2.2} />
          <Line points={[[5, -1.36, -2.8], [2.7, -1.36, -2.8], [2.7, -1.36, -0.7], [1.6, -1.36, -0.7]]} color="#ff6a3d" lineWidth={2.2} />
          <Line points={[[-4.8, -1.35, -3.7], [-1.7, -1.35, -3.7], [-1.7, -1.35, -2.2]]} color="#39c6bd" lineWidth={2.2} />
        </>
      )}

      {mode === 'journey' && (
        <>
          <Line points={journey} color="#f0b429" lineWidth={2.8} />
          {journey.map((point, index) => (
            <mesh key={index} position={point}>
              <sphereGeometry args={[0.11 + index * 0.008, 20, 20]} />
              <meshStandardMaterial color={index < 3 ? '#39c6bd' : '#f0b429'} emissive={index < 3 ? '#0f5f59' : '#875d08'} emissiveIntensity={0.7} />
            </mesh>
          ))}
        </>
      )}

      <Sparkles count={mode === 'overview' ? 48 : 24} scale={[9, 6, 7]} size={1.7} speed={0.25} color="#9ddbd7" />
    </group>
  )
}

function Rig() {
  useFrame((state, delta) => {
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, state.pointer.x * 0.45, 3, delta)
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, 3.7 + state.pointer.y * 0.25, 3, delta)
    state.camera.lookAt(0, 0.6, 0)
  })
  return null
}

export default function Scene({ eventSource }) {
  return (
    <div className="canvas-layer" aria-hidden="true">
      <Canvas
        eventSource={eventSource}
        eventPrefix="client"
        dpr={[1, 1.5]}
        camera={{ position: [0, 3.7, 10.8], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#050b10']} />
          <fog attach="fog" args={['#050b10', 11, 22]} />
          <ambientLight intensity={0.85} />
          <directionalLight position={[5, 9, 7]} intensity={2.2} color="#fff1ca" />
          <pointLight position={[-6, 3, 4]} intensity={22} distance={13} color="#39c6bd" />
          <pointLight position={[6, 4, -4]} intensity={18} distance={12} color="#f0b429" />
          <HospitalModel />
          <Rig />
          <AdaptiveDpr pixelated />
        </Suspense>
      </Canvas>
    </div>
  )
}
