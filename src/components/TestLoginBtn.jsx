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

    try {
      // Ajusta la ruta si tu endpoint en KillerCore API es /login o /users/login
      const res = await axios.post('https://dk59-crud-api.onrender.com/api/users/login/', {
        email,
        password
      });

      toast.success(`✅ ¡Contraseña válida! Bienvenido ${res.data.user?.username || ''}`);
      setIsOpen(false);
      setEmail('');
      setPassword('');
    } catch (err) {
      const msg = err.response?.data?.message || '❌ Contraseña o correo incorrectos';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Botón circular con icono de llave */}
      <button
        type="button"
        className="btn-test-login"
        onClick={() => setIsOpen(true)}
        title="Probar credenciales (Login)"
      >
        <FaKey size={16} />
      </button>

      {/* Modal flotante */}
      {isOpen && createPortal(
        <div className="login-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="login-modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Probar Credenciales</h3>
            <p className="login-modal-desc">
              Verifica si la contraseña registrada o actualizada coincide en KillerCore API.
            </p>

            <form onSubmit={handleTestLogin} className="login-modal-form">
              <input
                type="email"
                placeholder="E-mail del usuario"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Contraseña a comprobar"
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
                  Cerrar
                </button>
                <button
                  type="submit"
                  className="btn-modal-submit"
                  disabled={loading}
                >
                  {loading ? 'Verificando...' : 'Comprobar'}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
