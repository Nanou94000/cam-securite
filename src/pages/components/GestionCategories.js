import React, {useEffect, useState}  from 'react';
import Categorieedit from './CategorieEdit';

const Gestioncategories = (props) => {
    const getCategories = async () =>{
        var url = "http://localhost:8000/categories/"

            const data = await fetch(url).then(response => {
            if(response.ok) {
                console.log("fetch")
                return response.json();
            } else {
                console.log(response,'Mauvaise réponse du réseau');
            }
            }).then(data => 
                {return(data)}
                )
            .catch(function(error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
            });
            return data          
    }
    const [categories_show, setcategories_show] = useState([]);
    const [categories, setcategories] = useState([]);
    useEffect(async() => {
        const c = await getCategories()
        console.log("cccccccccccccccccccccc",c)
        setcategories(c)
        setcategories_show(c.map(category =>(
            <div className='admin-category' onClick={ (e) => props.showHideModal(e,<Categorieedit categorie={category}  setModalcontent={props.setModalcontent} /> )} style={{backgroundImage: `url(${category.imageBanniere})`}} >
                <h3 className="fs-3">
                    {category.nom}
                </h3>
                <h4 className="fs-5">
                    {category.sousNom}
                </h4>
            </div>
        )))
        return () => {
        };
    }, []);
    return (
        <div className='w-100 p-3' >
            <div className="d-flex align-items-center justify-content-between pe-3">
                <h1 className='fs-3' >Gestion des catégories</h1>
                
                <button className="formbtn" onClick={ (e) => props.showHideModal(e,<Categorieedit categorie={false}  setModalcontent={props.setModalcontent} /> )} style={{width:"fit-content"}}>
                    Nouvelle catégorie
                </button>
            </div>
            <div className="d-flex align-items-center justify-content-between pe-3">
                <div className="d-flex align-items-center">
                    <div className="d-flex flex-column me-3">
                        <span className="fs-2"></span>
                        <span>Toutes les catégories</span>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
                {categories_show}
            </div>

        </div>
    );
}

export default Gestioncategories;
