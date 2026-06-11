import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoRei from '../../assets/logo_rei.jpeg';
import './styles.css'; // Importando o CSS local da pasta

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(() => localStorage.getItem('@ReiDosFrios:email') ?? '');
  const [senha, setSenha] = useState(() => localStorage.getItem('@ReiDosFrios:senha') ?? '');
  const [showForgot, setShowForgot] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupSenha, setSignupSenha] = useState('');

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
          <img src={logoRei} alt="Logo Rei dos Frios" className="login-logo" />
          <h1>REI DOS FRIOS</h1>
          <p>Gastronomia Imperial</p>
        </header>

        <form className="login-form-card" onSubmit={handleLogin}>
          
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <span className="icon"></span> {/* Ideal usar um SVG real de src/assets ou icons.svg */}
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
              <span className="icon"></span>
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
            <button type="button" className="link-button" onClick={() => setShowForgot(true)}>Esqueci minha senha</button>
          </div>

          <button type="submit" className="btn-primary">
            Entrar no Reino <span></span>
          </button>

          <div className="divider">
            <span>Ou</span>
          </div>

          <button type="button" className="btn-secondary" onClick={() => setShowSignup(true)}>
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

        {/* Sheet: Esqueceu senha */}
        {showForgot && (
          <div className="sheet-overlay" onClick={() => setShowForgot(false)}>
            <div className="sheet" onClick={(e) => e.stopPropagation()}>
              <div className="sheet-header">
                <h3>Recuperar senha</h3>
                <button className="sheet-close" onClick={() => setShowForgot(false)}>×</button>
              </div>
              <form className="sheet-form" onSubmit={(e) => {
                e.preventDefault();
                // Simula envio de e-mail de recuperação
                alert(`Enviamos um link de recuperação para ${forgotEmail}`);
                setShowForgot(false);
              }}>
                <label>Informe seu e-mail</label>
                <input type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} required />
                <div className="sheet-actions">
                  <button type="submit" className="btn-primary">Enviar link</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Sheet: Criar conta */}
        {showSignup && (
          <div className="sheet-overlay" onClick={() => setShowSignup(false)}>
            <div className="sheet" onClick={(e) => e.stopPropagation()}>
              <div className="sheet-header">
                <h3>Criar Conta Imperial</h3>
                <button className="sheet-close" onClick={() => setShowSignup(false)}>×</button>
              </div>
              <form className="sheet-form" onSubmit={(e) => {
                e.preventDefault();
                // Simula criação de conta
                localStorage.setItem('@ReiDosFrios:email', signupEmail);
                localStorage.setItem('@ReiDosFrios:senha', signupSenha);
                alert(`Conta criada para ${signupName} (${signupEmail})`);
                setShowSignup(false);
              }}>
                <label>Nome completo</label>
                <input type="text" value={signupName} onChange={(e) => setSignupName(e.target.value)} required />
                <label>Email</label>
                <input type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
                <label>Senha</label>
                <input type="password" value={signupSenha} onChange={(e) => setSignupSenha(e.target.value)} required />
                <div className="sheet-actions">
                  <button type="submit" className="btn-primary">Criar conta</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// Opcional, dependendo de como você faz o import no seu Router
export default Login;