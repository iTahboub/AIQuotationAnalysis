import { useState } from 'react'
import ResultsTable from './components/ResultsTable'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import FileUpload from './components/FileUpload'
import './App.css'

function App() {
  const [responseData, setResponseData] = useState(null);

  const handleUploadSuccess = (data) => {
    setResponseData(data);
  };

  return (
    <div className="app">
      <Header />
      <Hero data={responseData?.data} />
      
      <main style={{
        width: '100%',
        padding: '60px 40px',
        minHeight: '60vh'
      }}>
        {!responseData ? (
          <div>
            <div style={{
              textAlign: 'center',
              marginBottom: '40px'
            }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#2d3748',
                marginBottom: '10px'
              }}>
                Get Started
              </h2>
              <p style={{
                fontSize: '16px',
                color: '#718096'
              }}>
                Upload your insurance quotation PDF to analyze member classes and pricing
              </p>
            </div>
            <FileUpload onUploadSuccess={handleUploadSuccess} />
          </div>
        ) : (
          <div>
            <ResultsTable 
              data={responseData.data} 
              uploadId={responseData.uploadId}
              fileName={responseData.fileName}
              uploadedAt={responseData.uploadedAt}
            />
            <div style={{
              textAlign: 'center',
              marginTop: '40px'
            }}>
              <button
                onClick={() => setResponseData(null)}
                style={{
                  background: 'white',
                  color: '#667eea',
                  border: '2px solid #667eea',
                  padding: '12px 32px',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#667eea';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.color = '#667eea';
                }}
              >
                Upload Another File
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
