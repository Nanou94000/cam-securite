import React, { useState,useEffect,useCallback } from 'react';
import Loginform from './LoginForm';
import left from "../assets/icon/left.png"
import key from "../assets/img/key.png"
import email from "../assets/img/email.jpg"
import $ from 'jquery';

const Passwordforgot = (props) => {
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

    const ask_for_new_password = async (e) => {
        e.preventDefault()       
        let email = $('#in1')[0].value
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(email==" "){
          setError('Veuillez indiquer une adresse email')
          return ('email erreur')
        }
        if(!regex.test(email)){
          setError("Format de l'email incorrect")
          return ('email erreur')
        }
        let inputs = new Object()
        for(let i=0;i<$(".inputform").length;i++)
          inputs[$(".inputform")[i].name] = $(".inputform")[i].value
        var inputsForm = JSON.stringify(inputs);
        let r = await getCSRF()
        await setCsrftoken(r.csrfToken)
        localStorage.setItem('csrftoken',r.csrfToken)
        console.log("csrftoken OK2",csrftoken)
        var url2 = "http://localhost:8000/ask-reset-mdp/"
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
                    return(data)
                }
                )
            .catch(function(error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
            });
            if(data == "ok"){
                props.setModalcontent(
                  <div className='d-flex flex-column justify-content-center align-items-center'>
                    <h3>
                      Un email vient de vous être envoyé pour réinitialiser votre mot de passe
                    </h3>
                    <small>
                      Pensez a vérifier vos spam, et pour tout autre problème ou questionnement, contacter nous sur contact.cam.securite@gmail.com ou via notre formulaire de contact sur cam-securite.com 
                    </small>
                    <p>
                      Bonne journée de la par de l'équipe de Cam Securite !
                    </p>
                    <img src={email} alt="" style={{maxWidth:'400px',objectFit:'contain',}} />
                  </div>
                  )
            }
            else{
                setError("l'adresse email indiquée ne correspond a aucun utilisateur")
            }
  
      }

    return (
        <div className='d-flex flex-column align-items-center justify-content-center' >
            <img src={key} alt="" className="iconXL" />
            <h1 className="text-center fs-4">
                Mot de passe oublié ?
            </h1>
            <h2 className="text-center fs-6 mt-1 text-grey">
                Nous vous enverrons un mail avec les instructions pour réinitialiser votre mot de passe
            </h2>
            <div className="formrow w-100">
                <input id="in1" type="email" name='email' className="inputform w-100" placeholder=" " required/>
                <label htmlFor="in1" className="labelform">Email*</label>
            </div>
            <p className="text-danger">
                {error}    
            </p> 
            <button className="formbtn" onClick={(e) => ask_for_new_password(e)} >
                Réinitialiser le mot de passe
            </button>
            <span className="pointer text-grey mt-2 d-flex align-items-center link"  onClick={() => props.setModalcontent(<Loginform setModalcontent={props.setModalcontent}/>)} >
                <img src={left} alt="" className="iconS" />
                Retour à la page de connexion
            </span>
        </div>
    );
}

export default Passwordforgot;
