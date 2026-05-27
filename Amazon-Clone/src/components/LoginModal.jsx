import React, { useState } from 'react';

export default function LoginModal({ isOpen, onClose, onLogin, user }) {
  const [email, setEmail] = useState('alex.student@college.edu');
  const [password, setPassword] = useState('password123');
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('Alex Student');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      onLogin({ name, email });
    } else {
      // Simulate successful login
      onLogin({ name: 'Alex Student', email });
    }
    onClose();
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal-card animated-fade-in">
        {/* Close Button */}
        <button className="login-close-btn" onClick={onClose} aria-label="Close Login">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>

        {/* Amazon Logo styling */}
        <div className="login-logo">
          <span className="logo-text">amazon</span>
          <span className="logo-dot">.prime</span>
        </div>

        {user ? (
          /* Signed In View - allows signing out */
          <div className="signed-in-content">
            <h3>You are signed in as:</h3>
            <p className="user-name-label"><strong>{user.name}</strong></p>
            <p className="user-email-label">{user.email}</p>
            
            <button 
              type="button" 
              className="amazon-btn w-full orange sign-out-btn"
              onClick={() => { onLogin(null); onClose(); }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          /* Sign In Form */
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>{isRegistering ? 'Create Account' : 'Sign in'}</h2>
            
            {isRegistering && (
              <div className="form-group">
                <label htmlFor="reg-name">Your Name</label>
                <input 
                  type="text" 
                  id="reg-name"
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="login-email">Email or mobile phone number</label>
              <input 
                type="email" 
                id="login-email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <input 
                type="password" 
                id="login-password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="amazon-btn w-full orange login-submit-btn">
              {isRegistering ? 'Create your Amazon account' : 'Sign In'}
            </button>

            <p className="legal-notice">
              By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
            </p>

            <div className="divider-row">
              <span className="divider-line" />
              <span className="divider-text">{isRegistering ? 'Already have an account?' : 'New to Amazon?'}</span>
              <span className="divider-line" />
            </div>

            <button 
              type="button" 
              className="amazon-btn w-full secondary switch-mode-btn"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? 'Sign in to your account' : 'Create your Amazon account'}
            </button>
          </form>
        )}
      </div>

      <style>{`
        .login-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.6);
          z-index: 2000;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .login-modal-card {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-lg);
          padding: 30px;
          width: 100%;
          max-width: 380px;
          position: relative;
          text-align: left;
        }

        .login-close-btn {
          position: absolute;
          right: 15px;
          top: 15px;
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color var(--transition-fast);
        }
        .login-close-btn:hover {
          color: var(--text-primary);
        }

        .login-logo {
          display: flex;
          justify-content: center;
          align-items: baseline;
          margin-bottom: 24px;
        }
        .login-logo .logo-text {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 28px;
          color: var(--text-primary);
          letter-spacing: -1.2px;
        }
        .login-logo .logo-dot {
          font-size: 14px;
          color: var(--amazon-orange);
          font-weight: 600;
          margin-left: 2px;
        }

        .login-form h2, .signed-in-content h2 {
          font-size: 24px;
          font-weight: 500;
          margin-bottom: 16px;
          color: var(--text-primary);
        }

        .login-form .form-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 12px;
        }
        .login-form .form-group label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .login-form .form-group input {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-sm);
          padding: 8px 10px;
          outline: none;
          font-size: 14px;
          color: var(--text-primary);
          transition: border-color var(--transition-fast);
        }
        .login-form .form-group input:focus {
          border-color: var(--border-focus);
          box-shadow: 0 0 3px rgba(228, 121, 17, 0.5);
        }

        .login-submit-btn, .sign-out-btn {
          margin-top: 10px;
          padding: 10px;
        }

        .legal-notice {
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-top: 16px;
          margin-bottom: 20px;
        }

        .divider-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 16px;
        }
        .divider-line {
          flex: 1;
          height: 1px;
          background-color: var(--border-color);
        }
        .divider-text {
          font-size: 11px;
          color: var(--text-secondary);
        }

        .switch-mode-btn {
          padding: 10px;
        }

        /* Signed in content */
        .signed-in-content {
          text-align: center;
        }
        .signed-in-content h3 {
          font-size: 16px;
          font-weight: 500;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }
        .user-name-label {
          font-size: 20px;
          color: var(--text-primary);
        }
        .user-email-label {
          font-size: 13px;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }
      `}</style>
    </div>
  );
}
