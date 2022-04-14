import React, {useEffect, useState}  from 'react';
import livraison from "../assets/icon/livraison.png"
import livre from "../assets/icon/livre.png"
import preparation from "../assets/icon/preparation.png"

const Commande = (props) => {
    const [produits, setProduits] = useState(['...']);
    const [commandeinfo, setcommandeinfo] = useState('');
    useEffect(async() => {
        if(props.statut=='payé')
            setcommandeinfo("Votre commande est en cours de préparation")
        if(props.statut=='expedié')
            setcommandeinfo("Votre commande est en cours d'acheminement")
        if(props.statut=='livré')
            setcommandeinfo("Votre commande est livré, Merci!")
        var url2 = `http://localhost:8000/commande/${props.numero}/`
        
        let data2 = await fetch(url2).then(response => {
        if(response.ok) {
            console.log("fetch")
            return response.json();
        } else {
            console.log(response,'Mauvaise réponse du réseau');
        }
        }).then(data => 
            {return data}
            )
        .catch(function(error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });
        console.log('wwwwwwwwwwwwwwwwwwwwww236',data2)
        setProduits(data2)
        return () => {
            
        };
    }, []);

    const showCommande = (e) => {
        props.showHideModal(e,
            <div className="d-flex flex-column justify-content-center w-100">
                <h3 className=" text-dark ">Commande : FRCAMSEC000{props.numero}</h3>
                {
                    props.statut=="payé"
                    ?
                    <div className="commandeStepsLine">

                        <div className="step">
                            <div className="stepImage stepActive d-flex justify-content-center align-items-center p-3" id='stepPanier' >
                                <img src={preparation} alt="" className="w-100	h-100"/>
                            </div>
                            <div className="stepConnect">
                                <div className="stepState" id='panierToLivraison'></div>
                            </div>
                        </div>

                        <div className="step">
                            <div className="stepImage d-flex justify-content-center align-items-center p-3" id='stepLivraison' >
                                <img src={livraison} alt="" className="w-100	h-100"/>
                            </div>
                            <div className="stepConnect">
                                <div className="stepState" id="livraisonToChoixLivraison"></div>
                            </div>
                        </div>

                        <div className="step">
                            <div className="stepImage d-flex justify-content-center align-items-center p-3" id='stepRecapCommande'>
                                <img src={livre} alt="" className="w-100	h-100"/>
                            </div>
                        </div>

                    </div>
                    :
                        props.statut=="expedié"
                        ?
                        <div className="commandeStepsLine">
    
                            <div className="step">
                                <div className="stepImage stepValide d-flex justify-content-center align-items-center p-3" id='stepPanier' >
                                    <img src={preparation} alt="" className="w-100	h-100"/>
                                </div>
                                <div className="stepConnect">
                                    <div className="stepState stepStateActive" id='panierToLivraison'></div>
                                </div>
                            </div>
    
                            <div className="step">
                                <div className="stepImage stepActive d-flex justify-content-center align-items-center p-3" id='stepLivraison' >
                                    <img src={livraison} alt="" className="w-100	h-100"/>
                                </div>
                                <div className="stepConnect">
                                    <div className="stepState" id="livraisonToChoixLivraison"></div>
                                </div>
                            </div>
    
                            <div className="step">
                                <div className="stepImage d-flex justify-content-center align-items-center p-3" id='stepRecapCommande'>
                                    <img src={livre} alt="" className="w-100	h-100"/>
                                </div>
                            </div>
    
                        </div>
                        :
                        <div className="commandeStepsLine">
    
                            <div className="step">
                                <div className="stepImage stepValide d-flex justify-content-center align-items-center p-3" id='stepPanier' >
                                    <img src={preparation} alt="" className="w-100	h-100"/>
                                </div>
                                <div className="stepConnect">
                                    <div className="stepState stepStateActive" id='panierToLivraison'></div>
                                </div>
                            </div>
    
                            <div className="step">
                                <div className="stepImage stepValide d-flex justify-content-center align-items-center p-3" id='stepLivraison' >
                                    <img src={livraison} alt="" className="w-100	h-100"/>
                                </div>
                                <div className="stepConnect">
                                    <div className="stepState stepStateActive" id="livraisonToChoixLivraison"></div>
                                </div>
                            </div>
    
                            <div className="step">
                                <div className="stepImage stepValide d-flex justify-content-center align-items-center p-3" id='stepRecapCommande'>
                                    <img src={livre} alt="" className="w-100	h-100"/>
                                </div>
                            </div>
    
                        </div>
                }
                <h5 className="text-center p-2">
                    {commandeinfo}
                </h5>
                <div className="w-100 d-flex justify-content-between">
                    <span className="mt-2 text-dark me-5">Montant : <span className="fw-bold">{props.montant} €</span></span>
                    <span className="mt-2 text-dark ms-5">Payé le : <span className="fw-bold">{props.date}</span></span>
                </div>
                <p className="mt-4 text-dark">
                    {props.contenu}
                </p>
                        <a class="filtreNom text-dark d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                            <span>Détail de la commande</span>
                            <span>
                                <svg style={{height:'20px',width:'20px'}} id="Layer_1" x="0px" y="0px" viewBox="0 0 386.257 386.257" >
                                    <polygon points="0,96.879 193.129,289.379 386.257,96.879 "/>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                </svg>    
                            </span> 
                        </a>
                        <ul className="collapse panierRecap" id="collapseExample">
                            {
                                produits.map(p => 
                                    <div className="panierProduit">
                                        <div className="panierProduitG border-end">
                                            <img src={p.produit.image1} alt="" className="panierProduitImage"/>
                                                <span className="panierProduitNom titre-bungee fw-bold">
                                                    {p.produit.nom}
                                                </span>
                                        </div>
                                        <div className="panierProduitDetails w-100">
                                            <div className="d-flex mb-2">
                                                <span></span>
                                                <span className="fw-bold ms-0">{p.produit.prix} €</span>
                                            </div>
                                            <div className="d-flex align-items-md-center flex-column flex-md-row mb-2">
                                                <span className="mb-1 mb-md-0">Quantité</span>
                                                <span className="ProduitBuyQte">
                                                    {p.quantite}
                                                </span>
                                            </div>
                                            <div className="d-flex">
                                                <span>Sous-Total</span>
                                                <span className="fw-bold ms-2">{p.quantite * p.produit.prix} €</span>
                                            </div>
                                        </div>
                                    </div>)
                                
                            }
                        </ul>
            </div>
            )
    }
    return (
        <div class="commande d-flex flex-column w-100 mb-4 position-relative" onClick={(e) => showCommande(e)}>
            <div class="d-flex justify-content-between align-items-center w-100">
                    <div class="d-flex flex-column">
                        <span class=" text-dark ">Commande numéro: {props.numero}</span>
                        <small class="mt-2 text-dark">Statut: {props.statut}</small>
                        <small class="mt-2 text-dark">Montant: {props.montant} €</small>
                        <small class="mt-2 text-dark">Payé le {props.date}</small>
                    </div>
                </div>
        </div>	
    );
}

export default Commande;
