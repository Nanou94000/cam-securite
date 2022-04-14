import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Banniereproduitaccueil = (props) => {
    const [produit_json, setProduit] = useState("")
    const [categorie, setCategorie] = useState("")
    useEffect(async() => {
        console.log('produit definit')
        if(props.produit != undefined){
            var url = "http://localhost:8000/produit/"+props.produit
    
            let d = await fetch(url).then(response => {
                if(response.ok) {
                    console.log("fetch")
                    return response.json();
                } 
                else {
                    console.log(response,'Mauvaise réponse du réseau');
                }
                }).then(data =>{
                    return(data)
                })
                .catch(function(error) {
                console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
                });
                setProduit(d)
                setCategorie(d.categorie)
                console.log('ddddddddddddddddddddddddddaaa0153',d.categorie)
        }
        
        if(props.categorie != undefined){
            var url = "http://localhost:8000/categories/"+props.categorie+'/'
    
            let d = await fetch(url).then(response => {
                if(response.ok) {
                    console.log("fetch")
                    return response.json();
                } 
                else {
                    console.log(response,'Mauvaise réponse du réseau');
                }
                }).then(data =>{
                    return(data)
                })
                .catch(function(error) {
                console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
                });
                setCategorie(d)
                console.log('ddddddddddddddddddddddddddaaa0117',d)
        }
    }, []);
    console.log('ppppppppppppprrrrrrrrrrrrrrrrr',produit_json)
    return (
        <div className="accueilBann w-100" style={{background : props.background,backgroundSize:"cover",backgroundRepeat:"no-repeat"}}>
            <h2 className="bannTitre" style={{color : props.titreColor}}>
                {props.titre}
            </h2>
            <h4 className="bannSoustitre" style={{color : props.sousTitreColor}}>
                {props.sousTitre}
            </h4>
            <div className="d-flex justify-content-center align-items-center w-100">
                {
                    props.acheter==false 
                    ?
                    ""
                    :
                        produit_json!=undefined || produit_json!=""
                        ?
                        <Link to={`/produit/${produit_json.id}`}  className="bannLink bannBtn">
                            Acheter {produit_json.nom} 
                        </Link>                    
                        :
                        <div className="loader" id="loader-2"></div>
                }
                {
                    props.categorie==false 
                    ?
                    ""
                    :

                        produit_json!=undefined || produit_json!=""
                        ?
                        <Link to={`/categorie/${categorie.id}`}  className="bannLink text-center">
                            Voir les {categorie.nom} 
                        </Link>                    
                        :
                        <div className="loader" id="loader-2"></div>
                }

            </div>
            <img src={props.image} className="bannImg" style={{objectPosition : props.position, width : props.size}}/>
        </div>
    );
}

export default Banniereproduitaccueil;
