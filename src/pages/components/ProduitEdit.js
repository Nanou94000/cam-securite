import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Produitedit = (props) => {

    const [categories, setcategorie] = useState([''])
    const [descriptionLongue, setdescriptionLongue] = useState([''])
    const [caracteristique, setcaracteristique] = useState([''])
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
    let initNav = async () => {
        var url = "http://localhost:8000/categories/"

            let data = await fetch(url).then(response => {
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
            setcategorie(data.map(c => <option value={c.id}>{c.nom}</option>))
                      
        var url2 = "http://localhost:8000/caracteristiques/"

        let data2 = await fetch(url2).then(response => {
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
        console.log("caracteristique",props.produit.caracteristiques,data2)
        if(props.produit==false)
        {
        setcaracteristique(data2.map(c =>                     
        <div className="formrow m-3">
            <input id={c.nom} type="checkbox" name={c.nom} className="inputform m-4" style={{width:"fit-content"}} value={c.id} defaultChecked={false} placeholder=" " required/>
            <label htmlFor="in2" className="labelform fs-6" style={{fontSize:"3px"}} >{c.nom}: {c.valeur}</label>
        </div>  
      ))

        }
        else{
            setcaracteristique(data2.map(c =>                     
            <div className="formrow m-3">
                <input id={c.nom} type="checkbox" name={c.nom} className="inputform m-4" style={{width:"fit-content"}} value={c.id} defaultChecked={props.produit.caracteristiques.map(crt => crt.id==c.id?true:false)[0]} placeholder=" " required/>
                <label htmlFor="in2" className="labelform fs-6" style={{fontSize:"3px"}} >{c.nom}: {c.valeur}</label>
            </div>    
      ))

        }

    }

    const maj_or_create_produit = async (e) =>{
        e.preventDefault();
        let r = await getCSRF()
        let inputs = new FormData()
        let caracteristique = []
        for(let i=0;i<$(".inputform").length;i++){
            if($(".inputform")[i].name.includes('image')){
                if($(".inputform")[i].files[0]!=undefined)
                    inputs.append($(".inputform")[i].name,$(".inputform")[i].files[0],'None/'+$(".inputform")[i].files[0].name)
            }
            else{
                if($(".inputform")[i].type=="checkbox"){
                    if($(".inputform")[i].checked){
                        caracteristique.push($(".inputform")[i].value)
                    }
                }
                else{
                    if($(".inputform")[i].name=="nom"||$(".inputform")[i].name=='sousNom'||$(".inputform")[i].name=='descriptionCourte'||$(".inputform")[i].name=="prix"||$(".inputform")[i].name=='prixSansReduction'||$(".inputform")[i].name=='stock'||$(".inputform")[i].name=='poids'||$(".inputform")[i].name=='categorie')
                        if($(".inputform")[i].value==''||$(".inputform")[i].value==null||$(".inputform")[i].value==undefined)
                        {
                            setError("Certains champs obligatoires ne sont pas remplis")
                            return('erroe')
                        }
                    inputs.append($(".inputform")[i].name,$(".inputform")[i].value)
                }
            }
        }
        inputs.append("descriptionLongue",descriptionLongue)
        inputs.append("caracteristiques",caracteristique)
        for(var pair of inputs.entries()) {
           console.log(pair[0]+ ', '+ pair[1]);
        }
        if(props.produit==false)
            var url = `http://localhost:8000/maj-produit/0/`
        else
            var url = `http://localhost:8000/maj-produit/${props.produit.id}/`
        let data = await fetch(url,{
            method: 'POST',
            headers: {
                'X-CSRFToken': r.csrfToken,
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
            setError("Impossible de mettre à jour le produit")
        }
        else{
            props.setModalcontent("MAJ de le produit réussie")
        }


    }

    useEffect(() => {
        initNav()
        return () => {
        };
    }, [props.modalContent,props]);

    return (
        <>
        {
            props.produit==false
            ?
            <div className="d-flex flex-column align-items-center justify-content-center p-3">
                <h2 className='mb-4'>
                    Ajouter un produit:
                </h2>
                    <input id="in0" type="text" name='id' className="inputform" placeholder=" " defaultValue={0} hidden/>
                    <div className="formrow w-100">
                        <input id="in1" type="text" name='nom' className="inputform" placeholder=" "  required/>
                            <label htmlFor="in1" className="labelform">Titre*</label>
                    </div>
                    <div className="formrow w-100 ">
                        <input id="in2" type="text" name='sousNom' className="inputform " placeholder=" "  required/>
                            <label htmlFor="in2" className="labelform">Sous Titre*</label>
                    </div>
                    <div className="formrow w-100 ">
                        <select id="in10" name='categorie' className="inputform ">
                            {categories}
                        </select>
                        <label htmlFor="in2" className="labelform">Catégorie*</label>
                    </div>
                    <div className="formrow w-100 ">
                        <textarea rows="2"  id="in3" type="text" name='descriptionCourte' className="inputform " placeholder=" "  required/>
                            <label htmlFor="in2" className="labelform">Description courte*</label>
                    </div>  
                    <label htmlFor="in2" className="w-100">Description longue*</label>
                        <CKEditor className="w-100"
                            editor={ ClassicEditor }
                            data=""
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                console.log( { event, editor, data } );
                                setdescriptionLongue(data)
                            } }
                            onBlur={ ( event, editor ) => {
                                console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                                console.log( 'Focus.', editor );
                            } }
                        /> 
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <div className="formrow w-100 me-2">
                            <input id="in5" type="number" name='prix' className="inputform"  placeholder=" " required/>
                            <label for="in5" className="labelform">Prix de vente*</label> 
                        </div>
                        <div className="formrow w-100 ms-2">
                            <input id="in6" type="number" name='prixSansReduction' className="inputform"  placeholder=" " required/>
                            <label for="in6" className="labelform">Prix sans réduc*</label> 
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <div className="formrow w-100 me-2">
                            <input id="in5" type="number" name='poids' className="inputform"  placeholder=" " required/>
                            <label for="in5" className="labelform">Poids*</label> 
                        </div>
                        <div className="formrow w-100 ms-2">
                            <input id="in6" type="number" name='stock' className="inputform" placeholder=" " required/>
                            <label for="in6" className="labelform">Stock*</label> 
                        </div>
                    </div>
                    <div className="formrow w-100 ">
                        <input id="in7" type="file" name='image1' className="inputform " defaultValue={null} placeholder=" " required/>
                            <label htmlFor="in7" className="labelform">Image 1*</label>
                    </div>
                    <div className="d-flex justify-content-between align-items-end w-100">
                        <div className="d-flex flex-column w-50">
                            <div className="formrow me-2">
                                <input id="in8" type="file" name='image2' className="inputform " defaultValue={null} placeholder=" " required/>
                                <label for="in8" className="labelform">Image 2</label> 
                            </div>
                        </div>
                        <div className="d-flex flex-column w-50">     
                            <div className="formrow ms-2">
                                <input id="in9" type="file" name='image3' className="inputform " defaultValue={null} placeholder=" " required/>
                                <label for="in9" className="labelform">Image3</label> 
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-end w-100">
                        <div className="d-flex flex-column w-50">
                            <div className="formrow me-2">
                                <input id="in10" type="file" name='image4' className="inputform " defaultValue={null} placeholder=" " required/>
                                <label for="in10" className="labelform">Image 4</label> 
                            </div>
                        </div>
                        <div className="d-flex flex-column w-50">     
                            <div className="formrow ms-2">
                                <input id="in11" type="file" name='image5' className="inputform " defaultValue={null} placeholder=" " required/>
                                <label for="in11" className="labelform">Image 5</label> 
                            </div>
                        </div>
                    </div>
                    <h4 className="text-start w-100 fw-light">
                        Caracteristiques
                    </h4>
                    <div className="d-flex flex-wrap">
                        {caracteristique}               
                    </div>
                    <p className="text-danger">
                        {error}
                    </p>

                    <button className="formbtn" onClick={(e) => maj_or_create_produit(e)} >
                        Ajouter le produit
                    </button>
            </div>
            :
            <div className="d-flex flex-column align-items-center justify-content-center p-3">
                <h2 className='mb-4'>
                    Edition du produit:
                </h2>
                <h3 className='mb-4'>
                    {props.produit.nom}
                </h3>
                    <input id="in0" type="text" name='id' className="inputform" placeholder=" " defaultValue={props.produit.id} hidden/>
                    <div className="formrow w-100">
                        <input id="in1" type="text" name='nom' className="inputform" placeholder=" " defaultValue={props.produit.nom} required/>
                            <label htmlFor="in1" className="labelform">Titre*</label>
                    </div>
                    <div className="formrow w-100 ">
                        <input id="in2" type="text" name='sousNom' className="inputform " placeholder=" " defaultValue={props.produit.sousNom} required/>
                            <label htmlFor="in2" className="labelform">Sous Titre*</label>
                    </div>
                    <div className="formrow w-100 ">
                        <select id="in10" name='categorie' className="inputform ">
                            <option className='fw-bold' value={props.produit.categorie.id}>{props.produit.categorie.nom}</option>
                            {categories}
                        </select>
                        <label htmlFor="in2" className="labelform">Catégorie*</label>
                    </div>
                    <div className="formrow w-100 ">
                        <textarea rows="2"  id="in3" type="text" name='descriptionCourte' className="inputform " placeholder=" " defaultValue={props.produit.descriptionCourte} required/>
                            <label htmlFor="in2" className="labelform">Description courte*</label>
                    </div>  
                    <label htmlFor="in2" className="w-100">Description longue*</label>
                        <CKEditor className="w-100"
                            editor={ ClassicEditor }
                            data={props.produit.descriptionLongue}
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                console.log( { event, editor, data } );
                                setdescriptionLongue(data)
                            } }
                            onBlur={ ( event, editor ) => {
                                console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                                console.log( 'Focus.', editor );
                            } }
                        /> 
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <div className="formrow w-100 me-2">
                            <input id="in5" type="number" name='prix' className="inputform" defaultValue={props.produit.prix} placeholder=" " required/>
                            <label for="in5" className="labelform">Prix de vente*</label> 
                        </div>
                        <div className="formrow w-100 ms-2">
                            <input id="in6" type="number" name='prixSansReduction' className="inputform" defaultValue={props.produit.prixSansReduction} placeholder=" " required/>
                            <label for="in6" className="labelform">Prix sans réduc*</label> 
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <div className="formrow w-100 me-2">
                            <input id="in5" type="number" name='poids' className="inputform" defaultValue={props.produit.poids} placeholder=" " required/>
                            <label for="in5" className="labelform">Poids*</label> 
                        </div>
                        <div className="formrow w-100 ms-2">
                            <input id="in6" type="number" name='stock' className="inputform" defaultValue={props.produit.stock} placeholder=" " required/>
                            <label for="in6" className="labelform">Stock*</label> 
                        </div>
                    </div>
                    <img src={props.produit.image1} alt="" className="editImg" />
                    <div className="formrow w-100 ">
                        <input id="in7" type="file" name='image1' className="inputform " defaultValue={null} placeholder=" " required/>
                            <label htmlFor="in7" className="labelform">Image 1*</label>
                    </div>
                    <div className="d-flex justify-content-between align-items-end w-100">
                        <div className="d-flex flex-column w-50">
                            <img src={props.produit.image2} alt="" className="editImg" />
                            <div className="formrow me-2">
                                <input id="in8" type="file" name='image2' className="inputform " defaultValue={null} placeholder=" " required/>
                                <label for="in8" className="labelform">Image 2</label> 
                            </div>
                        </div>
                        <div className="d-flex flex-column w-50">     
                            <img src={props.produit.image3} alt="" className="editImg" />
                            <div className="formrow ms-2">
                                <input id="in9" type="file" name='image3' className="inputform " defaultValue={null} placeholder=" " required/>
                                <label for="in9" className="labelform">Image3</label> 
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-end w-100">
                        <div className="d-flex flex-column w-50">
                            <img src={props.produit.image4} alt="" className="editImg" />
                            <div className="formrow me-2">
                                <input id="in10" type="file" name='image4' className="inputform " defaultValue={null} placeholder=" " required/>
                                <label for="in10" className="labelform">Image 4</label> 
                            </div>
                        </div>
                        <div className="d-flex flex-column w-50">     
                            <img src={props.produit.image5} alt="" className="editImg" />
                            <div className="formrow ms-2">
                                <input id="in11" type="file" name='image5' className="inputform " defaultValue={null} placeholder=" " required/>
                                <label for="in11" className="labelform">Image 5</label> 
                            </div>
                        </div>
                    </div>
                    <h4 className="text-start w-100 fw-light">
                        Caracteristiques
                    </h4>
                    <div className="d-flex flex-wrap">
                        {caracteristique}               
                    </div>
                <p className="text-danger">
                        {error}
                    </p>

                    <button className="formbtn" onClick={(e) => maj_or_create_produit(e)} >
                        Mettre à jours le produit
                    </button>
            </div>
        }
        </>
    );
}

export default Produitedit;
