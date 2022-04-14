//import Accueil from './pages/Accueil';
import CGU from './pages/CGU';
import Privacy from './pages/Privacy';
import CompteActive from './pages/CompteActive';
import React, { useState, useEffect, Suspense, lazy } from 'react';
import './App.scss';
import { auth } from './firebase_config'
import Navtop from './pages/components/Navtop';
import Produitslist from './pages/components/ProduitsList';
import Stepbarre from './pages/components/StepBarre';
import Panier from './pages/components/Panier';
import Livraison from './pages/components/Livraison';
import Choixlivraison from './pages/components/ChoixLivraison';
import Commanderecap from './pages/components/CommandeRecap';
import Panierprocess from './pages/PanierProcess';
import $ from 'jquery';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from './pages/components/Footer';
import Produitachat from './pages/components/ProduitAchat';
import Compte from './pages/Compte';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Nous from './pages/Nous';
import Installation from './pages/Installation';
import Passwordchange from './pages/PasswordChange';
import Admin from './pages/Admin';

const Accueil = lazy(() => import('./pages/Accueil'));

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('sk_test_51JYyVMEwOswPrQzdx8k2n0DD5M8xSyhTOM1FatrJTdkh9hKtTcrtjOtCPiDyR0mV7lgyOMVPRE7hLbUenFvGS0Fw00AYGIAuLt');


function App(props) {

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'night',
    variables: {
      colorPrimary: '#ba0808',
    },
  };
  const options = {
    clientSecret,
    appearance,
  };
  let cat = {
    nom: "Caméra Espion",
    sousNom: "Très vicieux",
    banniereImage: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
  }
  const [modalContent, setModalcontent] = useState();
  const [url, setUrl] = useState(document.URL);
  const [token,setToken] = useState(localStorage.getItem('token') ? true : false)
  const [logged_in,setLogin] = useState(token)
  const [user,setUser] = useState({id:0,user:{first_name:"",last_name:""}})
  const [prenom,setPrenom] = useState('');



  const showHideModal = (e, modal) => {
    console.log('ls',localStorage.getItem('token'))

    e.preventDefault()
    if ($(".modalContainer").hasClass("d-none")) {
      setModalcontent(modal)
      $(".modalContainer").removeClass("d-none")
      $("body").addClass('noScroll')
    }
    else {
      $(".modalContainer").addClass("d-none")
      $("body").removeClass('noScroll')
    }
  }

  const getCSRF = async () => {
    var url2 = "http://localhost:8000/csrf/"
    let r = '' 
    await fetch(url2, {
        credentials: 'include',
      }).then(response => {
        if(response.ok) {
            console.log("fetchCSRF")
            r = response.json();
        } else {
            console.log(response,'Mauvaise réponse du réseau');
        }
        })
        .catch(function(error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });
    return r
}

useEffect(() => {
  let t = async () => {
    var url = "http://localhost:8000/current_user/?format=json"
    let r = await getCSRF()
    const csrftoken = r.csrfToken
    let data = await fetch(url,{                
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken
    }, 
    credentials: 'include',
    }).then(response => {
    if(response.ok) {
        console.log("current_user ttt",response)
        return response.json();
    } else {
        console.log(response,'Mauvaise réponse du réseau');
    }
    }).then(data => 
        {
          return(data)
        }
        )
    .catch(function(error) {
      console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    });
    if(data.user != undefined)
      setUser(data.user)
    console.log("user user user",user)
  }
    t()
},[user.id]);

  useEffect(() => {
    // Update the document title using the browser API
      $(".loadIT").addClass("o0")
      setTimeout(()=>{$(".loadIT").addClass("d-none")},1000)
      let t = async () => {
        var url = "http://localhost:8000/current_user/?format=json"
        let r = await getCSRF()
        const csrftoken = r.csrfToken
        let data = await fetch(url,{                
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        }, 
        credentials: 'include',
        }).then(response => {
        if(response.ok) {
            console.log("current_user ttt",response)
            return response.json();
        } else {
            console.log(response,'Mauvaise réponse du réseau');
        }
        }).then(data => 
            {
              return(data)
            }
            )
        .catch(function(error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });
        console.log('dddattaa',data)
        if(data.user != undefined)
          setPrenom(data.user.first_name)
      }
      t()
      
    },[prenom]);
    
    

  return (
    <>
      <div id="loader" className="loadIT three col">
        <div className="loader" id="loader-1"></div>
      </div>
      
    <Elements stripe={stripePromise} options={options}>
      <BrowserRouter>
      <Navtop showHideModal={showHideModal} url={url} setUrl={setUrl} modalContent={modalContent} setModalcontent={setModalcontent} user={user} setUser={setUser} token={token} setToken={setToken} logged_in={logged_in} setLogin={setLogin} prenom={prenom} setPrenom={setPrenom} />
          <Suspense fallback={<div id="loader" className="loadIT three col">
              <div className="loader" id="loader-2"></div>
            </div>}>
            <Routes>
            <Route path="/" element={<Accueil showHideModal={showHideModal} modalContent={modalContent} setModalcontent={setModalcontent} user={user}/>} />
            <Route path="/admin-cs/*" element={<Admin showHideModal={showHideModal} modalContent={modalContent} setModalcontent={setModalcontent} user={user}/>} />
            <Route path="/active/:id" element={<CompteActive showHideModal={showHideModal} modalContent={modalContent} setModalcontent={setModalcontent} user={user}/>} />
            <Route path="/reset-mdp/:id" element={<Passwordchange showHideModal={showHideModal} modalContent={modalContent} setModalcontent={setModalcontent} user={user}/>} />
            <Route path="/cgu" element={<CGU showHideModal={showHideModal} modalContent={modalContent} setModalcontent={setModalcontent} user={user}/>} />
            <Route path="/qui-sommes-nous" element={<Nous showHideModal={showHideModal} modalContent={modalContent} setModalcontent={setModalcontent} user={user}/>} />
            <Route path="/installation" element={<Installation showHideModal={showHideModal} modalContent={modalContent} setModalcontent={setModalcontent} user={user}/>} />
            <Route path="/privacy" element={<Privacy showHideModal={showHideModal} modalContent={modalContent} setModalcontent={setModalcontent} user={user}/>} />
            <Route path="/panier/:id" element={<Panierprocess showHideModal={showHideModal} modalContent={modalContent} setModalcontent={setModalcontent} user={user} setUser={setUser} modif={true}/>} />
            <Route path="/categorie/:id" element={<Produitslist showHideModal={showHideModal} modalContent={modalContent} setModalcontent={setModalcontent} user={user} setUser={setUser}/>} />
            <Route path="/produits" element={<Produitslist showHideModal={showHideModal} modalContent={modalContent} setModalcontent={setModalcontent} user={user} setUser={setUser}/>} />
            <Route path="/produit/:id" element={<Produitachat showHideModal={showHideModal} modalContent={modalContent} setModalcontent={setModalcontent} user={user} setUser={setUser}/>} />
            <Route path="/compte/:id" element={<Compte showHideModal={showHideModal} modalContent={modalContent} setModalcontent={setModalcontent} user={user} token={token} setToken={setToken} logged_in={logged_in} setLogin={setLogin} prenom={prenom} setPrenom={setPrenom} />} />
            <Route path="/recherche/:s" url={url} setUrl={setUrl} element={<Produitslist showHideModal={showHideModal} modalContent={modalContent} setModalcontent={setModalcontent} user={user} />} />
          </Routes>
          </Suspense>
      <Footer showHideModal={showHideModal} modalContent={modalContent} setModalcontent={setModalcontent}/>
      </BrowserRouter>
    </Elements>

    </>
  );

}

export default App;
