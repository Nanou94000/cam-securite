import ReactShadowScroll from 'react-shadow-scroll';
import React, { useState, useEffect } from 'react';
import { gsap } from "gsap";
import Produit from './Produit';
import $ from 'jquery';
import { Link } from 'react-router-dom';

const Produitslist = (props) => {
    console.log('props cat',props.user)
    const u = props.user
    
    const [categorie,setCategorie] = useState(            
        {
            nom: "recherche",
            sousNom: "CategorieSubName",
            background: "white",
        }
    )

    const [tri, setTri] = useState("")

    const [categories,setCategories] = useState([""])

    const [produit_json,setProduits] = useState([""])

    const [produits, changeProduits] = useState(["a"])

    async function initNav() {

        var url = "http://localhost:8000/categories/"

            fetch(url).then(response => {
            if(response.ok) {
                console.log("fetch")
                return response.json();
            } else {
                console.log(response,'Mauvaise réponse du réseau');
            }
            }).then(data => 
                setCategories(data)
                )
            .catch(function(error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
            });

        const lien = document.URL
        if (lien.search("categorie")>0){
            var categorieId = lien.split('/')[lien.split('/').length-1]
            var url = "http://localhost:8000/categories/"+categorieId+'/'

            fetch(url).then(response => {
            if(response.ok) {
                return response.json();
            } else {
                console.log(response,'Mauvaise réponse du réseau');
            }
            }).then(data => 
                setCategorie(data)
                )
            .catch(function(error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
            });
                        
            var url3 = "http://localhost:8000/categorie/"+categorieId+'/produits'

            fetch(url3).then(response => {
            if(response.ok) {
                console.log("fetch3")
                return response.json();
            } else {
                console.log(response,'Mauvaise réponse du réseau');
            }
            }).then(data => 
                {
                    console.log(data)
                    setProduits(data)
                    let pr = data.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent} user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction}image={p.image1} />)
                    console.log('pr',pr)
                    changeProduits(pr)
                    
                }
                )
            .catch(function(error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
            });
        }
        else if(lien=="http://localhost:3000/produits"){
            var categorieId = lien.split('/')[lien.split('/').length-1]
            var url = "http://localhost:8000/produits/"

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
            setProduits(data)
            let pr = data.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent} user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction}image={p.image1} />)
            changeProduits(pr)
            setCategorie(        
            {
                nom: "Tous les produits",
                sousNom: "CategorieSubName",
                background: "black",
            })

        }
        else{
            var search = lien.split('/')[lien.split('/').length-1]
            var url = "http://localhost:8000/produits/"+search+'/'

            let data = await fetch(url).then(response => {
            if(response.ok) {
                return response.json();
            } else {
                console.log(response,'Mauvaise réponse du réseau');
            }
            }).then(data => {
                return data
            })
            .catch(function(error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
            });           
            let s = {
                nom: search,
                sousNom: data.length>1 ? `${data.length} resultats` : `${data.length} resultat`,
                background: "white",
            }
            setCategorie(s)
            setProduits(data)
            let pr = data.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent} user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction}image={p.image1} />)
            console.log('pr',pr)
            changeProduits(pr)
        }

                      
    }

    useEffect(() => {
        setTri('')
        console.log("123456789123456789123456789123456789")
        $(window).scrollTop(0);
        initNav()
        gsap.from(".categorieImageBann", {opacity: 0, y: -100, duration: 0.5, delay:0.5});
        gsap.fromTo(".filtreProduits", {opacity: 0, x: -2000, duration: 0.5, delay:0.5}, {opacity: 1, x: 0});
        gsap.fromTo(".produitAnim", {opacity: 0, scale:0, duration: 0.5},{opacity:1,scale:1});
        return () => {
        };
    }, [document.URL.split('/')[document.URL.split('/').length-1]]);

    useEffect(() => {
        console.log(document.URL)
    }, [props.url]);

    useEffect(() => {
        gsap.fromTo(".produitAnim", {opacity: 0, scale:0, duration: 0.5},{opacity:1,scale:1});
        return () => {
            
        };
    }, [produits]);

    /*const produit_json = [
        {
            nom: "Caméra réveil",
            sousNom: "Voir sans être vu",
            prix: 165,
            image: "https://www.tomsguide.fr/content/uploads/sites/2/cache/2021/11/nest-indoor/3552683667.png",
        },
        {
            nom: "Caméra réveil",
            sousNom: "Voir sans être vu",
            prix: 165,
            image: "https://www.tomsguide.fr/content/uploads/sites/2/cache/2021/11/nest-indoor/3552683667.png",
        },
        {
            nom: "Caméra réveil",
            sousNom: "Voir sans être vu",
            prix: 165,
            image: "https://www.tomsguide.fr/content/uploads/sites/2/cache/2021/11/nest-indoor/3552683667.png",
        },
        {
            nom: "Caméra réveil",
            sousNom: "Voir sans être vu",
            prix: 165,
            image: "https://www.tomsguide.fr/content/uploads/sites/2/cache/2021/11/nest-indoor/3552683667.png",
        },
        {
            nom: "Caméra réveil",
            sousNom: "Voir sans être vu",
            prix: 165,
            image: "https://www.tomsguide.fr/content/uploads/sites/2/cache/2021/11/nest-indoor/3552683667.png",
        },
        {
            nom: "Caméra réveil",
            sousNom: "Voir sans être vu",
            prix: 165,
            image: "https://www.tomsguide.fr/content/uploads/sites/2/cache/2021/11/nest-indoor/3552683667.png",
        },
        {
            nom: "Caméra réveil",
            sousNom: "Voir sans être vu",
            prix: 165,
            image: "https://www.tomsguide.fr/content/uploads/sites/2/cache/2021/11/nest-indoor/3552683667.png",
        },
    ]*/

    let showHideFiltre = () => {
        if ($(".flitreContainer").hasClass("d-none")) {
            console.log("okkk")
            $(".flitreContainer").removeClass("d-none")
            $("body").addClass('noScroll')
        }
        else {
            $(".flitreContainer").addClass("d-none")
            $("body").removeClass('noScroll')
        }
    }


    return (
        <div className=' main w-100'>
            
                <div className="flitreContainer d-none">
                    <div className="filtres w-100">
                        <div className=" w-100 d-flex flex-column p-3 overflow-y-auto" style={{height:'calc(100vh - 300px)'}}>
                            <span className="filtreTitre">Filtres</span>
                        <div className="filtre">
                        <a class="filtreNom text-dark d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                            <span>Catégories</span>
                            <span>V</span> 
                        </a>
                            <ul className="collapse categoriesList" id="collapseExample">
                                {
                                    categories.map(m => (
                                    <li className="menuLink">
                                        <Link to={`/categorie/${m.id}`} className="navLink">
                                        {m.nom}
                                        </Link>
                                    </li>))
                                    
                                }
                            </ul>
                        </div>
                        <div className="filtre">
                            <span className="filtreNom">
                                Connectivité
                            </span>
                            <div className="d-flex pl15">
                                <label htmlFor="" className="filtreChoix">
                                    <input type="checkbox" name='wifi' className="me-2" onClick={(e)=>
                                    {
                                        const fl = $(".filtreChoix").children()
                                        let filtres = []
                                        for(let j=0; j<(fl.length-1)/2 ;j++){
                                            if(fl[j].checked)
                                            {
                                                console.log("777777777777777777777777777777777")
                                                let obj = [];
                                                const val = fl[j].parentElement.innerHTML.split('>')[1]
                                                const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                                obj[0]=nom
                                                obj[1]=val
                                                filtres.push(obj)
                                            }
                                        }
                                        console.log('filtres',fl[(fl.length-1)/2].parentElement.parentElement.parentElement.children[0].innerHTML)
                                        if(filtres.length==0){
                                            let newp = []
                                            console.log('newp',newp)
                                            let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                            changeProduits(pr)

                                            return('not selected');
                                        }
                                        console.log('alimentation secteur' ,filtres[0])
                                        let newp = []
                                        produit_json.map(p =>{
                                                // const val = e.target.parentElement.innerHTML.split('>')[1]
                                                // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                                // console.log(nom)
                                                for(var f =0 ;f<filtres.length;f++)
                                                {
                                                    if(filtres[f][0]=="Prix"){
                                                        if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                            newp.push(p)
                                                        console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                    }
                                                    else if(filtres[f][0]=="Promotion"){
                                                        if(p.prix!=p.prixSansReduction)
                                                            newp.push(p)
                                                    }
                                                    else{
                                                        for(var c =0 ;c<p.caracteristiques.length;c++)
                                                        {
                                                            if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                                newp.push(p)
                                                        }
                                                    }
                                                }
                                        })
                                        console.log('newp',newp)
                                        let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)
                                        showHideFiltre()
                                    }} />
                                    WiFi
                                </label>
                                <label htmlFor="" className="filtreChoix">
                                    <input type="checkbox" className="me-2"  onClick={(e)=>
                                    {
                                        const fl = $(".filtreChoix").children()
                                        let filtres = []
                                        for(let j=0; j<(fl.length-1)/2 ;j++){
                                            if(fl[j].checked)
                                            {
                                                console.log("777777777777777777777777777777777")
                                                let obj = [];
                                                const val = fl[j].parentElement.innerHTML.split('>')[1]
                                                const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                                obj[0]=nom
                                                obj[1]=val
                                                filtres.push(obj)
                                            }
                                        }
                                        console.log('filtres',fl[(fl.length-1)/2].parentElement.parentElement.parentElement.children[0].innerHTML)
                                        if(filtres.length==0){
                                            let newp = []
                                            console.log('newp',newp)
                                            let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                            changeProduits(pr)

                                            return('not selected');
                                        }
                                        console.log('alimentation secteur' ,filtres[0])
                                        let newp = []
                                        produit_json.map(p =>{
                                                // const val = e.target.parentElement.innerHTML.split('>')[1]
                                                // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                                // console.log(nom)
                                                for(var f =0 ;f<filtres.length;f++)
                                                {
                                                    if(filtres[f][0]=="Prix"){
                                                        if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                            newp.push(p)
                                                        console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                    }
                                                    else if(filtres[f][0]=="Promotion"){
                                                        if(p.prix!=p.prixSansReduction)
                                                            newp.push(p)
                                                    }
                                                    else{
                                                        for(var c =0 ;c<p.caracteristiques.length;c++)
                                                        {
                                                            if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                                newp.push(p)
                                                        }
                                                    }
                                                }
                                        })
                                        console.log('newp',newp)
                                        let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)
                                        showHideFiltre()
                                    }} />
                                    GSM
                                </label>
                            </div>
                        </div>
                        <div className="filtre">
                            <span className="filtreNom">
                                Promoton
                            </span>
                            <div className="d-flex pl15">
                                <label htmlFor="" className="filtreChoix">
                                    <input type="checkbox" className="me-2"  onClick={(e)=>
                                    {
                                        const fl = $(".filtreChoix").children()
                                        let filtres = []
                                        for(let j=0; j<(fl.length-1)/2 ;j++){
                                            if(fl[j].checked)
                                            {
                                                console.log("777777777777777777777777777777777")
                                                let obj = [];
                                                const val = fl[j].parentElement.innerHTML.split('>')[1]
                                                const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                                obj[0]=nom
                                                obj[1]=val
                                                filtres.push(obj)
                                            }
                                        }
                                        console.log('filtres',fl[(fl.length-1)/2].parentElement.parentElement.parentElement.children[0].innerHTML)
                                        if(filtres.length==0){
                                            let newp = []
                                            console.log('newp',newp)
                                            let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                            changeProduits(pr)

                                            return('not selected');
                                        }
                                        console.log('alimentation secteur' ,filtres[0])
                                        let newp = []
                                        produit_json.map(p =>{
                                                // const val = e.target.parentElement.innerHTML.split('>')[1]
                                                // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                                // console.log(nom)
                                                for(var f =0 ;f<filtres.length;f++)
                                                {
                                                    if(filtres[f][0]=="Prix"){
                                                        if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                            newp.push(p)
                                                        console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                    }
                                                    else if(filtres[f][0]=="Promotion"){
                                                        if(p.prix!=p.prixSansReduction)
                                                            newp.push(p)
                                                    }
                                                    else{
                                                        for(var c =0 ;c<p.caracteristiques.length;c++)
                                                        {
                                                            if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                                newp.push(p)
                                                        }
                                                    }
                                                }
                                        })
                                        console.log('newp',newp)
                                        let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)
                                        showHideFiltre()
                                    }} />
                                    Oui
                                </label>
                            </div>
                        </div>
                        <div className="filtre">
                            <span className="filtreNom">
                                Prix
                            </span>
                            <div className="d-flex flex-wrap pl15 w-100">
                                <label htmlFor="" className="filtreChoix">
                                    <input type="checkbox" className="me-2"  onClick={(e)=>
                                    {
                                        const fl = $(".filtreChoix").children()
                                        let filtres = []
                                        for(let j=0; j<(fl.length-1)/2 ;j++){
                                            if(fl[j].checked)
                                            {
                                                console.log("777777777777777777777777777777777")
                                                let obj = [];
                                                const val = fl[j].parentElement.innerHTML.split('>')[1]
                                                const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                                obj[0]=nom
                                                obj[1]=val
                                                filtres.push(obj)
                                            }
                                        }
                                        console.log('filtres',fl[(fl.length-1)/2].parentElement.parentElement.parentElement.children[0].innerHTML)
                                        if(filtres.length==0){
                                            let newp = []
                                            console.log('newp',newp)
                                            let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                            changeProduits(pr)

                                            return('not selected');
                                        }
                                        console.log('alimentation secteur' ,filtres[0])
                                        let newp = []
                                        produit_json.map(p =>{
                                                // const val = e.target.parentElement.innerHTML.split('>')[1]
                                                // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                                // console.log(nom)
                                                for(var f =0 ;f<filtres.length;f++)
                                                {
                                                    if(filtres[f][0]=="Prix"){
                                                        if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                            newp.push(p)
                                                        console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                    }
                                                    else if(filtres[f][0]=="Promotion"){
                                                        if(p.prix!=p.prixSansReduction)
                                                            newp.push(p)
                                                    }
                                                    else{
                                                        for(var c =0 ;c<p.caracteristiques.length;c++)
                                                        {
                                                            if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                                newp.push(p)
                                                        }
                                                    }
                                                }
                                        })
                                        console.log('newp',newp)
                                        let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)
                                        showHideFiltre()
                                    }} />
                                    0 - 50 €
                                </label>
                                <label htmlFor="" className="filtreChoix">
                                    <input type="checkbox" className="me-2"  onClick={(e)=>
                                    {
                                        const fl = $(".filtreChoix").children()
                                        let filtres = []
                                        for(let j=0; j<(fl.length-1)/2 ;j++){
                                            if(fl[j].checked)
                                            {
                                                console.log("777777777777777777777777777777777")
                                                let obj = [];
                                                const val = fl[j].parentElement.innerHTML.split('>')[1]
                                                const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                                obj[0]=nom
                                                obj[1]=val
                                                filtres.push(obj)
                                            }
                                        }
                                        console.log('filtres',fl[(fl.length-1)/2].parentElement.parentElement.parentElement.children[0].innerHTML)
                                        if(filtres.length==0){
                                            let newp = []
                                            console.log('newp',newp)
                                            let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                            changeProduits(pr)

                                            return('not selected');
                                        }
                                        console.log('alimentation secteur' ,filtres[0])
                                        let newp = []
                                        produit_json.map(p =>{
                                                // const val = e.target.parentElement.innerHTML.split('>')[1]
                                                // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                                // console.log(nom)
                                                for(var f =0 ;f<filtres.length;f++)
                                                {
                                                    if(filtres[f][0]=="Prix"){
                                                        if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                            newp.push(p)
                                                        console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                    }
                                                    else if(filtres[f][0]=="Promotion"){
                                                        if(p.prix!=p.prixSansReduction)
                                                            newp.push(p)
                                                    }
                                                    else{
                                                        for(var c =0 ;c<p.caracteristiques.length;c++)
                                                        {
                                                            if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                                newp.push(p)
                                                        }
                                                    }
                                                }
                                        })
                                        console.log('newp',newp)
                                        let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)
                                        showHideFiltre()
                                    }} />
                                    51 - 100 €
                                </label>
                                <label htmlFor="" className="filtreChoix">
                                    <input type="checkbox" className="me-2"  onClick={(e)=>
                                    {
                                        const fl = $(".filtreChoix").children()
                                        let filtres = []
                                        for(let j=0; j<(fl.length-1)/2 ;j++){
                                            if(fl[j].checked)
                                            {
                                                console.log("777777777777777777777777777777777")
                                                let obj = [];
                                                const val = fl[j].parentElement.innerHTML.split('>')[1]
                                                const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                                obj[0]=nom
                                                obj[1]=val
                                                filtres.push(obj)
                                            }
                                        }
                                        console.log('filtres',fl[(fl.length-1)/2].parentElement.parentElement.parentElement.children[0].innerHTML)
                                        if(filtres.length==0){
                                            let newp = []
                                            console.log('newp',newp)
                                            let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                            changeProduits(pr)

                                            return('not selected');
                                        }
                                        console.log('alimentation secteur' ,filtres[0])
                                        let newp = []
                                        produit_json.map(p =>{
                                                // const val = e.target.parentElement.innerHTML.split('>')[1]
                                                // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                                // console.log(nom)
                                                for(var f =0 ;f<filtres.length;f++)
                                                {
                                                    if(filtres[f][0]=="Prix"){
                                                        if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                            newp.push(p)
                                                        console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                    }
                                                    else if(filtres[f][0]=="Promotion"){
                                                        if(p.prix!=p.prixSansReduction)
                                                            newp.push(p)
                                                    }
                                                    else{
                                                        for(var c =0 ;c<p.caracteristiques.length;c++)
                                                        {
                                                            if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                                newp.push(p)
                                                        }
                                                    }
                                                }
                                        })
                                        console.log('newp',newp)
                                        let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)
                                        showHideFiltre()
                                    }} />
                                    101 - 150 €
                                </label>
                                <label htmlFor="" className="filtreChoix">
                                    <input type="checkbox" className="me-2"  onClick={(e)=>
                                    {
                                        const fl = $(".filtreChoix").children()
                                        let filtres = []
                                        for(let j=0; j<(fl.length-1)/2 ;j++){
                                            if(fl[j].checked)
                                            {
                                                console.log("777777777777777777777777777777777")
                                                let obj = [];
                                                const val = fl[j].parentElement.innerHTML.split('>')[1]
                                                const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                                obj[0]=nom
                                                obj[1]=val
                                                filtres.push(obj)
                                            }
                                        }
                                        console.log('filtres',fl[(fl.length-1)/2].parentElement.parentElement.parentElement.children[0].innerHTML)
                                        if(filtres.length==0){
                                            let newp = []
                                            console.log('newp',newp)
                                            let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                            changeProduits(pr)

                                            return('not selected');
                                        }
                                        console.log('alimentation secteur' ,filtres[0])
                                        let newp = []
                                        produit_json.map(p =>{
                                                // const val = e.target.parentElement.innerHTML.split('>')[1]
                                                // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                                // console.log(nom)
                                                for(var f =0 ;f<filtres.length;f++)
                                                {
                                                    if(filtres[f][0]=="Prix"){
                                                        if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                            newp.push(p)
                                                        console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                    }
                                                    else if(filtres[f][0]=="Promotion"){
                                                        if(p.prix!=p.prixSansReduction)
                                                            newp.push(p)
                                                    }
                                                    else{
                                                        for(var c =0 ;c<p.caracteristiques.length;c++)
                                                        {
                                                            if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                                newp.push(p)
                                                        }
                                                    }
                                                }
                                        })
                                        console.log('newp',newp)
                                        let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)
                                        showHideFiltre()
                                    }} />
                                    151 - 200 €
                                </label>
                            </div>

                        </div>
                        <div className="filtre">
                            <span className="filtreNom">
                                Résolution
                            </span>
                            <div className="d-flex pl15">
                                <label htmlFor="" className="filtreChoix">
                                    <input type="checkbox" className="me-2"  onClick={(e)=>
                                    {
                                        const fl = $(".filtreChoix").children()
                                        let filtres = []
                                        for(let j=0; j<(fl.length-1)/2 ;j++){
                                            if(fl[j].checked)
                                            {
                                                console.log("777777777777777777777777777777777")
                                                let obj = [];
                                                const val = fl[j].parentElement.innerHTML.split('>')[1]
                                                const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                                obj[0]=nom
                                                obj[1]=val
                                                filtres.push(obj)
                                            }
                                        }
                                        console.log('filtres',fl[(fl.length-1)/2].parentElement.parentElement.parentElement.children[0].innerHTML)
                                        if(filtres.length==0){
                                            let newp = []
                                            console.log('newp',newp)
                                            let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                            changeProduits(pr)

                                            return('not selected');
                                        }
                                        console.log('alimentation secteur' ,filtres[0])
                                        let newp = []
                                        produit_json.map(p =>{
                                                // const val = e.target.parentElement.innerHTML.split('>')[1]
                                                // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                                // console.log(nom)
                                                for(var f =0 ;f<filtres.length;f++)
                                                {
                                                    if(filtres[f][0]=="Prix"){
                                                        if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                            newp.push(p)
                                                        console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                    }
                                                    else if(filtres[f][0]=="Promotion"){
                                                        if(p.prix!=p.prixSansReduction)
                                                            newp.push(p)
                                                    }
                                                    else{
                                                        for(var c =0 ;c<p.caracteristiques.length;c++)
                                                        {
                                                            if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                                newp.push(p)
                                                        }
                                                    }
                                                }
                                        })
                                        console.log('newp',newp)
                                        let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)
                                        showHideFiltre()
                                    }} />
                                    HD
                                </label>
                                <label htmlFor="" className="filtreChoix">
                                    <input type="checkbox" className="me-2"  onClick={(e)=>
                                    {
                                        const fl = $(".filtreChoix").children()
                                        let filtres = []
                                        for(let j=0; j<(fl.length-1)/2 ;j++){
                                            if(fl[j].checked)
                                            {
                                                console.log("777777777777777777777777777777777")
                                                let obj = [];
                                                const val = fl[j].parentElement.innerHTML.split('>')[1]
                                                const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                                obj[0]=nom
                                                obj[1]=val
                                                filtres.push(obj)
                                            }
                                        }
                                        console.log('filtres',fl[(fl.length-1)/2].parentElement.parentElement.parentElement.children[0].innerHTML)
                                        if(filtres.length==0){
                                            let newp = []
                                            console.log('newp',newp)
                                            let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                            changeProduits(pr)

                                            return('not selected');
                                        }
                                        console.log('alimentation secteur' ,filtres[0])
                                        let newp = []
                                        produit_json.map(p =>{
                                                // const val = e.target.parentElement.innerHTML.split('>')[1]
                                                // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                                // console.log(nom)
                                                for(var f =0 ;f<filtres.length;f++)
                                                {
                                                    if(filtres[f][0]=="Prix"){
                                                        if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                            newp.push(p)
                                                        console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                    }
                                                    else if(filtres[f][0]=="Promotion"){
                                                        if(p.prix!=p.prixSansReduction)
                                                            newp.push(p)
                                                    }
                                                    else{
                                                        for(var c =0 ;c<p.caracteristiques.length;c++)
                                                        {
                                                            if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                                newp.push(p)
                                                        }
                                                    }
                                                }
                                        })
                                        console.log('newp',newp)
                                        let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)
                                        showHideFiltre()
                                    }} />
                                    Full HD
                                </label>
                                <label htmlFor="" className="filtreChoix">
                                    <input type="checkbox" className="me-2"  onClick={(e)=>
                                    {
                                        const fl = $(".filtreChoix").children()
                                        let filtres = []
                                        for(let j=0; j<(fl.length-1)/2 ;j++){
                                            if(fl[j].checked)
                                            {
                                                console.log("777777777777777777777777777777777")
                                                let obj = [];
                                                const val = fl[j].parentElement.innerHTML.split('>')[1]
                                                const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                                obj[0]=nom
                                                obj[1]=val
                                                filtres.push(obj)
                                            }
                                        }
                                        console.log('filtres',fl[(fl.length-1)/2].parentElement.parentElement.parentElement.children[0].innerHTML)
                                        if(filtres.length==0){
                                            let newp = []
                                            console.log('newp',newp)
                                            let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                            changeProduits(pr)

                                            return('not selected');
                                        }
                                        console.log('alimentation secteur' ,filtres[0])
                                        let newp = []
                                        produit_json.map(p =>{
                                                // const val = e.target.parentElement.innerHTML.split('>')[1]
                                                // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                                // console.log(nom)
                                                for(var f =0 ;f<filtres.length;f++)
                                                {
                                                    if(filtres[f][0]=="Prix"){
                                                        if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                            newp.push(p)
                                                        console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                    }
                                                    else if(filtres[f][0]=="Promotion"){
                                                        if(p.prix!=p.prixSansReduction)
                                                            newp.push(p)
                                                    }
                                                    else{
                                                        for(var c =0 ;c<p.caracteristiques.length;c++)
                                                        {
                                                            if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                                newp.push(p)
                                                        }
                                                    }
                                                }
                                        })
                                        console.log('newp',newp)
                                        let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)
                                        showHideFiltre()
                                    }} />
                                    4K
                                </label>
                            </div>

                        </div>
                        <div className="filtre">
                            <span className="filtreNom">
                                Alimentation
                            </span>
                            <div className="d-flex pl15">
                                <label htmlFor="" className="filtreChoix">
                                    <input type="checkbox" className="me-2"  onClick={(e)=>
                                    {
                                        const fl = $(".filtreChoix").children()
                                        let filtres = []
                                        for(let j=0; j<(fl.length-1)/2 ;j++){
                                            if(fl[j].checked)
                                            {
                                                console.log("777777777777777777777777777777777")
                                                let obj = [];
                                                const val = fl[j].parentElement.innerHTML.split('>')[1]
                                                const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                                obj[0]=nom
                                                obj[1]=val
                                                filtres.push(obj)
                                            }
                                        }
                                        console.log('filtres',fl[(fl.length-1)/2].parentElement.parentElement.parentElement.children[0].innerHTML)
                                        if(filtres.length==0){
                                            let newp = []
                                            console.log('newp',newp)
                                            let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                            changeProduits(pr)

                                            return('not selected');
                                        }
                                        console.log('alimentation secteur' ,filtres[0])
                                        let newp = []
                                        produit_json.map(p =>{
                                                // const val = e.target.parentElement.innerHTML.split('>')[1]
                                                // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                                // console.log(nom)
                                                for(var f =0 ;f<filtres.length;f++)
                                                {
                                                    if(filtres[f][0]=="Prix"){
                                                        if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                            newp.push(p)
                                                        console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                    }
                                                    else if(filtres[f][0]=="Promotion"){
                                                        if(p.prix!=p.prixSansReduction)
                                                            newp.push(p)
                                                    }
                                                    else{
                                                        for(var c =0 ;c<p.caracteristiques.length;c++)
                                                        {
                                                            if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                                newp.push(p)
                                                        }
                                                    }
                                                }
                                        })
                                        console.log('newp',newp)
                                        let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)
                                        showHideFiltre()
                                    }} />
                                    Secteur
                                </label>
                                <label htmlFor="" className="filtreChoix">
                                    <input type="checkbox" className="me-2"  onClick={(e)=>
                                    {
                                        const fl = $(".filtreChoix").children()
                                        let filtres = []
                                        for(let j=0; j<(fl.length-1)/2 ;j++){
                                            if(fl[j].checked)
                                            {
                                                console.log("777777777777777777777777777777777")
                                                let obj = [];
                                                const val = fl[j].parentElement.innerHTML.split('>')[1]
                                                const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                                obj[0]=nom
                                                obj[1]=val
                                                filtres.push(obj)
                                            }
                                        }
                                        console.log('filtres',fl[(fl.length-1)/2].parentElement.parentElement.parentElement.children[0].innerHTML)
                                        if(filtres.length==0){
                                            let newp = []
                                            console.log('newp',newp)
                                            let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                            changeProduits(pr)

                                            return('not selected');
                                        }
                                        console.log('alimentation secteur' ,filtres[0])
                                        let newp = []
                                        produit_json.map(p =>{
                                                // const val = e.target.parentElement.innerHTML.split('>')[1]
                                                // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                                // console.log(nom)
                                                for(var f =0 ;f<filtres.length;f++)
                                                {
                                                    if(filtres[f][0]=="Prix"){
                                                        if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                            newp.push(p)
                                                        console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                    }
                                                    else if(filtres[f][0]=="Promotion"){
                                                        if(p.prix!=p.prixSansReduction)
                                                            newp.push(p)
                                                    }
                                                    else{
                                                        for(var c =0 ;c<p.caracteristiques.length;c++)
                                                        {
                                                            if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                                newp.push(p)
                                                        }
                                                    }
                                                }
                                        })
                                        console.log('newp',newp)
                                        let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)
                                        showHideFiltre()
                                    }} />
                                    PoE
                                </label>
                                <label htmlFor="" className="filtreChoix">
                                    <input type="checkbox" className="me-2"  onClick={(e)=>
                                    {
                                        const fl = $(".filtreChoix").children()
                                        let filtres = []
                                        for(let j=0; j<(fl.length-1)/2 ;j++){
                                            if(fl[j].checked)
                                            {
                                                console.log("777777777777777777777777777777777")
                                                let obj = [];
                                                const val = fl[j].parentElement.innerHTML.split('>')[1]
                                                const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                                obj[0]=nom
                                                obj[1]=val
                                                filtres.push(obj)
                                            }
                                        }
                                        console.log('filtres',fl[(fl.length-1)/2].parentElement.parentElement.parentElement.children[0].innerHTML)
                                        if(filtres.length==0){
                                            let newp = []
                                            console.log('newp',newp)
                                            let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                            changeProduits(pr)

                                            return('not selected');
                                        }
                                        console.log('alimentation secteur' ,filtres[0])
                                        let newp = []
                                        produit_json.map(p =>{
                                                // const val = e.target.parentElement.innerHTML.split('>')[1]
                                                // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                                // console.log(nom)
                                                for(var f =0 ;f<filtres.length;f++)
                                                {
                                                    if(filtres[f][0]=="Prix"){
                                                        if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                            newp.push(p)
                                                        console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                    }
                                                    else if(filtres[f][0]=="Promotion"){
                                                        if(p.prix!=p.prixSansReduction)
                                                            newp.push(p)
                                                    }
                                                    else{
                                                        for(var c =0 ;c<p.caracteristiques.length;c++)
                                                        {
                                                            if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                                newp.push(p)
                                                        }
                                                    }
                                                }
                                        })
                                        console.log('newp',newp)
                                        let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)
                                        showHideFiltre()
                                    }} />
                                    Batterie
                                </label>
                                <label htmlFor="" className="filtreChoix">
                                    <input type="checkbox" className="me-2"  onClick={(e)=>
                                    {
                                        const fl = $(".filtreChoix").children()
                                        let filtres = []
                                        for(let j=0; j<(fl.length-1)/2 ;j++){
                                            if(fl[j].checked)
                                            {
                                                console.log("777777777777777777777777777777777")
                                                let obj = [];
                                                const val = fl[j].parentElement.innerHTML.split('>')[1]
                                                const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                                obj[0]=nom
                                                obj[1]=val
                                                filtres.push(obj)
                                            }
                                        }
                                        console.log('filtres',fl[(fl.length-1)/2].parentElement.parentElement.parentElement.children[0].innerHTML)
                                        if(filtres.length==0){
                                            let newp = []
                                            console.log('newp',newp)
                                            let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                            changeProduits(pr)

                                            return('not selected');
                                        }
                                        console.log('alimentation secteur' ,filtres[0])
                                        let newp = []
                                        produit_json.map(p =>{
                                                // const val = e.target.parentElement.innerHTML.split('>')[1]
                                                // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                                // console.log(nom)
                                                for(var f =0 ;f<filtres.length;f++)
                                                {
                                                    if(filtres[f][0]=="Prix"){
                                                        if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                            newp.push(p)
                                                        console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                    }
                                                    else if(filtres[f][0]=="Promotion"){
                                                        if(p.prix!=p.prixSansReduction)
                                                            newp.push(p)
                                                    }
                                                    else{
                                                        for(var c =0 ;c<p.caracteristiques.length;c++)
                                                        {
                                                            if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                                newp.push(p)
                                                        }
                                                    }
                                                }
                                        })
                                        console.log('newp',newp)
                                        let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)
                                        showHideFiltre()
                                    }} />
                                    USB
                                </label>
                            </div>
                        </div>
                        <div className="filtre">
                            <span className="filtreNom">
                                Vision nocturne
                            </span>
                            <div className="d-flex pl15">
                                <label htmlFor="" className="filtreChoix">
                                    <input type="checkbox" className="me-2"  onClick={(e)=>
                                    {
                                        const fl = $(".filtreChoix").children()
                                        let filtres = []
                                        for(let j=0; j<(fl.length-1)/2 ;j++){
                                            if(fl[j].checked)
                                            {
                                                console.log("777777777777777777777777777777777")
                                                let obj = [];
                                                const val = fl[j].parentElement.innerHTML.split('>')[1]
                                                const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                                obj[0]=nom
                                                obj[1]=val
                                                filtres.push(obj)
                                            }
                                        }
                                        console.log('filtres',fl[(fl.length-1)/2].parentElement.parentElement.parentElement.children[0].innerHTML)
                                        if(filtres.length==0){
                                            let newp = []
                                            console.log('newp',newp)
                                            let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                            changeProduits(pr)

                                            return('not selected');
                                        }
                                        console.log('alimentation secteur' ,filtres[0])
                                        let newp = []
                                        produit_json.map(p =>{
                                                // const val = e.target.parentElement.innerHTML.split('>')[1]
                                                // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                                // console.log(nom)
                                                for(var f =0 ;f<filtres.length;f++)
                                                {
                                                    if(filtres[f][0]=="Prix"){
                                                        if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                            newp.push(p)
                                                        console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                    }
                                                    else if(filtres[f][0]=="Promotion"){
                                                        if(p.prix!=p.prixSansReduction)
                                                            newp.push(p)
                                                    }
                                                    else{
                                                        for(var c =0 ;c<p.caracteristiques.length;c++)
                                                        {
                                                            if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                                newp.push(p)
                                                        }
                                                    }
                                                }
                                        })
                                        console.log('newp',newp)
                                        let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)
                                        showHideFiltre()
                                    }} />
                                    Oui
                                </label>
                                <label htmlFor="" className="filtreChoix">
                                    <input type="checkbox" className="me-2"  onClick={(e)=>
                                    {
                                        const fl = $(".filtreChoix").children()
                                        let filtres = []
                                        for(let j=0; j<(fl.length-1)/2 ;j++){
                                            if(fl[j].checked)
                                            {
                                                console.log("777777777777777777777777777777777")
                                                let obj = [];
                                                const val = fl[j].parentElement.innerHTML.split('>')[1]
                                                const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                                obj[0]=nom
                                                obj[1]=val
                                                filtres.push(obj)
                                            }
                                        }
                                        console.log('filtres',fl[(fl.length-1)/2].parentElement.parentElement.parentElement.children[0].innerHTML)
                                        if(filtres.length==0){
                                            let newp = []
                                            console.log('newp',newp)
                                            let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                            changeProduits(pr)

                                            return('not selected');
                                        }
                                        console.log('alimentation secteur' ,filtres[0])
                                        let newp = []
                                        produit_json.map(p =>{
                                                // const val = e.target.parentElement.innerHTML.split('>')[1]
                                                // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                                // console.log(nom)
                                                for(var f =0 ;f<filtres.length;f++)
                                                {
                                                    if(filtres[f][0]=="Prix"){
                                                        if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                            newp.push(p)
                                                        console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                    }
                                                    else if(filtres[f][0]=="Promotion"){
                                                        if(p.prix!=p.prixSansReduction)
                                                            newp.push(p)
                                                    }
                                                    else{
                                                        for(var c =0 ;c<p.caracteristiques.length;c++)
                                                        {
                                                            if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                                newp.push(p)
                                                        }
                                                    }
                                                }
                                        })
                                        console.log('newp',newp)
                                        let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)
                                        showHideFiltre()
                                    }} />
                                    Non
                                </label>
                            </div>
                        </div>
                        <div className="filtre">
                            <span className="filtreNom">
                                Exterieur
                            </span>
                            <div className="d-flex pl15">
                                <label htmlFor="" className="filtreChoix">
                                    <input type="checkbox" className="me-2"  onClick={(e)=>
                                    {
                                        const fl = $(".filtreChoix").children()
                                        let filtres = []
                                        for(let j=0; j<(fl.length-1)/2 ;j++){
                                            if(fl[j].checked)
                                            {
                                                console.log("777777777777777777777777777777777")
                                                let obj = [];
                                                const val = fl[j].parentElement.innerHTML.split('>')[1]
                                                const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                                obj[0]=nom
                                                obj[1]=val
                                                filtres.push(obj)
                                            }
                                        }
                                        console.log('filtres',fl[(fl.length-1)/2].parentElement.parentElement.parentElement.children[0].innerHTML)
                                        if(filtres.length==0){
                                            let newp = []
                                            console.log('newp',newp)
                                            let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                            changeProduits(pr)

                                            return('not selected');
                                        }
                                        console.log('alimentation secteur' ,filtres[0])
                                        let newp = []
                                        produit_json.map(p =>{
                                                // const val = e.target.parentElement.innerHTML.split('>')[1]
                                                // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                                // console.log(nom)
                                                for(var f =0 ;f<filtres.length;f++)
                                                {
                                                    if(filtres[f][0]=="Prix"){
                                                        if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                            newp.push(p)
                                                        console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                    }
                                                    else if(filtres[f][0]=="Promotion"){
                                                        if(p.prix!=p.prixSansReduction)
                                                            newp.push(p)
                                                    }
                                                    else{
                                                        for(var c =0 ;c<p.caracteristiques.length;c++)
                                                        {
                                                            if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                                newp.push(p)
                                                        }
                                                    }
                                                }
                                        })
                                        console.log('newp',newp)
                                        let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)
                                        showHideFiltre()
                                    }} />
                                    Oui
                                </label>
                                <label htmlFor="" className="filtreChoix">
                                    <input type="checkbox" className="me-2"  onClick={(e)=>
                                    {
                                        const fl = $(".filtreChoix").children()
                                        let filtres = []
                                        for(let j=0; j<(fl.length-1)/2 ;j++){
                                            if(fl[j].checked)
                                            {
                                                console.log("777777777777777777777777777777777")
                                                let obj = [];
                                                const val = fl[j].parentElement.innerHTML.split('>')[1]
                                                const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                                obj[0]=nom
                                                obj[1]=val
                                                filtres.push(obj)
                                            }
                                        }
                                        console.log('filtres',fl[(fl.length-1)/2].parentElement.parentElement.parentElement.children[0].innerHTML)
                                        if(filtres.length==0){
                                            let newp = []
                                            console.log('newp',newp)
                                            let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                            changeProduits(pr)

                                            return('not selected');
                                        }
                                        console.log('alimentation secteur' ,filtres[0])
                                        let newp = []
                                        produit_json.map(p =>{
                                                // const val = e.target.parentElement.innerHTML.split('>')[1]
                                                // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                                // console.log(nom)
                                                for(var f =0 ;f<filtres.length;f++)
                                                {
                                                    if(filtres[f][0]=="Prix"){
                                                        if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                            newp.push(p)
                                                        console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                    }
                                                    else if(filtres[f][0]=="Promotion"){
                                                        if(p.prix!=p.prixSansReduction)
                                                            newp.push(p)
                                                    }
                                                    else{
                                                        for(var c =0 ;c<p.caracteristiques.length;c++)
                                                        {
                                                            if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                                newp.push(p)
                                                        }
                                                    }
                                                }
                                        })
                                        console.log('newp',newp)
                                        let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)
                                        showHideFiltre()
                                    }} />
                                    Non
                                </label>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="filtreQuitter" onClick={() => showHideFiltre()}>
                    </div>
                </div>

            <div className="categorieImageBann blur" style={{
                backgroundImage: `url(${categorie.imageBanniere})`
            }}>
                <div className="categorieBannText">
                    <h1 className="categorieBannTitre text-danger titre-bungee">
                        {categorie.nom}
                    </h1>
                </div>
            </div>
            <div className="mainProduits ">
                
                <div className="filtreProduits d-none d-md-flex overflow-auto" style={{height:'calc(100vh - 200px)'}} >
                    <span className="filtreTitre">Filtres</span>
                    <div className="filtre">
                        <a class="filtreNom text-dark d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                            <span>Catégories</span>
                            <span>
                                <svg style={{height:'20px',width:'20px'}} id="Layer_1" x="0px" y="0px" viewBox="0 0 386.257 386.257" >
                                    <polygon points="0,96.879 193.129,289.379 386.257,96.879 "/>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                </svg>    
                            </span> 
                        </a>
                        <ul className="collapse categoriesList" id="collapseExample">
                            {
                                categories.map(m => (
                                <li className="menuLink">
                                    <Link to={`/categorie/${m.id}`} className="navLink">
                                    {m.nom}
                                    </Link>
                                </li>))
                                
                            }
                        </ul>
                    </div>
                    <div className="filtre">
                        <span className="filtreNom">
                            Connectivité
                        </span>
                        <div className="d-flex pl15">
                            <label htmlFor="" className="filtreChoix">
                                <input type="checkbox" name='WiFi' className="me-2" onClick={(e)=>
                                {
                                    const fl = $(".filtreChoix").children()
                                    let filtres = []
                                    for(let j=19; j<fl.length-1 ;j++){
                                        if(fl[j].checked)
                                        {
                                            console.log("777777777777777777777777777777777")
                                            let obj = [];
                                            const val = fl[j].parentElement.innerHTML.split('>')[1]
                                            const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                            obj[0]=nom
                                            obj[1]=val
                                            filtres.push(obj)
                                        }
                                    }
                                    console.log('filtres',filtres)
                                    if(filtres.length==0){
                                        let newp = []
                                        console.log('newp',newp)
                                        let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)

                                        return('not selected');
                                    }
                                    console.log('alimentation secteur' ,filtres[0])
                                    let newp = []
                                    produit_json.map(p =>{
                                            // const val = e.target.parentElement.innerHTML.split('>')[1]
                                            // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                            // console.log(nom)
                                            for(var f =0 ;f<filtres.length;f++)
                                            {
                                                if(filtres[f][0]=="Prix"){
                                                    if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                        newp.push(p)
                                                    console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                }
                                                else if(filtres[f][0]=="Promotion"){
                                                    if(p.prix!=p.prixSansReduction)
                                                        newp.push(p)
                                                }
                                                else{
                                                    for(var c =0 ;c<p.caracteristiques.length;c++)
                                                    {
                                                        if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                            newp.push(p)
                                                    }
                                                }
                                            }
                                    })
                                    console.log('newp',newp)
                                    let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                    changeProduits(pr)
                                }} />
                                WiFi
                            </label>
                            <label htmlFor="" className="filtreChoix">
                                <input type="checkbox" className="me-2" onClick={(e)=>
                                {
                                    const fl = $(".filtreChoix").children()
                                    let filtres = []
                                    for(let j=19; j<fl.length-1 ;j++){
                                        if(fl[j].checked)
                                        {
                                            console.log("777777777777777777777777777777777")
                                            let obj = [];
                                            const val = fl[j].parentElement.innerHTML.split('>')[1]
                                            const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                            obj[0]=nom
                                            obj[1]=val
                                            filtres.push(obj)
                                        }
                                    }
                                    console.log('filtres',filtres)
                                    if(filtres.length==0){
                                        let newp = []
                                        console.log('newp',newp)
                                        let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)

                                        return('not selected');
                                    }
                                    console.log('alimentation secteur' ,filtres[0])
                                    let newp = []
                                    produit_json.map(p =>{
                                            // const val = e.target.parentElement.innerHTML.split('>')[1]
                                            // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                            // console.log(nom)
                                            for(var f =0 ;f<filtres.length;f++)
                                            {
                                                if(filtres[f][0]=="Prix"){
                                                    if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                        newp.push(p)
                                                    console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                }
                                                else if(filtres[f][0]=="Promotion"){
                                                    if(p.prix!=p.prixSansReduction)
                                                        newp.push(p)
                                                }
                                                else{
                                                    for(var c =0 ;c<p.caracteristiques.length;c++)
                                                    {
                                                        if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                            newp.push(p)
                                                    }
                                                }
                                            }
                                    })
                                    console.log('newp',newp)
                                    let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                    changeProduits(pr)
                                }} />
                                GSM
                            </label>
                        </div>
                    </div>
                    <div className="filtre">
                        <span className="filtreNom">
                            Promotion
                        </span>
                        <div className="d-flex pl15">
                            <label htmlFor="" className="filtreChoix" >
                                <input type="checkbox" className="me-2"  onClick={(e)=>
                                {
                                    const fl = $(".filtreChoix").children()
                                    let filtres = []
                                    for(let j=19; j<fl.length-1 ;j++){
                                        if(fl[j].checked)
                                        {
                                            console.log("777777777777777777777777777777777")
                                            let obj = [];
                                            const val = fl[j].parentElement.innerHTML.split('>')[1]
                                            const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                            obj[0]=nom
                                            obj[1]=val
                                            filtres.push(obj)
                                        }
                                    }
                                    console.log('filtres',filtres)
                                    if(filtres.length==0){
                                        let newp = []
                                        console.log('newp',newp)
                                        let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)

                                        return('not selected');
                                    }
                                    console.log('alimentation secteur' ,filtres[0])
                                    let newp = []
                                    produit_json.map(p =>{
                                            // const val = e.target.parentElement.innerHTML.split('>')[1]
                                            // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                            // console.log(nom)
                                            for(var f =0 ;f<filtres.length;f++)
                                            {
                                                if(filtres[f][0]=="Prix"){
                                                    if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                        newp.push(p)
                                                    console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                }
                                                else if(filtres[f][0]=="Promotion" && filtres[f][1]=="Oui"){
                                                    if(p.prix!=p.prixSansReduction)
                                                        newp.push(p)
                                                }
                                                else{
                                                    for(var c =0 ;c<p.caracteristiques.length;c++)
                                                    {
                                                        if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                            newp.push(p)
                                                    }
                                                }
                                            }
                                    })
                                    console.log('newp',newp)
                                    let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                    changeProduits(pr)
                                }} />
                                Oui
                            </label>
                        </div>
                    </div>
                    <div className="filtre">
                        <span className="filtreNom">
                            Prix
                        </span>
                        <div className="d-flex flex-wrap pl15 w-100">
                            <label htmlFor="" className="filtreChoix">
                                <input type="checkbox" className="me-2" onClick={(e)=>
                                {
                                    const fl = $(".filtreChoix").children()
                                    let filtres = []
                                    for(let j=19; j<fl.length-1 ;j++){
                                        if(fl[j].checked)
                                        {
                                            console.log("777777777777777777777777777777777")
                                            let obj = [];
                                            const val = fl[j].parentElement.innerHTML.split('>')[1]
                                            const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                            obj[0]=nom
                                            obj[1]=val
                                            filtres.push(obj)
                                        }
                                    }
                                    console.log('filtres',filtres)
                                    if(filtres.length==0){
                                        let newp = []
                                        console.log('newp',newp)
                                        let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)

                                        return('not selected');
                                    }
                                    console.log('alimentation secteur' ,filtres[0])
                                    let newp = []
                                    produit_json.map(p =>{
                                            // const val = e.target.parentElement.innerHTML.split('>')[1]
                                            // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                            // console.log(nom)
                                            for(var f =0 ;f<filtres.length;f++)
                                            {
                                                if(filtres[f][0]=="Prix"){
                                                    if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                        newp.push(p)
                                                    console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                }
                                                else if(filtres[f][0]=="Promotion"){
                                                    if(p.prix!=p.prixSansReduction)
                                                        newp.push(p)
                                                }
                                                else{
                                                    for(var c =0 ;c<p.caracteristiques.length;c++)
                                                    {
                                                        if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                            newp.push(p)
                                                    }
                                                }
                                            }
                                    })
                                    console.log('newp',newp)
                                    let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                    changeProduits(pr)
                                }}   />
                                0 - 50 €
                            </label>
                            <label htmlFor="" className="filtreChoix">
                                <input type="checkbox" className="me-2"  onClick={(e)=>
                                {
                                    const fl = $(".filtreChoix").children()
                                    let filtres = []
                                    for(let j=19; j<fl.length-1 ;j++){
                                        if(fl[j].checked)
                                        {
                                            console.log("777777777777777777777777777777777")
                                            let obj = [];
                                            const val = fl[j].parentElement.innerHTML.split('>')[1]
                                            const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                            obj[0]=nom
                                            obj[1]=val
                                            filtres.push(obj)
                                        }
                                    }
                                    console.log('filtres',filtres)
                                    if(filtres.length==0){
                                        let newp = []
                                        console.log('newp',newp)
                                        let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)

                                        return('not selected');
                                    }
                                    console.log('alimentation secteur' ,filtres[0])
                                    let newp = []
                                    produit_json.map(p =>{
                                            // const val = e.target.parentElement.innerHTML.split('>')[1]
                                            // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                            // console.log(nom)
                                            for(var f =0 ;f<filtres.length;f++)
                                            {
                                                if(filtres[f][0]=="Prix"){
                                                    if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                        newp.push(p)
                                                    console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                }
                                                else if(filtres[f][0]=="Promotion"){
                                                    if(p.prix!=p.prixSansReduction)
                                                        newp.push(p)
                                                }
                                                else{
                                                    for(var c =0 ;c<p.caracteristiques.length;c++)
                                                    {
                                                        if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                            newp.push(p)
                                                    }
                                                }
                                            }
                                    })
                                    console.log('newp',newp)
                                    let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                    changeProduits(pr)
                                }} />
                                51 - 100 €
                            </label>
                            <label htmlFor="" className="filtreChoix">
                                <input type="checkbox" className="me-2"  onClick={(e)=>
                                {
                                    const fl = $(".filtreChoix").children()
                                    let filtres = []
                                    for(let j=19; j<fl.length-1 ;j++){
                                        if(fl[j].checked)
                                        {
                                            console.log("777777777777777777777777777777777")
                                            let obj = [];
                                            const val = fl[j].parentElement.innerHTML.split('>')[1]
                                            const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                            obj[0]=nom
                                            obj[1]=val
                                            filtres.push(obj)
                                        }
                                    }
                                    console.log('filtres',filtres)
                                    if(filtres.length==0){
                                        let newp = []
                                        console.log('newp',newp)
                                        let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)

                                        return('not selected');
                                    }
                                    console.log('alimentation secteur' ,filtres[0])
                                    let newp = []
                                    produit_json.map(p =>{
                                            // const val = e.target.parentElement.innerHTML.split('>')[1]
                                            // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                            // console.log(nom)
                                            for(var f =0 ;f<filtres.length;f++)
                                            {
                                                if(filtres[f][0]=="Prix"){
                                                    if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                        newp.push(p)
                                                    console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                }
                                                else if(filtres[f][0]=="Promotion"){
                                                    if(p.prix!=p.prixSansReduction)
                                                        newp.push(p)
                                                }
                                                else{
                                                    for(var c =0 ;c<p.caracteristiques.length;c++)
                                                    {
                                                        if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                            newp.push(p)
                                                    }
                                                }
                                            }
                                    })
                                    console.log('newp',newp)
                                    let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                    changeProduits(pr)
                                }} />
                                101 - 150 €
                            </label>
                            <label htmlFor="" className="filtreChoix">
                                <input type="checkbox" className="me-2"  onClick={(e)=>
                                {
                                    const fl = $(".filtreChoix").children()
                                    let filtres = []
                                    for(let j=19; j<fl.length-1 ;j++){
                                        if(fl[j].checked)
                                        {
                                            console.log("777777777777777777777777777777777")
                                            let obj = [];
                                            const val = fl[j].parentElement.innerHTML.split('>')[1]
                                            const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                            obj[0]=nom
                                            obj[1]=val
                                            filtres.push(obj)
                                        }
                                    }
                                    console.log('filtres',filtres)
                                    if(filtres.length==0){
                                        let newp = []
                                        console.log('newp',newp)
                                        let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)

                                        return('not selected');
                                    }
                                    console.log('alimentation secteur' ,filtres[0])
                                    let newp = []
                                    produit_json.map(p =>{
                                            // const val = e.target.parentElement.innerHTML.split('>')[1]
                                            // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                            // console.log(nom)
                                            for(var f =0 ;f<filtres.length;f++)
                                            {
                                                if(filtres[f][0]=="Prix"){
                                                    if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                        newp.push(p)
                                                    console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                }
                                                else if(filtres[f][0]=="Promotion"){
                                                    if(p.prix!=p.prixSansReduction)
                                                        newp.push(p)
                                                }
                                                else{
                                                    for(var c =0 ;c<p.caracteristiques.length;c++)
                                                    {
                                                        if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                            newp.push(p)
                                                    }
                                                }
                                            }
                                    })
                                    console.log('newp',newp)
                                    let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                    changeProduits(pr)
                                }} />
                                151 - 200 €
                            </label>
                        </div>

                    </div>
                    <div className="filtre">
                        <span className="filtreNom">
                            Résolution
                        </span>
                        <div className="d-flex flex-wrap pl15">
                            <label htmlFor="" className="filtreChoix">
                                <input type="checkbox" className="me-2"  onClick={(e)=>
                                {
                                    const fl = $(".filtreChoix").children()
                                    let filtres = []
                                    for(let j=19; j<fl.length-1 ;j++){
                                        if(fl[j].checked)
                                        {
                                            console.log("777777777777777777777777777777777")
                                            let obj = [];
                                            const val = fl[j].parentElement.innerHTML.split('>')[1]
                                            const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                            obj[0]=nom
                                            obj[1]=val
                                            filtres.push(obj)
                                        }
                                    }
                                    console.log('filtres',filtres)
                                    if(filtres.length==0){
                                        let newp = []
                                        console.log('newp',newp)
                                        let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)

                                        return('not selected');
                                    }
                                    console.log('alimentation secteur' ,filtres[0])
                                    let newp = []
                                    produit_json.map(p =>{
                                            // const val = e.target.parentElement.innerHTML.split('>')[1]
                                            // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                            // console.log(nom)
                                            for(var f =0 ;f<filtres.length;f++)
                                            {
                                                if(filtres[f][0]=="Prix"){
                                                    if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                        newp.push(p)
                                                    console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                }
                                                else if(filtres[f][0]=="Promotion"){
                                                    if(p.prix!=p.prixSansReduction)
                                                        newp.push(p)
                                                }
                                                else{
                                                    for(var c =0 ;c<p.caracteristiques.length;c++)
                                                    {
                                                        if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                            newp.push(p)
                                                    }
                                                }
                                            }
                                    })
                                    console.log('newp',newp)
                                    let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                    changeProduits(pr)
                                }}  />
                                HD
                            </label>
                            <label htmlFor="" className="filtreChoix">
                                <input type="checkbox" className="me-2"  onClick={(e)=>
                                {
                                    const fl = $(".filtreChoix").children()
                                    let filtres = []
                                    for(let j=19; j<fl.length-1 ;j++){
                                        if(fl[j].checked)
                                        {
                                            console.log("777777777777777777777777777777777")
                                            let obj = [];
                                            const val = fl[j].parentElement.innerHTML.split('>')[1]
                                            const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                            obj[0]=nom
                                            obj[1]=val
                                            filtres.push(obj)
                                        }
                                    }
                                    console.log('filtres',filtres)
                                    if(filtres.length==0){
                                        let newp = []
                                        console.log('newp',newp)
                                        let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)

                                        return('not selected');
                                    }
                                    console.log('alimentation secteur' ,filtres[0])
                                    let newp = []
                                    produit_json.map(p =>{
                                            // const val = e.target.parentElement.innerHTML.split('>')[1]
                                            // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                            // console.log(nom)
                                            for(var f =0 ;f<filtres.length;f++)
                                            {
                                                if(filtres[f][0]=="Prix"){
                                                    if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                        newp.push(p)
                                                    console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                }
                                                else if(filtres[f][0]=="Promotion"){
                                                    if(p.prix!=p.prixSansReduction)
                                                        newp.push(p)
                                                }
                                                else{
                                                    for(var c =0 ;c<p.caracteristiques.length;c++)
                                                    {
                                                        if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                            newp.push(p)
                                                    }
                                                }
                                            }
                                    })
                                    console.log('newp',newp)
                                    let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                    changeProduits(pr)
                                }}  />
                                Full HD
                            </label>
                            <label htmlFor="" className="filtreChoix">
                                <input type="checkbox" className="me-2"  onClick={(e)=>
                                {
                                    const fl = $(".filtreChoix").children()
                                    let filtres = []
                                    for(let j=19; j<fl.length-1 ;j++){
                                        if(fl[j].checked)
                                        {
                                            console.log("777777777777777777777777777777777")
                                            let obj = [];
                                            const val = fl[j].parentElement.innerHTML.split('>')[1]
                                            const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                            obj[0]=nom
                                            obj[1]=val
                                            filtres.push(obj)
                                        }
                                    }
                                    console.log('filtres',filtres)
                                    if(filtres.length==0){
                                        let newp = []
                                        console.log('newp',newp)
                                        let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)

                                        return('not selected');
                                    }
                                    console.log('alimentation secteur' ,filtres[0])
                                    let newp = []
                                    produit_json.map(p =>{
                                            // const val = e.target.parentElement.innerHTML.split('>')[1]
                                            // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                            // console.log(nom)
                                            for(var f =0 ;f<filtres.length;f++)
                                            {
                                                if(filtres[f][0]=="Prix"){
                                                    if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                        newp.push(p)
                                                    console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                }
                                                else if(filtres[f][0]=="Promotion"){
                                                    if(p.prix!=p.prixSansReduction)
                                                        newp.push(p)
                                                }
                                                else{
                                                    for(var c =0 ;c<p.caracteristiques.length;c++)
                                                    {
                                                        if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                            newp.push(p)
                                                    }
                                                }
                                            }
                                    })
                                    console.log('newp',newp)
                                    let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                    changeProduits(pr)
                                }}  />
                                4K
                            </label>
                        </div>

                    </div>
                    <div className="filtre">
                        <span className="filtreNom">
                            Alimentation
                        </span>
                        <div className="d-flex flex-wrap pl15">
                            <label htmlFor="" className="filtreChoix">
                                <input type="checkbox" className="me-2"   onClick={(e)=>
                                {
                                    const fl = $(".filtreChoix").children()
                                    let filtres = []
                                    for(let j=19; j<fl.length-1 ;j++){
                                        if(fl[j].checked)
                                        {
                                            console.log("777777777777777777777777777777777")
                                            let obj = [];
                                            const val = fl[j].parentElement.innerHTML.split('>')[1]
                                            const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                            obj[0]=nom
                                            obj[1]=val
                                            filtres.push(obj)
                                        }
                                    }
                                    console.log('filtres',filtres)
                                    if(filtres.length==0){
                                        let newp = []
                                        console.log('newp',newp)
                                        let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)

                                        return('not selected');
                                    }
                                    console.log('alimentation secteur' ,filtres[0])
                                    let newp = []
                                    produit_json.map(p =>{
                                            // const val = e.target.parentElement.innerHTML.split('>')[1]
                                            // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                            // console.log(nom)
                                            for(var f =0 ;f<filtres.length;f++)
                                            {
                                                if(filtres[f][0]=="Prix"){
                                                    if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                        newp.push(p)
                                                    console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                }
                                                else if(filtres[f][0]=="Promotion"){
                                                    if(p.prix!=p.prixSansReduction)
                                                        newp.push(p)
                                                }
                                                else{
                                                    for(var c =0 ;c<p.caracteristiques.length;c++)
                                                    {
                                                        if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                            newp.push(p)
                                                    }
                                                }
                                            }
                                    })
                                    console.log('newp',newp)
                                    let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                    changeProduits(pr)
                                }}  />
                                Secteur
                            </label>
                            <label htmlFor="" className="filtreChoix">
                                <input type="checkbox" className="me-2"  onClick={(e)=>
                                {
                                    const fl = $(".filtreChoix").children()
                                    let filtres = []
                                    for(let j=19; j<fl.length-1 ;j++){
                                        if(fl[j].checked)
                                        {
                                            console.log("777777777777777777777777777777777")
                                            let obj = [];
                                            const val = fl[j].parentElement.innerHTML.split('>')[1]
                                            const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                            obj[0]=nom
                                            obj[1]=val
                                            filtres.push(obj)
                                        }
                                    }
                                    console.log('filtres',filtres)
                                    if(filtres.length==0){
                                        let newp = []
                                        console.log('newp',newp)
                                        let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)

                                        return('not selected');
                                    }
                                    console.log('alimentation secteur' ,filtres[0])
                                    let newp = []
                                    produit_json.map(p =>{
                                            // const val = e.target.parentElement.innerHTML.split('>')[1]
                                            // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                            // console.log(nom)
                                            for(var f =0 ;f<filtres.length;f++)
                                            {
                                                if(filtres[f][0]=="Prix"){
                                                    if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                        newp.push(p)
                                                    console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                }
                                                else if(filtres[f][0]=="Promotion"){
                                                    if(p.prix!=p.prixSansReduction)
                                                        newp.push(p)
                                                }
                                                else{
                                                    for(var c =0 ;c<p.caracteristiques.length;c++)
                                                    {
                                                        if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                            newp.push(p)
                                                    }
                                                }
                                            }
                                    })
                                    console.log('newp',newp)
                                    let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                    changeProduits(pr)
                                }} />
                                PoE
                            </label>
                            <label htmlFor="" className="filtreChoix">
                                <input type="checkbox" className="me-2"  onClick={(e)=>
                                {
                                    const fl = $(".filtreChoix").children()
                                    let filtres = []
                                    for(let j=19; j<fl.length-1 ;j++){
                                        if(fl[j].checked)
                                        {
                                            console.log("777777777777777777777777777777777")
                                            let obj = [];
                                            const val = fl[j].parentElement.innerHTML.split('>')[1]
                                            const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                            obj[0]=nom
                                            obj[1]=val
                                            filtres.push(obj)
                                        }
                                    }
                                    console.log('filtres',filtres)
                                    if(filtres.length==0){
                                        let newp = []
                                        console.log('newp',newp)
                                        let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)

                                        return('not selected');
                                    }
                                    console.log('alimentation secteur' ,filtres[0])
                                    let newp = []
                                    produit_json.map(p =>{
                                            // const val = e.target.parentElement.innerHTML.split('>')[1]
                                            // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                            // console.log(nom)
                                            for(var f =0 ;f<filtres.length;f++)
                                            {
                                                if(filtres[f][0]=="Prix"){
                                                    if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                        newp.push(p)
                                                    console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                }
                                                else if(filtres[f][0]=="Promotion"){
                                                    if(p.prix!=p.prixSansReduction)
                                                        newp.push(p)
                                                }
                                                else{
                                                    for(var c =0 ;c<p.caracteristiques.length;c++)
                                                    {
                                                        if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                            newp.push(p)
                                                    }
                                                }
                                            }
                                    })
                                    console.log('newp',newp)
                                    let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                    changeProduits(pr)
                                }} />
                                Batterie
                            </label>
                            <label htmlFor="" className="filtreChoix">
                                <input type="checkbox" className="me-2"  onClick={(e)=>
                                {
                                    const fl = $(".filtreChoix").children()
                                    let filtres = []
                                    for(let j=19; j<fl.length-1 ;j++){
                                        if(fl[j].checked)
                                        {
                                            console.log("777777777777777777777777777777777")
                                            let obj = [];
                                            const val = fl[j].parentElement.innerHTML.split('>')[1]
                                            const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                            obj[0]=nom
                                            obj[1]=val
                                            filtres.push(obj)
                                        }
                                    }
                                    console.log('filtres',filtres)
                                    if(filtres.length==0){
                                        let newp = []
                                        console.log('newp',newp)
                                        let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)

                                        return('not selected');
                                    }
                                    console.log('alimentation secteur' ,filtres[0])
                                    let newp = []
                                    produit_json.map(p =>{
                                            // const val = e.target.parentElement.innerHTML.split('>')[1]
                                            // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                            // console.log(nom)
                                            for(var f =0 ;f<filtres.length;f++)
                                            {
                                                if(filtres[f][0]=="Prix"){
                                                    if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                        newp.push(p)
                                                    console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                }
                                                else if(filtres[f][0]=="Promotion"){
                                                    if(p.prix!=p.prixSansReduction)
                                                        newp.push(p)
                                                }
                                                else{
                                                    for(var c =0 ;c<p.caracteristiques.length;c++)
                                                    {
                                                        if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                            newp.push(p)
                                                    }
                                                }
                                            }
                                    })
                                    console.log('newp',newp)
                                    let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                    changeProduits(pr)
                                }} />
                                USB
                            </label>
                        </div>
                    </div>
                    <div className="filtre">
                        <span className="filtreNom">
                            Vision nocturne
                        </span>
                        <div className="d-flex flex-wrap pl15">
                            <label htmlFor="" className="filtreChoix">
                                <input type="checkbox" className="me-2"  onClick={(e)=>
                                {
                                    const fl = $(".filtreChoix").children()
                                    let filtres = []
                                    for(let j=19; j<fl.length-1 ;j++){
                                        if(fl[j].checked)
                                        {
                                            console.log("777777777777777777777777777777777")
                                            let obj = [];
                                            const val = fl[j].parentElement.innerHTML.split('>')[1]
                                            const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                            obj[0]=nom
                                            obj[1]=val
                                            filtres.push(obj)
                                        }
                                    }
                                    console.log('filtres',filtres)
                                    if(filtres.length==0){
                                        let newp = []
                                        console.log('newp',newp)
                                        let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)

                                        return('not selected');
                                    }
                                    console.log('alimentation secteur' ,filtres[0])
                                    let newp = []
                                    produit_json.map(p =>{
                                            // const val = e.target.parentElement.innerHTML.split('>')[1]
                                            // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                            // console.log(nom)
                                            for(var f =0 ;f<filtres.length;f++)
                                            {
                                                if(filtres[f][0]=="Prix"){
                                                    if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                        newp.push(p)
                                                    console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                }
                                                else if(filtres[f][0]=="Promotion"){
                                                    if(p.prix!=p.prixSansReduction)
                                                        newp.push(p)
                                                }
                                                else{
                                                    for(var c =0 ;c<p.caracteristiques.length;c++)
                                                    {
                                                        if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                            newp.push(p)
                                                    }
                                                }
                                            }
                                    })
                                    console.log('newp',newp)
                                    let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                    changeProduits(pr)
                                }} />
                                Oui
                            </label>
                            <label htmlFor="" className="filtreChoix">
                                <input type="checkbox" className="me-2"  onClick={(e)=>
                                {
                                    const fl = $(".filtreChoix").children()
                                    let filtres = []
                                    for(let j=19; j<fl.length-1 ;j++){
                                        if(fl[j].checked)
                                        {
                                            console.log("777777777777777777777777777777777")
                                            let obj = [];
                                            const val = fl[j].parentElement.innerHTML.split('>')[1]
                                            const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                            obj[0]=nom
                                            obj[1]=val
                                            filtres.push(obj)
                                        }
                                    }
                                    console.log('filtres',filtres)
                                    if(filtres.length==0){
                                        let newp = []
                                        console.log('newp',newp)
                                        let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)

                                        return('not selected');
                                    }
                                    console.log('alimentation secteur' ,filtres[0])
                                    let newp = []
                                    produit_json.map(p =>{
                                            // const val = e.target.parentElement.innerHTML.split('>')[1]
                                            // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                            // console.log(nom)
                                            for(var f =0 ;f<filtres.length;f++)
                                            {
                                                if(filtres[f][0]=="Prix"){
                                                    if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                        newp.push(p)
                                                    console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                }
                                                else if(filtres[f][0]=="Promotion"){
                                                    if(p.prix!=p.prixSansReduction)
                                                        newp.push(p)
                                                }
                                                else{
                                                    for(var c =0 ;c<p.caracteristiques.length;c++)
                                                    {
                                                        if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                            newp.push(p)
                                                    }
                                                }
                                            }
                                    })
                                    console.log('newp',newp)
                                    let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                    changeProduits(pr)
                                }} />
                                Non
                            </label>
                        </div>
                    </div>
                    <div className="filtre">
                        <span className="filtreNom">
                            Exterieur
                        </span>
                        <div className="d-flex pl15">
                            <label htmlFor="" className="filtreChoix">
                                <input type="checkbox" className="me-2"  onClick={(e)=>
                                {
                                    const fl = $(".filtreChoix").children()
                                    let filtres = []
                                    for(let j=19; j<fl.length-1 ;j++){
                                        if(fl[j].checked)
                                        {
                                            console.log("777777777777777777777777777777777")
                                            let obj = [];
                                            const val = fl[j].parentElement.innerHTML.split('>')[1]
                                            const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                            obj[0]=nom
                                            obj[1]=val
                                            filtres.push(obj)
                                        }
                                    }
                                    console.log('filtres',filtres)
                                    if(filtres.length==0){
                                        let newp = []
                                        console.log('newp',newp)
                                        let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)

                                        return('not selected');
                                    }
                                    console.log('alimentation secteur' ,filtres[0])
                                    let newp = []
                                    produit_json.map(p =>{
                                            // const val = e.target.parentElement.innerHTML.split('>')[1]
                                            // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                            // console.log(nom)
                                            for(var f =0 ;f<filtres.length;f++)
                                            {
                                                if(filtres[f][0]=="Prix"){
                                                    if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                        newp.push(p)
                                                    console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                }
                                                else if(filtres[f][0]=="Promotion"){
                                                    if(p.prix!=p.prixSansReduction)
                                                        newp.push(p)
                                                }
                                                else{
                                                    for(var c =0 ;c<p.caracteristiques.length;c++)
                                                    {
                                                        if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                            newp.push(p)
                                                    }
                                                }
                                            }
                                    })
                                    console.log('newp',newp)
                                    let pr = newp.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                    changeProduits(pr)
                                }} />
                                Oui
                            </label>
                            <label htmlFor="" className="filtreChoix">
                                <input type="checkbox" className="me-2"  onClick={(e)=>
                                {
                                    const fl = $(".filtreChoix").children()
                                    let filtres = []
                                    for(let j=19; j<fl.length-1 ;j++){
                                        if(fl[j].checked)
                                        {
                                            console.log("777777777777777777777777777777777")
                                            let obj = [];
                                            const val = fl[j].parentElement.innerHTML.split('>')[1]
                                            const nom = fl[j].parentElement.parentElement.parentElement.children[0].innerHTML
                                            obj[0]=nom
                                            obj[1]=val
                                            filtres.push(obj)
                                        }
                                    }
                                    console.log('filtres',filtres)
                                    if(filtres.length==0){
                                        let newp = []
                                        console.log('newp',newp)
                                        let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                        changeProduits(pr)

                                        return('not selected');
                                    }
                                    console.log('alimentation secteur' ,filtres[0])
                                    let newp = []
                                    produit_json.map(p =>{
                                            // const val = e.target.parentElement.innerHTML.split('>')[1]
                                            // const nom = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
                                            // console.log(nom)
                                            for(var f =0 ;f<filtres.length;f++)
                                            {
                                                if(filtres[f][0]=="Prix"){
                                                    if(p.prix<=parseFloat(filtres[f][1].split(' ')[2]) && p.prix>=parseFloat(filtres[f][1].split(' ')[0]))
                                                        newp.push(p)
                                                    console.log('paaaaaaaaaaaaaaaarse',parseFloat(filtres[f][1].split(' ')[0]),p.prix,parseFloat(filtres[f][1].split(' ')[2]))
                                                }
                                                else if(filtres[f][0]=="Promotion"){
                                                    if(p.prix!=p.prixSansReduction)
                                                        newp.push(p)
                                                }
                                                else{
                                                    for(var c =0 ;c<p.caracteristiques.length;c++)
                                                    {
                                                        if(p.caracteristiques[c].nom==filtres[f][0] && p.caracteristiques[c].valeur==filtres[f][1])
                                                            newp.push(p)
                                                    }
                                                }
                                            }
                                    })
                                    console.log('newp',newp)
                                    let pr = newp.map(p => <Produit className='produitAnim'  showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                    changeProduits(pr)
                                }} />
                                Non
                            </label>
                        </div>
                    </div>
                </div>
                <div className="containerProduits">
                    <div className="triContainer ">
                        <button className="filtreBtn d-md-none" onClick={() => showHideFiltre()} >Filtre</button>
                        <div className='d-flex flex-column flex-md-row'>
                            <div className="select" tabindex="1">
                                <input className="selectopt" name="test" type="radio" id="opt1" checked/>
                                <label for="opt1" class="option">Trier par</label>
                                <input className="selectopt" name="test" type="radio" id="opt2"/>
                                <label for="opt2" class="option"  
                                onClick={()=>{
                                    let p = produit_json
                                    p.sort(function (a, b) {
                                        if(a.vente<b.vente)
                                            return 1
                                        if(a.vente>b.vente)
                                            return -1
                                        return 0
                                    })
                                    console.log(p)
                                    setProduits(p)
                                    let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                    changeProduits(pr)
                                    gsap.fromTo(".produitAnim", {opacity: 0, scale:0, duration: 0.5},{opacity:1,scale:1});

                                    setTri("Actuellement trié par nombre de vente")
                                }}>Meilleures ventes</label>
                                <input className="selectopt" name="test" type="radio" id="opt3"/>
                                <label for="opt3" class="option" 
                                onClick={()=>{
                                    let p = produit_json
                                    p.sort(function (a, b) {
                                        if(a.date_ajout<b.date_ajout)
                                            return 1
                                        if(a.date_ajout>b.date_ajout)
                                            return -1
                                        return 0
                                    })
                                    console.log(p)
                                    setProduits(p)
                                    let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                    changeProduits(pr)
                                    gsap.fromTo(".produitAnim", {opacity: 0, scale:0, duration: 0.5},{opacity:1,scale:1});

                                    setTri("Actuellement trié par date d'ajout")
                                }}>Nouveautés</label>
                                <input className="selectopt" name="test" type="radio" id="opt4"/>
                                <label for="opt4" class="option" 
                                onClick={()=>{
                                    let p = produit_json
                                    p.sort(function (a, b) {
                                        if(a.prix>b.prix)
                                            return 1
                                        if(a.prix<b.prix)
                                            return -1
                                        return 0
                                    })
                                    console.log(p)
                                    setProduits(p)
                                    let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                    changeProduits(pr)
                                    gsap.fromTo(".produitAnim", {opacity: 0, scale:0, duration: 0.5},{opacity:1,scale:1});

                                    setTri("Actuellement trié par prix croissant")
                                }}>Prix croissants</label>
                                <input className="selectopt" name="test" type="radio" id="opt5"/>
                                <label for="opt5" class="option"
                                onClick={()=>{
                                    let p = produit_json
                                    p.sort(function (a, b) {
                                        if(a.prix>b.prix)
                                            return -1
                                        if(a.prix<b.prix)
                                            return 1
                                        return 0
                                    })
                                    console.log(p)
                                    setProduits(p)
                                    let pr = produit_json.map(p => <Produit className='produitAnim' showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}  user={props.user} setUser={props.setUser} id={p.id} nom={p.nom} sousNom={p.sousNom} prix={p.prix} prixSansReduc={p.prixSansReduction} image={p.image1} />)
                                    changeProduits(pr)
                                    gsap.fromTo(".produitAnim", {opacity: 0, scale:0, duration: 0.5},{opacity:1,scale:1});

                                    setTri("Actuellement trié par prix décroissant")
                                }}>Prix décroissants</label>
                            </div>
                            <span className='ms-2 fst-italic text-secondary'>{tri}</span>
                        </div>
                    </div>
                    <div className="produits">
                        {
                        produits.length>0
                        ?
                        produits.map(p => p)
                        :
                        "Aucun produit"
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Produitslist;
