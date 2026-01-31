import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
	return (
		<div className="min-h-screen pt-20 pb-20">
			<section className="container mx-auto px-4 py-20">
				<div className="max-w-4xl mx-auto">
					<h1 className="text-4xl md:text-6xl font-bold mb-8">We are Turing Labs.</h1>
					<p className="text-2xl text-muted-foreground leading-relaxed mb-12">
						Founded in 2024, we set out with a singular mission: to democratize access to agentic AI systems for enterprises worldwide.
					</p>

					<div className="prose prose-lg dark:prose-invert">
						<p>
							We believe that the future of work is not about replacing humans, but empowering them with intelligent agents that handle the mundane, allowing people to focus on the creative.
						</p>
						<p>
							Inspired by the legacy of Alan Turing, we push the boundaries of what machines can do. From our headquarters in London to our research labs in San Francisco, our diverse team is united by a passion for innovation.
						</p>
					</div>
				</div>
			</section>

			{/* Stats / Timeline could go here */}
		</div>
	);
}
