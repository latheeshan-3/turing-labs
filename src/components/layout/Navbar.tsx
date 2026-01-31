"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
	{ name: "Services", href: "/services" },
	{ name: "ARP Product", href: "/product/arp" },
	{ name: "Careers", href: "/careers" },
	{ name: "About", href: "/about" },
];

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav
			className={cn(
				"fixed w-full z-50 transition-all duration-300",
				scrolled
					? "bg-background/80 backdrop-blur-md shadow-sm border-b border-white/10"
					: "bg-transparent"
			)}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-20">
					<div className="flex-shrink-0">
						<Link href="/" className="flex items-center space-x-2">
							<Globe className="h-8 w-8 text-primary" />
							<span className="font-bold text-2xl tracking-tighter">
								Turing<span className="text-primary">Labs</span>
							</span>
						</Link>
					</div>

					<div className="hidden md:block">
						<div className="ml-10 flex items-baseline space-x-8">
							{navLinks.map((link) => (
								<Link
									key={link.name}
									href={link.href}
									className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium"
								>
									{link.name}
								</Link>
							))}
						</div>
					</div>

					<div className="hidden md:block">
						<Link href="/contact">
							<Button variant="gradient" className="rounded-full px-6">
								Start Project
							</Button>
						</Link>
					</div>

					<div className="md:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="text-foreground hover:text-primary transition-colors focus:outline-none"
						>
							{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			{isOpen && (
				<div className="md:hidden bg-background border-b border-border">
					<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
						{navLinks.map((link) => (
							<Link
								key={link.name}
								href={link.href}
								onClick={() => setIsOpen(false)}
								className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent"
							>
								{link.name}
							</Link>
						))}
						<div className="pt-4 pb-2">
							<Link href="/contact" onClick={() => setIsOpen(false)}>
								<Button variant="gradient" className="w-full">
									Start Project
								</Button>
							</Link>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
}
