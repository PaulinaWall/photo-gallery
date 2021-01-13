import React, { useState, useEffect, useCallback } from 'react';
import Alert from 'react-bootstrap/Alert';
import ProgressBar from 'react-bootstrap/esm/ProgressBar';
import { useDropzone } from 'react-dropzone';

import useUploadImage from '../../hooks/useUploadImage';

const UploadImages = ({ albumId }) => {
	const [uploadImages, setUploadImages] = useState([]);
	const [message, setMessage] = useState(null);
	const { uploadProgress, error, isSuccess } = useUploadImage(uploadImages, albumId);

	useEffect(() => {
		if (error) {
			setMessage(error.msg);
		} else if (isSuccess) {
			setMessage('Uploaded successfully!');
			setUploadImages([]);
		} else {
			setMessage(null);
		}
	}, [error, isSuccess]);

	const onDrop = useCallback(acceptedFiles => {
		setMessage(null);

		if (acceptedFiles.length === 0) {
			return;
		}

		setUploadImages(acceptedFiles);
	}, []);

	const { getRootProps, getInputProps, isDragActive, acceptedFiles, isDragAccept, isDragReject } = useDropzone({
		accept: 'image/gif, image/jpeg, image/png',
		onDrop
	});

	return (
		<div 
			{...getRootProps()} 
			id="upload-image-dropzone-wrapper" 
			className={
				`text-center px-4 py-3 my-3 ${isDragAccept 
				? `drag-accept`
				: ``} ${isDragReject 
					? `drag-reject`
					: ``}`
			}
		>
			<input {...getInputProps()} />
			{
				isDragActive
					? isDragAccept 
						? <p>Drop here!</p> 
						: <p>Wrong file type!</p>
					: <p>Add your images!</p>
			}
			{acceptedFiles && (
				<div className="accepted-files mt-2">
					<ul className="list-unstyled">
						{acceptedFiles.map(file => (
							<li key={file.name}><small>{file.name} ({Math.round(file.size / 1024)} kb)</small></li>
						))}
					</ul>
				</div>
			)}

			{uploadProgress !== null && (<ProgressBar variant="info" animated now={uploadProgress} />)}

			{
				message && 
					<Alert variant={message}>{message}</Alert>
			}
		</div>
	)
}

export default UploadImages
