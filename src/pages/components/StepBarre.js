import React from 'react';
import livraison from "../assets/icon/livraison.png"
import panier from "../assets/icon/panier.png"
import place from "../assets/icon/place.png"
import confirmer from "../assets/icon/confirmer.png"
import $ from 'jquery';
import Choixlivraison from './ChoixLivraison';


const Stepbarre = (props) => {
    return (
        <div className="commandeStepTop  w-100 d-flex flex-column align-items-center justify-content-center pb-3">
            <div className="commandeStepsLine">

                <div className="step">
                    <div className="stepImage stepActive d-flex justify-content-center align-items-center p-3" id='stepPanier' 
                    onClick={
                        () =>{
                            if($("#stepPanier").hasClass("stepValide")){
                                $(".stepActive").removeClass("stepActive")
                                $(".stepStateActive").removeClass("stepStateActive")
                                $(".stepImage").removeClass("stepValide")
                                $("#stepPanier").addClass("stepActive")
                                props.toPanier()
                            }
                        }
                        }>
                        <img src={panier} alt="" className="w-100	h-100"/>
                    </div>
                    <div className="stepConnect">
                        <div className="stepState" id='panierToLivraison'></div>
                    </div>
                </div>

                <div className="step">
                    <div className="stepImage stepInactive d-flex justify-content-center align-items-center p-3" id='stepLivraison' 
                    onClick={
                        () =>{
                            if($("#stepLivraison").hasClass("stepValide")){
                                $(".stepActive").removeClass("stepActive")
                                $(".stepStateActive").removeClass("stepStateActive")
                                $(".stepImage").removeClass("stepValide")
                                $("#panierToLivraison").addClass("stepStateActive")
                                $("#stepPanier").addClass("stepValide")
                                $("#stepLivraison").addClass("stepActive")
                                props.toLivraison()
                            }
                        }
                        }>
                        <img src={place} alt="" className="w-100	h-100"/>
                    </div>
                    <div className="stepConnect">
                        <div className="stepState" id="livraisonToChoixLivraison"></div>
                    </div>
                </div>

                <div className="step" >
                    <div className="stepImage stepInactive d-flex justify-content-center align-items-center p-3" id='stepChoixLivraison' 
                    onClick={
                        () =>{
                            if($("#stepChoixLivraison").hasClass("stepValide")){
                                $(".stepActive").removeClass("stepActive")
                                $(".stepStateActive").removeClass("stepStateActive")
                                $(".stepImage").removeClass("stepValide")
                                $("#panierToLivraison").addClass("stepStateActive")
                                $("#livraisonToChoixLivraison").addClass("stepStateActive")
                                $("#stepPanier").addClass("stepValide")
                                $("#stepLivraison").addClass("stepValide")
                                $("#stepChoixLivraison").addClass("stepActive")
                                props.setPanierStep(<Choixlivraison button={ props.btnChoixLivraison }/>)
                                props.setStepBarreBtn(props.btnChoixLivraison)
                                $("#stepLivraison").addClass('stepValide')
                                $("#livraisonToChoixLivraison").addClass("stepStateActive")
                                $("#stepLivraison").removeClass("stepActive")
                                setTimeout(() => $("#stepChoixLivraison").addClass('stepActive'),1000)                            }
                        }
                        }>
                        <img src={livraison} alt="" className="w-100	h-100"/>
                    </div>
                    <div className="stepConnect">
                        <div className="stepState" id='choixLivraisonToRecapCommande' onClick={props.toCommandeRecap}></div>
                    </div>
                </div>

                <div className="step">
                    <div className="stepImage stepInactive d-flex justify-content-center align-items-center p-3" id='stepRecapCommande'>
                        <img src={confirmer} alt="" className="w-100	h-100"/>
                    </div>
                </div>

            </div>
            {props.button}
        </div>
    );
}

export default Stepbarre;
