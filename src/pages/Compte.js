import React,{ useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import Messages from './components/Messages';
import Commandes from './components/Commandes';
import Avislist from './components/AvisList';
import UpdateInfo from './components/UpdateInfo';
import bye from './assets/img/bye.gif'


const Compte = (props) => {
    let navigate = useNavigate();
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
        $(window).scrollTop(0);
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
        return () => {
        };
    }, [u.id]);


    const commandes = [
        {
            id:1,
            numero:"",
            statut:"",
            date:"",
            montant:"",
        },
        {
            id:1,
            numero:"",
            statut:"",
            date:"",
            montant:"",
        },
        {
            id:1,
            numero:"",
            statut:"",
            date:"",
            montant:"",
        },
        {
            id:1,
            numero:"",
            statut:"",
            date:"",
            montant:"",
        },
    ]
    const messages = [
        {
            id:1,
            objet:"",
            contenu:"",
            date:"",
            expediteur:""
        },
        {
            id:2,
            objet:"",
            contenu:"",
            date:"",
            expediteur:""
        },
    ]
    const avis = [
        {
            note: 4,
            titre: "Titre de l'avis",
            date: "le 13 janvier 2022 à 08:19",
            contenu: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint praesentium quibusdam architecto!",
            user: {
                username: "Nanou"
            }
        },
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
    const changeContainer = (e,c) => {
        $(".navLien").removeClass("navLienActive")
        e.target.classList.add("navLienActive")
        setCompteContainer(c)
    }
    const [compteContainer, setCompteContainer] = useState(<Messages messages={messages} showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  />);
    const deconnexion = async (e) =>{    
        localStorage.removeItem('token');
        props.setPrenom("")
        props.setToken(false)
        props.setLogin(false)
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
        const csrftoken = await getCSRF()
        console.log(localStorage.getItem('csrftoken'))
var url2 = "http://localhost:8000/api-token-auth/logout"

            fetch(url2,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken.csrfToken
                  }, 
                  credentials: 'include',
                  body: ''
              }).then(response => {
            if(response.ok) {
                console.log("fetchLogout",response)
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
        props.showHideModal(e,
            (
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <h3 className='modline'>A bientôt !</h3>
                    <img className='' src={bye} alt="" style={{maxWidth:'400px',objectFit:'contain',}} />
                    
                </div>
            ))
    }
    return ( 
        <div className='w-100 main'>
            <div className="userInfo d-flex align-items-center justify-content-between w-100 p-2 p-lg-5">
                <div className="d-flex flex-column">
                    <span className="fw-bold fs-4">{u.user.first_name} {u.user.last_name}</span>
                    <span className=" fs-5">{u.user.email}</span>
                    <span className=" fs-6 fw-bold">Informations sur la livraison</span>
                    <span className=" fs-6">{u.adresse}</span>
                    <div className="d-flex">
                        <span className=" fs-6">{u.code_postal}</span>
                        <span className="ms-2 fs-6">{u.ville}</span>                    
                    </div>

                    <span className=" fs-6">{u.pays}</span>

                </div>
                <div className="d-flex flex-column flex-md-row align-items-center ms-4">
                    <button className=" bg-transparent border-0 bannLink" onClick={(e) => props.showHideModal(e,<UpdateInfo  setModalcontent={props.setModalcontent}/>)} >
                        Modifier mes informations
                    </button>
                    <button className=" produitBuyBtn deconnexionBtn" onClick={(e) => deconnexion(e)}>
                        Déconnexion
                    </button>
                </div>
            </div>
            <nav className="w-100 border-bottom d-flex align-items-center justify-content-center pb-4 p-2 px-lg-5">
                <li onClick={ (e) => changeContainer(e,<Commandes commandes={commandes} showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent} />)} className="navLien mx-2">Commandes</li>
                <li onClick={ (e) => changeContainer(e, <Messages messages={messages} showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent} />)} className="navLien navLienActive mx-2">Messages</li>
                <li onClick={ (e) => changeContainer(e,<Avislist avis={avis} showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}/>)} className="navLien mx-2">Avis</li>
            </nav>
            <div className="d-flex flex-column align-items-center w-100 p-2 p-lg-5 ">
                {compteContainer}
            </div>
        </div>
    );
}

export default Compte;
