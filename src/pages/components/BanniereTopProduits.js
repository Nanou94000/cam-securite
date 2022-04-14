import React, { useState, useEffect } from 'react';
import Produit from './Produit';

const Bannieretopproduits = (props) => {
    const [produit_json,setProduits] = useState([        {
        nom:"Caméra réveil",
        sousNom:"Voir sans être vu",
        prix:165,
        image:"https://www.tomsguide.fr/content/uploads/sites/2/cache/2021/11/nest-indoor/3552683667.png" ,
    },])
    
    useEffect(async () => {      
        var url = "http://localhost:8000/produits/"

        let data = await fetch(url).then(response => {
        if(response.ok) {
            return response.json();
        } else {
            console.log(response,'Mauvaise réponse du réseau');
        }
        }).then(data =>{
            return data 
        })
        .catch(function(error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });
        setProduits(data)
    }, []);
    let pr = produit_json.slice(0,3)
    const produits = pr.map(p => <Produit showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent} user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction}image={p.image1} />)
    return (

		<div className="w-100 d-flex flex-column align-items-center">
                    <div className="traitHorizontal my-5 mx-5 w-75">					
                        <h4 className="bannSoustitre textTrait p-4">
                            {props.titre}
                        </h4>
                    </div>
		
					<div className="d-flex flex-md-row flex-column w-100 justify-content-center align-items-center ">
                        {produits}
					</div>
		</div>
    );
}

export default Bannieretopproduits;
