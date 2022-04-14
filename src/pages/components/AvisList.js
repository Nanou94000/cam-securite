import React, {useEffect, useState}  from 'react';
import Avis from './Avis';
import ReactStars from "react-rating-stars-component";
import $ from "jquery";

const Avislist = (props) => {
    const [error,setError] = useState("")
    const [avis,setAvis] = useState([]);
    const ratingChanged = (newRating) => {
        console.log(newRating);
      };
    const [donneravis,setDonneravis] = useState([]);
    const [u,setU] = useState({id:0,user:{first_name:"",last_name:""}})
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
          }
          await t()
          if(u.id!=0){
              var url2 = `http://localhost:8000/compte/${u.id}/avis`
    
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
              setAvis(data2)
              console.log("mmmmmmmmmmmmmmm",data2)

              var url = `http://localhost:8000/compte/${u.id}/donner-avis`
    
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
              console.log("mmmmmmmmmmmmmmm",data)
              if(data.length!=0)
                  setDonneravis(data)
          }
        return () => {
        };
    }, [u.id,props.modalContent]);

    let donneravisList = "Vous n'avez pas encore reçu de produit Cam Securite"
    if(donneravis.length!=0){
        donneravisList = donneravis.map(a => 
            <div className="produitBuyCommentaire p-1 p-md-auto">
                {
                    a.valide
                    ?
                        <span className="caracteristiquesTitre w-100 text-center">
                            Vous venez de recevoir <span className="fw-bold">{a.produit.nom}</span> , donnez nous votre avis !
                        </span>
                    :
                        <span className="caracteristiquesTitre w-100 text-center">
                            Vous n'avez pas encore reçu <span className="fw-bold">{a.produit.nom}</span>, revenez plus tard pour nous donnez votre avis !
                        </span>

                }
                {
                    a.valide
                    ?
                    <div className='d-flex flex-column align-items-center'>
                        <img src={a.produit.image1} alt="" className="imgM" />
                        <form action="" className="d-flex flex-column flex-md-row w-100 commentPost" >
                            <div className="w-100 d-flex flex-column p-2">
                                <div className="d-flex flex-column w-100 align-items-center p-3">
                                    <span className="fw-bold me-2">
                                        Noter ce produit:
                                    </span>
                                    <input type="hidden" name="note" id={`note-${a.id}`} />
                                    <ReactStars
                                        count={5}
                                        onChange={(e) => {
                                            $(`#note-${a.id}`).val(e)
                                        }}
                                        size={48}
                                        activeColor="#ffd700"
                                    />                        
                                </div>
                                <input type="text" className="commentInput mb-2" placeholder="Titre de votre avis" />
                                <textarea name="" id="" cols="30" rows="2" className="commentInput mb-2" placeholder="Donner votre avis sur ce produit" required></textarea>
                                <p className="text-danger">
                                    {error}
                                </p>
                                <button className="commentBtn m-2" onClick={
                                    async (e,p,u) => {
                                        e.preventDefault();
                                        p = a.produit.id
                                        u = a.user.id
                                        let note = e.target.previousSibling.previousSibling.previousSibling.previousSibling.children[1].value;
                                        let titre = e.target.previousSibling.previousSibling.previousSibling.value
                                        let contenu = e.target.previousSibling.previousSibling.value
                                        let formdata = new Object
                                        formdata['note'] = note
                                        formdata['titre'] = titre
                                        formdata['contenu'] = contenu
                                        formdata['user'] = u
                                        formdata['produit'] = p
                                        console.log(formdata)
                                        formdata = JSON.stringify(formdata)
                                        const url = "http://localhost:8000/post-avis"
                                        let data = await fetch(url,{
                                            method: 'POST',
                                            headers: {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json',
                                              }, 
                                              body: formdata
                                          }).then(response => {
                                            if(response.ok) {
                                                console.log("fetchAddProduit")
                                                return response.json();
                                            } else {
                                                console.log(response,'Mauvaise réponse du réseau pas d ajout');
                                            }
                                            }).then(data => 
                                                {
                                                    return data
                                                }
                                                )
                                            .catch(function(error) {
                                            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
                                            });
                                            console.log(data)
                                            if(data == "KO")
                                                setError("Impossible de poster l'avis, réessayer plus tard.")
                                            else
                                                props.showHideModal(e,"Merci d'avoir poster votre avis")
                                    }
                                } >
                                    Poster mon avis sur ce produit
                                </button>
                            </div>
                        </form>
                    </div>
                    :
                    ""
                }
            </div>
        )
    }

    let avisList = "Vous n'avez pas encore posté d'avis"
    console.log("avissssssssssssssssss",avis)
    if(avis.length!=0){
        avisList = avis.map(a => <Avis produit={a.produit} note={a.note} titre={a.titre} date={a.date} user={u.user.first_name} contenu={a.contenu} />)
    }
    return (
        <>
            <div className='w-100 border-bottom mb-2 d-flex flex-column align-items-center pb-2' style={{maxWidth:"800px"}} >
            {donneravisList}
            </div>
            {
                avis.length!=0
                ?
                <h5 className='mb-2' >Mes avis postés</h5>
                :
                ''
            }
            {avisList}
        </>
    );
}

export default Avislist;
