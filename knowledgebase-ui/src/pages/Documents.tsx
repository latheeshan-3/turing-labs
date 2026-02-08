import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Upload, File as FileIcon, Loader2 } from 'lucide-react';

interface Document {
	id: string;
	title: string;
	created_at: string;
	source_type: string;
	source_path: string | null;
}

const Documents = () => {
	const [documents, setDocuments] = useState<Document[]>([]);
	const [loading, setLoading] = useState(true);
	const [uploading, setUploading] = useState(false);

	useEffect(() => {
		fetchDocuments();
	}, []);

	const fetchDocuments = async () => {
		const { data, error } = await supabase
			.from('documents')
			.select('*')
			.order('created_at', { ascending: false });

		if (!error) setDocuments(data || []);
		setLoading(false);
	};

	const handleFileUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		setUploading(true);

		try {
			/* ------------------------------------------------------------
			 1. Upload file to Supabase Storage
			------------------------------------------------------------ */
			const filePath = `documents/${crypto.randomUUID()}-${file.name}`;

			const { error: uploadError } = await supabase.storage
				.from('documents')
				.upload(filePath, file, {
					contentType: file.type,
					upsert: false,
				});

			if (uploadError) throw uploadError;

			/* ------------------------------------------------------------
			 2. Get the public URL for the uploaded file
			------------------------------------------------------------ */
			const { data: urlData } = supabase.storage
				.from('documents')
				.getPublicUrl(filePath);

			const publicUrl = urlData.publicUrl;

			/* ------------------------------------------------------------
			 3. Insert row into documents table with public URL
			------------------------------------------------------------ */
			const { data: insertedDoc, error: insertError } = await supabase
				.from('documents')
				.insert({
					title: file.name,
					source_type: file.type,
					source_path: publicUrl, // Store the full public URL
					metadata: {
						size: file.size,
					},
				})
				.select()
				.single();

			if (insertError) throw insertError;

			/* ------------------------------------------------------------
			 4. Call embedding endpoint to process document
			------------------------------------------------------------ */
			if (insertedDoc) {
				try {
					console.log(`Calling embeddings API for document: ${insertedDoc.id}`);
					const embeddingResponse = await fetch(
						`${import.meta.env.VITE_BACKEND_URL}/embeddings`,
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({ doc_id: insertedDoc.id }),
						}
					);

					const embeddingResult = await embeddingResponse.json();

					if (embeddingResult.state) {
						console.log('Embeddings generated:', embeddingResult.message);
						alert('Document uploaded and embeddings generated successfully!');
					} else {
						console.error('Embedding generation failed:', embeddingResult.message);
						alert(
							`Document uploaded but embedding generation failed: ${embeddingResult.message}`
						);
					}
				} catch (embeddingError) {
					console.error('Error calling embeddings API:', embeddingError);
					alert(
						'Document uploaded but embedding generation failed. Check backend logs.'
					);
				}
			}

			await fetchDocuments();
		} catch (err) {
			console.error(err);
			alert('Upload failed');
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-3xl font-bold">Documents</h2>

				<label
					htmlFor="file-upload"
					className={`flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg cursor-pointer ${uploading && 'opacity-50 cursor-not-allowed'
						}`}
				>
					{uploading ? <Loader2 className="animate-spin" /> : <Upload />}
					Upload Document
				</label>

				<input
					id="file-upload"
					type="file"
					className="hidden"
					onChange={handleFileUpload}
					disabled={uploading}
				/>
			</div>

			{loading ? (
				<p className="text-gray-400">Loading...</p>
			) : documents.length === 0 ? (
				<p className="text-gray-400">No documents uploaded</p>
			) : (
				<div className="grid gap-4">
					{documents.map((doc) => (
						<div
							key={doc.id}
							className="flex justify-between items-center p-4 bg-gray-800 rounded-lg"
						>
							<div>
								<p className="font-semibold">{doc.title}</p>
								<p className="text-sm text-gray-400">
									{new Date(doc.created_at).toLocaleDateString()}
								</p>
							</div>

							<span className="text-xs bg-gray-700 px-2 py-1 rounded">
								{doc.source_type}
							</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Documents;
