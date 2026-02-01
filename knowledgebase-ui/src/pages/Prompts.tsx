import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Edit2, CheckCircle, XCircle, Save, X } from 'lucide-react';

interface PromptTemplate {
	id: string;
	name: string;
	template_content: string;
	version: number;
	is_active: boolean;
	created_at: string;
}

const Prompts = () => {
	const [prompts, setPrompts] = useState<PromptTemplate[]>([]);
	const [loading, setLoading] = useState(true);
	const [editingPrompt, setEditingPrompt] = useState<Partial<PromptTemplate> | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		fetchPrompts();
	}, []);

	const fetchPrompts = async () => {
		try {
			const { data, error } = await supabase
				.from('prompt_template')
				.select('*')
				.order('created_at', { ascending: false });

			if (error) throw error;
			setPrompts(data || []);
		} catch (error) {
			console.error('Error fetching prompts:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleToggleActive = async (id: string, currentStatus: boolean) => {
		try {
			const { error } = await supabase
				.from('prompt_template')
				.update({ is_active: !currentStatus })
				.eq('id', id);

			if (error) throw error;
			fetchPrompts();
		} catch (error) {
			console.error('Error updating status:', error);
		}
	};

	const handleSave = async () => {
		if (!editingPrompt?.name || !editingPrompt?.template_content) return;

		try {
			if (editingPrompt.id) {
				// Update
				const { error } = await supabase
					.from('prompt_template')
					.update({
						name: editingPrompt.name,
						template_content: editingPrompt.template_content,
						version: (editingPrompt.version || 0) + 1 // Auto increment version on edit
					})
					.eq('id', editingPrompt.id);
				if (error) throw error;
			} else {
				// Create
				const { error } = await supabase
					.from('prompt_template')
					.insert([{
						name: editingPrompt.name,
						template_content: editingPrompt.template_content,
						version: 1,
						is_active: true
					}]);
				if (error) throw error;
			}

			setIsModalOpen(false);
			setEditingPrompt(null);
			fetchPrompts();
		} catch (error) {
			console.error('Error saving prompt:', error);
			alert('Failed to save prompt.');
		}
	};

	const openEditor = (prompt?: PromptTemplate) => {
		setEditingPrompt(prompt ? { ...prompt } : { name: '', template_content: '', version: 1 });
		setIsModalOpen(true);
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-3xl font-bold">Prompt Templates</h2>
				<button
					onClick={() => openEditor()}
					className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
				>
					<Plus size={20} />
					<span>New Prompt</span>
				</button>
			</div>

			{loading ? (
				<div className="text-center text-gray-400 py-10">Loading prompts...</div>
			) : (
				<div className="grid gap-4">
					{prompts.map((prompt) => (
						<div key={prompt.id} className="bg-gray-800 p-6 rounded-lg border border-gray-700 space-y-4">
							<div className="flex justify-between items-start">
								<div>
									<h3 className="text-xl font-semibold flex items-center gap-2">
										{prompt.name}
										<span className="text-xs px-2 py-0.5 rounded-full bg-gray-600 text-gray-300">
											v{prompt.version}
										</span>
										{prompt.is_active ? (
											<span className="text-xs px-2 py-0.5 rounded-full bg-green-900 text-green-300 flex items-center gap-1">
												<CheckCircle size={10} /> Active
											</span>
										) : (
											<span className="text-xs px-2 py-0.5 rounded-full bg-red-900 text-red-300 flex items-center gap-1">
												<XCircle size={10} /> Inactive
											</span>
										)}
									</h3>
									<p className="text-xs text-gray-400 mt-1">
										Created: {new Date(prompt.created_at).toLocaleDateString()}
									</p>
								</div>
								<div className="flex gap-2">
									<button
										onClick={() => openEditor(prompt)}
										className="p-2 hover:bg-gray-700 rounded-lg text-blue-400 transition-colors"
										title="Edit"
									>
										<Edit2 size={18} />
									</button>
									<button
										onClick={() => handleToggleActive(prompt.id, prompt.is_active)}
										className={`p-2 hover:bg-gray-700 rounded-lg transition-colors ${prompt.is_active ? 'text-red-400' : 'text-green-400'}`}
										title={prompt.is_active ? 'Deactivate' : 'Activate'}
									>
										{prompt.is_active ? <XCircle size={18} /> : <CheckCircle size={18} />}
									</button>
								</div>
							</div>

							<div className="bg-gray-900 p-4 rounded-md font-mono text-sm text-gray-300 whitespace-pre-wrap max-h-40 overflow-y-auto">
								{prompt.template_content}
							</div>
						</div>
					))}
				</div>
			)}

			{/* Edit Modal */}
			{isModalOpen && editingPrompt && (
				<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
					<div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-2xl p-6 shadow-2xl">
						<div className="flex justify-between items-center mb-6">
							<h3 className="text-2xl font-bold">
								{editingPrompt.id ? 'Edit Prompt' : 'New Prompt'}
							</h3>
							<button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
								<X size={24} />
							</button>
						</div>

						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
								<input
									type="text"
									value={editingPrompt.name}
									onChange={(e) => setEditingPrompt({ ...editingPrompt, name: e.target.value })}
									className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
									placeholder="e.g. Chatbot System Prompt"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-400 mb-1">Template Content</label>
								<textarea
									value={editingPrompt.template_content}
									onChange={(e) => setEditingPrompt({ ...editingPrompt, template_content: e.target.value })}
									className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 h-64 font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
									placeholder="Enter prompt template..."
								/>
							</div>

							<div className="flex justify-end gap-3 mt-6">
								<button
									onClick={() => setIsModalOpen(false)}
									className="px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
								>
									Cancel
								</button>
								<button
									onClick={handleSave}
									disabled={!editingPrompt.name || !editingPrompt.template_content}
									className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
								>
									<Save size={18} />
									Save Prompt
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Prompts;
