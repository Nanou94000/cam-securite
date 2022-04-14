import React, {useEffect, useState}  from 'react';
import Message from './Message';

const Messages = (props) => {
    const [messages,setMessages] = useState([""]);
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
              var url2 = `http://localhost:8000/compte/${u.id}/messages`
    
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
              setMessages(data2)
              console.log("mmmmmmmmmmmmmmm",data2)
          }
        return () => {
        };
    }, [u.id]);

    let messagesList = "Aucun messages"
    console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",messages.length)
    if(messages.length!=0){
        messagesList = messages.map(m => <Message id={m.id} objet={m.titre} date={m.date} expediteur={m.expediteur} contenu={m.contenu}  showHideModal={props.showHideModal} modalContent={props.modalContent} setModalcontent={props.setModalcontent} />)
    }
    console.log(messagesList)

    return (
        <>
            {messagesList}
        </>
    );
}

export default Messages;
