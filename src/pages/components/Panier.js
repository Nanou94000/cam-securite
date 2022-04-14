import React, {useEffect, useState}  from 'react';
import close from "../assets/icon/close.png"
import $ from 'jquery';
import { gsap } from "gsap";

const Panier = (props) => {
    console.log('props panier',props)
    const [produits,setProduits] = useState('')
    const [panierItems, setPanieritems] = useState([0])
    const [panier,setPanier] = useState('')
    const [u,setU] = useState({id:0,user:{first_name:"",last_name:""}})
    console.log('u u 168161',u,panierItems)
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

    console.log('props ppp produit',panierItems)
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
            return data
          }
          let us = await t()
          console.log("pas de userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", us)

          if(us!='rien trouvé'){

            if(us.id!=0 || us.id!= undefined){
                var url2 = `http://localhost:8000/panier/${us.id}/`
        
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
                setPanieritems(data2)
                setPanier(data2[0].panier)
                console.log("ddata1151",panierItems)
            }
        }
        else{
              
            console.log("pas de user")      
                var url = `http://localhost:8000/panier/0/`
                let produits = localStorage.getItem('panier')
                var obj = JSON.parse(produits);
                console.log(obj)
                let inputsForm = new Object
                let t = []
                if(produits!=null || produits!=undefined){
                    for(var i in obj){
                        console.log(obj[i]);
                        t.push(obj[i].id)                    
                    }

                }
                console.log('ttttttttttttttttttttttttttttt',t)
                inputsForm['id']=t
                console.log(inputsForm)
                inputsForm = JSON.stringify(inputsForm)
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
                } else {
                    console.log(response,'Mauvaise réponse du réseau');
                }
                }).then(data => 
                    {return data}
                    )
                .catch(function(error) {
                console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
                });
                setPanieritems(data)
    
            console.log('panier ppp',data)

          }
        return () => {
        };
    }, [u.id]);

    const acheter = async (e,i) => {
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
            console.log("erreur")
        }
        else{
            let inputsForm = new Object
            inputsForm['quantite'] = e.target.previousSibling.value
            inputsForm['idproduit'] = String(i)
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
        var url3 = `http://localhost:8000/panier/${us.user.id}/`

        let data = await fetch(url3).then(response => {
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
        let data3 = await fetch(url3).then(response => {
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
        console.log("data2",data3)
        if(data3.length==0)
        {
            props.setStepBarreBtn("")
        }
        setPanieritems(data3)
        props.setModalcontent(<h1>{data3.length}</h1>)
        btn.innerHTML="Acheter"
        btn.classList.remove("btnLoading")
        btn.disabled=false
    }

    }

    let modif = true
    if(props.modif==false){
        modif=false
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
            return data
          }
          let us = await t()
        if(panierItems[0]!=0){
            if(us!='rien trouvé'){
                let prods = panierItems.map(p => 
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
                                {
                                modif ?
                                <>
                                <div className="d-flex align-items-center">
                                    <input type="number" className="ProduitBuyQte" min="1" max={p.produit.stock} defaultValue={p.quantite}/>
                                    <button className="produitBuyBtn" onClick={(e) => acheter(e,p.produit.id)} >Modifier</button>
                                </div>
                                <span className="ms-2 fs-6 mt-1 mt-md-0 pointer position-absolute top-0 end-0" onClick={(e,id) => deleteProduit(e,p.produit.id)} >
                                    <img src={close} alt="" className="iconS m-3" />
                                </span>
                                </>
                                :
                                <span className="ProduitBuyQte bg-white">
                                    {p.quantite}
                                </span>
                                }
                            </div>
                            <div className="d-flex">
                                <span>Sous-Total</span>
                                <span className="fw-bold ms-2">{p.quantite * p.produit.prix} €</span>
                            </div>
                        </div>
                    </div>
                    )
                setProduits(prods)
            }
            else{
                let prods = panierItems.map(p => 
                    <div className="panierProduit">
                        <div className="panierProduitG border-end">
                            <img src={p.image1} alt="" className="panierProduitImage"/>
                                <span className="panierProduitNom titre-bungee fw-bold">
                                    {p.nom}
                                </span>
                        </div>
                        <div className="panierProduitDetails w-100">
                            <div className="d-flex mb-2">
                                <span></span>
                                <span className="fw-bold ms-0">{p.prix} €</span>
                            </div>
                            <div className="d-flex align-items-md-center flex-column flex-md-row mb-2">
                                <span className="mb-1 mb-md-0">Quantité</span>
                                {
                                modif ?
                                <>
                                <div className="d-flex align-items-center">
                                    <span className="ProduitBuyQte">
                                        {1}
                                    </span>
                                </div>
                                <span className="ms-2 fs-6 mt-1 mt-md-0 pointer position-absolute top-0 end-0" onClick={(e,id) => deleteProduit(e,p.id)} >
                                    <img src={close} alt="" className="iconS m-3" />
                                </span>
                                </>
                                :
                                <span className="ProduitBuyQte">
                                    {1}
                                </span>
                                }
                            </div>
                            <div className="d-flex">
                                <span>Sous-Total</span>
                                <span className="fw-bold ms-2">{1 * p.prix} €</span>
                            </div>
                        </div>
                    </div>
                    )
                setProduits(prods)
            }
        }
    }, [panierItems]);
    
    const deleteProduit = async (e,id) =>{
        e.preventDefault()
        
        if(u!='rien trouvé'){
        let inputsForm = new Object
        inputsForm['iduser'] = String(u.id)
        inputsForm['idproduit'] = String(id)
        inputsForm = JSON.stringify(inputsForm);
        var url2 = "http://localhost:8000/supprimer_produit/"

        await fetch(url2,{
            method: 'DELETE',
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
        var url2 = `http://localhost:8000/panier/${u.id}/`

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
        console.log("data2",data2)
        if(data2.length==0)
        {
            props.setStepBarreBtn("")
        }
        setPanieritems(data2)
        props.setModalcontent(<h1>{data2.length}</h1>)

        }
        else{     
            
            let produits = localStorage.getItem('panier')
            var obj = JSON.parse(produits);
            console.log(obj)
            let inputsForm = new Object
            let t = -1
            let s =0
            if(produits!=null || produits!=undefined){
                for(var i in obj){
                    if(obj[i].id==id){
                            console.log(obj[i]);
                            t=i
                        }
                        s++
                    }                
                }
            console.log('ttttttttttttttttttt',s)
                if (t!=-1) {
                    delete obj[t]
                    s--
                }
            console.log('objjjjjjjjjjj',s)
            localStorage.removeItem('panier')
            if(s>0)
                localStorage.setItem('panier',JSON.stringify(obj))
            const p = e.target.parentElement.parentElement
            setTimeout(async () => {
                var url = `http://localhost:8000/panier/0/`
                let produits = localStorage.getItem('panier')
                var obj = JSON.parse(produits);
                console.log(obj)
                let inputsForm = new Object
                let t = []
                if(produits!=null || produits!=undefined){
                    for(var i in obj){
                        console.log(obj[i]);
                        t.push(obj[i].id)                    
                    }

                }
                console.log('ttttttttttttttttttttttttttttt',t)
                inputsForm['id']=t
                console.log(inputsForm)
                inputsForm = JSON.stringify(inputsForm)
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
                } else {
                    console.log(response,'Mauvaise réponse du réseau');
                }
                }).then(data => 
                    {return data}
                    )
                .catch(function(error) {
                console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
                });
                setPanieritems(data)
               props.setModalcontent(<h1>{data.length}</h1>)
                if(data.length==0)
                {
                    props.setStepBarreBtn("")
                }
            }, 100);
        }
    } 

    return (
        <div className="commandeStep">
            {
                modif
                ?
                <h4 className="commandStepTitre text-center">
                    Mon Panier
                </h4>
                :
                ""

            }
            <div className="commandeStepContenu pb-5">
                <div className="panierRecap">
                    {
                        u!='rien trouvé'
                        ?

                            panierItems[0]!='' 
                            ?
                            produits.length==0
                                ?
                                <h1 className='text-center' >Vide</h1>
                                :
                                produits
                            :
                            "Panier vide"
                        :
                            panierItems[0]!='' 
                            ?
                            produits.length==0
                                ?
                                <h1 className='text-center' >Vide</h1>
                                :
                                produits
                            :
                            "Panier vide"

                    }
                </div>
                {
                    modif 
                    ?
                        panierItems.length==0
                        ?
                        ""
                        :
                        props.button
                    :
                        ""
                }
            </div>
        </div>
    );
}

export default Panier;
