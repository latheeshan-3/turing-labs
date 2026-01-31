import Link from "next/link";
import { Globe, Twitter, Linkedin, Github } from "lucide-react";

export function Footer() {
	return (
		<footer className="bg-background border-t border-border">
			<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div className="col-span-1 md:col-span-1">
						<Link href="/" className="flex items-center space-x-2 mb-4">
							<Globe className="h-6 w-6 text-primary" />
							<span className="font-bold text-xl tracking-tighter">
								Turing<span className="text-primary">Labs</span>
							</span>
						</Link>
						<p className="text-muted-foreground text-sm">
							Building intelligent systems for the future of business.
							Pioneering AI automation and agentic resource planning.
						</p>
					</div>

					<div>
						<h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Services</h3>
						<ul className="space-y-3">
							<li><Link href="/services" className="text-muted-foreground hover:text-primary text-sm transition-colors">AI Automation</Link></li>
							<li><Link href="/services" className="text-muted-foreground hover:text-primary text-sm transition-colors">AI Agents</Link></li>
							<li><Link href="/product/arp" className="text-muted-foreground hover:text-primary text-sm transition-colors">ARP Platform</Link></li>
							<li><Link href="/services" className="text-muted-foreground hover:text-primary text-sm transition-colors">Enterprise Consulting</Link></li>
						</ul>
					</div>

					<div>
						<h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Company</h3>
						<ul className="space-y-3">
							<li><Link href="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">Who We Are</Link></li>
							<li><Link href="/careers" className="text-muted-foreground hover:text-primary text-sm transition-colors">Careers</Link></li>
							<li><Link href="/contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">Contact</Link></li>
							<li><Link href="/blog" className="text-muted-foreground hover:text-primary text-sm transition-colors">Insights</Link></li>
						</ul>
					</div>

					<div>
						<h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Connect</h3>
						<div className="flex space-x-4 mb-4">
							<Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
								<Twitter className="h-5 w-5" />
							</Link>
							<Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
								<Linkedin className="h-5 w-5" />
							</Link>
							<Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
								<Github className="h-5 w-5" />
							</Link>
						</div>
						<p className="text-xs text-muted-foreground">
							&copy; {new Date().getFullYear()} Turing Labs. All rights reserved.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
