import Link from "next/link";
import { ArrowRight, Bot, Brain, Workflow, Zap, Database, Server, Code, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ServicesPage() {
	const services = [
		{
			id: "automation",
			title: "AI Automation",
			icon: Bot,
			description: "Streamline your business processes with intelligent automation that reduces manual effort and error rates.",
			features: ["Robotic Process Automation (RPA)", "Intelligent Document Processing", "Automated Customer Support", "Data Entry Automation"]
		},
		{
			id: "agents",
			title: "AI Agents & Multi-Agent Systems",
			icon: Brain,
			description: "Deploy autonomous agents capable of reasoning, planning, and executing complex tasks with minimal supervision.",
			features: ["Custom Agent Development", "Multi-Agent Orchestration", "Goal-Oriented Workflows", "Agentic Resource Planning (ARP)"]
		},
		{
			id: "enterprise",
			title: "Enterprise AI Integration",
			icon: Database,
			description: "Seamlessly integrate Large Language Models (LLMs) and predictive AI into your existing enterprise infrastructure.",
			features: ["Private LLM Deployment", "RAG (Retrieval-Augmented Generation)", "Secure API Gateways", "Legacy System Modernization"]
		},
		{
			id: "engineering",
			title: "Custom Software Engineering",
			icon: Code,
			description: "Full-cycle software development combining traditional engineering best practices with AI-native capabilities.",
			features: ["Cloud-Native Architecture", "Microservices", "High-Performance Web Apps", "Scalable Backend Systems"]
		}
	];

	return (
		<div className="min-h-screen pt-20 pb-10">
			{/* Header */}
			<section className="bg-muted/30 py-20 mb-16">
				<div className="container mx-auto px-4 text-center">
					<h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						Comprehensive AI and engineering solutions designed to transform your business operations and drive innovation.
					</p>
				</div>
			</section>

			{/* Services List */}
			<section className="container mx-auto px-4">
				<div className="space-y-24">
					{services.map((service, index) => (
						<div key={service.id} className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
							<div className="md:w-1/2">
								<div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl mb-6">
									<service.icon className="h-8 w-8 text-primary" />
								</div>
								<h2 className="text-3xl font-bold mb-4">{service.title}</h2>
								<p className="text-lg text-muted-foreground mb-8">
									{service.description}
								</p>
								<ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
									{service.features.map((feature, idx) => (
										<li key={idx} className="flex items-center text-sm font-medium">
											<div className="h-2 w-2 rounded-full bg-secondary mr-2"></div>
											{feature}
										</li>
									))}
								</ul>
								<Link href="/contact">
									<Button variant="outline">
										Learn More <ArrowRight className="ml-2 h-4 w-4" />
									</Button>
								</Link>
							</div>
							<div className="md:w-1/2">
								<div className="aspect-video rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 border border-border shadow-lg flex items-center justify-center relative overflow-hidden group">
									{/* Placeholder visual/animation per service */}
									<div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
									<service.icon className="h-24 w-24 text-slate-300 group-hover:text-primary/50 transition-colors duration-500" />
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* CTA */}
			<section className="mt-32 py-20 bg-primary/5">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-6">Need a Custom Solution?</h2>
					<p className="text-muted-foreground mb-8 max-w-xl mx-auto">
						Our team of engineers and data scientists is ready to tackle your most challenging problems.
					</p>
					<Link href="/contact">
						<Button size="lg" variant="gradient">
							Get in Touch
						</Button>
					</Link>
				</div>
			</section>
		</div>
	);
}
