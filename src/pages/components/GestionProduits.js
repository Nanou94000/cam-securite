import React, {useEffect, useState}  from 'react';
import Produitedit from './ProduitEdit';

const Gestionproduits = (props) => {
    const getProduits= async () =>{
        var url = "http://localhost:8000/produits/"

        let data = await fetch(url).then(response => {
        if(response.ok) {
            return response.json();
        } else {
            console.log(response,'Mauvaise réponse du réseau');
        }
        }).then(data => 
            {
                return data
            }
            )
        .catch(function(error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });
        return data
    }
    const [produits_show, setproduits_show] = useState([]);
    const [produits, setproduits] = useState([]);
    useEffect(async() => {
        const c = await getProduits()
        console.log("cccccccccccccccccccccc",c)
        setproduits(c)
        setproduits_show(c.map(produit =>(
            <div className="produit position-relative align-items-center produitAnim" onClick={ (e) => props.showHideModal(e,<Produitedit produit={produit}  setModalcontent={props.setModalcontent} modalContent={props.modalContent}  /> )} >
                <div className="d-flex flex-column w-100 align-items-center">
                    <img src={produit.image1} alt="" className="accueilProduitImage"/>
                    <span className="accueilProduitNom">
                        {produit.nom}
                    </span>
                    <p className="accueilProduitSousNom">
                        {produit.sousNom}
                    </p>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <div className="d-flex">
                        {
                            produit.prixSansReduction!=produit.prix
                            ?
                            <del className="accueilProduitPrixBarre me-1">
                                {produit.prixSansReduction} €
                            </del>
                            :
                            ""                         
                        }
                        <span className="accueilProduitPrix ms-1 text-black">
                            {produit.prix} €
                        </span>                    
                    </div>
                </div>
            </div>
        )))
        return () => {
        };
    }, []);
    return (
        <div className='w-100 p-3' >
        <div className="d-flex align-items-center justify-content-between pe-3 mb-3">
            <h1 className='fs-3' >Gestion des Produits</h1>
            
            <button className="formbtn" onClick={ (e) => props.showHideModal(e,<Produitedit produit={false}  setModalcontent={props.setModalcontent} modalContent={props.modalContent} /> )} style={{width:"fit-content"}}>
                Nouveau produit
            </button>
        </div>
            <div className="d-flex align-items-center justify-content-between pe-3">
                <div className="d-flex align-items-center">
                    <div className="d-flex flex-column me-3">
                        <span className="fs-2"></span>
                        <span>Tous les produits</span>
                    </div>
                    <div className="d-flex flex-column me-3">
                        <span className="fs-2"></span>
                        <span>Commandes non traités</span>
                    </div>
                    <div className="d-flex flex-column me-3">
                        <span className="fs-2"></span>
                        <span>Commandes expediées</span>
                    </div>
                    <div className="d-flex flex-column me-3">
                        <span className="fs-2"></span>
                        <span>Commandes finis</span>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-row flex-wrap justify-content-start align-items-center">
                {produits_show}
            </div>

        </div>
    );
}

export default Gestionproduits;
