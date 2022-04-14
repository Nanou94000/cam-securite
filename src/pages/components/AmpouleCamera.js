import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import installationvideo from "../assets/img/installation.mov"
import install from "../assets/img/install.png"
import ContactInstallation from './ContactInstallation';

const Ampoulecamera = (props) => {
    const [produit_json, setProduit] = useState("")
    const [categorie, setCategorie] = useState("")
    useEffect(async() => {
        console.log('produit definit')
        var url = "http://localhost:8000/produit/1"

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
        
    }, []);
    return (
        <div className="accueilBannInv w-100 position-relative " style={{background : "transparent", height:'600px',}}>
                    
            <video  loop={true} id="myVideo" className='vid' style={{filter: "blur(4px)"}} autoPlay={true} muted>
                <source src={installationvideo} type="video/mp4"/>
            </video>
            <h2 className="bannTitre" style={{color : '#F2EDEB', textShadow: '2px 2px 5px black'}}>
                Service de conseil et d'installation de caméras 
            </h2>
            <h4 className="bannSoustitre px-0 px-md-5" style={{color : '#ddd', textShadow: '2px 2px 5px black'}}>
                Que ce soit pour votre domicile ou pour votre boutique faite confiance à nos techniciens experts pour mettre en place votre dispositif de caméras de surveillance
            </h4>
            <div className="d-flex justify-content-center align-items-center w-100">
                        <button to={`/produit/${produit_json.id}`}  className="bannLink bannBtn bg-white text-dark hoverdark" 
                        onClick={(e) => {
                                    e.preventDefault();
                                    props.showHideModal(e,<ContactInstallation setModalcontent={props.setModalcontent} showHideModal={props.showHideModal}/>);
                        }}>
                            Nous contacter 
                        </button>                    

                        <Link to={`/installation`}  className="bannLink text-center text-light">
                            En savoir plus sur l'installation de caméra
                        </Link>   

            </div>
        </div>
    );
}

export default Ampoulecamera;
