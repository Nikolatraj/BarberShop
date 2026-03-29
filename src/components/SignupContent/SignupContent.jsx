import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock , faUser} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./SignupContent.css";
import logo from "@/assets/logo-krug.png";

function SignupContent()
{
    const [ime,setIme]= useState('');
    const [prezime,setPrezime]= useState('');
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const navigate = useNavigate();

    
    const handleSignup = async (e) => {
        e.preventDefault();

        const signupData={
            ime:ime,
            prezime:prezime,
            email:email,
            password:password
        }
        try{
            const response = await fetch('http://localhost:8000/api/signup',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupData)
            });

            const data = await response.json();
            
            if (data.success) {
                alert('Uspesno napravljen nalog!');
                navigate('/login');
            } else {
                alert('Greška: ' + data.message);
            }
            }  
        catch (error) {
            console.error('Error:', error);
            alert('Došlo je do greške pri zakazivanju');
        }
     
    };
    return(
          <section className="signup">
              <div className="signup-container">
                  <div className="signup-slika">
                      <img src={logo} className="logo"></img>
                  </div>
                  <div className="signup-forma">
                      <div className="signup-forma-content">
                          <h1>Member Sign-up</h1>
                          <form  className="signup-form" onSubmit={handleSignup}>
                              <div className="input-grupa1">
                                  <div className='input-grupa'>
                                      <FontAwesomeIcon icon={faUser} color="black" />
                                      <input type="text" name="Ime" placeholder="Ime" required className='ime' value={ime} onChange={e => setIme(e.target.value)}/>
                                  </div>
  
                                  <div className='input-grupa'>
                                      <FontAwesomeIcon icon={faUser} color="black" />
                                      <input type="text" name="Prezime" placeholder="Prezime" required className='prezime' value={prezime} onChange={e => setPrezime(e.target.value)}/>
                                  </div>
                              </div>
                          <div className="input-grupa2">
                              <div className='input-grupa-ep'>
                                  <FontAwesomeIcon icon={faEnvelope} color="black" />
                                  <input type="email" name="email" placeholder="Email" required className='email' value={email} onChange={e => setEmail(e.target.value)}/>
                              </div>
                              <div className='input-grupa-ep'>
                                  <FontAwesomeIcon icon={faLock} color="black" />
                                  <input type="password" name="password" placeholder="Password" required className='password' value={password} onChange={e => setPassword(e.target.value)}/>
                              </div>
                          </div>
  
                          <button className="signup-btn" type="submit">Sign-up</button>
                          </form>
                      </div>
                      <h4>Već imate nalog. <a href="/login">Ulogujte se </a></h4>
                  </div>
              </div>     
          </section>
      )
  }
  export default SignupContent;