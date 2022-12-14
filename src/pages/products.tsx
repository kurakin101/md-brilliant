/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";
import "../styles/products.css"
import axios from "axios";
import Footer from "./components/footer";
import logo from "../media/logo.svg"

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
const database = ref(getDatabase(app));


function ProductsPage({
        set_page,
        id_user
    }:
    { 
        set_page: any,
        id_user: string | null
    }) {

    const [products, set_products]: any[] = useState([])
    const payRequest = (key: number) => {
      console.log(key)
    }
    useEffect(()=> {
        get(child(database, `products/`)).then((snapshot) => {
            const ProductsElements = []
            if (snapshot.exists()) {
              const productsArray: Record<string, {
                price: number,
                image: string,
                description: string,
                id: number
              }> = snapshot.val();
              for(const value in productsArray) {
                ProductsElements.push(
                  <div className="boxProduct">
                    <div className="prodImage" style={{ backgroundImage: 
                      "linear-gradient(151.79deg, rgba(255, 255, 255, 0.73) 23.73%, rgba(255, 255, 255, 0) 92.6%)," +
                      "url(" + productsArray[value].image + ")"}}>
                    <div className="priceProduct">
                      <p>{ productsArray[value].price } руб.</p>
                      <button key={productsArray[value].id} onClick={() => payRequest(productsArray[value].id)}>Купить</button>
                    </div>
                    </div>
                    <div className="titleProduct">
                      <p>{ value }</p>
                    </div>
                    <div className="descriptionProduct">
                      { productsArray[value].description }
                    </div>
                  </div>
                )
              }
              set_products(ProductsElements)
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });
    }, [products])
    return (
        <div id="cont">
          <div id="headerMobile">
          <div id="mobile">
                <img id="mobLogo" src={logo} alt="Logo" />
                <p>Выберите продукт</p>
            </div>
          </div>
        <img src={logo} alt="Logotype" id="logoProds" />
        <div id="productsHeader">
        <div id="headerProdsTitle">
          Выбор курса
        </div>
        </div>
        <div id="productsBlock">
          {products}
        </div>
        <Footer/>
        </div>
    );
}

export default ProductsPage;