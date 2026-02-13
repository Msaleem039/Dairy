'use client';

import Footer from '../../src/components/Footer/Footer';

export default function ContactPage() {
  return (
    <div style={{ marginTop: '100px', padding: '20px', maxWidth: '1200px', margin: '100px auto 0', lineHeight: '1.8' }}>
      <h1 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '30px', textAlign: 'center', color: '#667eea' }}>
        Contact Us
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '50px' }}>
        <div style={{ background: 'rgba(102, 126, 234, 0.05)', padding: '30px', borderRadius: '12px', border: '1px solid rgba(102, 126, 234, 0.2)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
            📞 Phone
          </h2>
          <p style={{ fontSize: '18px', color: '#555', marginBottom: '10px' }}>
            <a href="tel:03250080999" style={{ color: '#667eea', textDecoration: 'none' }}>
              0325-0080999
            </a>
          </p>
          <p style={{ fontSize: '16px', color: '#777' }}>
            Call us for orders and inquiries
          </p>
        </div>

        <div style={{ background: 'rgba(102, 126, 234, 0.05)', padding: '30px', borderRadius: '12px', border: '1px solid rgba(102, 126, 234, 0.2)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
            📍 Location
          </h2>
          <p style={{ fontSize: '18px', color: '#555', marginBottom: '10px' }}>
            Mugalpura, Lahore
          </p>
          <p style={{ fontSize: '16px', color: '#777' }}>
            Visit us at our location
          </p>
        </div>

        <div style={{ background: 'rgba(102, 126, 234, 0.05)', padding: '30px', borderRadius: '12px', border: '1px solid rgba(102, 126, 234, 0.2)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
            🌐 Social Media
          </h2>
          <p style={{ fontSize: '18px', color: '#555', marginBottom: '10px' }}>
            <a 
              href="https://www.facebook.com/profile.php?id=61584233731912" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#667eea', textDecoration: 'none' }}
            >
              Facebook
            </a>
          </p>
          <p style={{ fontSize: '16px', color: '#777' }}>
            Follow us on social media
          </p>
        </div>
      </div>

      <div style={{ background: 'rgba(102, 126, 234, 0.05)', padding: '40px', borderRadius: '12px', border: '1px solid rgba(102, 126, 234, 0.2)', marginBottom: '50px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px', color: '#333', textAlign: 'center' }}>
          Get in Touch
        </h2>
        <p style={{ fontSize: '16px', color: '#555', textAlign: 'center', marginBottom: '20px' }}>
          Have a question or need assistance? We're here to help!
        </p>
        <div style={{ textAlign: 'center' }}>
          <a 
            href="https://wa.me/923250080999" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-block',
              padding: '12px 30px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '50px',
              fontWeight: '600',
              fontSize: '16px',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}
          >
            💬 Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}





