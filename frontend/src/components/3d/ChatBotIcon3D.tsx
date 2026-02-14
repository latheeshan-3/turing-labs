"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
	Sphere,
	MeshDistortMaterial,
	Float,
	MeshWobbleMaterial,
	RoundedBox,
	Torus,
} from "@react-three/drei";
import * as THREE from "three";

/* ─── Orbiting sparkle particles ────────────────────────────── */
function Sparkles() {
	const ref = useRef<THREE.Group>(null);
	const count = 18;

	const sparkles = useMemo(() => {
		return Array.from({ length: count }, (_, i) => {
			const angle = (i / count) * Math.PI * 2;
			const radius = 1.6 + Math.random() * 0.8;
			return {
				position: [
					Math.cos(angle) * radius,
					(Math.random() - 0.5) * 1.5,
					Math.sin(angle) * radius,
				] as [number, number, number],
				scale: 0.03 + Math.random() * 0.05,
				speed: 0.5 + Math.random() * 1.5,
				offset: Math.random() * Math.PI * 2,
			};
		});
	}, []);

	useFrame((state) => {
		if (ref.current) {
			ref.current.rotation.y = state.clock.elapsedTime * 0.3;
		}
	});

	return (
		<group ref={ref}>
			{sparkles.map((s, i) => (
				<SparkleParticle key={i} {...s} />
			))}
		</group>
	);
}

function SparkleParticle({
	position,
	scale,
	speed,
	offset,
}: {
	position: [number, number, number];
	scale: number;
	speed: number;
	offset: number;
}) {
	const ref = useRef<THREE.Mesh>(null);

	useFrame((state) => {
		if (ref.current) {
			const t = state.clock.elapsedTime * speed + offset;
			ref.current.position.y = position[1] + Math.sin(t) * 0.3;
			ref.current.scale.setScalar(scale * (0.6 + Math.sin(t * 2) * 0.4));
			(ref.current.material as THREE.MeshStandardMaterial).opacity =
				0.4 + Math.sin(t * 1.5) * 0.6;
		}
	});

	return (
		<mesh ref={ref} position={position}>
			<sphereGeometry args={[1, 8, 8]} />
			<meshStandardMaterial
				color="#a78bfa"
				emissive="#a78bfa"
				emissiveIntensity={2}
				transparent
				opacity={0.8}
			/>
		</mesh>
	);
}

/* ─── Cute bot head ─────────────────────────────────────────── */
function BotHead() {
	const groupRef = useRef<THREE.Group>(null);

	useFrame((state) => {
		if (groupRef.current) {
			// Gentle breathing / idle animation
			groupRef.current.rotation.z =
				Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
		}
	});

	return (
		<Float speed={3} rotationIntensity={0.3} floatIntensity={0.8}>
			<group ref={groupRef} scale={0.95}>
				{/* Main head – rounded box */}
				<RoundedBox args={[1.5, 1.3, 1.2]} radius={0.35} smoothness={6}>
					<MeshDistortMaterial
						color="#7c3aed"
						emissive="#4c1d95"
						emissiveIntensity={0.4}
						metalness={0.3}
						roughness={0.2}
						distort={0.08}
						speed={2}
					/>
				</RoundedBox>

				{/* Face plate – lighter inset */}
				<RoundedBox
					args={[1.2, 0.9, 0.15]}
					radius={0.2}
					smoothness={4}
					position={[0, 0, 0.58]}
				>
					<meshStandardMaterial
						color="#ede9fe"
						metalness={0.1}
						roughness={0.4}
					/>
				</RoundedBox>

				{/* Left eye */}
				<Sphere args={[0.13, 16, 16]} position={[-0.28, 0.08, 0.72]}>
					<meshStandardMaterial
						color="#06b6d4"
						emissive="#06b6d4"
						emissiveIntensity={1.5}
					/>
				</Sphere>

				{/* Right eye */}
				<Sphere args={[0.13, 16, 16]} position={[0.28, 0.08, 0.72]}>
					<meshStandardMaterial
						color="#06b6d4"
						emissive="#06b6d4"
						emissiveIntensity={1.5}
					/>
				</Sphere>

				{/* Smile / mouth arc */}
				<Torus
					args={[0.18, 0.035, 8, 16, Math.PI]}
					position={[0, -0.18, 0.72]}
					rotation={[0, 0, Math.PI]}
				>
					<meshStandardMaterial
						color="#7c3aed"
						emissive="#7c3aed"
						emissiveIntensity={0.5}
					/>
				</Torus>

				{/* Left antenna */}
				<group position={[-0.35, 0.72, 0]}>
					<mesh>
						<cylinderGeometry args={[0.03, 0.03, 0.35, 8]} />
						<meshStandardMaterial color="#a78bfa" metalness={0.6} />
					</mesh>
					<Sphere args={[0.08, 12, 12]} position={[0, 0.22, 0]}>
						<meshStandardMaterial
							color="#22d3ee"
							emissive="#22d3ee"
							emissiveIntensity={2}
						/>
					</Sphere>
				</group>

				{/* Right antenna */}
				<group position={[0.35, 0.72, 0]}>
					<mesh>
						<cylinderGeometry args={[0.03, 0.03, 0.35, 8]} />
						<meshStandardMaterial color="#a78bfa" metalness={0.6} />
					</mesh>
					<Sphere args={[0.08, 12, 12]} position={[0, 0.22, 0]}>
						<meshStandardMaterial
							color="#22d3ee"
							emissive="#22d3ee"
							emissiveIntensity={2}
						/>
					</Sphere>
				</group>

				{/* Glow ring around the bot */}
				<Torus args={[1.1, 0.02, 16, 64]} rotation={[Math.PI / 2, 0, 0]}>
					<MeshWobbleMaterial
						color="#a78bfa"
						emissive="#7c3aed"
						emissiveIntensity={1}
						transparent
						opacity={0.35}
						factor={0.3}
						speed={2}
					/>
				</Torus>
			</group>
		</Float>
	);
}

/* ─── Main exported component ───────────────────────────────── */
export function ChatBotIcon3D({ onClick }: { onClick: () => void }) {
	return (
		<div
			onClick={onClick}
			className="w-20 h-20 md:w-36 md:h-36 cursor-pointer group"
			title="Chat with AI"
		>
			<Canvas
				camera={{ position: [0, 0, 3], fov: 45 }}
				gl={{ alpha: true, antialias: true }}
				style={{ pointerEvents: "auto" }}
			>
				<ambientLight intensity={0.6} />
				<directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
				<pointLight position={[-3, -3, 2]} intensity={0.8} color="#7c3aed" />
				<pointLight position={[3, 2, 3]} intensity={0.5} color="#06b6d4" />
				<BotHead />
				<Sparkles />
			</Canvas>
		</div>
	);
}
