"use client";

import Link from "next/link";
import { Home, Briefcase, Layers, Users, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MobileNav() {
	const pathname = usePathname();

	const navItems = [
		{ label: "Home", href: "/", icon: Home },
		{ label: "Work", href: "/product/arp", icon: Briefcase }, // Mapping 'Work' to Product for now
		{ label: "Services", href: "/services", icon: Layers },
		{ label: "Careers", href: "/careers", icon: Users },
		{ label: "More", href: "/about", icon: Menu },
	];

	return (
		<div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-slate-200 md:hidden pb-safe">
			<div className="flex justify-around items-center h-16">
				{navItems.map((item) => {
					const isActive = pathname === item.href;
					return (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"flex flex-col items-center justify-center w-full h-full space-y-1",
								isActive ? "text-primary" : "text-slate-500 hover:text-slate-900"
							)}
						>
							<item.icon className="h-5 w-5" />
							<span className="text-[10px] font-medium">{item.label}</span>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
