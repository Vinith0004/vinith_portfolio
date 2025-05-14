"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars, OrbitControls } from "@react-three/drei"
import { useMediaQuery } from "@/hooks/use-media-query"
import * as THREE from "three"

export default function SpaceBackground() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isLowPerfDevice = useMediaQuery("(max-width: 768px)") // Simplified performance detection

  // Adjust quality based on device
  const dpr = isLowPerfDevice ? [0.6, 1] : [1, 2]
  const starCount = isLowPerfDevice ? 1000 : 5000
  const asteroidCount = isLowPerfDevice ? 5 : isMobile ? 10 : 30
  const shootingStarCount = isLowPerfDevice ? 2 : isMobile ? 3 : 6

  return (
    <div className="fixed inset-0 z-0 opacity-70">
      <Canvas dpr={dpr} camera={{ position: [0, 0, 15], fov: 60 }}>
        <fog attach="fog" args={["#070710", 10, 40]} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        <SpaceScene isMobile={isMobile} asteroidCount={asteroidCount} shootingStarCount={shootingStarCount} />
        <Stars radius={100} depth={50} count={starCount} factor={4} saturation={0} fade speed={1} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          rotateSpeed={0.1}
          autoRotate
          autoRotateSpeed={isMobile ? 0.05 : 0.1}
        />
      </Canvas>
    </div>
  )
}

function SpaceScene({ isMobile, asteroidCount, shootingStarCount }) {
  const groupRef = useRef()

  // Adjust scale based on viewport size
  const scale = isMobile ? 0.6 : 1

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * (isMobile ? 0.03 : 0.05)
    }
  })

  return (
    <group ref={groupRef}>
      <Planet position={[-8, 2, -10]} size={2 * scale} color="#3498db" rotationSpeed={0.01} />
      <Planet position={[10, -4, -15]} size={3 * scale} color="#e74c3c" rotationSpeed={0.005} />
      <Planet position={[0, 8, -20]} size={1.5 * scale} color="#2ecc71" rotationSpeed={0.02} />
      <Asteroids count={asteroidCount} scale={scale} />
      <ShootingStars count={shootingStarCount} />
    </group>
  )
}

function Planet({ position, size, color, rotationSpeed }) {
  const meshRef = useRef()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} metalness={0.2} roughness={0.8} />
    </mesh>
  )
}

function Asteroids({ count, scale }) {
  const asteroids = []

  for (let i = 0; i < count; i++) {
    const size = 0.1 + Math.random() * 0.3
    const position = [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40]
    const rotation = [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]
    const rotationSpeed = 0.001 + Math.random() * 0.01

    asteroids.push(
      <Asteroid key={i} position={position} size={size * scale} rotation={rotation} rotationSpeed={rotationSpeed} />,
    )
  }

  return <>{asteroids}</>
}

function Asteroid({ position, size, rotation, rotationSpeed }) {
  const meshRef = useRef()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed
      meshRef.current.rotation.y += rotationSpeed * 0.8
      meshRef.current.rotation.z += rotationSpeed * 0.6
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <dodecahedronGeometry args={[size, 0]} />
      <meshStandardMaterial color="#888888" roughness={0.9} />
    </mesh>
  )
}

function ShootingStars({ count = 5 }) {
  return (
    <group>
      {Array.from({ length: count }).map((_, i) => (
        <ShootingStar key={i} delay={i * 3} />
      ))}
    </group>
  )
}

function ShootingStar({ delay = 0 }) {
  const ref = useRef()
  const startPosition = useRef([(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100])
  const direction = useRef(
    new THREE.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2).normalize(),
  )
  const speed = useRef(0.5 + Math.random() * 1.5)
  const startTime = useRef(delay)
  const duration = useRef(1 + Math.random() * 2)
  const trailLength = useRef(5 + Math.random() * 10)

  useFrame(({ clock }) => {
    if (!ref.current) return

    const time = clock.getElapsedTime() - startTime.current
    const cycleTime = time % (duration.current + 10)

    if (cycleTime < duration.current) {
      // Active phase - star is visible and moving
      ref.current.visible = true

      // Calculate position along the path
      const progress = cycleTime / duration.current
      ref.current.position.set(
        startPosition.current[0] + direction.current.x * progress * 100 * speed.current,
        startPosition.current[1] + direction.current.y * progress * 100 * speed.current,
        startPosition.current[2] + direction.current.z * progress * 100 * speed.current,
      )

      // Scale based on progress (fade in/out)
      const scale =
        progress < 0.1
          ? progress * 10 // Fade in
          : progress > 0.9
            ? (1 - progress) * 10 // Fade out
            : 1 // Full visibility

      ref.current.scale.set(scale, scale, trailLength.current * scale)
    } else {
      // Reset phase - star is invisible
      ref.current.visible = false

      // If we're near the end of the reset phase, prepare for next cycle
      if (cycleTime > duration.current + 9.9) {
        // Reset position and direction for next appearance
        startPosition.current = [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100]
        direction.current = new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
        ).normalize()
        speed.current = 0.5 + Math.random() * 1.5
        trailLength.current = 5 + Math.random() * 10
      }
    }
  })

  return (
    <mesh ref={ref} rotation={[0, 0, Math.atan2(direction.current.y, direction.current.x)]}>
      <boxGeometry args={[0.1, 0.1, 1]} />
      <meshBasicMaterial color="#ffffff" opacity={0.8} transparent={true} />
    </mesh>
  )
}
