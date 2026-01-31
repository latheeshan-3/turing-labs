import Link from "next/link";
import { ArrowRight, BarChart3, Bot, Calendar, CheckCircle2, Cpu, Globe, Layout, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ARPProductPage() {
	return (
		<div className="min-h-screen pt-20">
			{/* Hero */}
			<section className="bg-slate-950 text-white min-h-[80vh] flex items-center relative overflow-hidden">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(109,40,217,0.2),transparent_50%)]"></div>
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(6,182,212,0.15),transparent_50%)]"></div>

				<div className="container mx-auto px-4 relative z-10">
					<div className="max-w-4xl mx-auto text-center">
						<div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-1.5 mb-8 border border-white/20 backdrop-blur-md">
							<span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse"></span>
							<span className="text-sm font-medium text-slate-200">v1.0 Now Available for Enterprise Pilot</span>
						</div>
						<h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
							Agentic Resource Planning <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">(ARP)</span>
						</h1>
						<p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
							Move beyond static ERPs. Let autonomous AI agents forecast, allocate, and optimize your workforce in real-time.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link href="/contact">
								<Button size="lg" className="h-14 px-8 text-lg bg-white text-slate-950 hover:bg-slate-200">
									Request Demo
								</Button>
							</Link>
							<Link href="#features">
								<Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/20 text-white hover:bg-white/10">
									See How It Works
								</Button>
							</Link>
						</div>
					</div>
				</div>

				{/* Floating dashboard mockup effect at bottom */}
				<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-20"></div>
			</section>

			{/* Intro / Problem Statement */}
			<section id="features" className="py-24 bg-white">
				<div className="container mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-20">
						<h2 className="text-3xl md:text-4xl font-bold mb-6">Why Traditional ERPs Fail</h2>
						<p className="text-lg text-muted-foreground">
							Static dashboards require manual interpretation. ARP replaces passive reporting with active, agent-led decision making.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{[
							{ icon: BarChart3, title: "Predictive vs Reactive", desc: "Don't wait for monthly reports. ARP forecasts resource gaps weeks in advance." },
							{ icon: Bot, title: "Autonomous Allocation", desc: "Agents automatically match talent to tasks based on skills, availability, and sentiment." },
							{ icon: Cpu, title: "Self-Optimizing", desc: "The system learns from project outcomes to improve future planning accuracy." }
						].map((feature, i) => (
							<div key={i} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 dark:border-slate-800">
								<feature.icon className="h-10 w-10 text-primary mb-4" />
								<h3 className="text-xl font-bold mb-3">{feature.title}</h3>
								<p className="text-muted-foreground">{feature.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Dashboard Visualization */}
			<section className="py-24 bg-slate-900 text-white relative overflow-hidden">
				<div className="container mx-auto px-4">
					<div className="flex flex-col lg:flex-row items-center gap-16">
						<div className="lg:w-1/2">
							<h2 className="text-3xl md:text-4xl font-bold mb-6">A Living Operating System for Your Business</h2>
							<ul className="space-y-6">
								{[
									"Real-time resource heatmap visualization",
									"AI suggestion engine for conflict resolution",
									"Skill-gap analysis & automated training recommendations",
									"Financial impact modeling per allocation"
								].map((item, i) => (
									<li key={i} className="flex items-start">
										<CheckCircle2 className="h-6 w-6 text-secondary mr-4 shrink-0" />
										<span className="text-lg text-slate-300">{item}</span>
									</li>
								))}
							</ul>
						</div>
						<div className="lg:w-1/2 w-full">
							{/* Abstract Dashboard UI */}
							<div className="rounded-xl border border-slate-700 bg-slate-800/80 backdrop-blur shadow-2xl overflow-hidden p-4">
								<div className="flex items-center space-x-2 mb-4 border-b border-slate-700 pb-2">
									<div className="h-3 w-3 rounded-full bg-red-500"></div>
									<div className="h-3 w-3 rounded-full bg-yellow-500"></div>
									<div className="h-3 w-3 rounded-full bg-green-500"></div>
								</div>
								<div className="grid grid-cols-3 gap-4 mb-4">
									<div className="h-24 rounded bg-slate-700/50 p-3">
										<div className="h-2 w-16 bg-slate-600 rounded mb-2"></div>
										<div className="text-2xl font-bold text-secondary">92%</div>
										<div className="text-xs text-slate-400">Utilization</div>
									</div>
									<div className="h-24 rounded bg-slate-700/50 p-3">
										<div className="h-2 w-16 bg-slate-600 rounded mb-2"></div>
										<div className="text-2xl font-bold text-primary">14</div>
										<div className="text-xs text-slate-400">Active Agents</div>
									</div>
									<div className="h-24 rounded bg-slate-700/50 p-3">
										<div className="h-2 w-16 bg-slate-600 rounded mb-2"></div>
										<div className="text-2xl font-bold text-green-400">+18%</div>
										<div className="text-xs text-slate-400">Efficiency</div>
									</div>
								</div>
								<div className="space-y-3">
									<div className="h-10 rounded bg-slate-700/30 flex items-center px-3">
										<div className="h-6 w-6 rounded-full bg-slate-600 mr-3"></div>
										<div className="h-2 w-24 bg-slate-600 rounded"></div>
									</div>
									<div className="h-10 rounded bg-slate-700/30 flex items-center px-3 border border-secondary/30">
										<div className="h-6 w-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center text-xs mr-3"><Bot size={14} /></div>
										<div className="h-2 w-32 bg-slate-600 rounded mr-auto"></div>
										<div className="text-xs text-secondary">Optimizing...</div>
									</div>
									<div className="h-10 rounded bg-slate-700/30 flex items-center px-3">
										<div className="h-6 w-6 rounded-full bg-slate-600 mr-3"></div>
										<div className="h-2 w-20 bg-slate-600 rounded"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-20 bg-white text-center">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-6">Ready to upgrade your enterprise?</h2>
					<Link href="/contact">
						<Button size="lg" variant="default">Schedule a Demo</Button>
					</Link>
				</div>
			</section>
		</div>
	);
}
