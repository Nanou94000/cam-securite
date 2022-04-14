import React, { useState,useEffect,useCallback } from 'react';
import Loginform from './components/LoginForm';
import left from "./assets/icon/left.png"
import key from "./assets/img/key.png"
import email from "./assets/img/email.jpg"
import $ from 'jquery';
import { Link, useNavigate } from 'react-router-dom';


const Passwordchange = (props) => {
    const navigate = useNavigate()
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

    const set_new_password = async (e) => {
        e.preventDefault()       
        let mdp = $('#in4')[0].value
        let mdp2 = $('#in5')[0].value
        if (mdp.length<8){
          setError('Votre mot de passe est trop court')
          return ('mdp erreur')
        }
        if (mdp != mdp2){
          setError('Les mots de passe indiqués sont différents')
          return ('mdp erreur')
        }
        let inputs = new Object()
        for(let i=0;i<$(".inputform").length;i++)
          inputs[$(".inputform")[i].name] = $(".inputform")[i].value
        inputs['key'] = document.URL.split('/')[document.URL.split('/').length-1]
        var inputsForm = JSON.stringify(inputs);
        let r = await getCSRF()
        await setCsrftoken(r.csrfToken)
        localStorage.setItem('csrftoken',r.csrfToken)
        console.log("csrftoken OK2",csrftoken)
        var url2 = "http://localhost:8000/reset-mdp/"+String(document.URL.split('/')[document.URL.split('/').length-1])+'/'
        let data = await fetch(url2,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': r.csrfToken
                  }, 
                  credentials: 'include',
                  body: inputsForm
              }).then(response => {
            if(response.ok) {
                console.log("fetchLogin",response)
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
            if(data == "ok"){
                navigate('/')
                props.showHideModal(e,
                  <div className='d-flex flex-column justify-content-center align-items-center'>
                    <img src={key} alt="" className="iconXL" />
                    <h3>
                      Votre mot de passe a été modifié avec succés
                    </h3>
                    <small>
                        Vous pouvez dès à présent vous connecter en utilisant vos identifiants
                    </small>
                    <p>
                      Bonne journée de la par de l'équipe de Cam Securite !
                    </p>
                  </div>
                  )
            }
            else{
                setError("Une erreur est survenue, veuillez contacter l'administrateur")
            }
  
      }
    return (
        <div className='d-flex flex-column align-items-center justify-content-start pt-5 main w-100 container' >
            <img src={key} alt="" className="iconXL" />
            <h1 className="text-center fs-4">
                Réinitialiser votre mot de passe
            </h1>
            <h2 className="text-center fs-6 mt-1 text-grey">
                Indiquer votre nouveau mot de passe
            </h2>
            <div className="formrow w-100">
              <input id="in4" type="password" name='mdp' className="inputform " placeholder=" " required/>
              <label for="in4" className="labelform">Mot de passe*</label> 
            </div>
            <div className="formrow w-100">
              <input id="in5" type="password" name='mdpConfirmation' className="inputform " placeholder=" " required/>
              <label for="in5" className="labelform">Confirmation mot de passe*</label> 
            </div>
            <p className="text-danger">
                {error}    
            </p> 
            <button className="formbtn" onClick={(e) => set_new_password(e)} >
                Réinitialiser le mot de passe
            </button>
        </div>
    );
}

export default Passwordchange;
