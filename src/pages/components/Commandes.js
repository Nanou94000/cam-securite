import React, {useEffect, useState}  from 'react';
import Commande from './Commande';

const Commandes = (props) => {
    const [commandesList,setcommandesList] = useState("Aucune commande")
    const [commandes,setCommandes] = useState([""]);
    const [u,setU] = useState({id:0,user:{first_name:"",last_name:""}})
    console.log('u u 168161',u)
    const getCSRF = async () => {
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

    console.log('props ppp produit',props)
    useEffect(async () => {
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
                console.log("current_user ttt",response)
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
            setU(data)
          }
          await t()
          if(u.id!=0){
              var url2 = `http://localhost:8000/compte/${u.id}/commandes`
    
              let data2 = await fetch(url2).then(response => {
              if(response.ok) {
                  console.log("fetch")
                  return response.json();
              } else {
                  console.log(response,'Mauvaise réponse du réseau');
              }
              }).then(data => 
                  {return data}
                  )
              .catch(function(error) {
              console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
              });
              setCommandes(data2)
              console.log("mmmmmmmmmmmmmmm",data2)
              console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",data2)
              if(data2.length!=0){
              const c = data2.map(c => <Commande numero={c.id} date={c.date_payer} montant={c.total} statut={c.etat}  showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent} />)
              setcommandesList(c)  
            }
          }
        return () => {
        };
    }, [u.id]);


    return (
        <>
            {commandesList}
        </>
    );
}
export default Commandes;
