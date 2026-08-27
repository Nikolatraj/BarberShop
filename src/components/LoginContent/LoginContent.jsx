import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./LoginContent.css";
import logo from "@/assets/logo-krug.png";
import { setUser, setToken } from "@/auth";

function LoginContent()
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = {
            email: email,
            password: password
        };

        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();
            
            if (data.success) {
                setToken(data.token);
                setUser(data.user);
                navigate(data.user.role === 'admin' ? '/admin' : '/');
            } else {
                alert('Greška: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Došlo je do greške pri logovanju');
        }
    };

    return(
        <section className="login">
            <div className="login-container">
                <div className="login-slika">
                    <img src={logo} className="logo"></img>
                </div>
               <div className="login-forma">
                    <div className="login-forma-content">
                        <h1>Member Login</h1>
                        <form className="login-form" onSubmit={handleLogin}>
                        <div className="input-group">
                            <FontAwesomeIcon icon={faEnvelope} color="black" />
                            <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="input-group">
                            <FontAwesomeIcon icon={faLock} color="black"/>
                            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <button className="login-btn" type="submit">LOGIN</button>
                        </form>
                    </div>
                    <h4><a href="/signup">Napravite nalog </a></h4>
                </div>
            </div>     
        </section>
    )
}
export default LoginContent;