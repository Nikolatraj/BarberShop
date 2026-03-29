import "./Content.css";
import Hero from "@/components/Hero/Hero";
import ONama from "@/components/ONama/ONama";
import Usluge from "@/components/Usluge/Usluge";
import NasTim from "@/components/NasTim/NasTim";
function Content() {
  return (
    <main className="content">
      <div>
        <Hero />
      </div>

      <div>
        <ONama /> 
      </div>
      
      <div>
        <Usluge />
      </div>

      <div> 
        <NasTim />
      </div>
    </main>
  );
}

export default Content;
