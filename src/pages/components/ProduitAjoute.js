import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Produitajoute = (props) => {
    let navigate = useNavigate();
    return (
        <div className="d-flex flex-column align-items-center justify-content-center p-3">
                <div className="d-flex justify-content-center align-items-center brrr">
                    <img src={props.image} alt="" className="m-0 me-2 panierProduitImage" />
                    <div className="d-flex flex-column align-items-start justify-content-start mt-2">
                        <span><span className='fw-bold' >{props.nom}</span> a été ajouté au panier avec succés</span>
                        <div className="d-flex mt-2">
                            <span>quantité</span>
                            <span className="ms-2 fw-bold">{props.qte}</span>
                        </div>
                        <div className="d-flex mt-2">
                            <span>montant</span>
                            <span className="ms-2 fw-bold">{props.montant} €</span>
                        </div>
                    </div>
                </div>
                <div className="traitHorizontal">
                    <span className="textTrait">
                        Nous vous recommandons ces accessoires: 
                    </span>
                </div>
                <Link to={`/panier/${props.panier}`} className="googleBtn" onClick={(e) =>{
                    e.preventDefault();
                    props.showHideModal(e,"")
                    navigate(`/panier/${props.panier}`)  
                } } >
                    Voir mon panier
                </Link>
        </div>
    );
}

export default Produitajoute;
