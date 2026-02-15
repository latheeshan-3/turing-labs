"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { X, Send, Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

// Dynamically import 3D icon to avoid SSR issues with Three.js
const ChatBotIcon3D = dynamic(
	() =>
		import("@/components/3d/ChatBotIcon3D").then((mod) => ({
			default: mod.ChatBotIcon3D,
		})),
	{
		ssr: false,
		loading: () => (
			<div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary to-secondary animate-pulse" />
		),
	}
);

interface Message {
	role: "user" | "assistant";
	content: string;
}

export function ChatBot() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const [showBubble, setShowBubble] = useState(false);
	const [hasInteracted, setHasInteracted] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [messages, setMessages] = useState<Message[]>([
		{
			role: "assistant",
			content:
				"Hello! 👋 I'm your AI guide to Turing Labs. Ask me about our **ARP platform**, **AI automation services**, or how to start a project.",
		},
	]);
	const [inputValue, setInputValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [conversationId, setConversationId] = useState<string>("");

	const messagesEndRef = useRef<HTMLDivElement>(null);
	const bubbleTimerRef = useRef<NodeJS.Timeout | null>(null);
	const bubbleIntervalRef = useRef<NodeJS.Timeout | null>(null);

	// Scroll detection
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 300);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const isHome = pathname === "/";
	// Dock if not on home page, or if scrolled down
	const isDocked = !isHome || isScrolled;

	useEffect(() => {
		// Generate or retrieve conversation ID
		let id = localStorage.getItem("turing_chatbot_conversation_id");
		if (!id) {
			id = crypto.randomUUID();
			localStorage.setItem("turing_chatbot_conversation_id", id);
		}
		setConversationId(id);
	}, []);

	/* ─── Speech bubble auto-show/hide logic ─────────────────── */
	const showBubbleTemporarily = useCallback(() => {
		setShowBubble(true);
		bubbleTimerRef.current = setTimeout(() => {
			setShowBubble(false);
		}, 4000); // reduced to 4 seconds show duration
	}, []);

	useEffect(() => {
		if (hasInteracted) return; // stop showing once user has opened chat

		// Initial appearance after 3 seconds
		const initialDelay = setTimeout(() => {
			showBubbleTemporarily();

			// Repeat every 7 seconds (3s pause + 4s visible)
			bubbleIntervalRef.current = setInterval(() => {
				showBubbleTemporarily();
			}, 7000);
		}, 3000);

		return () => {
			clearTimeout(initialDelay);
			if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
			if (bubbleIntervalRef.current) clearInterval(bubbleIntervalRef.current);
		};
	}, [hasInteracted, showBubbleTemporarily]);

	const handleOpenChat = () => {
		setIsOpen(true);
		setShowBubble(false);
		setHasInteracted(true);
		if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
		if (bubbleIntervalRef.current) clearInterval(bubbleIntervalRef.current);
	};

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		if (isOpen) {
			scrollToBottom();
		}
	}, [messages, isOpen]);

	const handleSendMessage = async () => {
		if (!inputValue.trim() || isLoading) return;

		const userMessage = inputValue.trim();
		setInputValue("");

		// Add user message immediately
		setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
		setIsLoading(true);

		try {
			const apiUrl =
				process.env.NEXT_PUBLIC_CHATBOT_API_URL || "http://localhost:8000";
			const response = await fetch(`${apiUrl}/chat`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					conversation_id: conversationId,
					message: userMessage,
				}),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();

			// Add AI response
			setMessages((prev) => [
				...prev,
				{ role: "assistant", content: data.message },
			]);
		} catch (error) {
			console.error("Error sending message:", error);
			setMessages((prev) => [
				...prev,
				{
					role: "assistant",
					content:
						"I apologize, but I'm having trouble connecting to the server right now. Please try again later.",
				},
			]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	return (
		<>
			{/* Open State: Fixed Chat Window */}
			{isOpen && (
				<div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 flex flex-col items-end">
					<div className="mb-4 w-[calc(100vw-2rem)] md:w-96 max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-primary/10 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 fade-in duration-300">
						<div className="bg-gradient-to-r from-primary to-secondary p-4 flex justify-between items-center text-white">
							<div className="flex items-center space-x-2">
								<Bot size={20} />
								<span className="font-semibold">Turing AI Assistant</span>
							</div>
							<button
								onClick={() => setIsOpen(false)}
								className="hover:bg-white/20 p-1 rounded transition-colors"
							>
								<X size={18} />
							</button>
						</div>

						<div className="h-80 bg-slate-50 p-4 overflow-y-auto space-y-4">
							<div className="text-xs text-center text-muted-foreground my-2">
								Today
							</div>

							{messages.map((msg, index) => (
								<div
									key={index}
									className={cn(
										"flex w-full",
										msg.role === "user" ? "justify-end" : "justify-start"
									)}
								>
									<div
										className={cn(
											"p-3 rounded-2xl text-sm shadow-sm max-w-[85%]",
											msg.role === "user"
												? "bg-primary text-white rounded-tr-none"
												: "bg-white border border-border rounded-tl-none text-foreground"
										)}
									>
										<div
											dangerouslySetInnerHTML={{
												__html: msg.content
													.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
													.replace(/\n/g, "<br />"),
											}}
										/>
									</div>
								</div>
							))}

							{isLoading && (
								<div className="flex justify-start">
									<div className="bg-white border border-border p-3 rounded-2xl rounded-tl-none text-sm shadow-sm text-foreground flex items-center space-x-2">
										<Loader2 className="h-3 w-3 animate-spin" />
										<span>Thinking...</span>
									</div>
								</div>
							)}
							<div ref={messagesEndRef} />
						</div>

						<div className="p-3 bg-white border-t flex space-x-2">
							<input
								type="text"
								placeholder="Ask anything..."
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								onKeyDown={handleKeyDown}
								disabled={isLoading}
								className="flex-1 px-4 py-2 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-transparent focus:bg-white focus:border-primary/20 disabled:opacity-50"
							/>
							<Button
								size="icon"
								className="h-9 w-9 bg-primary hover:bg-primary/90 rounded-full shrink-0 disabled:opacity-50"
								onClick={handleSendMessage}
								disabled={isLoading || !inputValue.trim()}
							>
								<Send size={16} className="ml-0.5" />
							</Button>
						</div>
					</div>

					<Button
						onClick={() => setIsOpen(false)}
						size="lg"
						className="h-14 w-14 rounded-full shadow-2xl shadow-primary/30 p-0 flex items-center justify-center hover:scale-105 transition-transform duration-300 bg-slate-800 hover:bg-slate-900"
					>
						<X />
					</Button>
				</div>
			)}

			{/* Closed State: Orbiting Icon (or Docked if scrolled) */}
			{!isOpen && (
				<div
					className={cn(
						"chatbot-orbit-container",
						isDocked && "chatbot-docked"
					)}
				>
					<div className="chatbot-orbit-arm">
						<div className="chatbot-orbit-icon">
							<div className="chatbot-float-wrapper relative flex items-center">
								{/* Speech bubble popup */}
								{showBubble && (
									<div className="speech-bubble mr-2">
										<span className="text-sm font-medium whitespace-nowrap typewriter-text">
											Hi, lulu here
										</span>
									</div>
								)}

								{/* Pulsing glow ring behind the icon */}
								<div className="relative">
									<div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-xl animate-pulse-glow pointer-events-none" />
									<div className="relative">
										<ChatBotIcon3D onClick={handleOpenChat} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
