import React, { useState } from 'react';
import email from "../assets/img/email.jpg"
import erreur from "../assets/img/erreur.jpg"
import contact from "../assets/img/contact.gif"
import $ from 'jquery';
import { gsap } from "gsap";

const Contact = (props) => {
    const [error,setError] = useState("")
    const contact_send = async (e) => {
        e.preventDefault();
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        let email = $('#in3')[0].value
        if(!regex.test(email)){
            setError("Format de l'email incorrect")
            return ('email erreur')
        }
        let inputs = new Object()
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
                props.setModalcontent(
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <h3 className='modline'>Votre message a bien été envoyé !</h3>
                    <p className='modline'>Un membre de l'équipe Cam Securite vous contactera dans les plus brefs delai.</p>
                    <img className='' src={email} alt="" style={{maxWidth:'400px',objectFit:'contain',}} />
                    
                </div>
                )
            }
            else{
                props.setModalcontent(
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <h3 className='modline text-danger'>Un problème est survenu !</h3>
                    <p className='modline' >Votre message n'a pas pu être envoyé, veuillez réessayer ulterieurement.</p>
                    <img className='' src={erreur} alt="" style={{maxWidth:'400px',objectFit:'contain',}} />
                    
                </div>)
                gsap.from(".modline",{opacity: 0, y: -100, duration: 0.4, stagger: 0.4, delay:0.5})

            }

    }
    return (
        <div>
            
          <form action="" className="formclassName">
              <div className="w-100 d-flex justify-content-center">
                <img src={contact} style={{maxWidth:"180px",objectFit:'contain',}} alt="" />
              </div>
              <h1 className='text-center fs-4' >Vous avez une question, une demande particulière ou tout autre interrogation ?</h1>
              <h2 className="text-center fs-5">Envoyez nous un message via ce formulaire, nous vous répondrons aussitôt</h2>
            <div className="formrow ">
              <input id="in1" type="text" name='objet' className="inputform" placeholder=" " required/>
              <label for="in1" className="labelform">Objet de votre message*</label> 
            </div>
            <div className="formrow ">
              <textarea id="in2" type="text" name='message' className="inputform" placeholder=" " rows="5" required/>
              <label for="in2" className="labelform">Message*</label> 
            </div>
          <div className="formrow w-100">
            <input id="in3" type="email" name='email' className="inputform" placeholder=" " required/>
            <label for="in3" className="labelform">Votre email*</label> 
          </div>

          <p className="text-danger">
              {error}
          </p>
          <button className="formbtn" onClick={(e) => contact_send(e)}>
            Envoyer votre message
          </button>
        </form>
        </div>
    );
}

export default Contact;
