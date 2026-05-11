export default function Header() {
  return (
    <header style={{
      background: 'white',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <nav style={{
        width: '100%',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '20px'
          }}>
            Q
          </div>
          <span style={{
            fontSize: '22px',
            fontWeight: '700',
            color: '#1a202c',
            letterSpacing: '-0.5px'
          }}>
            QuoteAnalyzer
          </span>
        </div>

        <div style={{
          display: 'flex',
          gap: '32px',
          alignItems: 'center'
        }}>
        </div>
      </nav>
    </header>
  );
}
