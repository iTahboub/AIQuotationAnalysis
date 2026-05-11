export default function Hero({ data }) {
  // Calculate stats from API data
  const totalMembers = data?.memberClasses?.reduce((sum, item) => sum + item.memberCount, 0) || 0;
  const memberClassesCount = data?.memberClasses?.length || 0;
  const totalAmount = data?.memberClasses?.reduce((sum, item) => sum + item.totalPrice, 0) || 0;
  const currency = data?.currency || 'SAR';

  return (
    <section style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '80px 40px',
      textAlign: 'center',
      color: 'white'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '700',
          marginBottom: '20px',
          lineHeight: '1.2',
          letterSpacing: '-1px'
        }}>
          Insurance Quotation Analysis
        </h1>
        <p style={{
          fontSize: '20px',
          opacity: 0.95,
          lineHeight: '1.6',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Comprehensive breakdown of member classes, pricing, and total costs for your insurance quotation
        </p>
        
        {data && (
          <div style={{
            marginTop: '40px',
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              padding: '20px 30px',
              borderRadius: '12px',
              minWidth: '150px'
            }}>
              <div style={{
                fontSize: '32px',
                fontWeight: '700',
                marginBottom: '5px'
              }}>
                {totalMembers.toLocaleString()}
              </div>
              <div style={{
                fontSize: '14px',
                opacity: 0.9
              }}>
                Total Members
              </div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              padding: '20px 30px',
              borderRadius: '12px',
              minWidth: '150px'
            }}>
              <div style={{
                fontSize: '32px',
                fontWeight: '700',
                marginBottom: '5px'
              }}>
                {memberClassesCount}
              </div>
              <div style={{
                fontSize: '14px',
                opacity: 0.9
              }}>
                Member Classes
              </div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              padding: '20px 30px',
              borderRadius: '12px',
              minWidth: '150px'
            }}>
              <div style={{
                fontSize: '32px',
                fontWeight: '700',
                marginBottom: '5px'
              }}>
                {totalAmount.toLocaleString()}
              </div>
              <div style={{
                fontSize: '14px',
                opacity: 0.9
              }}>
                Total {currency}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
