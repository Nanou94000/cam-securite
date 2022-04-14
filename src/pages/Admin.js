import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Gestioncommandes from './components/GestionCommandes';
import Messagesadmin from './components/MessagesAdmin';
import Gestioncategories from './components/GestionCategories';
import Gestionproduits from './components/GestionProduits';
import unauthorized from './assets/img/unauthorized.jpg'

const Admin =  (props) => {
    const [u,setU] = useState('')
    const [user,setUser] = useState('')
    const getCSRF = async () => {
    var url2 = "http://localhost:8000/csrf/"
    let r = '' 
    await fetch(url2, {
        credentials: 'include',
      }).then(response => {
        if(response.ok) {
            console.log("fetchCSRF panier process")
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
    useEffect(async () => {
        let r = await getCSRF()
        console.log("csrftoken OK",r.csrfToken)
        let csrftoken = r.csrfToken
        let t = async () => {
            var url = "http://localhost:8000/current_user/?format=json"
            let r = await getCSRF()
            const csrftoken = r.csrfToken
            let data = await fetch(url,{                
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken
            }, 
            credentials: 'include',
            }).then(response => {
            if(response.ok) {
                console.log("current_user de panier process",response)
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
            console.log('ddddddddddddddddata55',data)
            return data
          }
          let us = await t()
          setU(us)
          if(us!='rien trouvé')
            setUser(us.user)
        return () => {
            
        };
    }, [u.id]);
    return (
        <div className='main w-100 flex-row align-items-start'>
            {
                u!='' || u!='rien trouvé'
                ?
                    user.is_staff
                    ?
                    <>                  
                    <Sidebar/>
                    <Suspense fallback={
                        <div id="loader" className="loadIT three col">
                            <div className="loader" id="loader-2"></div>
                        </div>}>
                        <Routes>
                            <Route path="/" element={<Dashboard user={u} showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}/>} />
                            <Route path="/commandes" element={<Gestioncommandes user={u} showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}/>} />
                            <Route path="/messages" element={<Messagesadmin user={u} showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}/>} />
                            <Route path="/categories" element={<Gestioncategories user={u} showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}/>} />
                            <Route path="/produits" element={<Gestionproduits user={u} showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent}/>} />
                        </Routes>
                    </Suspense>
                    </>
                    :
                    <div className='d-flex flex-column align-items-center w-100'>
                        <h1 className="mt-2 w-100 text-center text-danger">
                            Vous n'êtes pas authorisé a accéder au dashboard administrateur
                        </h1>
                        <img src={unauthorized} alt="" style={{width:"400px",objectFit:"contain"}}  />
                    </div>
                :
                <div id="loader" className="loadIT three col">
                    <div className="loader" id="loader-2" ></div>
                </div>
            }

        </div>
    );
}

export default Admin;
