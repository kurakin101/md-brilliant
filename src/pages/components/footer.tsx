import youtube from "../../media/youtube.svg"
import instagram from "../../media/instagram.svg"
import "./footer.css"

function Footer(){

    return(
        <div className="box_social_network">
            <div id="networksContent">
                    <div id="networks">
                    <div className="network" id="YouTube">
                        <img className="netLogo" src={youtube} alt="YouTube"/>
                        <a className="netName">YouTube</a>
                    </div>
                    <div className="network" id="instagram">
                        <img className="netLogo" src={instagram} alt="Instagram"/>
                        <a className="netName">Instagram</a>
                    </div>
                </div>
                <div id="stores">
                    <button className="store" id="playmarket"/>
                    <button className="store" id="appstore"/>
                </div>
                </div>
            </div>
    );
}

export default Footer;