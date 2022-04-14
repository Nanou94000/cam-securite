import React, { useState } from 'react';
import email from "../assets/img/email.jpg"
import erreur from "../assets/img/erreur.jpg"
import camroto from "../assets/img/camroto.gif"
import $ from 'jquery';
import { gsap } from "gsap";

const ContactInstallation = (props) => {
    const [error,setError] = useState("")
    const contact_send = async (e) => {
        e.preventDefault();
        let inputs = new Object()
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        for(let i=0;i<$(".inputform").length;i++)
          inputs[$(".inputform")[i].name] = $(".inputform")[i].value
        let email = $('#in3')[0].value
        if(!regex.test(email)){
            setError("Format de l'email incorrect")
            return ('email erreur')
        }
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
                    <img className='modline' src={email} alt="" style={{maxWidth:'400px',objectFit:'contain',}} />
                    
                </div>
                )
            }
            else{
                props.setModalcontent(
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <h3 className='modline text-danger'>Un problème est survenu !</h3>
                    <p className='modline' >Votre message n'a pas pu être envoyé, veuillez réessayer ulterieurement.</p>
                    <img className='modline' src={erreur} alt="" style={{maxWidth:'400px',objectFit:'contain',}} />
                    
                </div>)
                gsap.from(".modline",{opacity: 0, scale: 0, duration: 0.4, stagger: 0.4, delay:0.5})

            }

    }
    return (
        <div>
            
          <form action="" className="formclassName">
              <div className="w-100 d-flex justify-content-center">
                <img src={camroto} style={{maxWidth:"180px",objectFit:'contain',}} alt="" />
              </div>
              <h1 className='text-center fs-4' >Vous souhaitez sécuriser votre domicile, votre boutique, votre entrepôt...</h1>
              <h2 className="text-center fs-5">Profiter de nos conseils d'expert et de l'installation par nos techniciens</h2>
              <input id="in1" type="text" name='objet' className="inputform" placeholder=" " hidden={true} value="Demande d'intallation de système de surveillance" />
            <div className="formrow ">
              <textarea id="in2" type="text" name='message' className="inputform" placeholder=" " rows="5" required/>
              <label for="in2" className="labelform">Parlez nous de votre projet*</label> 
            </div>  
                <div className="traitHorizontal">
                    <span className="textTrait">
                        Un moyen pour vous recontacter
                    </span>
                </div>
          <div className="formrow w-100">
            <input id="in3" type="email" name='email' className="inputform" placeholder=" " required/>
            <label for="in3" className="labelform">Email*</label> 
          </div>
          <div className="formrow w-100">
            <input id="in4" type="email" name='telephone' className="inputform" placeholder=" "/>
            <label for="in4" className="labelform">Téléphone</label> 
          </div>

          <p className="text-danger">
              {error}
          </p>
          <button className="formbtn" onClick={(e) => contact_send(e)}>
            Je demande mon devis
          </button>
        </form>
        </div>
    );
}

export default ContactInstallation;
