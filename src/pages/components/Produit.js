import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Produitajoute from './ProduitAjoute';

const Produit = (props) => {
    const [deja,setDeja] = useState(false)
    const [u,setU] = useState(props.user)
    console.log('u u 168161',u)
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
    console.log('props ppp produit',props)

    const acheter = async (e) => {
        e.preventDefault();
        
        
        let btn = e.target
        btn.innerHTML=""
        btn.classList.add("btnLoading")
        var l = document.createElement('div') 
        l.setAttribute("class","loader1")
        var b = document.createElement('div') 
        b.setAttribute("class","box")
        b.appendChild(l)
        console.log(b)
        btn.appendChild(b);
        btn.disabled=true     
        var url = "http://localhost:8000/current_user/?format=json"
        let r = await getCSRF()
        const csrftoken = r.csrfToken
        let us = await fetch(url,{                
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
        setU(us)
        console.log('ussss852',us)

        if(us=='rien trouvé'){
            console.log("pas d'user")
            let produit = new Object
            let m = 'p'+String(props.id)
            produit[m] = new Object
            produit[m]['quantite'] = '1'
            produit[m]['id'] = String(props.id)
            produit = JSON.stringify(produit);
            let p = localStorage.getItem('panier')
            console.log('panier',p)
            var obj = JSON.parse(p);
            console.log('panier',obj)
            
            if(p!=null || p!=undefined){
                for(var i in obj){
                    console.log(obj[i]);
                    if(obj[i].id == props.id)
                        console.log("produit trouvé")
                    else{
                        obj[m] = new Object
                        obj[m]['quantite'] = '1'
                        obj[m]['id'] = String(props.id)
                        localStorage.setItem('panier',JSON.stringify(obj))
                    }
                }

            }
            else{
                localStorage.setItem('panier',produit)
            }
            setTimeout(() => {
                btn.innerHTML="Acheter"
                btn.classList.remove("btnLoading")
                props.showHideModal(e, <Produitajoute image={props.image} nom={props.nom} qte={1} panier={0} montant={props.prix} showHideModal={props.showHideModal} />)
            },750)
    
            btn.disabled=false
        }
        else{
            let inputsForm = new Object
            inputsForm['quantite'] = '1'
            inputsForm['idproduit'] = String(props.id)
            inputsForm['iduser'] = String(us.user.id)
            inputsForm = JSON.stringify(inputsForm);

        var url2 = "http://localhost:8000/ajouter_produit/"

        await fetch(url2,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }, 
              body: inputsForm
          }).then(response => {
        if(response.ok) {
            console.log("fetchAddProduit")
            return response.json();
        } else {
            console.log(response,'Mauvaise réponse du réseau pas d ajout');
        }
        }).then(data => 
            {
                console.log(data)
            }
            )
        .catch(function(error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });      
        var url = `http://localhost:8000/panier/${us.user.id}/`

        let data = await fetch(url).then(response => {
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
        console.log("##########################################",data)
        setTimeout(() => {
            btn.innerHTML="Acheter"
            btn.classList.remove("btnLoading")
            props.showHideModal(e, <Produitajoute image={props.image} nom={props.nom} qte={1} panier={data[0].panier.id} montant={props.prix} showHideModal={props.showHideModal} />)
        },2000)

        btn.disabled=false
    }

    }

    useEffect(async () => {
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
            setU(data)
            if(data!="rien trouvé"){ 
                var url2 = `http://localhost:8000/panier/${data.user.id}/`
    
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
                console.log("##########################################",data2)
                for (let i =0;i<data2.length-1;i++){
                    if(data2[i].produit.id==props.id){
                        setDeja(true)
                    }
                }
            }
            else{
                let p = localStorage.getItem('panier')   
                var obj = JSON.parse(p);
                if(p!=null || p!=undefined){
                    for(var i in obj){
                        console.log(obj[i]);
                        if(obj[i].id == props.id)
                            setDeja(true)
                    }
    
                }
            }
            return(data)
          }
        let d = await t()

        return () => {
        };
    }, []);

    return (
        <Link to={`/produit/${props.id}`} className="produit position-relative align-items-center produitAnim">
            {
            props.topInfo 
            ?
            <span className="produitInfo position-absolute text-center">{props.topInfo}</span>
            :
                props.prixSansReduc!=props.prix
                ?
                <span className="produitInfo position-absolute text-center">Promotion</span>
                :
                ""
            }
            
            <div className="d-flex flex-column w-100 align-items-center">
                <img src={props.image} alt="" className="accueilProduitImage"/>
                <span className="accueilProduitNom">
                    {props.nom}
                </span>
                <p className="accueilProduitSousNom">
                    {props.sousNom}
                </p>
            </div>
            <div className="d-flex flex-column align-items-center">
                <div className="d-flex">
                    {
                        props.prixSansReduc!=props.prix
                        ?
                        <del className="accueilProduitPrixBarre me-1">
                            {props.prixSansReduc} €
                        </del>
                        :
                        ""                         
                    }
                    <span className="accueilProduitPrix ms-1 text-black">
                        {props.prix} €
                    </span>                    
                </div>

                <button className="accueilProduitBtn" onClick={(e) => acheter(e)}>
                    Acheter
                </button>
            </div>
        </Link>
    );
}

export default Produit;
