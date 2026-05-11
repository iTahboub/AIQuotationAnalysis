import { useState, useRef } from 'react';

export default function FileUpload({ onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (file) => {
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Use environment variable for API endpoint
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      
      // Call the success callback with the response data
      onUploadSuccess(result);
      
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload file. Please try again.');
      
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? '#667eea' : '#cbd5e0'}`,
          borderRadius: '16px',
          padding: '60px 40px',
          textAlign: 'center',
          cursor: uploading ? 'not-allowed' : 'pointer',
          background: dragOver ? '#f7fafc' : 'white',
          transition: 'all 0.3s ease',
          boxShadow: dragOver ? '0 10px 40px rgba(102, 126, 234, 0.1)' : '0 4px 20px rgba(0,0,0,0.05)'
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileSelect}
          disabled={uploading}
          style={{ display: 'none' }}
        />

        {uploading ? (
          <div>
            <div className="spinner" style={{ margin: '0 auto 20px' }}></div>
            <p style={{
              fontSize: '18px',
              color: '#4a5568',
              fontWeight: '500',
              margin: 0
            }}>
              Uploading and processing...
            </p>
          </div>
        ) : (
          <>
            <svg
              width="64"
              height="64"
              fill="none"
              stroke="#667eea"
              strokeWidth="2"
              viewBox="0 0 24 24"
              style={{ display: 'block', margin: '0 auto 20px' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#2d3748',
              marginBottom: '10px'
            }}>
              Upload PDF Document
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#718096',
              marginBottom: '20px'
            }}>
              Drag and drop your PDF file here, or click to browse
            </p>
            <button
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 32px',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Choose File
            </button>
          </>
        )}
      </div>

      {error && (
        <div style={{
          marginTop: '20px',
          padding: '16px',
          background: '#fff5f5',
          border: '1px solid #fc8181',
          borderRadius: '8px',
          color: '#c53030',
          fontSize: '14px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
    </div>
  );
}
