import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import ProductsPage from "./products";
import "../styles/mainPage.css"
import Footer from "./components/footer";
import logo from "../media/logo.svg"
import mastercard from "../media/payment/mastercard.svg"
import mir from "../media/payment/mir.svg"
import sbp from "../media/payment/sbp.svg"
import visa from "../media/payment/visa.svg"

const firebaseConfig = {
    apiKey: "AIzaSyDwZLdKO7D20Zj96JGU4tt738UT70YzVyQ",
    authDomain: "mdbrilliant-1a48b.firebaseapp.com",
    databaseURL: "https://mdbrilliant-1a48b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mdbrilliant-1a48b",
    storageBucket: "mdbrilliant-1a48b.appspot.com",
    messagingSenderId: "571179454157",
    appId: "1:571179454157:web:10cc3aea854cc4d952e384",
    measurementId: "G-C5KDGXGE4Y"
  };
  
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function AuthPage({
        set_login,
        set_password,
        set_page,
        login,
        password
    }:
    { 
        set_login: React.Dispatch<React.SetStateAction<string>>,
        set_password: React.Dispatch<React.SetStateAction<string>>,
        set_page: React.Dispatch<React.SetStateAction<JSX.Element>>,
        login: string,
        password: string
    }) {
    const change_login = (e: any ) => {
        set_login(e.target.value);
    };
    const change_password = (e: any ) => {
        set_password(e.target.value);
    };
    const authentication_request = () => {
        signInWithEmailAndPassword(auth, login, password)
        .then((userCredential) => {
            const user = userCredential.user;
            set_page(<ProductsPage
                set_page={set_page}
                id_user={user.email}
            />)
        })
        .catch((error) => {

        });
    }
  return (
    <>
        <div className="discreptions_about_app">
            <div id="title">
                <img src={logo} alt="Logotype"/>
                <div id="titleText">Медитации. Лекции. Курсы</div>
            </div>
            <div id="description">
            Описание проекта Описание проекта Описание проекта Описание проекта Описание проекта Описание проекта Описание проекта Описание проекта Описание проекта Описание проекта Описание проекта 
            </div>
            <div id="paymentBox">
            <p id="paymentTitle">Способы оплаты</p>
            <div id="payments">
                <img className="paymentImg" src={visa} alt="Visa" id="payType" />
                <img className="paymentImg" src={mir} alt="Mir" id="payType" />
                <img className="paymentImg" src={mastercard} alt="Mastercard" id="payType" />
                <img className="paymentImg" src={sbp} alt="SBP" id="payType" />
            </div>
            </div>
        </div>

        <div className="authentication_box">

            <div className="box_for_name_app">
                <div id="appName">
                Войти в MD.Brilliant
                </div>
            </div>

            <div className="lables">
                <input placeholder="Логин" onChange={change_login} type="email" className="inputs"/>
                <input placeholder="Пароль" onChange={change_password} type="password" className="inputs"/>
                <button id="authenticationBtn" onClick={authentication_request}>ВОЙТИ</button>
            </div>

        <Footer/>
        </div>

    </>
  );
}

export default AuthPage;