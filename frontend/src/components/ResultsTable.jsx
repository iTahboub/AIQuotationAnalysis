export default function ResultsTable({ data, uploadId, fileName, uploadedAt }) {
  if (!data || !data.memberClasses || data.memberClasses.length === 0) {
    return null;
  }

  const { memberClasses, currency = 'SAR', companyName } = data;

  // Calculate total
  const total = memberClasses.reduce((sum, item) => sum + item.totalPrice, 0);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <div style={{
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#1a202c',
          marginBottom: '10px'
        }}>
          Quotation Breakdown
        </h2>
        {companyName && (
          <p style={{
            fontSize: '18px',
            color: '#4a5568',
            fontWeight: '500'
          }}>
            {companyName}
          </p>
        )}
      </div>

      <div style={{
        background: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
        border: '1px solid #e2e8f0'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse'
        }}>
          <thead>
            <tr style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}>
              <th style={headerStyle}>Class Name</th>
              <th style={headerStyle}>Member Count</th>
              <th style={headerStyle}>Price per Member</th>
              <th style={headerStyle}>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {memberClasses.map((item, index) => (
              <tr key={index} style={{
                background: index % 2 === 0 ? 'white' : '#f7fafc',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#edf2f7'}
              onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 0 ? 'white' : '#f7fafc'}
              >
                <td style={cellStyle}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: index === 0 ? '#667eea' : index === 1 ? '#48bb78' : '#ed8936'
                    }}></div>
                    <span style={{ fontWeight: '600' }}>{item.className}</span>
                  </div>
                </td>
                <td style={cellStyle}>
                  <span style={{
                    background: '#edf2f7',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontWeight: '600',
                    color: '#2d3748'
                  }}>
                    {item.memberCount.toLocaleString()}
                  </span>
                </td>
                <td style={cellStyle}>{formatCurrency(item.pricePerMember, currency)}</td>
                <td style={cellStyle}>
                  <span style={{ fontWeight: '600', color: '#2d3748' }}>
                    {formatCurrency(item.totalPrice, currency)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{
              background: '#1a202c',
              color: 'white'
            }}>
              <td style={{ ...totalCellStyle }} colSpan="3">
                <span style={{ fontSize: '18px' }}>Grand Total</span>
              </td>
              <td style={{ ...totalCellStyle }}>
                <span style={{ fontSize: '20px' }}>{formatCurrency(total, currency)}</span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div style={{
        marginTop: '30px',
        padding: '24px',
        background: '#f7fafc',
        borderRadius: '12px',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#2d3748',
          marginBottom: '20px'
        }}>
          Document Information
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px'
        }}>
          <div>
            <p style={{
              margin: 0,
              fontSize: '13px',
              color: '#718096',
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontWeight: '600'
            }}>
              File Name
            </p>
            <p style={{
              margin: 0,
              fontSize: '15px',
              color: '#2d3748',
              fontWeight: '600'
            }}>
              {fileName || 'N/A'}
            </p>
          </div>
          
          <div>
            <p style={{
              margin: 0,
              fontSize: '13px',
              color: '#718096',
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontWeight: '600'
            }}>
              Upload ID
            </p>
            <p style={{
              margin: 0,
              fontSize: '15px',
              color: '#2d3748',
              fontWeight: '600',
              fontFamily: 'monospace'
            }}>
              {uploadId || 'N/A'}
            </p>
          </div>

          <div>
            <p style={{
              margin: 0,
              fontSize: '13px',
              color: '#718096',
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontWeight: '600'
            }}>
              Uploaded At
            </p>
            <p style={{
              margin: 0,
              fontSize: '15px',
              color: '#2d3748',
              fontWeight: '600'
            }}>
              {uploadedAt ? formatDate(uploadedAt) : 'N/A'}
            </p>
          </div>

          <div>
            <p style={{
              margin: 0,
              fontSize: '13px',
              color: '#718096',
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontWeight: '600'
            }}>
              Currency
            </p>
            <p style={{
              margin: 0,
              fontSize: '15px',
              color: '#2d3748',
              fontWeight: '600'
            }}>
              {currency} - Saudi Riyal
            </p>
          </div>

          <div>
            <p style={{
              margin: 0,
              fontSize: '13px',
              color: '#718096',
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontWeight: '600'
            }}>
              Total Members
            </p>
            <p style={{
              margin: 0,
              fontSize: '15px',
              color: '#2d3748',
              fontWeight: '600'
            }}>
              {memberClasses.reduce((sum, item) => sum + item.memberCount, 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const headerStyle = {
  padding: '20px 24px',
  textAlign: 'left',
  fontWeight: '600',
  fontSize: '14px',
  textTransform: 'uppercase',
  letterSpacing: '1px'
};

const cellStyle = {
  padding: '20px 24px',
  fontSize: '15px',
  color: '#4a5568',
  borderBottom: '1px solid #e2e8f0'
};

const totalCellStyle = {
  padding: '24px',
  fontSize: '16px',
  fontWeight: '700'
};

function formatCurrency(amount, currency) {
  return `${amount.toLocaleString()} ${currency}`;
}
