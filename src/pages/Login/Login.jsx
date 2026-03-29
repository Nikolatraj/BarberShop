import LoginContent from "../../components/LoginContent/LoginContent";
import Header from "../../components/UI/Header/Header";
import Footer from "../../components/UI/Footer/Footer";
import "./Login.css";


function Login() 
{
  return (
   <div className="layout">
   <Header  />
   <LoginContent />

   </div>
  );
}

export default Login;
