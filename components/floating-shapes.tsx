"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import type * as THREE from "three"

function Torus({ position, scale }: { position: [number, number, number]; scale: number }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
        }
    })

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <torusGeometry args={[1, 0.3, 16, 32]} />
                <meshStandardMaterial color="#1a1f2e" transparent opacity={0.12} roughness={0.8} />
            </mesh>
        </Float>
    )
}

function Sphere({ position, scale }: { position: [number, number, number]; scale: number }) {
    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8}>
            <mesh position={position} scale={scale}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#6366f1" transparent opacity={0.06} roughness={0.9} />
            </mesh>
        </Float>
    )
}

function Icosahedron({ position, scale }: { position: [number, number, number]; scale: number }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.08
            meshRef.current.rotation.z = state.clock.elapsedTime * 0.05
        }
    })

    return (
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <icosahedronGeometry args={[1, 0]} />
                <meshStandardMaterial color="#1a1f2e" transparent opacity={0.1} roughness={0.7} wireframe />
            </mesh>
        </Float>
    )
}

function Scene() {
    const shapes = useMemo(
        () => [
            { type: "torus", position: [-5, 2, -4] as [number, number, number], scale: 0.9 },
            { type: "sphere", position: [5, -1, -5] as [number, number, number], scale: 1.4 },
            { type: "icosahedron", position: [-4, -2, -3] as [number, number, number], scale: 0.7 },
            { type: "torus", position: [4, 3, -6] as [number, number, number], scale: 0.6 },
            { type: "sphere", position: [0, -4, -4] as [number, number, number], scale: 0.8 },
            { type: "icosahedron", position: [6, 1, -5] as [number, number, number], scale: 1.0 },
            { type: "sphere", position: [-3, 4, -5] as [number, number, number], scale: 0.5 },
        ],
        [],
    )

    return (
        <>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={0.4} />
            {shapes.map((shape, i) => {
                if (shape.type === "torus") return <Torus key={i} position={shape.position} scale={shape.scale} />
                if (shape.type === "sphere") return <Sphere key={i} position={shape.position} scale={shape.scale} />
                return <Icosahedron key={i} position={shape.position} scale={shape.scale} />
            })}
        </>
    )
}

export function FloatingShapes() {
    return (
        <div className="fixed inset-0 -z-10 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
                <Scene />
            </Canvas>
        </div>
    )
}
