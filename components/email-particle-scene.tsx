"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

// Particle system for floating "email" points
function EmailParticles({ count = 5000, explode = false }) {
    const ref = useRef<THREE.Points>(null!)
    const [positions, velocities] = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const velocities = new Float32Array(count * 3)

        for (let i = 0; i < count; i++) {
            // Sphere distribution
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)
            const radius = 3 + Math.random() * 2

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
            positions[i * 3 + 2] = radius * Math.cos(phi)

            // Random velocities for explosion
            velocities[i * 3] = (Math.random() - 0.5) * 0.1
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1
        }
        return [positions, velocities]
    }, [count])

    const [explodePhase, setExplodePhase] = useState(0)

    useEffect(() => {
        if (explode) {
            setExplodePhase(1)
            // Reset after animation
            const timer = setTimeout(() => setExplodePhase(2), 1500)
            return () => clearTimeout(timer)
        } else {
            setExplodePhase(0)
        }
    }, [explode])

    useFrame((state, delta) => {
        if (!ref.current) return

        // Slow rotation
        ref.current.rotation.y += delta * 0.05
        ref.current.rotation.x += delta * 0.02

        const posArray = ref.current.geometry.attributes.position.array as Float32Array

        if (explodePhase === 1) {
            // Explosion outward
            for (let i = 0; i < count; i++) {
                posArray[i * 3] += velocities[i * 3] * 3
                posArray[i * 3 + 1] += velocities[i * 3 + 1] * 3
                posArray[i * 3 + 2] += velocities[i * 3 + 2] * 3
            }
            ref.current.geometry.attributes.position.needsUpdate = true
        } else if (explodePhase === 2) {
            // Converge back to center in a cube formation
            for (let i = 0; i < count; i++) {
                const targetX = (Math.random() - 0.5) * 2
                const targetY = (Math.random() - 0.5) * 1
                const targetZ = 0

                posArray[i * 3] += (targetX - posArray[i * 3]) * 0.02
                posArray[i * 3 + 1] += (targetY - posArray[i * 3 + 1]) * 0.02
                posArray[i * 3 + 2] += (targetZ - posArray[i * 3 + 2]) * 0.02
            }
            ref.current.geometry.attributes.position.needsUpdate = true
        }
    })

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#6366f1"
                size={0.03}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    )
}

// Wireframe globe
function WireframeGlobe() {
    const ref = useRef<THREE.Mesh>(null!)

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.1
        }
    })

    return (
        <mesh ref={ref}>
            <icosahedronGeometry args={[2.5, 2]} />
            <meshBasicMaterial
                color="#1e293b"
                wireframe
                transparent
                opacity={0.15}
            />
        </mesh>
    )
}

interface EmailParticleSceneProps {
    explode?: boolean
}

export function EmailParticleScene({ explode = false }: EmailParticleSceneProps) {
    return (
        <div className="fixed inset-0 -z-10 bg-slate-950">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                <WireframeGlobe />
                <EmailParticles count={8000} explode={explode} />

                {/* Subtle auto-rotation */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.3}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
            </Canvas>
        </div>
    )
}
