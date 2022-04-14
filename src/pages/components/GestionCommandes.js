import React, {useEffect, useState}  from 'react';
import $ from 'jquery';
import Commandeedit from './commandeEdit';
const Gestioncommandes = (props) => {
    const getcommandes= async () =>{
        var url = "http://localhost:8000/commandes/"

        let data = await fetch(url).then(response => {
        if(response.ok) {
            return response.json();
        } else {
            console.log(response,'Mauvaise réponse du réseau');
        }
        }).then(data => 
            {
                return data
            }
            )
        .catch(function(error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });

        
        var url2 = "http://localhost:8000/commandesnonlogin/"

        let data2 = await fetch(url2).then(response => {
        if(response.ok) {
            return response.json();
        } else {
            console.log(response,'Mauvaise réponse du réseau');
        }
        }).then(data => 
            {
                return data
            }
            )
        .catch(function(error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });

        return data.concat(data2)
        
    }
    const [commandes_show, setcommandes_show] = useState([]);
    const [commandes, setcommandes] = useState([]);
    const [nbcommandes, setnbcommandes] = useState(0);
    const [nbcommandestraite, setnbcommandestraite] = useState(0);
    const [nbcommandesexpedie, setnbcommandesexpedie] = useState(0);
    const [nbcommandeslivre, setnbcommandeslivre] = useState(0);
    useEffect(async() => {
        const c = await getcommandes()
        console.log("cccccccccccccccccccccc",c)
        let commandestraite = 0
        let commandesexpedie = 0
        let commandeslivre = 0
        setcommandes(c)
        setnbcommandes(c.length)
        c.map(c => {
            if(c.etat=="payé")
                commandestraite++
            if(c.etat=="expedié")
                commandesexpedie++
            if(c.etat=="livré")
                commandeslivre++
        })
        setnbcommandestraite(commandestraite)
        setnbcommandesexpedie(commandesexpedie)
        setnbcommandeslivre(commandeslivre)
        setcommandes_show(c.map(commande =>
            (<div onClick={(e) => props.showHideModal(e,<Commandeedit commande={commande} setModalcontent={props.setModalcontent} showHideModal={props.showHideModal}/>)} className={`commande-admin d-flex flex-column w-100 mb-4 position-relative pointer ${commande.etat=="payé"?'bg-paye':commande.etat=="expedié"?"bg-expedie":"bg-livre"}`} >
                {
                    commande.profile!=null
                    ?
                    <span class=" text-dark fw-bold ">CAMSEC000{commande.id}</span>
                    :
                    <span class=" text-dark fw-bold ">CAMSECNOLOG000{commande.id}</span>
                }
                <small class="mt-2 text-dark">Statut: {commande.etat}</small>
                <small class="mt-2 text-dark">{commande.total} €</small>
                {
                    commande.profile!=null
                    ?
                    <small class="mt-2 text-dark">{commande.profile.user.email}</small>
                    :
                    <small class="mt-2 text-dark">{commande.email}</small>
                }
            </div>	
        )))
        return () => {
        };
    }, [props.modalContent]);

    const shownontraite = (e) => {
        e.preventDefault();
        $(".adminLink").removeClass("adminLinkActive")
        if(e.target.classList.contains("adminLink"))
            e.target.classList.add("adminLinkActive")
        else
            e.target.parentElement.classList.add('adminLinkActive')

        let c = []
        commandes.map(cmde => {
            if(cmde.etat=="payé")
                c.push(cmde)
        })
        console.log('cccccccmmmmmmmmmmmdddddddddd',c)
        setcommandes_show(c.map(commande =>
            (<div onClick={(e) => props.showHideModal(e,<Commandeedit commande={commande} setModalcontent={props.setModalcontent} showHideModal={props.showHideModal} />)}  className={`commande-admin d-flex flex-column w-100 mb-4 position-relative pointer ${commande.etat=="payé"?'bg-paye':commande.etat=="expedié"?"bg-expedie":"bg-livre"}`} >
                {
                    commande.profile!=null
                    ?
                    <span class=" text-dark fw-bold ">CAMSEC000{commande.id}</span>
                    :
                    <span class=" text-dark fw-bold ">CAMSECNOLOG000{commande.id}</span>
                }
                <small class="mt-2 text-dark">Statut: {commande.etat}</small>
                <small class="mt-2 text-dark">{commande.total} €</small>
                {
                    commande.profile!=null
                    ?
                    <small class="mt-2 text-dark">{commande.profile.user.email}</small>
                    :
                    <small class="mt-2 text-dark">{commande.email}</small>
                }
            </div>	
        )))
    }
    
    const showexpedie = (e) => {
        e.preventDefault();
        $(".adminLink").removeClass("adminLinkActive")
        if(e.target.classList.contains("adminLink"))
            e.target.classList.add("adminLinkActive")
        else
            e.target.parentElement.classList.add('adminLinkActive')
        
        let c = []
        commandes.map(cmde => {
            if(cmde.etat=="expedié")
                c.push(cmde)
        })
        console.log('cccccccmmmmmmmmmmmdddddddddd',c)
        setcommandes_show(c.map(commande =>
            (<div onClick={(e) => props.showHideModal(e,<Commandeedit commande={commande} setModalcontent={props.setModalcontent} showHideModal={props.showHideModal}/>)} className={`commande-admin d-flex flex-column w-100 mb-4 position-relative pointer ${commande.etat=="payé"?'bg-paye':commande.etat=="expedié"?"bg-expedie":"bg-livre"}`} >
                {
                    commande.profile!=null
                    ?
                    <span class=" text-dark fw-bold ">CAMSEC000{commande.id}</span>
                    :
                    <span class=" text-dark fw-bold ">CAMSECNOLOG000{commande.id}</span>
                }
                <small class="mt-2 text-dark">Statut: {commande.etat}</small>
                <small class="mt-2 text-dark">{commande.total} €</small>
                {
                    commande.profile!=null
                    ?
                    <small class="mt-2 text-dark">{commande.profile.user.email}</small>
                    :
                    <small class="mt-2 text-dark">{commande.email}</small>
                }
            </div>	
        )))
    }
    
    const showlivre = (e) => {
        e.preventDefault();
        $(".adminLink").removeClass("adminLinkActive")
        if(e.target.classList.contains("adminLink"))
            e.target.classList.add("adminLinkActive")
        else
            e.target.parentElement.classList.add('adminLinkActive')


        let c = []
        commandes.map(cmde => {
            if(cmde.etat=="livré")
                c.push(cmde)
        })
        console.log('cccccccmmmmmmmmmmmdddddddddd',c)
        setcommandes_show(c.map(commande =>
            (<div onClick={(e) => props.showHideModal(e,<Commandeedit commande={commande} setModalcontent={props.setModalcontent} showHideModal={props.showHideModal}/>)} className={`commande-admin d-flex flex-column w-100 mb-4 position-relative pointer ${commande.etat=="payé"?'bg-paye':commande.etat=="expedié"?"bg-expedie":"bg-livre"}`} >
                {
                    commande.profile!=null
                    ?
                    <span class=" text-dark fw-bold ">CAMSEC000{commande.id}</span>
                    :
                    <span class=" text-dark fw-bold ">CAMSECNOLOG000{commande.id}</span>
                }                <small class="mt-2 text-dark">Statut: {commande.etat}</small>
                <small class="mt-2 text-dark">{commande.total} €</small>
                {
                    commande.profile!=null
                    ?
                    <small class="mt-2 text-dark">{commande.profile.user.email}</small>
                    :
                    <small class="mt-2 text-dark">{commande.email}</small>
                }
            </div>	
        )))
    }
    
    const showall = (e) => {
        e.preventDefault();
        $(".adminLink").removeClass("adminLinkActive")
        if(e.target.classList.contains("adminLink"))
            e.target.classList.add("adminLinkActive")
        else
            e.target.parentElement.classList.add('adminLinkActive')

        let c = commandes
        console.log('cccccccmmmmmmmmmmmdddddddddd',c)
        setcommandes_show(c.map(commande =>
            (<div onClick={(e) => props.showHideModal(e,<Commandeedit commande={commande} setModalcontent={props.setModalcontent} showHideModal={props.showHideModal}/>)} className={`commande-admin d-flex flex-column w-100 mb-4 position-relative pointer ${commande.etat=="payé"?'bg-paye':commande.etat=="expedié"?"bg-expedie":"bg-livre"}`} >
                {
                    commande.profile!=null
                    ?
                    <span class=" text-dark fw-bold ">CAMSEC000{commande.id}</span>
                    :
                    <span class=" text-dark fw-bold ">CAMSECNOLOG000{commande.id}</span>
                }
                <small class="mt-2 text-dark">Statut: {commande.etat}</small>
                <small class="mt-2 text-dark">{commande.total} €</small>
                {
                    commande.profile!=null
                    ?
                    <small class="mt-2 text-dark">{commande.profile.user.email}</small>
                    :
                    <small class="mt-2 text-dark">{commande.email}</small>
                }
            </div>	
        )))
    }

    return (
        <div className='w-100 p-3' >
            <h1 className='fs-3' >Gestion des commandes</h1>
            <div className="d-flex align-items-center justify-content-between pe-3">
                <div className="d-flex align-items-center">
                    <div className="d-flex flex-column me-3 adminLink adminLinkActive"  onClick={(e) => showall(e)} >
                        <span className="fs-2">{nbcommandes}</span>
                        <span>Toutes les commandes</span>
                    </div>
                    <div className="d-flex flex-column me-3 adminLink" onClick={(e) => shownontraite(e)} >
                        <span className="fs-2">{nbcommandestraite}</span>
                        <span>Commandes non traités</span>
                    </div>
                    <div className="d-flex flex-column me-3 adminLink" onClick={(e) => showexpedie(e)} >
                        <span className="fs-2">{nbcommandesexpedie}</span>
                        <span>Commandes expediées</span>
                    </div>
                    <div className="d-flex flex-column me-3 adminLink"  onClick={(e) => showlivre(e)} >
                        <span className="fs-2">{nbcommandeslivre}</span>
                        <span>Commandes finis</span>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-row flex-wrap justify-content-start align-items-center">
                {commandes_show}
            </div>

        </div>
    );
}

export default Gestioncommandes;
