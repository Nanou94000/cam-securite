import React, {useEffect, useState}  from 'react';
import $ from 'jquery';

const Choixlivraison = (props) => {
    const [panierItems, setPanieritems] = useState([0])
    const [panier,setPanier] = useState('')
    const [u,setU] = useState({id:0,user:{first_name:"",last_name:""}})
    const [livraison,setLivraison] = useState(null)
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
              var url2 = `http://localhost:8000/choix-livraison/${us.user.id}/`
    
              let data2 = await fetch(url2).then(response => {
              if(response.ok) {
                  console.log("fetch livraison")
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
              console.log("data livraison 1222541455",data2)
              setLivraison(data2)
              var url3 = `http://localhost:8000/panier/${us.user.id}/`
        
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
              setPanieritems(data3)
              setPanier(data3[0].panier)
          }
          else{
            var url2 = `http://localhost:8000/choix-livraison-nolog/`
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
            inputsForm['id']=t
            console.log(inputsForm)
            inputsForm = JSON.stringify(inputsForm)
  
            let data2 = await fetch(url2,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: inputsForm
              }).then(response => {
            if(response.ok) {
                console.log("fetch livraison")
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
            console.log("data livraison 1222541455",data2)
            setLivraison(data2)
            
          }
        return () => {
        };
    }, [u.id]);
    const choisirLivraison = (e) =>{
        $(".livChoix").removeClass("livChoixActive")
        e.target.classList.add("livChoixActive")
    }
    console.log("pppppppppppppppppppppppppppppppppppp",panier)
    return (
        <div className="commandeStep w-100">
            <h4 className="commandStepTitre text-center">
                Options de livraison
            </h4>
            <div className="commandeStepContenu pb-5">
                <div className="livraisonChoix d-flex justify-content-center m-4">
                    {
                            livraison != null
                            ?
                                livraison.map(l =>
                                    <div className="liv d-flex flex-column justify-content-center align-items-center p-4 position-relative m-3" onClick={(e) => choisirLivraison(e)}>
                                        <img src={l.type.image} alt="" className="livraisonImg" style={{objectFit:"contain"}} />
                                        {
                                            panier.freeshipping && l.type.id==1
                                            ?
                                            <>
                                                <del className="livraisonPrix my-2">
                                                    {l.prix} €
                                                </del>
                                                <span className="ms-2 text-danger">GRATUIT</span>
                                            </>
                                            :
                                            <span className="livraisonPrix my-2">
                                                {l.prix} €
                                            </span>
                                        }
                                            
                                            <p className="livraisonText">
                                                Délai de livraison: {l.type.delai} 
                                            </p>
                                        <div id={l.id} className="livChoix m-0 position-absolute top-0 bottom-0 start-0 end-0"></div>
                                    </div>
                                )
                            :
                            <div className="loader" id="loader-2"></div>
                    }
                </div>
                {props.button}
            </div>
        </div>
    );
}

export default Choixlivraison;
