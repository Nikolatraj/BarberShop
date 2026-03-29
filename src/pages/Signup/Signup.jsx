import SignupContent from "../../components/SignupContent/SignupContent";
import Header from "../../components/UI/Header/Header";
import Footer from "../../components/UI/Footer/Footer";
import "./Signup.css";


function Signup() 
{
  return (
   <div className="layout">
   <Header  />
   <SignupContent />

   </div>
  );
}

export default Signup;
