import React, { useState, useEffect } from 'react';
import payment from './assets/img/payment.gif'
import { gsap } from "gsap";
import { Outlet, Link, useNavigate } from 'react-router-dom';
import Choixlivraison from './components/ChoixLivraison';
import Commanderecap from './components/CommandeRecap';
import Livraison from './components/Livraison';
import Panier from './components/Panier';
import Stepbarre from './components/StepBarre';
import $ from 'jquery';
import Payementchoix from './components/PayementChoix';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const Panierprocess = (props) => {
    let navigate = useNavigate();
    const [panierItems, setPanieritems] = useState([''])
    const [sousTotal,setSoustotal] = useState('')
    const [total,setTotal] = useState('')
    const [livraison,setLivraison] = useState(null)
    const [panier,setPanier] = useState('')
    const [u,setU] = useState('')
    const getCSRF = async () => {
    var url2 = "http://localhost:8000/csrf/"
    let r = '' 
    await fetch(url2, {
        credentials: 'include',
      }).then(response => {
        if(response.ok) {
            console.log("fetchCSRF panier process")
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
    useEffect(async () => {
        $(window).scrollTop(0);
        let uss = ""
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
                console.log("current_user de panier process",response)
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
            uss=data
          }
          await t()
          if(uss!=""){
              var url2 = `http://localhost:8000/panier/${uss.user.id}/`
    
              let data2 = await fetch(url2).then(response => {
              if(response.ok) {
                  console.log("fetch panier panier process")
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
              if(data2.length==0){
                  setPanierStep(<Panier user={u} button={''}/>)
                  setStepBarreBtn("")
                }
                setPanier(data2[0].panier)
              console.log("ddata1151",data2)
          }
          else{
              if(localStorage.getItem('panier')==null || localStorage.getItem('panier')==undefined || localStorage.getItem('panier')=="" ){
                setPanierStep(<Panier user={u} button={''}/>)
                setStepBarreBtn("")
              }
          }
        return () => {
        };
    }, [u.id]);

    console.log("ppppppppppppppppppaaaaaannn1254",panierItems)


    const goToPanier = () => {
        setPanierStep(<Panier user={u} button={ btnPanier }/>)
        setStepBarreBtn(btnPanier)
    }
    const goToLivraison = () => {
        setPanierStep(<Livraison button={ btnLivraison }/>)
        setStepBarreBtn(btnLivraison)
        $("#stepPanier").addClass('stepValide')
        $("#panierToLivraison").addClass("stepStateActive")
        $("#stepPanier").removeClass("stepActive")
        setTimeout(() => $("#stepLivraison").addClass('stepActive'),1000)
    }
    const goToChoixLivraison = async () => {
        let inputs = new Object()
        for(let i=0;i<$(".inputform").length;i++){
            if($(".inputform")[i].value=="")
                return "champs manquants"
            inputs[$(".inputform")[i].name] = $(".inputform")[i].value
        }
        var inputsForm = JSON.stringify(inputs);
        console.log('entrer:::::',inputsForm)
        let r = await getCSRF()
        console.log("csrftoken OK",r.csrfToken)
        let csrftoken = r.csrfToken
        let us =''
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
                console.log("current_user de panier process",response)
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
            us=data
        }
        await t()

        if(us!='rien trouvé'){

        var url2 = "http://localhost:8000/users/"+us.id+"/"

        await fetch(url2,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                    }, 
                    credentials: 'include',
                    body: inputsForm
                }).then(response => {
            if(response.ok) {
                console.log("fetchLogin",response)
                return response.json();
            } else {
                console.log(response,'Mauvaise réponse du réseau');
            }
            }).then(data => 
                {
                    console.log("reponse",data)
                }
                )
            .catch(function(error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
            });
        }
        else{
            localStorage.setItem('user',inputsForm)
            console.log('user coooooooookie' , localStorage.getItem('user'))
        }

        setPanierStep(<Choixlivraison button={ btnChoixLivraison }/>)
        setStepBarreBtn(btnChoixLivraison)
        $("#stepLivraison").addClass('stepValide')
        $("#livraisonToChoixLivraison").addClass("stepStateActive")
        $("#stepLivraison").removeClass("stepActive")
        setTimeout(() => $("#stepChoixLivraison").addClass('stepActive'),1000)
    }
    const goToRecap = async () => {
        let inputs = new Object()
        console.log('le choix de la livraison:',$(".livChoixActive")[0])
        inputs["livraison"] = $(".livChoixActive")[0].id
        var inputsForm = JSON.stringify(inputs);
        console.log('entrer:::::',inputsForm)
        let r = await getCSRF()
        console.log("csrftoken OK",r.csrfToken)
        let csrftoken = r.csrfToken
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
                console.log("current_user de panier process",response)
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
            return data
          }
          let us = await t()
          
          if(us!='rien trouvé'){
            var url2 = "http://localhost:8000/choix-livraison/"+us.id+"/"

            await fetch(url2,{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken
                      }, 
                      credentials: 'include',
                      body: inputsForm
                  }).then(response => {
                if(response.ok) {
                    console.log("fetchLogin",response)
                    return response.json();
                } else {
                    console.log(response,'Mauvaise réponse du réseau');
                }
                }).then(data => 
                    {
                        console.log("reponse",data)
                    }
                    )
                .catch(function(error) {
                console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
                });
          }
          else{
            localStorage.setItem('livraison',inputsForm)
            console.log('livraison coooooooookie' , localStorage.getItem('livraison'))
          }

        setPanierStep(<Commanderecap setStepBarreBtn={setStepBarreBtn}  button={ btnPayer } showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}/>)
        setStepBarreBtn(btnPayer)
        $("#stepChoixLivraison").addClass('stepValide')
        $("#choixLivraisonToRecapCommande").addClass("stepStateActive")
        $("#stepChoixLivraison").removeClass("stepActive")
        setTimeout(() => $("#stepRecapCommande").addClass('stepActive'),1000)
    }
    const btnPanier = (
        <div className="w-100 d-flex align-items-center justify-content-center">
            {
                panierItems!=undefined
                ?
                    panierItems.length==0
                    ?
                    <button className="produitBuyBtn" disabled onClick={() => goToLivraison()}>Valider mon panier</button>
                    :
                    <button className="produitBuyBtn"  onClick={() => goToLivraison()}>Valider mon panier</button>
                :
                <button className="produitBuyBtn"  onClick={() => goToLivraison()}>Valider mon panier</button>
            }
        </div>
    )
    const btnLivraison = (
        <div className="w-100 d-flex align-items-center justify-content-center">
            <button className="produitBuyBtn" onClick={() => goToChoixLivraison()} >Confirmer les informations</button>
        </div>
    )
    const btnChoixLivraison = (
        <div className="w-100 d-flex align-items-center justify-content-center">
            <button className="produitBuyBtn" onClick={() => goToRecap()} >Choisir ce mode de livraison</button>
        </div>
    )
    const initialOptions = {
        "client-id": "ASFEAZSj8J9EWXzFzTRIqT9Frn3FONIEgXx87hRWxhJyCSv7_SshAkT1TW0OSjTySDAb4cEXdVW7olO3",
        currency: "EUR",
    };
    const btnPayer = (
        <div className="w-100 d-flex align-items-center justify-content-center" onClick={async (e) => {     
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
                    console.log("current_user de panier process",response)
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
                return(data)
            }
            let us = await t()
            console.log("########################",us)
            let p =""
            if(us!='rien trouvé'){
                var url2 = `http://localhost:8000/panier/${us.user.id}/`
        
                let data2 = await fetch(url2).then(response => {
                if(response.ok) {
                    console.log("fetch panier panier process")
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
                p = data2[0].panier
                console.log("ddata1151******************",data2[0].panier)
                props.showHideModal(e,
                    <div className='' style={{width:'100%'}}>
                    <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons 
                            style={
                                { 
                                    layout: "vertical", 
                                    color: 'black',
                                    width: "100%",   
                                    Tagline: false 
                                }
                            }
                            createOrder={(data, actions) => {
                                
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: String(data2[0].panier.totalaveclivraison),
                                            },
                                        },
                                    ],
                                });
                            }}
                        onApprove={async (datas, actions) => {
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
                                    console.log("current_user de panier process",response)
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
                                return(data)
                            }
                            let us = await t()
                            if(us != 'rien trouvé'){
                                var url2 = "http://localhost:8000/commande-success/"
                                let r = await getCSRF()
                                const csrftoken = r.csrfToken
                                let data = await fetch(url2,{
                                        method: 'POST',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                            'X-CSRFToken': csrftoken
                                        }, 
                                        credentials: 'include',
                                        body: JSON.stringify({'login':true,'id':us.user.id})
                                    }).then(response => {
                                    if(response.ok) {
                                        console.log("fetchLogin",response)
                                        return response.json();
                                    } else {
                                        console.log(response,'Mauvaise réponse du réseau');
                                    }
                                    }).then(data => 
                                        {
                                            console.log("reponse",data)
                                        }
                                        )
                                    .catch(function(error) {
                                    console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
                                    });
                                    navigate('/')
                                    props.setModalcontent(
                                    <div className='d-flex flex-column justify-content-center align-items-center'>
                                        <h3 className='modline'>Merci, {us.user.first_name}, pour votre commande !</h3>
                                        <p className='modline'>Votre commande a été réalisé avec succés, nous venons de vous envoyer un email avec le detail de vos achats.</p>
                                        <p className="modline">Nous vous contacterons par email pour vous fournir les informations relative à votre commande.</p>
                                        <img className='modline' src={payment} alt="" style={{maxWidth:'400px',objectFit:'contain',}} />
                                        
                                    </div>)
                                    gsap.from(".modline",{opacity: 0, scale: 0, duration: 0.4, stagger: 0.4, delay:0.5})
                            }
                            else{
                                var url2 = "http://localhost:8000/commande-success/"
                                let r = await getCSRF()
                                let user = JSON.parse(localStorage.getItem('user'))
                                let produits = localStorage.getItem('panier')
                                var obj = JSON.parse(produits);
                                let t = []
                                if(produits!=null || produits!=undefined){
                                    for(var i in obj){
                                        console.log(obj[i]);
                                        t.push(obj[i].id)                    
                                    }
                
                                }
                                console.log('ttttttttttttttttttttttttttttt',t)
                                const csrftoken = r.csrfToken
                                let data = await fetch(url2,{
                                        method: 'POST',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                            'X-CSRFToken': csrftoken
                                        }, 
                                        credentials: 'include',
                                        body: JSON.stringify({
                                            'login': false,
                                            'sexe': user.sexe,
                                            'prenom': user.prenom,
                                            'nom': user.nom,
                                            'email': user.email,
                                            'adresse':user.adresse,
                                            'ville':user.ville,
                                            'pays':user.pays,
                                            'cp':user.cp,
                                            'telephone':user.telephone,
                                            'livraison':livraison,
                                            'produits': t

                                        })
                                    }).then(response => {
                                    if(response.ok) {
                                        console.log("fetchLogin",response)
                                        return response.json();
                                    } else {
                                        console.log(response,'Mauvaise réponse du réseau');
                                    }
                                    }).then(data => 
                                        {
                                            console.log("reponse",data)
                                        }
                                        )
                                    .catch(function(error) {
                                    console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
                                    });
                                    navigate('/')
                                    props.setModalcontent(
                                    <div className='d-flex flex-column justify-content-center align-items-center'>
                                        <h3 className='modline'>Merci, {user.prenom}, pour votre commande !</h3>
                                        <p className='modline'>Votre commande a été réalisé avec succés, nous venons de vous envoyer un email avec le detail de vos achats.</p>
                                        <p className="modline">Nous vous contacterons par email pour vous fournir les informations relative à votre commande.</p>
                                        <img className='modline' src={payment} alt="" style={{maxWidth:'400px',objectFit:'contain',}} />
                                    </div>)
                                    gsap.from(".modline",{opacity: 0, scale: 0, duration: 0.4, stagger: 0.4, delay:0.5})
                                    localStorage.removeItem('panier')
                                    localStorage.removeItem('livraison')
                                    localStorage.removeItem('user')
                            }
                            
                        }} />
                    </PayPalScriptProvider>
                    </div>
                
                )
            }
            else{
                 
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
                setPanier(data)
                let st = 0
                for(let d=0; d<data.length;d++)
                    st = st + data[d].prix
                console.log('stststststststststststststststst',st)
                setSoustotal(st)
                let livid = localStorage.getItem('livraison')
                livid = JSON.parse(livid).livraison
                console.log('lllllllllllllllllllllll',livid)
                let url_liv = `http://localhost:8000/choix-livraison-nolog/${livid}/`
                let dataliv = await fetch(url_liv).then(
                    r => {
                        if(r.ok) {
                            console.log("fetchLivraison")
                            return r.json();
                        } else {
                            console.log(r,'Mauvaise réponse du réseau');
                        }
                    }).then(
                        data => {
                            return data
                        }).catch(function(error) {
                            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
                        });
                console.log('zevjmobevuebuvebveuv51333333333333333333',dataliv)
                setLivraison(dataliv)
                setTotal(st+dataliv.prix)
                props.showHideModal(e,
                    <div style={{width:'100%'}}>
                    <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons 
                            style={
                                { 
                                    layout: "vertical", 
                                    color: 'black',
                                    width: "100%",   
                                    Tagline: false 
                                }
                            }
                            createOrder={(data, actions) => {
                                
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: st+dataliv.prix,
                                            },
                                        },
                                    ],
                                });
                            }}
                            onApprove={async (datas, actions) => {
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
                                        console.log("current_user de panier process",response)
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
                                    return(data)
                                }
                                let us = await t()
                                if(us != 'rien trouvé'){
                                    var url2 = "http://localhost:8000/commande-success/"
                                    let r = await getCSRF()
                                    const csrftoken = r.csrfToken
                                    let data = await fetch(url2,{
                                            method: 'POST',
                                            headers: {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json',
                                                'X-CSRFToken': csrftoken
                                            }, 
                                            credentials: 'include',
                                            body: JSON.stringify({'login':true,'id':us.user.id})
                                        }).then(response => {
                                        if(response.ok) {
                                            console.log("fetchLogin",response)
                                            return response.json();
                                        } else {
                                            console.log(response,'Mauvaise réponse du réseau');
                                        }
                                        }).then(data => 
                                            {
                                                console.log("reponse",data)
                                            }
                                            )
                                        .catch(function(error) {
                                        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
                                        });
                                        navigate('/')
                                        props.setModalcontent(
                                        <div className='d-flex flex-column justify-content-center align-items-center'>
                                            <h3 className='modline'>Merci, {us.user.first_name}, pour votre commande !</h3>
                                            <p className='modline'>Votre commande a été réalisé avec succés, nous venons de vous envoyer un email avec le detail de vos achats.</p>
                                            <p className="modline">Nous vous contacterons par email pour vous fournir les informations relative à votre commande.</p>
                                            <img className='modline' src={payment} alt="" style={{maxWidth:'400px',objectFit:'contain',}} />
                                            
                                        </div>)
                                        gsap.from(".modline",{opacity: 0, scale: 0, duration: 0.4, stagger: 0.4, delay:0.5})
                                }
                                else{
                                    var url2 = "http://localhost:8000/commande-success/"
                                    let r = await getCSRF()
                                    let livraison = JSON.parse(localStorage.getItem('livraison')).livraison
                                    let user = JSON.parse(localStorage.getItem('user'))
                                    let produits = localStorage.getItem('panier')
                                    var obj = JSON.parse(produits);
                                    let t = []
                                    if(produits!=null || produits!=undefined){
                                        for(var i in obj){
                                            console.log(obj[i]);
                                            t.push(obj[i].id)                    
                                        }
                    
                                    }
                                    console.log('ttttttttttttttttttttttttttttt',t)
                                    const csrftoken = r.csrfToken
                                    let data = await fetch(url2,{
                                            method: 'POST',
                                            headers: {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json',
                                                'X-CSRFToken': csrftoken
                                            }, 
                                            credentials: 'include',
                                            body: JSON.stringify({
                                                'login': false,
                                                'sexe': user.sexe,
                                                'prenom': user.prenom,
                                                'nom': user.nom,
                                                'email': user.email,
                                                'adresse':user.adresse,
                                                'ville':user.ville,
                                                'pays':user.pays,
                                                'cp':user.cp,
                                                'telephone':user.telephone,
                                                'livraison':livraison,
                                                'produits': t
    
                                            })
                                        }).then(response => {
                                        if(response.ok) {
                                            console.log("fetchLogin",response)
                                            return response.json();
                                        } else {
                                            console.log(response,'Mauvaise réponse du réseau');
                                        }
                                        }).then(data => 
                                            {
                                                console.log("reponse",data)
                                            }
                                            )
                                        .catch(function(error) {
                                        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
                                        });
                                        navigate('/')
                                        props.setModalcontent(
                                        <div className='d-flex flex-column justify-content-center align-items-center'>
                                            <h3 className='modline'>Merci, {user.prenom}, pour votre commande !</h3>
                                            <p className='modline'>Votre commande a été réalisé avec succés, nous venons de vous envoyer un email avec le detail de vos achats.</p>
                                            <p className="modline">Nous vous contacterons par email pour vous fournir les informations relative à votre commande.</p>
                                            <img className='modline' src={payment} alt="" style={{maxWidth:'400px',objectFit:'contain',}} />
                                        </div>)
                                        gsap.from(".modline",{opacity: 0, scale: 0, duration: 0.4, stagger: 0.4, delay:0.5})
                                        localStorage.removeItem('panier')
                                        localStorage.removeItem('livraison')
                                        localStorage.removeItem('user')
                                }
                                
                            }} />
                    </PayPalScriptProvider>
                    </div>
                
                )

            }
            }}>
            <button className="produitBuyBtn">Payement</button>
        </div>
    )
    const [stepBarreBtn,setStepBarreBtn] = useState(btnPanier)
    const [panierStep,setPanierStep] = useState(<Panier showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent} user={u} button={btnPanier} setStepBarreBtn={setStepBarreBtn} />)
    return (
        <>   
        <div className="main w-100">            
          <Stepbarre setPanierStep={setPanierStep} setStepBarreBtn={setStepBarreBtn} btnChoixLivraison={btnChoixLivraison}  toPanier={goToPanier} toLivraison={goToLivraison} toChoixLivraison={goToChoixLivraison} toCommandeRecap={goToRecap}  button={stepBarreBtn}/>
          <div className="w-100 justify-content-center">
          {panierStep}
          </div>
        </div> 
        </>
    );
}

export default Panierprocess;
