import './ZakaziTermin.css';
import Header from '../../components/UI/Header/Header';
import ZakaziTerminContent from "../../components/ZakaziTerminContent/ZakaziTerminContent";
function ZakaziTermin()
{
    return(
        <div className="layout">

        <Header />
        <ZakaziTerminContent />
        </div>
    )
}
export default ZakaziTermin;