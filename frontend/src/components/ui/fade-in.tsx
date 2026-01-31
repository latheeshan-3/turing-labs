"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
	children: ReactNode;
	className?: string;
	delay?: number;
	direction?: "up" | "down" | "left" | "right" | "none";
}

export function FadeIn({ children, className, delay = 0, direction = "up" }: FadeInProps) {
	const directionOffset = {
		up: { y: 40, x: 0 },
		down: { y: -40, x: 0 },
		left: { y: 0, x: 40 },
		right: { y: 0, x: -40 },
		none: { y: 0, x: 0 },
	};

	return (
		<motion.div
			initial={{ opacity: 0, ...directionOffset[direction] }}
			whileInView={{ opacity: 1, x: 0, y: 0 }}
			viewport={{ once: true, margin: "-100px" }}
			transition={{ duration: 0.7, delay: delay, ease: "easeOut" }}
			className={cn(className)}
		>
			{children}
		</motion.div>
	);
}

export function StaggerContainer({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
	return (
		<motion.div
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, margin: "-100px" }}
			variants={{
				hidden: {},
				show: {
					transition: {
						staggerChildren: 0.1,
						delayChildren: delay,
					},
				},
			}}
			className={cn(className)}
		>
			{children}
		</motion.div>
	);
}
