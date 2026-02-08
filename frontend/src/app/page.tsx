import Link from "next/link";
import { ArrowRight, Bot, Brain, Cpu, Rocket, Shield, Users, Zap, LayoutTemplate } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroGlobe } from "@/components/3d/HeroGlobe";
import { FadeIn, StaggerContainer } from "@/components/ui/fade-in";

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen overflow-x-hidden bg-white">
			{/* Hero Section */}
			<section className="relative min-h-screen w-full flex flex-col md:flex-row md:items-center overflow-hidden bg-white pt-20 md:pt-0">

				{/* Globe Container - Mobile: Top Relative / Desktop: Right Absolute */}
				{/* Mobile: h-[45vh] relative w-full. Desktop: absolute right h-full */}
				<div className="relative w-full h-[40vh] sm:h-[45vh] md:absolute md:top-0 md:right-0 md:w-[50%] md:h-full flex items-center justify-center z-10 pointer-events-none order-2">
					<HeroGlobe className="scale-[1.2] sm:scale-110 md:scale-100 opacity-100" />
				</div>

				{/* Content Container - Left Aligned */}
				{/* Mobile: Order 2, relative. Desktop: absolute/relative left */}
				<div className="relative z-20 w-full md:w-[50%] h-auto flex flex-col justify-center px-4 sm:px-6 md:pl-16 lg:pl-24 xl:pl-32 pb-16 md:pb-0 order-1">


					{/* Top Left Label */}
					<FadeIn direction="right" delay={0.1} className="mb-2 md:mb-4 text-center md:text-left">
						<span className="text-xl md:text-3xl font-medium tracking-tight text-slate-500 block">
							We are
						</span>
					</FadeIn>

					{/* Brand Name */}
					<FadeIn direction="up" delay={0.2} className="w-full text-center md:text-left">
						<h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-600 to-indigo-600 leading-tight">
							turing Labs.
						</h1>
					</FadeIn>

					{/* Tagline */}
					<FadeIn direction="up" delay={0.4} className="mt-4 sm:mt-6 md:mt-8 max-w-lg mx-auto md:mx-0 text-center md:text-left">
						 <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-slate-800 leading-snug mb-4">
							We build the world’s finest <span className="text-primary font-bold">intelligent systems.</span>
						</h2>
						<p className="text-base text-slate-500 mb-6 font-light leading-relaxed">
							We work with startups and enterprises to architect autonomous agents and custom AI solutions that make a real difference.
						</p>
						<Link href="/contact">
							<Button size="lg" variant="gradient" className="rounded-full px-6 sm:px-8 md:px-10 h-12 text-base w-full sm:w-auto">
								Start Project <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
							</Button>
						</Link>
					</FadeIn>
				</div>
			</section>

			{/* Services Section - Clean White */}
			<section className="py-24 bg-white relative">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<FadeIn className="text-center max-w-3xl mx-auto mb-20" direction="up">
						<h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-slate-900">Capabilities</h2>
						<p className="text-slate-500 text-lg">End-to-end AI engineering for the modern enterprise.</p>
					</FadeIn>

					<StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{ icon: Bot, title: "AI Automation", desc: "Automate complex workflows with intelligent bots and process orchestration." },
							{ icon: Cpu, title: "AI Agents", desc: "Autonomous agents that learn, adapt, and execute tasks independently." },
							{ icon: LayoutTemplate, title: "Enterprise AI", desc: "Custom LLM integration and secure AI infrastructure for large-scale ops." },
							{ icon: Zap, title: "Custom Engineering", desc: "High-performance software development with AI-native architecture." }
						].map((service, i) => (
							<FadeIn key={i} delay={i * 0.1}>
								<div className="group p-8 rounded-3xl bg-slate-50 border border-transparent hover:border-slate-100 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
									<div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center mb-6 text-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
										<service.icon className="h-7 w-7" />
									</div>
									<h3 className="text-xl font-bold mb-3 text-slate-900">{service.title}</h3>
									<p className="text-slate-500 leading-relaxed">{service.desc}</p>
								</div>
							</FadeIn>
						))}
					</StaggerContainer>
				</div>
			</section>

			{/* Who We Are - Minimal */}
			<section className="py-32 bg-slate-50 relative overflow-hidden">
				<div className="container mx-auto px-4 relative z-10">
					<div className="flex flex-col md:flex-row gap-20 items-center">
						<FadeIn direction="right" className="md:w-1/2">
							<h2 className="text-4xl md:text-6xl font-bold mb-8 text-slate-900 tracking-tight">Redefining Innovation.</h2>
							<p className="text-xl text-slate-600 mb-8 font-light leading-relaxed">
								Turing Labs is an innovation lab dedicated to solving complex enterprise challenges using advanced Artificial Intelligence. We don't just build software; we architect intelligent ecosystems.
							</p>
							<Link href="/about">
								<Button variant="outline" size="lg" className="rounded-full px-8 border-slate-300 hover:bg-slate-200 text-slate-900">
									Our Philosophy
								</Button>
							</Link>
						</FadeIn>
						<FadeIn direction="left" className="md:w-1/2 relative">
							<div className="aspect-square rounded-full bg-white shadow-2xl p-12 flex items-center justify-center relative z-10">
								<Brain className="h-40 w-40 text-primary/80" />
							</div>
							{/* Decorative circles */}
							<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-slate-200 rounded-full -z-0"></div>
							<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] border border-slate-200/50 rounded-full -z-10"></div>
						</FadeIn>
					</div>
				</div>
			</section>

			{/* Product Highlight - ARP */}
			<section className="py-32 bg-[#000000] text-white overflow-hidden relative">
				<div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 blur-[200px] rounded-full opacity-40"></div>

				<div className="container mx-auto px-4 relative z-10">
					<FadeIn className="max-w-4xl mx-auto text-center" direction="up">
						<h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
							Feature: <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">ARP</span>
						</h2>
						<p className="text-2xl text-slate-400 mb-12 leading-relaxed font-light">
							Agentic Resource Planning. The integrated system for the post-AI workforce.
						</p>
						<Link href="/product/arp">
							<Button size="lg" className="bg-white text-black hover:bg-slate-200 rounded-full px-10 h-16 text-lg">
								Explore Platform <ArrowRight className="ml-2 h-5 w-5" />
							</Button>
						</Link>
					</FadeIn>

					<FadeIn delay={0.3} className="mt-20 relative">
						<div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
							<div className="bg-slate-900 aspect-[21/9] w-full flex items-center justify-center">
								<p className="text-slate-600 font-mono">Interactive Dashboard Preview</p>
							</div>
						</div>
					</FadeIn>
				</div>
			</section>

			{/* Footer CTA */}
			<section className="py-32 bg-white text-center">
				<div className="container mx-auto px-4">
					<FadeIn direction="up">
						<h2 className="text-4xl md:text-6xl font-bold mb-8 text-slate-900 tracking-tight">Let's build something.</h2>
						<Link href="/contact">
							<span className="text-7xl md:text-9xl font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer tracking-tighter block hover:scale-105 transform duration-500">
								Start Project
							</span>
						</Link>
					</FadeIn>
				</div>
			</section>
		</div>
	);
}
