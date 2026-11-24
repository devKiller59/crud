import { useState } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { FaKey } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function TestLoginBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTestLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const BASE_URL = process.env.REACT_APP_API_URL;

    try {
      const res = await axios.post(`${BASE_URL}/api/users/login/`, {
        email,
        password
      });

      toast.success(`✅ Validated credentials! Welcome ${res.data.user?.username || ''}`);
      setIsOpen(false);
      setEmail('');
      setPassword('');
    } catch (err) {
      const msg = err.response?.data?.message || '❌ Invalid password or email';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn-test-login"
        onClick={() => setIsOpen(true)}
        title="Test Credentials (Login)"
      >
        <FaKey size={16} />
      </button>

      {isOpen && createPortal(
        <div className="login-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="login-modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Test Credentials</h3>
            <p className="login-modal-desc">
              Verify if the registered or updated password matches in KillerCore API.
            </p>

            <form onSubmit={handleTestLogin} className="login-modal-form">
              <input
                type="email"
                placeholder="User email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="login-modal-actions">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn-modal-submit"
                  disabled={loading}
                >
                  {loading ? 'Verifying...' : 'Check'}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
