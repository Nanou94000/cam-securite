import React, {useEffect, useState}  from 'react';
import livraison from "../assets/icon/livraison.png"
import livre from "../assets/icon/livre.png"
import preparation from "../assets/icon/preparation.png"
import $ from "jquery"

const Commandeedit = (props) => {
    const [error,setError] = useState("")
    const [produits, setProduits] = useState(['...']);
    const [commandeinfo, setcommandeinfo] = useState('');
    useEffect(async() => {
        if(props.commande.etat=='payé')
            setcommandeinfo("Votre commande est en cours de préparation")
        if(props.commande.etat=='expedié')
            setcommandeinfo(<>
                <p className="text-center w-100">Votre commande est en cours d'acheminement</p>
                <a href="" className="text-danger">Numéro de suivi {props.commande.numerosuivie}</a>
            </>)
        if(props.commande.etat=='livré')
            setcommandeinfo("Votre commande est livré, Merci!")
        if(props.commande.profile!=null){
            var url2 = `http://localhost:8000/commande/${props.commande.id}/`
            
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
            setProduits(data2.map(p => 
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
                </div>))
        }
        else{
            var url2 = `http://localhost:8000/commandenonlogin/${props.commande.id}/`
            
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
            setProduits(data2.map(p => 
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
                </div>))
        }
        return () => {
            
        };
    }, [props]);
    return (
        <div className="d-flex flex-column justify-content-center w-100">
                {
                    props.commande.profile!=null
                    ?
                    <h3 className=" text-dark ">Commande : CAMSEC000{props.commande.id}</h3>
                    :
                    <h3 className=" text-dark ">Commande : CAMSECNOLOG000{props.commande.id}</h3>
                }
                {
                    props.commande.etat=="payé"
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
                        props.commande.etat=="expedié"
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
                    <span className="mt-2 text-dark me-5">Montant : <span className="fw-bold">{props.commande.total} €</span></span>
                    <span className="mt-2 text-dark ms-5">Payé le : <span className="fw-bold">{props.commande.date_payer}</span></span>
                </div>
                <p className="mt-4 text-dark">
                    {props.commande.contenu}
                </p>
                <a class="filtreNom text-dark d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" onClick={
                    (e) => {
                        if($('#Layer_1').hasClass("tr0"))
                            $('#Layer_1').removeClass("tr0")
                        else
                            $('#Layer_1').addClass("tr0")

                    }} >
                    <span className='w-100' >Détail de la commande</span>
                    <span>
                        <svg style={{height:'20px',width:'20px',transform:"rotate(180deg)", transitionDuration:"0.5s" }} id="Layer_1" x="0px" y="0px" viewBox="0 0 386.257 386.257" >
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
                    {produits}
                </ul>
                <a class="filtreNom text-dark d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample" onClick={
                    (e) => {
                        if($('#Layer_2').hasClass("tr0"))
                            $('#Layer_2').removeClass("tr0")
                        else
                            $('#Layer_2').addClass("tr0")
                    }
                } >
                    <span className='w-100'>Informations sur la livraison</span>
                    <span>
                        <svg style={{height:'20px',width:'20px',transform:"rotate(180deg)", transitionDuration:"0.5s" }} id="Layer_2" x="0px" y="0px" viewBox="0 0 386.257 386.257" >
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
                {
                    props.commande.profile!=null
                    ?
                        <div className="collapse panierRecap" id="collapseExample2">
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <div className="formrow w-100 me-2">
                                    <input id="in1" type="text" name='prenom' className="inputform" placeholder=" " defaultValue={props.commande.profile.user.first_name} disabled/>
                                    <label for="in1" className="labelform">Prénom</label> 
                                </div>
                                <div className="formrow w-100 ms-2">
                                    <input id="in2" type="text" name='nom' className="inputform" placeholder=" " defaultValue={props.commande.profile.user.last_name} disabled/>
                                    <label for="in2" className="labelform">Nom</label> 
                                </div>
                            </div>          
                            <div className="formrow w-100">
                                <input id="in6" type="text" name='adresse' className="inputform" autoComplete="off" placeholder=" " defaultValue={props.commande.profile.adresse} disabled/>
                                <label for="in6" className="labelform">Adresse</label> 
                            </div>            
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <div className="formrow  w-100 me-2">
                                    <input id="in8" type="text" name='cp' className="inputform " placeholder=" "  defaultValue={props.commande.profile.code_postal} disabled/>
                                    <label for="in8" className="labelform">Code postal</label> 
                                </div>
                                <div className="formrow w-100 ms-2">
                                    <input id="in7" type="text" name='ville' className="inputform " placeholder=" "  defaultValue={props.commande.profile.ville} disabled/>
                                    <label for="in7" className="labelform">Ville</label> 
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <div className="formrow w-100 me-2">
                                    <input id="in9" type="text" name='pays' className="inputform " placeholder=" " defaultValue={props.commande.profile.pays} disabled/>
                                    <label for="in9" className="labelform">Pays</label> 
                                </div>
                                <div className="formrow w-100 ms-2">
                                    <input id="in10" type="text" name='telephone' className="inputform " placeholder=" " defaultValue={props.commande.profile.telephone} disabled/>
                                    <label for="in10" className="labelform">Téléphone</label> 
                                </div>
                            </div>        
                            <div className="formrow w-100">
                                <input id="in6" type="text" name='adresse' className="inputform" autoComplete="off" placeholder=" " defaultValue={props.commande.livraison.type.nom} disabled/>
                                <label for="in6" className="labelform">Livraison</label> 
                            </div>  
                            
                        </div>
                    :
                        <div className="collapse panierRecap" id="collapseExample2">
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <div className="formrow w-100 me-2">
                                    <input id="in1" type="text" name='prenom' className="inputform" placeholder=" " defaultValue={props.commande.prenom} disabled/>
                                    <label for="in1" className="labelform">Prénom</label> 
                                </div>
                                <div className="formrow w-100 ms-2">
                                    <input id="in2" type="text" name='nom' className="inputform" placeholder=" " defaultValue={props.commande.nom} disabled/>
                                    <label for="in2" className="labelform">Nom</label> 
                                </div>
                            </div>          
                            <div className="formrow w-100">
                                <input id="in6" type="text" name='adresse' className="inputform" autoComplete="off" placeholder=" " defaultValue={props.commande.adresse} disabled/>
                                <label for="in6" className="labelform">Adresse</label> 
                            </div>            
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <div className="formrow  w-100 me-2">
                                    <input id="in8" type="text" name='cp' className="inputform " placeholder=" "  defaultValue={props.commande.code_postal} disabled/>
                                    <label for="in8" className="labelform">Code postal</label> 
                                </div>
                                <div className="formrow w-100 ms-2">
                                    <input id="in7" type="text" name='ville' className="inputform " placeholder=" "  defaultValue={props.commande.ville} disabled/>
                                    <label for="in7" className="labelform">Ville</label> 
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <div className="formrow w-100 me-2">
                                    <input id="in9" type="text" name='pays' className="inputform " placeholder=" " defaultValue={props.commande.pays} disabled/>
                                    <label for="in9" className="labelform">Pays</label> 
                                </div>
                                <div className="formrow w-100 ms-2">
                                    <input id="in10" type="text" name='telephone' className="inputform " placeholder=" " defaultValue={props.commande.telephone} disabled/>
                                    <label for="in10" className="labelform">Téléphone</label> 
                                </div>
                            </div>        
                            <div className="formrow w-100">
                                <input id="in6" type="text" name='adresse' className="inputform" autoComplete="off" placeholder=" " defaultValue={props.commande.livraison.type.nom} disabled/>
                                <label for="in6" className="labelform">Livraison</label> 
                            </div>  
                            
                        </div>
                    
                }
                {
                    props.commande.etat=="payé"
                    ? 
                    <>
                        <div className="formrow w-100 d-none" id='nds' >
                            <input id="numerosuivi" type="text" name='numerosuivie' className="inputform" placeholder=" " />
                            <label for="in6" className="labelform">Numéro de suivi</label> 
                        </div> 
                        <p className="text-center text-danger">
                            {error}
                        </p>
                        <button className="formbtn" onClick={async (e) => {
                            if($("#nds").hasClass("d-none"))
                                $("#nds").removeClass("d-none")
                            else{
                                let numerosuivi = $("#numerosuivi").val()
                                if (numerosuivi==""){
                                    setError("Entrer un numéro de suivi")
                                    return "aucun numéro de suivi"
                                }
                                let inputsForm = new Object
                                inputsForm["id"] = props.commande.id
                                if(props.commande.profile!=null)
                                    inputsForm["commande"] = "log"
                                else
                                    inputsForm["commande"] = "nolog"
                                inputsForm["numerosuivie"] = numerosuivi
                                inputsForm = JSON.stringify(inputsForm)
                                var url = `http://localhost:8000/expedier-commande/${props.commande.id}/`
                                let data = await fetch(url,{
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                      },
                                      body: inputsForm
                                  }).then(response => {
                                if(response.ok) {
                                    console.log("fetch")
                                    return response.json();
                                } 
                                else {
                                    console.log(response,'Mauvaise réponse du réseau');
                                }
                                }).then(data => 
                                    {return data}
                                    )
                                .catch(function(error) {
                                console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
                                });
                                if(data=="ko")
                                    setError("impossible de changer l'état de la commande")
                                else
                                    props.setModalcontent("commande expédié")
                            }
                        }
                        } >
                            Vous avez expédié la commande ?
                        </button>
                    </>         
                    :
                        props.commande.etat=="expedié"
                        ?
                        <>
                            <div className="formrow w-100 d-none" id='dlv' >
                                <input id="datelivraison" type="date" name='datelivraison' className="inputform" placeholder=" " />
                                <label for="in6" className="labelform">Date de réception</label> 
                            </div> 
                            <p className="text-center text-danger">
                                {error}
                            </p>
                            <button className="formbtn" onClick={async (e) => {
                            if($("#dlv").hasClass("d-none"))
                                $("#dlv").removeClass("d-none")
                                else{
                                    let datelivraison = $("#datelivraison").val()
                                    if (datelivraison==""){
                                        setError("Entrer un numéro de suivi")
                                        return "aucun numéro de suivi"
                                    }
                                    let inputsForm = new Object
                                    inputsForm["id"] = props.commande.id
                                    if(props.commande.profile!=null)
                                        inputsForm["commande"] = "log"
                                    else
                                        inputsForm["commande"] = "nolog"
                                    inputsForm["datelivraison"] = String(datelivraison)
                                    inputsForm = JSON.stringify(inputsForm)
                                    var url = `http://localhost:8000/livrer-commande/${props.commande.id}/`
                                    let data = await fetch(url,{
                                        method: 'POST',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                          },
                                          body: inputsForm
                                      }).then(response => {
                                    if(response.ok) {
                                        console.log("fetch")
                                        return response.json();
                                    } 
                                    else {
                                        console.log(response,'Mauvaise réponse du réseau');
                                    }
                                    }).then(data => 
                                        {return data}
                                        )
                                    .catch(function(error) {
                                    console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
                                    });
                                    if(data=="ko")
                                        setError("impossible de changer l'état de la commande")
                                    else
                                        props.setModalcontent("commande livré")
                                }
                            }}>
                                La commande à été livré ?
                            </button>
                        </>
                        :
                        <p className="text-center">
                            La commande à été livré le {props.commande.date_livraison}
                        </p>
                }
            </div>
    );
}

export default Commandeedit;
