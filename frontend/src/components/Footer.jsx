import React from 'react'

const Footer = () => {
  return (
    <div style={{
      background: 'linear-gradient(to right, #f472b6, #ec4899)',
      color: 'white',
      padding: '20px',
      textAlign: 'center',
      position: 'relative',
      marginTop: 'auto'
    }}>
      <h2 style={{ marginBottom: '10px' }}>WedEase</h2>
      <p>Email: info@wedease.com</p>
      <p>Phone: +91 98765 43210</p>
      
      <p style={{ marginTop: '20px', fontSize: '12px' }}>© 2026 WedEase. All rights reserved.</p>
    </div>
  )
}

export default Footer
