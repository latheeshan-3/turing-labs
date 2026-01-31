"use client";

import { useState } from "react";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function ChatBot() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
			{isOpen && (
				<div className="mb-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-primary/10 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 fade-in duration-300">
					<div className="bg-gradient-to-r from-primary to-secondary p-4 flex justify-between items-center text-white">
						<div className="flex items-center space-x-2">
							<Bot size={20} />
							<span className="font-semibold">Turing AI Assistant</span>
						</div>
						<button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors">
							<X size={18} />
						</button>
					</div>

					<div className="h-80 bg-slate-50 p-4 overflow-y-auto space-y-4">
						<div className="text-xs text-center text-muted-foreground my-2">Today</div>

						<div className="flex justify-start">
							<div className="bg-white border border-border p-3 rounded-2xl rounded-tl-none text-sm shadow-sm max-w-[85%] text-foreground">
								<p className="mb-2">Hello! 👋 I'm your AI guide to Turing Labs.</p>
								<p>Ask me about our <strong>ARP platform</strong>, <strong>AI automation services</strong>, or how to start a project.</p>
							</div>
						</div>
					</div>

					<div className="p-3 bg-white border-t flex space-x-2">
						<input
							type="text"
							placeholder="Ask anything..."
							className="flex-1 px-4 py-2 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-transparent focus:bg-white focus:border-primary/20"
						/>
						<Button size="icon" className="h-9 w-9 bg-primary hover:bg-primary/90 rounded-full shrink-0">
							<Send size={16} className="ml-0.5" />
						</Button>
					</div>
				</div>
			)}

			<Button
				onClick={() => setIsOpen(!isOpen)}
				size="lg"
				className={cn(
					"h-14 w-14 rounded-full shadow-2xl shadow-primary/30 p-0 flex items-center justify-center hover:scale-105 transition-transform duration-300",
					isOpen ? "bg-slate-800 hover:bg-slate-900" : "bg-gradient-to-r from-primary to-secondary"
				)}
			>
				{isOpen ? <X /> : <MessageSquare />}
			</Button>
		</div>
	);
}
