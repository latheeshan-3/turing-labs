import Link from "next/link";
import { ArrowRight, Code, Heart, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function CareersPage() {
	const jobs = [
		{ title: "Senior AI Engineer", dept: "Engineering", loc: "Remote / London", type: "Full-time" },
		{ title: "Product Designer (UI/UX)", dept: "Design", loc: "New York", type: "Full-time" },
		{ title: "Machine Learning Researcher", dept: "R&D", loc: "San Francisco", type: "Full-time" },
		{ title: "Frontend Developer (React/Three.js)", dept: "Engineering", loc: "Remote", type: "Contract" },
	];

	return (
		<div className="min-h-screen pt-20 pb-20">
			<section className="bg-white py-20 text-center">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl md:text-6xl font-bold mb-6">Build what's next.</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
						Join a team of visionaries, engineers, and problem solvers dedicated to shaping the future of artificial intelligence.
					</p>
					<Button size="lg" variant="gradient">View Open Roles</Button>
				</div>
			</section>

			{/* Culture */}
			<section className="bg-slate-50 py-20">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{[
							{ icon: Zap, title: "Move Fast", desc: "We ship code daily and iterate on feedback instantly." },
							{ icon: Heart, title: "Be Kind", desc: "We value empathy and collaboration over ego." },
							{ icon: Globe, title: "Think Global", desc: "Our impact is worldwide, and so is our team." }
						].map((val, i) => (
							<div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
								<val.icon className="h-8 w-8 text-primary mb-4" />
								<h3 className="text-xl font-bold mb-2">{val.title}</h3>
								<p className="text-muted-foreground">{val.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Openings */}
			<section className="container mx-auto px-4 py-20">
				<h2 className="text-3xl font-bold mb-10">Open Positions</h2>
				<div className="grid gap-6">
					{jobs.map((job, i) => (
						<div key={i} className="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-xl border border-border hover:shadow-md transition-shadow">
							<div>
								<h3 className="text-xl font-bold">{job.title}</h3>
								<div className="flex space-x-4 text-sm text-muted-foreground mt-2">
									<span>{job.dept}</span>
									<span>•</span>
									<span>{job.loc}</span>
									<span>•</span>
									<span>{job.type}</span>
								</div>
							</div>
							<div className="mt-4 md:mt-0">
								<Button variant="outline">Apply Now</Button>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
