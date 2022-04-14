import React, {useEffect} from 'react';
import $ from 'jquery';
import Navtop from './components/Navtop';
import Banniereproduitaccueil from './components/BanniereProduitAccueil';
import banniereReveil from './assets/img/banniereReveil.png'
import banniereAmpoule from './assets/img/banniereAmpoule.png'
import banniereTraceur from './assets/img/banniereTraceur.png'
import banniereStockage from './assets/img/banniereStockage.png'
import BanniereproduitaccueilInv from './components/BanniereProduitAccueilInv';
import Bannieretopproduits from './components/BanniereTopProduits';
import banniereWebcam from './assets/img/banniereWebcam.png';
import banniereSpymic from './assets/img/banniereSpymic.png'
import bannierekit from './assets/img/bannierekit.png'
import expedition24 from './assets/img/expedition24.png'
import france from './assets/img/france.png'
import paiement from './assets/img/paiement.jpg'
import sav from './assets/img/sav.png'
import { Link } from 'react-router-dom';
import Ampoulecamera from './components/AmpouleCamera';


const Accueil = (props) => {

    function disparitionHorizontal(el){
      el.classList.remove("apparitionHorizontal");
      el.classList.add("disparitionHorizontal");
      setTimeout(()=>{hide(el)},1000);
    } 
    function apparitionHorizontal(el){
        setTimeout(()=>{
          visible(el);
          el.classList.add("apparitionHorizontal");
          el.classList.remove("disparitionHorizontal");
      },1000)
    } 
    
    function hide (el){
      el.classList.add("hide");
    }
    function visible (el){
      el.classList.remove("hide");
    }
    
    const sleep = (ms) =>
      new Promise(resolve => setTimeout(resolve, ms));
    
    
    useEffect(() => {
        let offre1 = document.getElementById("offre1");
        let offre2 = document.getElementById("offre2");
        let offre3 = document.getElementById("offre3");
        setInterval(() => {            
            disparitionHorizontal(offre3)
            apparitionHorizontal(offre1)
            setTimeout(() => {
                disparitionHorizontal(offre1)
                apparitionHorizontal(offre2)
                setTimeout(() => {
                    disparitionHorizontal(offre2)
                    apparitionHorizontal(offre3)
                }, 5000);
            }, 5000);
        }, 17000);
    }) 
    return (
        <div className="w-100 main">

            <div className="caouselOffre">
                <div id="offre1" className="offre hide">
                    <p className='m-0'>🤑🚚 LIVRAISON OFFERTE À PARTIR DE 100 € D'ACHAT POUR TOUTES LES PERSONNES AYANT UN COMPTE CAM SECURITE 🚚🤑</p>
                </div>
                <div id="offre2" className="offre hide">
                    <p className='m-0'>Profiter de 10% DE RÉDUCTION sur votre prochaine commandes avec le code promotionnel transmis lors de la création de votre compte 🛒🎁</p>
                </div>
                <div id="offre3" className="offre">
                    <p className='m-0'>Une multitude de possibilité de paiement SECURISEE: Visa, Mastercard, Paypal... 💳</p>
                </div>
            </div>

            <Banniereproduitaccueil titre="Réveil Caméra" sousTitre="Magnifique réveil noir mate pour se lever chaque matin et surveiller toute la journée ⏰🎥" titreColor="" sousTitreColor="" background="linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)" image={banniereReveil} position="50% -50%" size="100%" produit='1'/>
            <BanniereproduitaccueilInv titre="Ampoule Caméra" sousTitre="Prennez de la hauteur et surveillez vos pièces en 360° 💡🎥" titreColor="white" sousTitreColor="white" background="url(https://www.wallpaperup.com/uploads/wallpapers/2012/09/08/13209/1ed14ac8e39f6636252ca4931fbf6c8d-700.jpg) center" image={banniereAmpoule} />
            <Ampoulecamera showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent} />
            <Bannieretopproduits titre="Meilleures ventes"  showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent} user={props.user}/>
            <Banniereproduitaccueil titre="Traceur GPS Aimanté" sousTitre="Ne stressez plus et localisez au mètre près votre véhicule ou tous autres objets de valeur 🚗📍" size="15vw" titreColor="white" sousTitreColor="lightgrey" background="url(https://wallpaperaccess.com/full/1713147.jpg)" image={banniereTraceur} />
            <div className="d-flex w-100 gap-2 flex-column flex-md-row">
                <Banniereproduitaccueil className="w-50" titre="Bloc Chargeur Micro Espion" sousTitre="Transformer le meilleur compagnon de votre téléphone en redoutable micro 🔋🎙️" categorie={false} titreColor="#a0a0a0" sousTitreColor="#a0a0a0" background="url(https://images.unsplash.com/photo-1602703651892-7f0e73a14302?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80) center" image={banniereSpymic} position="bottom" size="100%"/>
                <BanniereproduitaccueilInv className="w-50" titre="Kit caméra de surveillance" sousTitre="Protéger sa maison et mettre sa famille en sécurité 🏡🎥" acheter={false} titreColor="black" sousTitreColor="#222" background="linear-gradient( 109.6deg,  rgba(223,234,247,1) 11.2%, rgba(244,248,252,1) 91.1% )" image={bannierekit} h='100' categorie="8" />
            </div>
            <div className="d-flex w-100 gap-2 flex-column flex-md-row">
                <Banniereproduitaccueil className="w-50" titre="Stockage" sousTitre="Enregistrer toutes vos vidéos" categorie="12" acheter={false} titreColor="" sousTitreColor="" background="linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)" image={banniereStockage} />
                <Banniereproduitaccueil className="w-50" titre="360 Rotatif Webcam" sousTitre="Pour faire passer ton setup de gamer à un autre niveau" titreColor="white" sousTitreColor="white" background="url(https://i.pinimg.com/originals/f6/8c/56/f68c56c207f9a4e8bbd19ad879426ebf.jpg) center" image={banniereWebcam} />
            </div>

            <div className="d-flex w-100 justify-content-start justify-content-md-center align-items-center p-2 mw-100 overflow-auto my-2">
                <div className="d-flex flex-column p-2 m-2 align-items-center justify-content-between" style={{height:"170px"}}>
                    <img src={expedition24} alt="" className="m-2 mb-1" style={{width:"100px",height:"100px", objectFit:"contain", objectPosition: "cenetr"}}/>
                    <span className="m-2 mt-1">Expédition en 24 heure seulement</span>
                </div>
                <div className="d-flex flex-column p-2 m-2 align-items-center justify-content-between" style={{height:"170px"}}>
                    <img src={france} alt="" className="m-2 mb-1" style={{width:"100px",height:"100px", objectFit:"contain", objectPosition: "cenetr"}}/>
                    <span className="m-2 mt-1">Stock en France</span>
                </div>
                <div className="d-flex flex-column p-2 m-2 align-items-center justify-content-between" style={{height:"170px"}}>
                    <img src={paiement} alt="" className="m-2 mb-1" style={{width:"100px",height:"100px", objectFit:"contain", objectPosition: "cenetr"}}/>
                    <span className="m-2 mt-1">Paiement sécurisé</span>
                </div>
                <div className="d-flex flex-column p-2 m-2 align-items-center justify-content-between" style={{height:"170px"}}>
                    <img src={sav} alt="" className="m-2 mb-1" style={{width:"100px",height:"100px", objectFit:"contain", objectPosition: "cenetr"}}/>
                    <span className="m-2 mt-1">SAV disponible et réactif</span>
                </div>
            </div>
        </div>
    );
}
export default Accueil;
