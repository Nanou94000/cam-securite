import React, {useEffect, useState}  from 'react';
import Panier from './Panier';
import $ from 'jquery';


const Commanderecap = (props) => {
    const [btnn, setbtnn] = useState(props.button);
    const [error,setError] = useState("")
    let [nolog_user,setNolog_user] = useState({prenom:'',nom:'',adresse:''})
    const [u,setU] = useState({id:0,user:{first_name:"",last_name:""}})
    const [panier,setPanier] = useState('')
    const [sousTotal,setSoustotal] = useState('')
    const [total,setTotal] = useState('')
    const [livraison,setLivraison] = useState(null)
    const [change, setchange] = useState('');
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
          if(us!='rien trouvé'){
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
              console.log("88888888888888888888888888",data2)
              setPanier(data2[0].panier)
              setLivraison(data2[0].panier.livraison)
              let st = 0
              for (let i = 0; i<data2.length ; i++)
              {
                  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
                st = st + data2[i].total
              }
              setSoustotal(st)
              setTotal(st + data2[0].panier.livraison.prix)
              console.log("ddata1151",st)
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



            nolog_user = localStorage.getItem('user')
            setNolog_user(JSON.parse(nolog_user))
          }
        return () => {
        };
    }, [u.id, nolog_user.nom,change]);
    const prods =[
        {
            produit:{
                nom:"",
                sousnom:"",
                prix:25,
                stock:10,
                image:"",
            },
            quantite:2,
            modif:false
        }
    ]
    const commande =(
        props.command
        ?
            props.commande
        :
            {
                user:{
                    prenom:"",
                    nom:"",
                    email:"",
                    adresse:"",
                    ville:"",
                    code_postal:"",
                    pays:"",
                    telephone:""
                },
                livraison:{
                    nom:"",
                    description:"",
                    prix:0,
                    delai:"",
                },
                sousTotal:250,
                total:300
            }
    )

    const promotion = async (e) =>{
        e.preventDefault();
        let promo = $("#promo")[0].value
        if(promo==""){
            setError('Aucun code inscrit.')
            return('ko')
        }
        let inputsForm = new Object()
        inputsForm['promo']=promo
        inputsForm['id']=u.user.id
        console.log(inputsForm)
        inputsForm = JSON.stringify(inputsForm)
        let url = "http://localhost:8000/promo/"
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
        if(data=='ko'){
            setError('Code promotionnel invalide')
        }
        else{
            console.log('llllllllllllllllllll',data)
            setchange(data)
            setbtnn(props.button)
            props.setStepBarreBtn(props.button)
        }
    }
    
    const deletepromotion = async (e) =>{
        e.preventDefault();
        let inputsForm = new Object()
        inputsForm['id']=u.user.id
        console.log(inputsForm)
        inputsForm = JSON.stringify(inputsForm)
        let url = "http://localhost:8000/promo/"
        let data = await fetch(url,{
            method: 'DELETE',
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
        if(data=='ko'){
            setError('Une erreur est survenue')
        }
        else{
            console.log(data)
            setchange(data)
            setbtnn(props.button)
            props.setStepBarreBtn(props.button)
        }
    }

    return (
        <div className="commandeStep">
            <h4 className="commandStepTitre mb-5 text-center">
                Récapitulatif de la commande
            </h4>
            <div className="commandeStepContenu pb-5">
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <div className="w-100 d-flex flex-column flex-md-row align-items-start justify-content-center">
                        <Panier produit={prods} modif={false} />
                        {
                            u.id != 0
                            ?
                                u=='rien trouvé'
                                ?
                                    <div className="commandeLivraison d-flex flex-column">
                                        <span className="fw-bold fs-4 mb-3">
                                            Détails de la livraison
                                        </span>
                                        <div className="d-flex mb-1">
                                            <span className="me-2">À</span>
                                            <span className="fw-bold">{nolog_user.prenom} {nolog_user.nom}</span>
                                        </div>
                                        <div className="d-flex mb-1">
                                            <span className="me-2">Adresse</span>
                                            <span className="fw-bold">{nolog_user.adresse}</span>
                                        </div>
                                        <div className="d-flex mb-1">
                                            <span className="me-2">Ville</span>
                                            <span className="fw-bold">{nolog_user.ville}</span>
                                        </div>
                                        <div className="d-flex">
                                            <span className="me-2">Code postal</span>
                                            <span className="fw-bold">{nolog_user.cp}</span>
                                        </div>
                                        <div className="d-flex">
                                            <span className="me-2">Pays</span>
                                            <span className="fw-bold">{nolog_user.pays}</span>
                                        </div>
                                        {
                                            livraison != null
                                            ?
                                            <>
                                                <div className="d-flex">
                                                    <span className="me-2">Livré par</span>
                                                    <span className="fw-bold">{livraison.type.nom}</span>
                                                </div>
                                                <div className="d-flex">
                                                    <span className="me-2">Délai estimé</span>
                                                    <span className="fw-bold">{livraison.type.delai}</span>
                                                </div>
                                            </>
                                            :
                                            ""
                                        }
                                    </div>
                                :
                                <div className="commandeLivraison d-flex flex-column ">
                                    <span className="fw-bold fs-4 mb-3">
                                        Détails de la livraison
                                    </span>
                                    <div className="d-flex mb-1">
                                        <span className="me-2">À</span>
                                        <span className="fw-bold">{u.user.first_name} {u.user.last_name}</span>
                                    </div>
                                    <div className="d-flex mb-1">
                                        <span className="me-2">Adresse</span>
                                        <span className="fw-bold">{u.adresse}</span>
                                    </div>
                                    <div className="d-flex mb-1">
                                        <span className="me-2">Ville</span>
                                        <span className="fw-bold">{u.ville}</span>
                                    </div>
                                    <div className="d-flex">
                                        <span className="me-2">Code postal</span>
                                        <span className="fw-bold">{u.code_postal}</span>
                                    </div>
                                    <div className="d-flex">
                                        <span className="me-2">Pays</span>
                                        <span className="fw-bold">{u.pays}</span>
                                    </div>
                                    {
                                        livraison != null
                                        ?
                                        <>
                                            <div className="d-flex align-items-center">
                                                <span className="me-2">Livré par</span>
                                                <img src={livraison.type.image} alt="" className="iconM m-3" />
                                            </div>
                                            <div className="d-flex">
                                                <span className="me-2">Délai estimé</span>
                                                <span className="fw-bold">{livraison.type.delai}</span>
                                            </div>
                                        </>
                                        :
                                        ""
                                    }
                                </div>
                            :
                            ""
                        }
                    </div>
                    {
                        u=="rien trouvé"
                        ?
                        ""
                        :
                        panier.promo 
                        ?
                        <div className="d-flex align-items-center justify-content-center mb-2 mt-5">
                            <span className='me-2'>Le code promo <span className="fw-bold"> {panier.codepromo.nom} </span> est utilisé pour cette commande</span>
                            <a className=" ms-1 text-danger pointer" onClick={(e) => deletepromotion(e)}>
                                Supprimer
                            </a>
                        </div>
                        :
                        <div className="d-flex align-items-start mt-5">
                            <div className="d-flex flex-column">
                                <div className="formrow me-2 pt-0 pb-1">
                                    <input id="promo" type="text" className="inputform" placeholder=" " required/>
                                    <label for="in1" className="labelform">Code promo</label>
                                </div>
                                <p className="text-danger">
                                    {error}
                                </p>                            
                            </div>

                            <button className="produitBuyBtn ms-2 mt-1" onClick={(e) => promotion(e)}>
                                Valider
                            </button>
                        </div>                        
                    }
                    <div className="d-flex flex-column commandePrice mb-4">
                        <div className="d-flex mb-1">
                            <span className="me-4 fs-4">Sous-total</span>
                            {
                                panier.promo
                                ?
                                <div className="d-flex align-items-center">
                                    <del className=" fs-6">{sousTotal} €</del>
                                    <span className="ms-3 fw-bold fs-4 text-danger">{panier.total} €</span>
                                </div>
                                :
                                <span className="fw-bold fs-4"> {sousTotal} €</span>
                            }
                        </div>
                        <div className="d-flex mb-1">
                            <span className="me-4 fs-4">Montant livraison</span>
                            {
                            livraison != null
                            ?
                                panier.freeshipping && livraison.type.id==1
                                ?
                                <div className="d-flex align-items-center">
                                    <del className="fs-6">{livraison.prix} €</del>
                                    <span className="ms-3 fw-bold fs-4 text-danger">GRATUIT</span>
                                </div>
                                :
                                <span className="fw-bold fs-4 ">{livraison.prix} €</span>
                            :
                            ""
                            }
                        </div>
                        <div className="d-flex mb-1">
                            <span className="me-4 fs-3 fw-bold" >Total à régler</span>
                            {
                                panier.freeshipping 
                                ?
                                <span className="fw-bolder fs-3" >{panier.totalaveclivraison} €</span>
                                :
                                u=='rien trouvé'
                                ?
                                <span className="fw-bolder fs-3" >{total} €</span>
                                :
                                <span className="fw-bolder fs-3" >{panier.totalaveclivraison} €</span>
                            }
                        </div>
                    </div>
                    {btnn}
                </div>

            </div>
        </div>
    );
}

export default Commanderecap;
