import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Importando o CSS local da pasta

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(() => localStorage.getItem('@ReiDosFrios:email') ?? '');
  const [senha, setSenha] = useState(() => localStorage.getItem('@ReiDosFrios:senha') ?? '');

  const handleLogin = (e) => {
    e.preventDefault();

    // Salva as credenciais no localStorage (Conforme solicitado)
    // AVISO: Em aplicações reais, NUNCA salve senhas em texto puro no localStorage por questões de segurança.
    localStorage.setItem('@ReiDosFrios:email', email);
    localStorage.setItem('@ReiDosFrios:senha', senha);

    console.log('Autenticando com:', { email, senha });
    // Navega para o catálogo após "login" bem-sucedido
    navigate('/catalogo');
  };

  return (
    <div className="login-page-container">
      <div className="login-overlay">
        
        <header className="login-header">
          <h1>REI DOS FRIOS</h1>
          <p>Gastronomia Imperial</p>
        </header>

        <form className="login-form-card" onSubmit={handleLogin}>
          
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <span className="icon">✉️</span> {/* Ideal usar um SVG real de src/assets ou icons.svg */}
              <input 
                type="email" 
                id="email"
                placeholder="vossa.excelencia@reino.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <div className="input-wrapper">
              <span className="icon">🔒</span>
              <input 
                type="password" 
                id="senha"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="forgot-password">
            <a href="#">Esqueci minha senha</a>
          </div>

          <button type="submit" className="btn-primary">
            Entrar no Reino <span>🛡️</span>
          </button>

          <div className="divider">
            <span>Ou</span>
          </div>

          <button type="button" className="btn-secondary">
            Criar conta imperial →
          </button>
        </form>

        <p className="exclusive-text">EXCLUSIVO PARA APRECIADORES DA ALTA CHARCUTARIA</p>

        <footer className="login-footer">
          <a href="#">Políticas de Privacidade</a>
          <a href="#">Termos de Uso</a>
          <a href="#">FAQ</a>
          <a href="#">Trabalhe Conosco</a>
        </footer>

      </div>
    </div>
  );
}

// Opcional, dependendo de como você faz o import no seu Router
export default Login;