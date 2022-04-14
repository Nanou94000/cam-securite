import parse from 'html-react-parser';
import React, { useState, useEffect } from 'react';
import Avis from './Avis';
import $ from 'jquery';
import expedition24 from '../assets/img/expedition24.png'
import france from '../assets/img/france.png'
import paiement from '../assets/img/paiement.jpg'
import sav from '../assets/img/sav.png'
import Produitajoute from './ProduitAjoute';
import { gsap } from "gsap";
import email from "../assets/img/email.jpg"
import erreur from "../assets/img/erreur.jpg"

const Produitachat = (props) => {
    const [error,setError] = useState("")
    const [produit_json, setProduit] = useState("")
    const [panier,setPanier] = useState('')
    const [produitimages, setProduitimages] = useState([""])
    const [produitImage, setProduitImage] = useState(<div className="loader" id="loader-2"></div>)
    const [u,setU] = useState('')
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
        let inputsForm = new Object
        console.log(u)
        if(us!='rien trouvé'){            
            inputsForm['quantite'] = $("#qte")[0].value
            inputsForm['iduser'] = String(u.id)
            inputsForm['idproduit'] = String(produit_json.id)
            inputsForm = JSON.stringify(inputsForm);
            console.log('ajoutpanier',inputsForm)
            var url2 = `http://localhost:8000/panierid/${us.user.id}/`
  
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
            setPanier(data2)
        }
        if(us=='rien trouvé'){            
            console.log("pas d'user")
            let produit = new Object
            let m = 'p'+String(produit_json.id)
            produit[m] = new Object
            produit[m]['quantite'] = '1'
            produit[m]['id'] = String(produit_json.id)
            produit = JSON.stringify(produit);
            let p = localStorage.getItem('panier')
            console.log('panier',p)
            var obj = JSON.parse(p);
            console.log('panier',produit_json)
            
            if(p!=null || p!=undefined){
                console.log("pppppppppppppppppppppppppppppppp",obj)
                for(var i in obj)
                    console.log(obj[i]);
                    if(obj[i].id == produit_json.id)
                        console.log("produit trouvé")
                    else
                        obj[m] = new Object
                        obj[m]['quantite'] = '1'
                        obj[m]['id'] = String(produit_json.id)
                        localStorage.setItem('panier',JSON.stringify(obj))

            }
            else{
                localStorage.setItem('panier',produit)
            }
            setTimeout(() => {
                btn.innerHTML="Acheter"
                btn.classList.remove("btnLoading")
                props.showHideModal(e, <Produitajoute showHideModal={props.showHideModal} image={produit_json.image1} nom={produit_json.nom} panier={0} qte={1} montant={produit_json.prix} />)
            },250)
    
            btn.disabled=false
        }
        else{

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
        setTimeout(() => {
            btn.innerHTML="Acheter"
            btn.classList.remove("btnLoading")
            props.showHideModal(e, <Produitajoute showHideModal={props.showHideModal} image={produit_json.image1} nom={produit_json.nom}  panier={0} qte={$("#qte")[0].value} montant={produit_json.prix} />)
        },250)

        btn.disabled=false
    }
    }


    useEffect(() => {
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
            setU(data.user)
          }
            t()

        return () => {
        };
    }, [props.user]);

    let initNav = async () => {
        const lien = document.URL
        var produitId = lien.split('/')[lien.split('/').length-1]
        var url = "http://localhost:8000/produit/"+produitId

        let d = await fetch(url).then(response => {
            if(response.ok) {
                console.log("fetch")
                return response.json();
            } else {
                console.log(response,'Mauvaise réponse du réseau');
            }
            }).then(data =>{
                let imgs = []
                if(!data.image1.includes('null')){
                    imgs.push(data.image1)
                }
                if(!data.image2.includes('null')){
                    imgs.push(data.image2)
                }
                if(!data.image3.includes('null')){
                    imgs.push(data.image3)
                }
                if(!data.image4.includes('null')){
                    imgs.push(data.image4)
                }
                if(!data.image5.includes('null')){
                    imgs.push(data.image5)
                }
                if(!data.image6.includes('null')){
                    imgs.push(data.image6)
                }
                console.log(imgs)
                setProduitimages(imgs)
                setProduitImage(imgs[0])
                $(".produitBuyImageSmall")[0].classList.add("imageSelectionne")
                setProduit(data)
                return data
            })
            .catch(function(error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
            });
            setCaracteristiques(d.caracteristiques)            
        
    }
    const once = {
        once : true
    };
    useEffect(() => {
        $(window).scrollTop(0);
        document.getElementById("navTop").addEventListener('loaded',initNav())
        return () => {
        };
    }, []);
    /*const produit_json = {
        nom: "Caméra réveil",
        sousNom: "Contrôler son sommeil mais pas que !",
        prix: 165,
        descriptionCourte: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima laborum velit magni voluptate sequi, quia est minus. Sequi ipsam tempore, dolore illum earum quod, eveniet ea numquam eligendi dicta tenetur.",
        descriptionComplete: "lorem100 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis debitis numquam aliquam dolores tempora sint ab dicta beatae ad fuga, cupiditate non dolorum ullam autem recusandae nostrum perspiciatis corrupti temporibus, similique pariatur neque! Incidunt minima repellat quia voluptates error? Iste nihil, hic iure maiores animi possimus, sint porro beatae mollitia quos nam corrupti consectetur quas? Cupiditate blanditiis nemo perspiciatis magni placeat cumque. Fugiat omnis neque minima dicta animi atque aut placeat cupiditate! Vero quaerat omnis provident explicabo amet cumque sequi, esse quas ullam incidunt inventore tempora enim at impedit odio reiciendis dicta, iusto perferendis libero nam assumenda numquam. Saepe nulla nisi, voluptatum debitis quibusdam nam officia dolor sed ipsum laborum eum nesciunt aliquam, fugiat harum esse totam placeat, rerum cupiditate ducimus beatae quidem? Harum, veritatis ut? Non adipisci nobis placeat, iusto totam quia deleniti! Iste ducimus soluta, aliquid asperiores itaque dolores consequatur ab quaerat dolorem magni voluptatem natus nesciunt repellendus voluptatum eveniet non quibusdam! Eum illum, nihil dolorum quisquam facilis tempore necessitatibus reiciendis amet eligendi id voluptatem deleniti itaque laborum accusamus, minima maxime, quasi iure! Neque magni dolores incidunt eos blanditiis consequatur beatae quod porro id voluptate eaque est asperiores facere reiciendis eligendi eum minima vitae atque, repellat sed commodi distinctio. Adipisci praesentium vel eaque, minus tenetur cum quisquam voluptatibus non aperiam nostrum doloribus, sequi veniam! A, recusandae. Pariatur necessitatibus explicabo ut tempora nostrum? Doloribus quod harum iusto id maiores quae enim corrupti saepe beatae! Minus nostrum minima distinctio rem pariatur recusandae modi, quasi tempora dolorum accusamus odio magni praesentium autem necessitatibus eos, consequatur quaerat sit accusantium provident maxime. Velit a voluptas, asperiores reiciendis totam fuga, blanditiis veniam eaque minima rerum sit quos illo. Placeat totam laudantium neque? Nemo ipsum placeat facilis quasi eos magni, aspernatur corporis, dolor earum ipsa ratione rerum eveniet omnis amet magnam commodi aliquam, atque exercitationem?",
        caracteristiques: [
            { nom: "Résolution", valeur: "4K (4320px)" },
            { nom: "Résolution", valeur: "4K (4320px)" },
            { nom: "Résolution", valeur: "4K (4320px)" },
            { nom: "Résolution", valeur: "4K (4320px)" },
            { nom: "Résolution", valeur: "4K (4320px)" },
            { nom: "Résolution", valeur: "4K (4320px)" },
            { nom: "Résolution", valeur: "4K (4320px)" },
        ],
        images: [
            { url: "https://www.tomsguide.fr/content/uploads/sites/2/cache/2021/11/nest-indoor/3552683667.png", descriptionComplete: "4K (4320px)" },
            { url: "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1635150514.11887024.png?thumb=1&w=421&h=421&width=421&height=421", descriptionComplete: "4K (4320px)" },
            { url: "https://www.tomsguide.fr/content/uploads/sites/2/cache/2021/11/nest-indoor/3552683667.png", descriptionComplete: "4K (4320px)" },
            { url: "https://www.tomsguide.fr/content/uploads/sites/2/cache/2021/11/nest-indoor/3552683667.png", descriptionComplete: "4K (4320px)" },
            { url: "https://www.tomsguide.fr/content/uploads/sites/2/cache/2021/11/nest-indoor/3552683667.png", descriptionComplete: "4K (4320px)" },
            { url: "https://www.tomsguide.fr/content/uploads/sites/2/cache/2021/11/nest-indoor/3552683667.png", descriptionComplete: "4K (4320px)" },
            { url: "https://www.tomsguide.fr/content/uploads/sites/2/cache/2021/11/nest-indoor/3552683667.png", descriptionComplete: "4K (4320px)" },
        ],
        commentaires: [
            {
                note: 4,
                titre: "Titre de l'avis",
                date: "le 13 janvier 2022 à 08:19",
                contenu: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint praesentium quibusdam architecto!",
                user: {
                    username: "Nanou"
                }
            }
        ]

    }*/
    const changeImage = (e, i) => {
        $(".produitBuyImageSmall").removeClass("imageSelectionne")
        e.target.classList.add("imageSelectionne")
        setProduitImage(i)
    }
    const produitImages = produitimages.map(i =>
        <li className="produitBuyImageInList bloc" onClick={(e) => changeImage(e, i)}>
            <div className="content">
                <img src={i} className="produitBuyImageSmall" />
            </div>
        </li>)
    /*const caracteristiques = produit_json.caracteristiques.map(c =>
        <div className="caracteristique">
            <span className="caracteristiqueTitre">
                {c.nom}
            </span>
            <span className="caracteristiqueValeur">
                {c.valeur}
            </span>
        </div>
    )*/
    const [caracteristiques,setCaracteristiques] = useState('')
    const zoomImg = (e) => {   
        $(".produitBuyImageShow").addClass("td0")
        $(".produitBuyImageShow").on('mousemove',(e)=>{
              var X = -e.pageX + $(".imgCont").offset().left + 0.5*$(".imgCont").width();
              var Y = -e.pageY + $(".imgCont").offset().top + 0.5*$(".imgCont").height();
              $(".produitBuyImageShow").css("object-position",`${X}px ${Y}px`)    
        })
            };
    const leaveImg = (e) => {
        $(".produitBuyImageShow").removeClass("td0")
        $(".produitBuyImageShow").css("object-position",`center`)
    }
    /*const avis = produit_json.commentaires.map(a => <Avis note={a.note} titre={a.titre} date={a.date} user={a.user.username} contenu={a.contenu} />
    )*/
    const avis =" Aucun avis a pour le moment été posté pour ce produit"

    
    const contact_send = async (e) => {
        e.preventDefault();
        let inputs = new Object()
        if($('#question').val().length<15){
            setError("Votre question est trop courte")
            return("error question")
        }
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        let email = $('#email-question')[0].value
        if(!regex.test(email)){
            setError("Format de l'email incorrect")
            return ('email erreur')
        }
        for(let i=0;i<$(".inputform").length;i++)
          inputs[$(".inputform")[i].name] = $(".inputform")[i].value
        var inputsForm = JSON.stringify(inputs);
        console.log(inputsForm)
        var url = "http://localhost:8000/contact/"
        let data = await fetch(url,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  }, 
                  body: inputsForm,
              })
              .then(response => {
                if(response.ok) {
                    console.log("fetchLogin",response)
                    return response.json();
                } 
                else {
                    console.log(response,'Mauvaise réponse du réseau');
                }
            })
            .then(data => {
                    return data
                })
            .catch(function(error) {
                console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
            });
            console.log(data)
            if (data=="message envoyé"){
                props.showHideModal(e,
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <h3 className='modline'>Votre message a bien été envoyé !</h3>
                    <p className='modline'>Un membre de l'équipe Cam Securite vous contactera dans les plus brefs delai.</p>
                    <img className='modline' src={email} alt="" style={{maxWidth:'400px',objectFit:'contain',}} />
                    
                </div>
                )
            }
            else{
                props.showHideModal(e,
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <h3 className='modline text-danger'>Un problème est survenu !</h3>
                    <p className='modline' >Votre message n'a pas pu être envoyé, veuillez réessayer ulterieurement.</p>
                    <img className='modline' src={erreur} alt="" style={{maxWidth:'400px',objectFit:'contain',}} />
                    
                </div>)
                gsap.from(".modline",{opacity: 0, y: -100, duration: 0.4, stagger: 0.4, delay:0.5})

            }

    }

    return (
        <div className='w-100 main'>
            <div>
                <div className="produitBuy d-flex flex-column flex-lg-row">
                    <div className="produitBuyImageContainer w-100 ">
                        <div className="d-flex justify-content-center align-items-center w-100">
                            <ul className="produitBuyImageList">
                                {produitImages}
                            </ul>
                            <div className="bloc">
                                <div className="content border-start overflow-hidden imgCont">
                                    <img src={produitImage} className="produitBuyImageShow" onMouseLeave={(e) => leaveImg(e) } onMouseOver={(e) => zoomImg(e)} />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="produitBuyDetail">
                                <img src={france} alt="" className="detailImage" />
                                <span className="detailText">
                                    Stock en France
                                </span>
                            </div>
                            <div className="produitBuyDetail">
                                <img src={expedition24} alt="" className="detailImage" />
                                <span className="detailText">
                                    Expédition en 24H
                                </span>
                            </div>
                            <div className="produitBuyDetail">
                                <img src={paiement} alt="" className="detailImage" />
                                <span className="detailText">
                                    Paiement sécurisé
                                </span>
                            </div>
                            <div className="produitBuyDetail">
                                <img src={sav} alt="" className="detailImage" />
                                <span className="detailText">
                                    SAV disponible et réactif
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="produitBuyDescription w-100 pt-4">
                        <div className="stickp">
                            <div className="produitBuyBuy align-items-center mb-2">
                                <div className="d-flex flex-column w-100">
                                    {
                                        produit_json.prixSansReduction!=produit_json.prix
                                        ?
                                        <span className="produitInfo fs-5 mt-0">Promotion</span>
                                        :
                                        ""
                                    }
                                    <h2 className="produitBuyNom ">
                                        {produit_json.nom}
                                    </h2>        
                                    <div className="d-flex align-items-center">                                    
                                        {
                                            produit_json.prixSansReduction!=produit_json.prix
                                            ?
                                            <del className="accueilProduitPrixBarre me-2 text-light">
                                                {produit_json.prixSansReduction} €
                                            </del>
                                            :
                                            ""                         
                                        }
                                        <span className="produitBuyPrix fs-2">
                                            {produit_json.prix} €
                                        </span>
                                    </div>                                   
                                </div>
                                <div className="d-flex w-100 justify-content-end">
                                    {
                                        u=='rien trouvé' || u=='' || u==undefined
                                        ?
                                        ""
                                        :
                                        <label htmlFor="" className="d-flex flex-column flex-md-row justify-content-center align-items-center">
                                            Quantité
                                            <input type="number" className="ProduitBuyQte text-white border border-white" defaultValue={1} placeholder="1" id="qte" name="tentacles"
                                                min="1" max={produit_json.stock} />
                                        </label>

                                    }
                                    <button className="produitBuyBtn" onClick={(e) => acheter(e)}>
                                        Ajouter au panier
                                    </button>
                                </div>
                            </div>
                        </div>
                        <span className="produitBuySousNom text-center w-100 mb-4">
                            {produit_json.sousNom}
                        </span>
                        <p className="produitBuyDescriptionCourte mt-2">
                            {produit_json.descriptionCourte}
                        </p>
                        <div className="produitBuyAutreOption">

                        </div>
                        <div className="produitBuyCaracteristiques">
                            <h2 className="caracteristiquesTitre">
                                Caracteristiques techniques
                            </h2>
                            <div className="caracteristiques">
                                {
                                    caracteristiques != ''
                                    ?
                                    caracteristiques.map(c =>
                                    <div className="caracteristique">
                                        <span className="caracteristiqueTitre">
                                            {c.nom}
                                        </span>
                                        <span className="caracteristiqueValeur">
                                            {c.valeur}
                                        </span>
                                    </div>)
                                    :
                                    ""
                                }
                            </div>
                        </div>
                        <div className="produitBuyDescriptionLongue">
                            <h2 className="caracteristiquesTitre">
                                Description complète
                            </h2>
                            <div className="descriptionLongue mt-2" dangerouslySetInnerHTML={{__html: produit_json.descriptionLongue }}>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="produitBuyCommentaire">
                    <span className="caracteristiquesTitre">
                        Une question sur le produit ?
                    </span>
                    <form action="" className="d-flex w-100 commentPost">
                        <div className="w-100 d-flex flex-column p-2">
                            <input type="text" name='objet' className="commentInput inputform" value={`Question sur ${produit_json.nom}`} hidden="true" />
                            <textarea  name='message' id="question" cols="30" rows="2" className="commentInput mb-2 inputform" placeholder="Rédiger une question concernant le produit" required></textarea>
                            <input type="email" id='email-question' name='email' className="commentInput inputform" placeholder="Entrer votre email" />
                            <p className="text-danger">{error}</p>
                        </div>
                        <button className="commentBtn m-2" onClick={(e) => contact_send(e)}>
                            Poser
                        </button>
                    </form>
                    <div className="commentaires">
                        <div className="commentaire">

                        </div>
                    </div>
                </div>

                <div className="produitBuyCommentaire">
                    <span className="caracteristiquesTitre">
                        Avis sur le produit
                    </span>
                    <div className="avisList">
                        {avis}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Produitachat;
