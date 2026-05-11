export default function Footer() {
  return (
    <footer style={{
      background: '#1a202c',
      color: 'white',
      padding: '60px 40px 30px',
      marginTop: '80px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '36px',
                height: '30px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '18px'
              }}>
                Q
              </div>
              <span style={{
                fontSize: '20px',
                fontWeight: '700'
              }}>
                QuoteAnalyzer
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
