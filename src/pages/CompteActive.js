import React, { useState, useEffect } from 'react';

const Compteactive = () => {
    const [active, setActive] = useState('');
    useEffect(async () => {
        let url = `http://localhost:8000/activate/${document.URL.split('/')[document.URL.split('/').length-1]}/`
        let data = await fetch(url)
            .then(response =>{
                if(response.ok) {
                    console.log("current_user ttt",response)
                    return response.json();
                } else {
                    console.log(response,'Mauvaise réponse du réseau');
                }})
            .then(
                data =>{
                    return data
                })
            .catch(error => console.log(error))
        setActive(data)
        console.log('dddddddddddddddddddddddddddddd->',data)
        return () => {
            
        };
    }, []);
    return (
        <div className='w-100 main'>
            {
                active==''
                ?          
                <div id="loader" className="loadIT three col">
                    <div className="loader" id="loader-1"></div>
                </div>
                :
                    active=='OK'
                    ?
                    <h1>
                        Votre compte est désormais activé. Vous pouvez vous connecter avec vos identifiants.
                    </h1>
                    :
                    <h1>
                        Un problème est survenu, votre compte n'a pas pu être activé.
                    </h1>
            }
        </div>
    );
}

export default Compteactive;
