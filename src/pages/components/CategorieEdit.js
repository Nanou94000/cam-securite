import React, { useState, useCallback } from 'react';
import $ from 'jquery';

const Categorieedit = (props) => {
    const [error,setError] = useState("")
    const [csrftoken, setCsrftoken] = useState()
    const getCSRF = async () => {
        setCsrftoken("csrf")
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
    const maj_categorie = async (e) => {
        e.preventDefault();
        let r = await getCSRF()
        let inputs = new FormData()
        for(let i=0;i<$(".inputform").length;i++)
          inputs.append($(".inputform")[i].name,$(".inputform")[i].value)
        inputs.append("imgB",$("#in4")[0].files[0],'None/'+$("#in4")[0].files[0].name)
        console.log(inputs)
        var url = `http://localhost:8000/maj-categorie/${props.categorie.id}/`
        let data = await fetch(url,{
            method: 'POST',
            headers: {
                'X-CSRFToken': r.csrfToken
              },
              body: inputs,
          }).then(response => {
        if(response.ok) {
            console.log("fetch")
            return response.json();
        } 
        else {
            console.log(response,'Mauvaise réponse du réseau');
        }
        }).then(data => 
            {return data}
            )
        .catch(function(error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });
        if(data=="ko"){
            setError("Impossible de mettre à jour la catégorie")
        }
        else{
            props.setModalcontent("MAJ de la catégorie réussie")
        }


    }
    return (
        <>
        {
            props.categorie==false
            ?
            <div className="d-flex flex-column align-items-center justify-content-center p-3">
            <h2 className='mb-4'>
                Ajouter une catégorie:
            </h2>
            <p className="text-danger">
                    {error}
                </p>
                <div className="formrow w-100">
                    <input id="in1" type="text" name='nom' className="inputform" placeholder=" " required/>
                        <label htmlFor="in1" className="labelform">Titre*</label>
                </div>
                <div className="formrow w-100 ">
                    <input id="in2" type="text" name='sousNom' className="inputform " placeholder=" " required/>
                        <label htmlFor="in2" className="labelform">Sous Titre*</label>
                </div>
                <div className="formrow w-100 ">
                    <textarea rows="5"  id="in3" type="text" name='description' className="inputform " placeholder=" " required/>
                        <label htmlFor="in2" className="labelform">Description*</label>
                </div>
                <div className="formrow w-100 ">
                    <input id="in4" type="file" name='imageBanniere' className="inputform " placeholder=" " required/>
                        <label htmlFor="in2" className="labelform">Image de bannière*</label>
                </div>
                <button className="formbtn" onClick={(e) => maj_categorie(e)} >
                    Ajouter la catégorie
                </button>
        </div>
            :
        <div className="d-flex flex-column align-items-center justify-content-center p-3">
            <h2 className='mb-4'>
                Edition de la catégorie:
            </h2>
            <h3 className='mb-4'>
                {props.categorie.nom}
            </h3>
            <p className="text-danger">
                    {error}
                </p>
                <input id="in0" type="text" name='id' className="inputform" placeholder=" " defaultValue={props.categorie.id} hidden/>
                <div className="formrow w-100">
                    <input id="in1" type="text" name='nom' className="inputform" placeholder=" " defaultValue={props.categorie.nom} required/>
                        <label htmlFor="in1" className="labelform">Titre*</label>
                </div>
                <div className="formrow w-100 ">
                    <input id="in2" type="text" name='sousNom' className="inputform " placeholder=" " defaultValue={props.categorie.sousNom} required/>
                        <label htmlFor="in2" className="labelform">Sous Titre*</label>
                </div>
                <div className="formrow w-100 ">
                    <textarea rows="5"  id="in3" type="text" name='description' className="inputform " placeholder=" " defaultValue={props.categorie.description} required/>
                        <label htmlFor="in2" className="labelform">Description*</label>
                </div>
                <img src={props.categorie.imageBanniere} alt="" className="editImg" />
                <div className="formrow w-100 ">
                    <input id="in4" type="file" name='imageBanniere' className="inputform " placeholder=" " required/>
                        <label htmlFor="in2" className="labelform">Image de bannière*</label>
                </div>
                <button className="formbtn" onClick={(e) => maj_categorie(e)} >
                    Mettre à jours la catégorie
                </button>
        </div>
        }
        </>
    );
}

export default Categorieedit;
