"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

function Particles(props: any) {
	const ref = useRef<THREE.Points>(null);

	// Generate random points cloud
	const positions = useMemo(() => {
		const count = 3000;
		const positions = new Float32Array(count * 3);
		for (let i = 0; i < count; i++) {
			const theta = 2 * Math.PI * Math.random();
			const phi = Math.acos(2 * Math.random() - 1);
			const r = 4 + Math.random() * 2; // radius shell
			const x = r * Math.sin(phi) * Math.cos(theta);
			const y = r * Math.sin(phi) * Math.sin(theta);
			const z = r * Math.cos(phi);
			positions[i * 3] = x;
			positions[i * 3 + 1] = y;
			positions[i * 3 + 2] = z;
		}
		return positions;
	}, []);

	useFrame((state, delta) => {
		if (ref.current) {
			ref.current.rotation.x -= delta / 20;
			ref.current.rotation.y -= delta / 25;
		}
	});

	return (
		<group rotation={[0, 0, Math.PI / 4]}>
			<Points ref={ref} positions={positions} stride={3} frustration={false} {...props}>
				<PointMaterial
					transparent
					color="#22d3ee"
					size={0.03}
					sizeAttenuation={true}
					depthWrite={false}
					opacity={0.6}
				/>
			</Points>
		</group>
	);
}

function AIObject() {
	return (
		<Sphere args={[1.8, 64, 64]}>
			<MeshDistortMaterial
				color="#6d28d9"
				envMapIntensity={1}
				clearcoat={1}
				clearcoatRoughness={0}
				metalness={0.2}
				distort={0.4}
				speed={2}
				wireframe
			/>
		</Sphere>
	)
}

export function HeroGlobe({ className }: { className?: string }) {
	return (
		<div className={cn("w-full h-full", className)}>
			<Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true }}>
				<ambientLight intensity={0.8} />
				<directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
				<pointLight position={[-10, -10, -10]} intensity={1} color="#6d28d9" />
				<AIObject />
				<Particles />
				<OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
			</Canvas>
		</div>
	);
}
