import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Upload, File as FileIcon, Loader2 } from 'lucide-react';
import axios from 'axios';

// Supabase table interface assumption based on user request
interface Document {
	id: string;
	title: string;
	created_at: string;
	source_type: string;
}

const Documents = () => {
	const [documents, setDocuments] = useState<Document[]>([]);
	const [loading, setLoading] = useState(true);
	const [uploading, setUploading] = useState(false);

	useEffect(() => {
		fetchDocuments();
	}, []);

	const fetchDocuments = async () => {
		try {
			const { data, error } = await supabase
				.from('documents')
				.select('*')
				.order('created_at', { ascending: false });

			if (error) throw error;
			setDocuments(data || []);
		} catch (error) {
			console.error('Error fetching documents:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		setUploading(true);
		try {
			// 1. Upload to Supabase Storage (Optional but good practice, though user didn't explicitly ask for storage bucket, 
			// just "view uploaded documents". Assuming meta-data in table first).
			// Actually user said: "when admin uploaded the document it calls the embadding/ api end point ... and store that documets ... in documets table"
			/* # This part is tricky.Usually we upload file to storage, then insert record. 
			 # Or send to backend, backend does both. 
			 # User said: "when admin uploaded the document it calls the embadding...".
			 # So I will send to backend endpoint FIRST.The backend should likely handle insertion into 'documents' table too ?
			 # Wait, user said: "when uploading documents ... directly it will store on the documets table ... "
			 # AND "when admin uploaded the document it calls the embadding/ api end point ... for create embadinngs ... and store ... in chunk_document table".
			 
			 # Implementation approach:
			 # 1. Insert into 'documents' table from Frontend to get ID.
			 # 2. Call backend '/embedding' with file and document_id.*/

			const { data: docData, error: docError } = await supabase
				.from('documents')
				.insert([
					{
						title: file.name,
						source_type: 'file',
						metadata: { size: file.size, type: file.type }
					}
				])
				.select()
				.single();

			if (docError) throw docError;

			// 2. Call Backend Embedding Endpoint
			const formData = new FormData();
			formData.append('file', file);
			formData.append('document_id', docData.id);

			const backendUrl = import.meta.env.VITE_BACKEND_URL;
			await axios.post(`${backendUrl}/embedding`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			});

			// Refresh list
			fetchDocuments();
			alert('Document uploaded and processed successfully!');
		} catch (error) {
			console.error('Error uploading document:', error);
			alert('Error uploading document. See console for details.');
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-3xl font-bold">Documents</h2>
				<div className="relative">
					<input
						type="file"
						id="file-upload"
						className="hidden"
						onChange={handleFileUpload}
						disabled={uploading}
					/>
					<label
						htmlFor="file-upload"
						className={`flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
					>
						{uploading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
						<span>{uploading ? 'Uploading...' : 'Upload Document'}</span>
					</label>
				</div>
			</div>

			{loading ? (
				<div className="text-center text-gray-400 py-10">Loading documents...</div>
			) : documents.length === 0 ? (
				<div className="text-center text-gray-400 py-10 border border-dashed border-gray-700 rounded-lg">
					<FileIcon size={48} className="mx-auto mb-2 opacity-50" />
					<p>No documents uploaded yet.</p>
				</div>
			) : (
				<div className="grid gap-4">
					{documents.map((doc) => (
						<div key={doc.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex items-center justify-between">
							<div className="flex items-center gap-4">
								<div className="p-3 bg-gray-700 rounded-lg">
									<FileIcon size={24} className="text-blue-400" />
								</div>
								<div>
									<h3 className="font-semibold text-lg">{doc.title}</h3>
									<p className="text-sm text-gray-400">
										Uploaded on {new Date(doc.created_at).toLocaleDateString()}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300">
									{doc.source_type || 'Unknown'}
								</span>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Documents;
