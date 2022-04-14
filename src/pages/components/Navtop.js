import React, {useEffect, useState}  from 'react';
import { gsap } from "gsap";
import supprimer from "../assets/icon/close.png"
import closeimg from "../assets/icon/close.png"
import $ from "jquery";
import Loginform from './LoginForm';
import Contact from './Contact';
import { Link, useNavigate } from 'react-router-dom';
import { async } from '@firebase/util'
const Navtop = (props) => {
    let navigate = useNavigate();
    const [panier,setPanier] = useState('')

    const [categories, setcategorie] = useState([''])
    
    const [panierItems, setPanieritems] = useState([{id:0,quantite:0,produit:{id:0,image1:""}}])

    const user = props.user
    console.log(' pannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnier',panierItems,panier)
    const [u,setU] = useState('')
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


    const logo = (

        <svg className='logo' xmlns="http://www.w3.org/2000/svg" width="661" height="315" viewBox="0 0 661 315" fill="none">
        <rect x="176.5" y="290.676" width="480" height="12" fill="white"/>
        <path d="M119 316.675L176.5 290.675L178 302.676L119 316.675Z" fill="white"/>
        <path d="M333.656 179.344C328.42 179.344 323.506 178.42 318.914 176.572C314.322 174.724 310.276 172.162 306.776 168.886C303.276 165.582 300.546 161.76 298.586 157.42C296.626 153.08 295.646 148.418 295.646 143.434C295.646 138.422 296.626 133.746 298.586 129.406C300.574 125.038 303.304 121.216 306.776 117.94C310.276 114.636 314.308 112.06 318.872 110.212C323.464 108.364 328.364 107.44 333.572 107.44C337.828 107.44 341.874 108.042 345.71 109.246C349.574 110.45 352.878 112.032 355.622 113.992L349.742 125.542C347.866 124.058 345.584 122.896 342.896 122.056C340.208 121.216 337.394 120.796 334.454 120.796C331.01 120.796 327.818 121.37 324.878 122.518C321.966 123.666 319.418 125.262 317.234 127.306C315.078 129.35 313.398 131.744 312.194 134.488C310.99 137.232 310.388 140.2 310.388 143.392C310.388 146.584 310.99 149.552 312.194 152.296C313.398 155.04 315.078 157.434 317.234 159.478C319.418 161.522 321.966 163.118 324.878 164.266C327.818 165.414 331.01 165.988 334.454 165.988C337.394 165.988 340.208 165.568 342.896 164.728C345.584 163.888 347.866 162.726 349.742 161.242L355.622 172.792C352.99 174.696 349.756 176.264 345.92 177.496C342.084 178.728 337.996 179.344 333.656 179.344ZM358.028 178L385.874 108.7H398.516L426.32 178H411.662L405.782 162.208H378.566L372.686 178H358.028ZM383.228 150.28H401.162L392.174 127.054L383.228 150.28ZM433.379 178L440.267 108.7H454.715L471.263 152.044L487.811 108.7H502.259L509.147 178H495.539L491.255 133.144L475.421 176.278H467.063L451.271 133.144L446.945 178H433.379Z" fill="white"/>
        <path d="M197.125 273V198.75H238.435V211.53H211.705V229.395H237.355V242.175H211.705V260.22H238.435V273H197.125ZM299.61 274.44C294 274.44 288.735 273.45 283.815 271.47C278.895 269.49 274.56 266.745 270.81 263.235C267.06 259.695 264.135 255.6 262.035 250.95C259.935 246.3 258.885 241.305 258.885 235.965C258.885 230.595 259.935 225.585 262.035 220.935C264.165 216.255 267.09 212.16 270.81 208.65C274.56 205.11 278.88 202.35 283.77 200.37C288.69 198.39 293.94 197.4 299.52 197.4C304.08 197.4 308.415 198.045 312.525 199.335C316.665 200.625 320.205 202.32 323.145 204.42L316.845 216.795C314.835 215.205 312.39 213.96 309.51 213.06C306.63 212.16 303.615 211.71 300.465 211.71C296.775 211.71 293.355 212.325 290.205 213.555C287.085 214.785 284.355 216.495 282.015 218.685C279.705 220.875 277.905 223.44 276.615 226.38C275.325 229.32 274.68 232.5 274.68 235.92C274.68 239.34 275.325 242.52 276.615 245.46C277.905 248.4 279.705 250.965 282.015 253.155C284.355 255.345 287.085 257.055 290.205 258.285C293.355 259.515 296.775 260.13 300.465 260.13C303.615 260.13 306.63 259.68 309.51 258.78C312.39 257.88 314.835 256.635 316.845 255.045L323.145 267.42C320.325 269.46 316.86 271.14 312.75 272.46C308.64 273.78 304.26 274.44 299.61 274.44ZM371.894 274.44C362.594 274.44 355.559 272.115 350.789 267.465C346.019 262.785 343.634 255.855 343.634 246.675V198.75H358.214V242.49C358.214 248.76 359.279 253.275 361.409 256.035C363.569 258.765 367.064 260.13 371.894 260.13C376.724 260.13 380.204 258.765 382.334 256.035C384.494 253.275 385.574 248.76 385.574 242.49V198.75H400.154V246.675C400.154 255.855 397.769 262.785 392.999 267.465C388.259 272.115 381.224 274.44 371.894 274.44ZM429.061 273V198.75H454.351C459.421 198.75 463.816 199.65 467.536 201.45C471.286 203.22 474.181 205.785 476.221 209.145C478.291 212.475 479.326 216.495 479.326 221.205C479.326 224.925 478.666 228.285 477.346 231.285C476.026 234.255 474.136 236.76 471.676 238.8C469.216 240.84 466.231 242.355 462.721 243.345L487.021 273H468.526L447.106 245.01H443.641V273H429.061ZM443.641 232.86H449.851C452.881 232.86 455.446 232.425 457.546 231.555C459.646 230.685 461.251 229.41 462.361 227.73C463.501 226.02 464.071 223.98 464.071 221.61C464.071 218.01 462.826 215.25 460.336 213.33C457.876 211.38 454.381 210.405 449.851 210.405H443.641V232.86ZM506.901 273V198.75H521.481V273H506.901ZM557.827 273V211.62H539.017V198.75H591.217V211.62H572.362V273H557.827ZM612.921 273V198.75H654.231V211.53H627.501V229.395H653.151V242.175H627.501V260.22H654.231V273H612.921Z" fill="white"/>
        <path d="M97.4808 26.2141L234.846 97.924L170.456 131.115L31.5299 61.8642L97.4808 26.2141Z" fill="#FF4444" fill-opacity="0.79"/>
        <path d="M31.5299 61.8642L169.675 133.984L172.814 191.761L32.3267 116.773L31.5299 61.8642Z" fill="#BB0505" fill-opacity="0.86"/>
        <path d="M174.749 133.164L245.382 95.8752L248.114 151.604L172.797 192.581L174.749 133.164Z" fill="#B71515" fill-opacity="0.61"/>
        <path d="M171.341 193.103L212.211 171.683L171.438 195.637L171.341 193.103Z" fill="white"/>
        <path d="M97.1496 11.8721L104.458 22.4558L24.0332 65.7754L19.8445 52.3126L97.1496 11.8721Z" fill="white"/>
        <path d="M164.019 255.28L174.096 272.498L94 314L86.7143 295.721L164.019 255.28Z" fill="white"/>
        <path d="M156.957 252.885L159.299 254.525L94 289L94 285.5L156.957 252.885Z" fill="white"/>
        <path d="M242.513 93.8961L247.173 95.1678L170.128 135.762L170.128 131.115L242.513 93.8961Z" fill="#FFCBCB"/>
        <path d="M19.8225 51.9866L31.3153 50.3906L32.3102 120.871H19L19.8225 51.9866Z" fill="white"/>
        <path d="M169.675 133.495L174.748 131.935L172.797 186.844L169.675 133.495Z" fill="#FFCBCB"/>
        <path d="M245.382 95.4623L247.537 94.6458V141L245.382 95.4623Z" fill="white"/>
        <path d="M161 191.5L173 192.5L174 272L161 270.454V191.5Z" fill="white"/>
        <path d="M156 185L158.761 189.516L159 255L156 253.574V185Z" fill="white"/>
        <path d="M247.462 94.6571L236.507 99.0944L88.4142 21.7373L97.3966 11.9465L247.462 94.6571Z" fill="white"/>
        <path d="M103.314 296.93L93.6786 313.928L9.84167 271L9.84167 246L103.314 296.93Z" fill="white"/>
        <path d="M94.3074 285.5L94.3074 289L10.2319 243.324L10.1484 240.821L94.3074 285.5Z" fill="white"/>
        <path d="M171.044 131.274L172.37 135.695L37.7737 65.1424L171.044 131.274Z" fill="#FFCBCB"/>
        <path d="M173.188 191.762L173.188 205L19.0422 120.466L28.0994 110.685L173.188 191.762Z" fill="white"/>
        <path d="M251.543 159.755C250.187 172.922 240.309 185.615 228.212 179.468C214.943 172.727 202.774 161.157 204.13 147.99C205.486 134.823 225.655 132.784 238.748 136.033C251.841 139.282 252.899 146.588 251.543 159.755Z" fill="#CA0000"/>
        <path d="M233.913 178.64C232.072 177.97 230.305 175.743 229.463 171.577C228.644 167.52 228.87 162.227 230.476 156.731C232.083 151.234 234.697 146.811 237.503 144.073C240.384 141.262 242.988 140.625 244.829 141.295C246.67 141.965 248.437 144.192 249.278 148.358C250.098 152.415 249.872 157.708 248.265 163.204C246.659 168.701 244.045 173.124 241.239 175.862C238.358 178.673 235.754 179.31 233.913 178.64Z" fill="#312424" stroke="white" stroke-width="5"/>
        <path d="M182.888 176.963C180.849 176.221 179.57 173.789 180.265 171.41C180.961 169.031 183.279 167.909 185.317 168.651C187.356 169.393 188.635 171.824 187.94 174.203C187.245 176.582 184.927 177.705 182.888 176.963Z" fill="white" stroke="#FFDE88" stroke-width="5"/>
        <path d="M180.937 156.485L180.883 156.489L180.829 156.496C180.649 156.52 180.495 156.541 180.358 156.557C180.344 156.323 180.335 156.037 180.332 155.689C180.323 154.648 180.371 153.23 180.438 151.249C180.463 150.487 180.603 150.153 180.678 150.027C180.729 149.943 180.784 149.887 180.941 149.834C181.146 149.763 181.484 149.717 182.036 149.738C182.552 149.756 183.118 149.824 183.803 149.907C183.85 149.913 183.898 149.918 183.947 149.924C183.955 149.925 183.963 149.926 183.969 149.927C184.005 149.991 184.076 150.147 184.136 150.452C184.3 151.287 184.245 152.462 184.111 153.695C184.1 153.801 184.089 153.904 184.078 154.002C183.979 154.915 183.918 155.475 183.832 155.893C183.806 156.014 183.784 156.096 183.767 156.149C183.697 156.173 183.572 156.208 183.367 156.246C182.847 156.34 182.111 156.399 180.937 156.485ZM184.01 149.937C184.01 149.937 184.009 149.936 184.008 149.936L184.01 149.937ZM183.735 156.233C183.735 156.233 183.736 156.232 183.737 156.23C183.736 156.232 183.735 156.233 183.735 156.233Z" fill="#F3CF4E" stroke="#FFFDC1" stroke-width="4"/>
        <path d="M225.48 158.152C222.748 165.946 227.041 176.6 224.309 174.953C220.861 174.953 208.7 161.829 207.529 158.152C207.529 158.152 202.91 149.137 206.358 149.137C209.806 149.137 225.48 152.947 225.48 158.152Z" fill="#DDA4A4" fill-opacity="0.57"/>
        <path d="M35.8421 98.7548L35.842 68.022L43.2129 109.409L169.651 185.216L35.8421 112.676L35.8421 98.7548Z" fill="white"/>
        <path d="M97.0906 28.6729L226.651 97.5144L97.0906 36.0487L36.9934 61.0447L97.0906 28.6729Z" fill="white"/>
        <path d="M244.602 98.7435L245.772 136.033L232.504 123.74L179.041 135.17L244.602 98.7435Z" fill="#E1E1E1" fill-opacity="0.28"/>
        </svg>
    )

    const deleteProduit = async (e,id) =>{
        e.preventDefault()
        var url = "http://localhost:8000/current_user/?format=json"
        let r = await getCSRF()
        const csrftoken = r.csrfToken
        let uss = await fetch(url,{                
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
        setU(uss)
        console.log('uuuuuuuuuuuuuuuuuus',u)
        if(uss!='rien trouvé'){
        let inputsForm = new Object
        inputsForm['iduser'] = String(uss.user.id)
        inputsForm['idproduit'] = String(id)
        inputsForm = JSON.stringify(inputsForm);
        var url2 = "http://localhost:8000/supprimer_produit/"

        fetch(url2,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }, 
              body: inputsForm
          }).then(response => {
        if(response.ok) {
            console.log("fetchAddProduit")
            return response.json();
        } else {
            console.log(response,'Mauvaise réponse du réseau pas d ajout');
        }
        }).then(data => 
            {
                console.log(data)
            }
            )
        .catch(function(error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });
        console.log('eeeeeeeeeeeeeeeeeeeeeee',e.target.parentElement.parentElement)
        gsap.fromTo(e.target.parentElement.parentElement,{x:0,opacity:1},{x:-800,opacity:0,duration:0.5,})
        setTimeout(async() => {
            var url = `http://localhost:8000/panier/${u.user.id}/`

            let data = await fetch(url).then(response => {
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
            console.log("##########################################",data)
            setPanieritems(data)
            if(data.length==0){
                showHidePanier()
            }
        }, 500);
        }
        else{

            let produits = localStorage.getItem('panier')
            var obj = JSON.parse(produits);
            console.log(obj)
            let inputsForm = new Object
            let t = -1
            let s =0
            if(produits!=null || produits!=undefined){
                for(var i in obj){
                    if(obj[i].id==id){
                            console.log(obj[i]);
                            t=i
                        }
                        s++
                    }                
                }
            console.log('ttttttttttttttttttt',s)
                if (t!=-1) {
                    delete obj[t]
                    s--
                }
            console.log('objjjjjjjjjjj',s)
            localStorage.removeItem('panier')
            if(s>0)
                localStorage.setItem('panier',JSON.stringify(obj))
            const p = e.target.parentElement.parentElement
            gsap.fromTo(p,{x:0,opacity:1},{x:-800,opacity:0,duration:0.5,})
            let produits2 = localStorage.getItem('panier')
            var obj2 = JSON.parse(produits2);
            setTimeout(() => {
                if(s==0)
                    showHidePanier()
            }, 500);

        }
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
            setU(data)
            return(data)
        }
        let us = await t()
        console.log("########################",us)
        let p =""
        if(us!='rien trouvé'){          
                var url = `http://localhost:8000/panier/${us.user.id}/`
    
                let data = await fetch(url).then(response => {
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
                console.log("##########################################",data)
                setPanieritems(data)
                setPanier(data[0].panier)

    
            console.log('panier ppp',panier)
        }
        else{  
                var url = `http://localhost:8000/panier/0/`
                let produits = localStorage.getItem('panier')
                var obj = JSON.parse(produits);
                console.log(obj)
                let inputsForm = new Object
                let t = []
                if(produits!=null || produits!=undefined){
                    for(var i in obj){
                        console.log(obj[i]);
                        t.push(obj[i].id)                    
                    }

                }
                console.log('ttttttttttttttttttttttttttttt',t)
                inputsForm['id']=t
                console.log(inputsForm)
                inputsForm = JSON.stringify(inputsForm)
                let data = await fetch(url,{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: inputsForm
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
                setPanieritems(data)
                setPanier(data[0].panier)
        }
    } 

    const navIdeas = [
        {
            nom:"Idéal pour la surveillance d'un bébé",
            lien:"/recherche/bebe"
        },
        {
            nom:"Caméras WiFi",
            lien:"/recherche/wifi"
        },
        {
            nom:"Alimentés en énergie solaire",
            lien:"/recherche/solaire"
        },
        {
            nom:"Surveiler de nuit",
            lien:"/recherche/nocturne"
        },
    ]

    let initNav = () => {
        var url = "http://localhost:8000/categories/"

            fetch(url).then(response => {
            if(response.ok) {
                console.log("fetch")
                return response.json();
            } else {
                console.log(response,'Mauvaise réponse du réseau');
            }
            }).then(data => 
                setcategorie(data)
                )
            .catch(function(error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
            });
                      
    }
    const once = {
        once : true
    };
    useEffect(() => {
        console.log('0179569431',panierItems)
        document.getElementById("navTop").addEventListener('loaded',initNav())
        return () => {
        };
    }, []);

    
    useEffect(() => {
        console.log('panier de basket',panier)
        setPanier(panier)
        return () => {
        };
    }, [panier]);

    



    let showHideMenu = () => {
        if($(".menuContainer").hasClass("d-none")){
            $(".menuContainer").removeClass("d-none")
            $("body").addClass('noScroll')
        }
        else{
            $(".menuContainer").addClass("d-none")
            $("body").removeClass('noScroll')
        }
        gsap.fromTo(".catlink", {opacity: 0, x: -100,},{opacity: 1, x: 0, duration: 0.15, delay:0.15});

    }
    

    let showHidePanier = async ()  => {
        console.log('ussssssssssssssser',props.user)

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
            setU(data)
            return(data)
        }
        let us = await t()
        console.log("########################",us)
        let p =""
        if(us!='rien trouvé'){
            if($(".panierContainer").hasClass("d-none")){
                $(".panierContainer").removeClass("d-none")
                $("body").addClass('noScroll')            
                var url = `http://localhost:8000/panier/${us.user.id}/`
    
                let data = await fetch(url).then(response => {
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
                console.log("##########################################",data)
                setPanieritems(data)
                setPanier(data[0].panier)
            }
            else{
                $(".panierContainer").addClass("d-none")
                $("body").removeClass('noScroll')
            }
    
            console.log('panier ppp',panier)
        }
        else{
            console.log("pas de user")
            if($(".panierContainer").hasClass("d-none")){
                $(".panierContainer").removeClass("d-none")
                $("body").addClass('noScroll')            
                var url = `http://localhost:8000/panier/0/`
                let produits = localStorage.getItem('panier')
                var obj = JSON.parse(produits);
                console.log(obj)
                let inputsForm = new Object
                let t = []
                if(produits!=null || produits!=undefined){
                    for(var i in obj){
                        console.log(obj[i]);
                        t.push(obj[i].id)                    
                    }

                }
                console.log('ttttttttttttttttttttttttttttt',t)
                inputsForm['id']=t
                console.log(inputsForm)
                inputsForm = JSON.stringify(inputsForm)
                let data = await fetch(url,{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: inputsForm
                  }).then(response => {
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
                setPanieritems(data)
                setPanier(data[0].panier)
            }
            else{
                $(".panierContainer").addClass("d-none")
                $("body").removeClass('noScroll')
            }
    
            console.log('panier ppp',panier)

        }
        gsap.fromTo(".prodlink", {opacity: 0, x: 100},{opacity:1, x:0, duration: 0.15, delay:0.15});
    }

    var lastScrollTop = 0;

    let showHideNav = () => {
        var st = $(window).scrollTop();
        if(st>150){
            $(".blurContain").addClass("t0")
            if (st > lastScrollTop){
                    // downscroll code
                $("#navTop").addClass("h0")
                $(".filtreProduits").removeClass("t150")
                $(".commandeStepTop").removeClass("t150")
                $(".triContainer").removeClass("t150")
                $(".produitBuyImageContainer").removeClass("t150")
                $(".stickp").removeClass("t150")
                $(".app-sidebar").removeClass("t150")
                $(".commandeLivraison").removeClass("t230")
                
                    
                } else {
                    // upscroll code
                    $("#navTop").removeClass("h0")
                    $(".commandeStepTop").addClass("t150")
                    $(".filtreProduits").addClass("t150")
                    $(".triContainer").addClass("t150")
                    $(".app-sidebar").addClass("t150")
                    $(".produitBuyImageContainer").addClass("t150")
                    $(".stickp").addClass("t150")
                    $(".commandeLivraison").addClass("t230")
                    
                }
            }
            else{
                $(".blurContain").removeClass("t0")
            }
             lastScrollTop = st;
            
    
    }

    $(window).on('scroll',showHideNav)

    const recherche = async (e) =>{
        e.preventDefault();
        let s = $("#search")[0].value
        console.log(s)
        var url2 = "http://localhost:8000/produits/"+s+"/"
        navigate("/recherche/"+s)
    }

    useEffect(async() => {
        
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
            setU(data)
            return(data)
        }
        let us = await t()
        console.log("########################",us)
        let p =""
        if(us!='rien trouvé'){         
                var url = `http://localhost:8000/panier/${us.user.id}/`
    
                let data = await fetch(url).then(response => {
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
                console.log("##########################################",data)
                setPanieritems(data)                    
                var url2 = `http://localhost:8000/panierid/${us.user.id}/`
    
                let data2 = await fetch(url2).then(response => {
                if(response.ok) {
                    console.log("fetch panier panier process")
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
                setPanier(data2)
                }
        else{    
                var url = `http://localhost:8000/panier/0/`
                let produits = localStorage.getItem('panier')
                var obj = JSON.parse(produits);
                console.log(obj)
                let inputsForm = new Object
                let t = []
                if(produits!=null || produits!=undefined){
                    for(var i in obj){
                        console.log(obj[i]);
                        t.push(obj[i].id)                    
                    }

                }
                console.log('ttttttttttttttttttttttttttttt',t)
                inputsForm['id']=t
                console.log(inputsForm)
                inputsForm = JSON.stringify(inputsForm)
                let data = await fetch(url,{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: inputsForm
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
                setPanieritems(data)
                setPanier(data[0].panier)
            
        }
        return () => {
            
        };
    }, [props.modalContent]);

    return (
        <>
            <nav id="navTop">
                <div className="d-flex align-items-center w-100 py-3 pb-1">
                    <div className="d-flex align-items-center justify-content-between justify-content-lg-start wlg ">
                        <button id="menu-xs-Btn" className="d-flex align-items-center d-lg-none d-block" onClick={() => showHideMenu()}>
                            <div className="d-flex flex-column me-3 justify-content-between menuTraits">
                                <span className="menuTrait traitHaut"></span>
                                <span className="menuTrait traitMilieu"></span>
                                <span className="menuTrait traitBas"></span>
                            </div>
                        </button>
                        <Link to="/" className="">
                            {logo}
                        </Link>
                        <ul className="px-5 d-none d-lg-flex">
                            <li className="navLink">
                                <Link to="/qui-sommes-nous">Qui sommes nous</Link>
                            </li>
                            <li className="navLink">
                                <a href="" onClick={(e) => {
                                    e.preventDefault();
                                    props.showHideModal(e,<Contact setModalcontent={props.setModalcontent} showHideModal={props.showHideModal} />)
                                }} >Nous contacter</a>
                            </li>
                        </ul>
                        <div className="d-flex d-lg-none">
                        {
                            props.logged_in 
                            ?
                            <>
                                <div className="d-flex flex-column align-items-center">                                    
                                    <Link to={`/compte/${user.id}`} className="navLink compte position-relative">
                                        {
                                            u.notification 
                                            ?
                                                <span className="comptePill">
                                                </span>
                                            :
                                            ""
                                        }
                                        <svg aria-hidden="true" fill="currentColor" height="24" viewBox="0 0 48 48" width="24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-5 md:w-6 md:h-6"><path d="M24 26a11 11 0 1111-11 11 11 0 01-11 11zm0-20a9 9 0 109 9 9 9 0 00-9-9zm17 38a1 1 0 01-1-1v-4a6 6 0 00-4.62-5.84 54.23 54.23 0 00-22.76 0A6 6 0 008 39v4a1 1 0 01-2 0v-4a8 8 0 016.2-7.78 56.38 56.38 0 0123.6 0 8 8 0 016.2 7.8v4a1 1 0 01-1 .98z"></path></svg>
                                    </Link>
                                    <span className="text-light ms-3 text-nowrap fst-italic">{props.prenom}</span>
                                </div>
                                {
                                    document.URL.includes('panier')
                                    ?
                                    ""
                                    :
                                    <a id="panierBtn1" className="navLink panier align-items-start position-relative" onClick={() => showHidePanier()}>
                                        {
                                            panierItems.length==0
                                            ?
                                            ""
                                            :
                                            <span className="panierPill">
                                                {panierItems.length}
                                            </span>
                                        }
                                        <svg aria-hidden="true" fill="currentColor" height="24" viewBox="0 0 48 48" width="24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-5 md:w-6 md:h-6"><path d="M35 44H13a5 5 0 01-5-5V13a1 1 0 011-1h30a1 1 0 011 1v26a5 5 0 01-5 5zM10 14v25a3 3 0 003 3h22a3 3 0 003-3V14z"></path><path d="M32 13a1 1 0 01-1-1V9a3 3 0 00-3-3h-8a3 3 0 00-3 3v3a1 1 0 01-2 0V9a5 5 0 015-5h8a5 5 0 015 5v3a1 1 0 01-1 1z"></path></svg>
                                    </a>
                                }
                            </>
                            :
                            <>
                                <a className="navLink compte" onClick={(e) => props.showHideModal(e,<Loginform setModalcontent={props.setModalcontent}  showHideModal={props.showHideModal} user={props.user} token={props.token} setToken={props.setToken} logged_in={props.logged_in} setLogin={props.setLogin} setPrenom={props.setPrenom} />)}>
                                    <svg aria-hidden="true" fill="currentColor" height="24" viewBox="0 0 48 48" width="24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-5 md:w-6 md:h-6"><path d="M24 26a11 11 0 1111-11 11 11 0 01-11 11zm0-20a9 9 0 109 9 9 9 0 00-9-9zm17 38a1 1 0 01-1-1v-4a6 6 0 00-4.62-5.84 54.23 54.23 0 00-22.76 0A6 6 0 008 39v4a1 1 0 01-2 0v-4a8 8 0 016.2-7.78 56.38 56.38 0 0123.6 0 8 8 0 016.2 7.8v4a1 1 0 01-1 .98z"></path></svg>
                                </a>
                                {
                                    document.URL.includes("panier")
                                    ?
                                    ""
                                    :
                                    <a id="panierBtn1" className="navLink panier position-relative" onClick={() => showHidePanier()}>
                                        {
                                            panierItems.length==0
                                            ?
                                            ""
                                            :
                                            <span className="panierPill">
                                                {panierItems.length}
                                            </span>
                                        }
                                        <svg aria-hidden="true" fill="currentColor" height="24" viewBox="0 0 48 48" width="24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-5 md:w-6 md:h-6"><path d="M35 44H13a5 5 0 01-5-5V13a1 1 0 011-1h30a1 1 0 011 1v26a5 5 0 01-5 5zM10 14v25a3 3 0 003 3h22a3 3 0 003-3V14z"></path><path d="M32 13a1 1 0 01-1-1V9a3 3 0 00-3-3h-8a3 3 0 00-3 3v3a1 1 0 01-2 0V9a5 5 0 015-5h8a5 5 0 015 5v3a1 1 0 01-1 1z"></path></svg>
                                    </a>
                                }
                            </>
                        }
                        </div>
                    </div>
                    <form className="recherche d-none d-lg-flex">
                        <input type="search" id='search' name='recherche' className="rechercheInput" placeholder="Essayez Caméra wifi, caméra espion, micro espion..." />
                        <button className="rechercheBtn" onClick={(e)=>recherche(e)} >
                            <svg aria-hidden="true" fill="currentColor" height="16" viewBox="0 0 48 48" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M20 36a16 16 0 1116-16 16 16 0 01-16 16zm0-30a14 14 0 1014 14A14 14 0 0020 6z"></path><path d="M43.08 44.08a1 1 0 01-.7-.29L29.9 31.31a1 1 0 111.41-1.41l12.48 12.48a1 1 0 010 1.41 1 1 0 01-.71.29z"></path></svg>
                        </button>
                    </form>
                    <div className="d-none d-lg-flex">
                        {
                            props.logged_in 
                            ?
                            <>
                                <span className="text-light ms-3 text-nowrap fst-italic">Bonjour {props.prenom}</span>
                                <Link to={`/compte/${user.id}`} className="navLink compte position-relative">
                                    {
                                        u.notification 
                                        ?
                                            <span className="comptePill">
                                            </span>
                                        :
                                        ""
                                    }
                                    <svg aria-hidden="true" fill="currentColor" height="24" viewBox="0 0 48 48" width="24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-5 md:w-6 md:h-6"><path d="M24 26a11 11 0 1111-11 11 11 0 01-11 11zm0-20a9 9 0 109 9 9 9 0 00-9-9zm17 38a1 1 0 01-1-1v-4a6 6 0 00-4.62-5.84 54.23 54.23 0 00-22.76 0A6 6 0 008 39v4a1 1 0 01-2 0v-4a8 8 0 016.2-7.78 56.38 56.38 0 0123.6 0 8 8 0 016.2 7.8v4a1 1 0 01-1 .98z"></path></svg>
                                </Link>
                                {
                                    document.URL.includes("panier")
                                    ?
                                    ""
                                    :
                                    <a id="panierBtn1" className="navLink panier position-relative" onClick={() => showHidePanier()}>
                                        {
                                            panierItems.length==0
                                            ?
                                            ""
                                            :
                                            <span className="panierPill">
                                                {panierItems.length}
                                            </span>
                                        }
                                        <svg aria-hidden="true" fill="currentColor" height="24" viewBox="0 0 48 48" width="24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-5 md:w-6 md:h-6"><path d="M35 44H13a5 5 0 01-5-5V13a1 1 0 011-1h30a1 1 0 011 1v26a5 5 0 01-5 5zM10 14v25a3 3 0 003 3h22a3 3 0 003-3V14z"></path><path d="M32 13a1 1 0 01-1-1V9a3 3 0 00-3-3h-8a3 3 0 00-3 3v3a1 1 0 01-2 0V9a5 5 0 015-5h8a5 5 0 015 5v3a1 1 0 01-1 1z"></path></svg>
                                    </a>
                                }
                            </>
                            :
                            <>
                                <a className="navLink compte position-relative" onClick={(e) => props.showHideModal(e,<Loginform setModalcontent={props.setModalcontent}  showHideModal={props.showHideModal} user={props.user} token={props.token} setToken={props.setToken} logged_in={props.logged_in} setLogin={props.setLogin} setPrenom={props.setPrenom} />)}>
                                    <svg aria-hidden="true" fill="currentColor" height="24" viewBox="0 0 48 48" width="24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-5 md:w-6 md:h-6"><path d="M24 26a11 11 0 1111-11 11 11 0 01-11 11zm0-20a9 9 0 109 9 9 9 0 00-9-9zm17 38a1 1 0 01-1-1v-4a6 6 0 00-4.62-5.84 54.23 54.23 0 00-22.76 0A6 6 0 008 39v4a1 1 0 01-2 0v-4a8 8 0 016.2-7.78 56.38 56.38 0 0123.6 0 8 8 0 016.2 7.8v4a1 1 0 01-1 .98z"></path></svg>
                                </a>
                                {
                                    document.URL.includes("panier")
                                    ?
                                    ""
                                    :
                                    <a id="panierBtn1" className="navLink panier position-relative" onClick={() => showHidePanier()}>
                                        {
                                            panierItems.length==0
                                            ?
                                            ""
                                            :
                                            <span className="panierPill">
                                                {panierItems.length}
                                            </span>
                                        }
                                        <svg aria-hidden="true" fill="currentColor" height="24" viewBox="0 0 48 48" width="24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-5 md:w-6 md:h-6"><path d="M35 44H13a5 5 0 01-5-5V13a1 1 0 011-1h30a1 1 0 011 1v26a5 5 0 01-5 5zM10 14v25a3 3 0 003 3h22a3 3 0 003-3V14z"></path><path d="M32 13a1 1 0 01-1-1V9a3 3 0 00-3-3h-8a3 3 0 00-3 3v3a1 1 0 01-2 0V9a5 5 0 015-5h8a5 5 0 015 5v3a1 1 0 01-1 1z"></path></svg>
                                    </a>
                                }
                            </>
                        }
                    </div>
                </div>
                <div className="w-100">
                    <ul className="d-flex w-100 px-0 d-none d-lg-flex">
                        <li className="menuLink ps-0">
                            <button id="menuBtn" className="d-flex align-items-center" onClick={() => showHideMenu()}>
                                <div className="d-flex flex-column me-3 justify-content-between menuTraits">
                                    <span className="menuTrait traitHaut"></span>
                                    <span className="menuTrait traitMilieu"></span>
                                    <span className="menuTrait traitBas"></span>
                                </div>
                                Menu
                            </button>
                        </li>
                        <li className="text-white d-flex align-items-center me-2">
                            Tendances du moment 🔥:
                        </li>
                        {navIdeas.map(n => (
                            <Link to={n.lien} className="navLink tsl" onClick={props.setUrl(document.URL)} >
                                {n.nom}
                            </Link>
                        ))}
                    </ul>
                    <form className="recherche d-flex d-lg-none">
                        <input type="search" className="rechercheInput" placeholder="Essayez Iphone 13, Mackbook, Dyson..." />
                        <button className="rechercheBtn">
                            <svg aria-hidden="true" fill="currentColor" height="16" viewBox="0 0 48 48" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M20 36a16 16 0 1116-16 16 16 0 01-16 16zm0-30a14 14 0 1014 14A14 14 0 0020 6z"></path><path d="M43.08 44.08a1 1 0 01-.7-.29L29.9 31.31a1 1 0 111.41-1.41l12.48 12.48a1 1 0 010 1.41 1 1 0 01-.71.29z"></path></svg>
                        </button>
                    </form>
                </div>

            </nav>

            <div className="menuContainer t150 d-none">
                <div className="menu">
                    <ul className="d-flex flex-column menuItems">
                        {
                        categories.map(m => (
                        <li className="menuLink">
                            <Link to={`/categorie/${m.id}`} className="navLink catlink" onClick={() => showHideMenu()}>
                            {m.nom}
                            </Link>
                        </li>))
                        
                        }
                        <li className="menuLink">
                            <Link to={`/produits`} className="navLink catlink" onClick={() => showHideMenu()}>
                            Tous les produits
                            </Link>
                        </li>
                    </ul>
                    <div className="d-flex flex-column menuFixeItems">
                        <Link to={'/#newsletter'} className="menuLink navLink text-dark" onClick={() => {
                            
                            showHideMenu()
                            window.scrollTo('#newsletter')
                            }}>Newsletter</Link>
                        <Link to={'/CGU'} className="menuLink navLink text-dark"onClick={() => showHideMenu()}>CGU</Link>
                        <Link to={'/Privacy'} className="menuLink navLink text-dark"onClick={() => showHideMenu()}>Politique de vie privé</Link>
                    </div>
                </div>
                <div className="menuQuitter" onClick={() => showHideMenu()}>
                </div>
            </div>

            <div className="panierContainer t150 d-none">
                <div className="panierQuitter" onClick={() => showHidePanier()}></div>
                <div className="panierC">
                    <ul className="d-flex flex-column panierItems p-2 o-y" style={{height:'75vh'}}>
                            {
                            
                            u!='rien trouvé'
                            ?
                                panierItems!='' && panierItems[0].quantite!=undefined && panierItems.length != 0 
                                ? 
                                panierItems.map(p => 
                                    <li className="menuLink ps-0 prodlink">
                                    <Link to={`produit/${p.produit.id}`} className="d-flex justify-content-center align-items-center w-100 p-3 position-relative border-0 border-radius-5 bg-light">
                                        <img className=' position-absolute end-0 top-0 iconS m-2 p-1' src={supprimer} onClick={(e,id) => deleteProduit(e,p.produit.id)} />
                                        <img src={p.produit.image1} alt="" className="produitImgS" />
                                        <div className="d-flex flex-column ms-2">
                                            <span className="fw-bold">{p.produit.nom}</span>
                                            <span className='text-nowrap text-secondary' >quantité: {p.quantite}</span>
                                            <span className='text-nowrap text-black'>total {p.total} €</span>
                                        </div>
                                    </Link>
                                    </li>
                                    )
                                :
                                <li className="menuLink text-dark">
                                    Votre panier est vide
                                </li>
                            :
                                u!='rien trouvé'
                                ?
                                <li className="menuLink text-dark">
                                    Votre panier est vide
                                </li>
                                :
                                ""
                            }
                            {
                            u=='rien trouvé' && panierItems.length != 0 
                            ?
                                panierItems.map(p => 
                                    <li className="menuLink ps-0 prodlink">
                                    <Link to={`produit/${p.id}`} className="d-flex justify-content-center align-items-center w-100 p-3 position-relative border-0 border-radius-5 bg-light">
                                        <img className=' position-absolute end-0 top-0 iconS m-2 p-1' src={supprimer} onClick={(e,id) => deleteProduit(e,p.id)} />
                                        <img src={p.image1} alt="" className="produitImgS" />
                                        <div className="d-flex flex-column ms-2">
                                            <span className="fw-bold">{p.nom}</span>
                                            <span className='text-nowrap text-secondary' >quantité: 1</span>
                                            <span className='text-nowrap text-black'>total {p.prix} €</span>
                                        </div>
                                    </Link>
                                    </li>
                                    )
                            :
                            ""
                            }
                            {
                            panierItems.length == 0 && u=='rien trouvé'
                            ?
                            <li className="menuLink text-dark">
                                Votre panier est vide
                            </li>
                            :
                            ""
                            }
                    </ul>
                    <div className="w-100 d-flex align-items-center justify-content-center">
                    {
                        panierItems.length > 0 && u!='rien trouvé' && panierItems[0].quantite!=undefined && panier != undefined
                        ?
                        <Link
                            onClick={() => showHidePanier()}
                            to={`/panier/${panier.id}`}
                            className="produitBuyBtn">
                                Voir panier
                        </Link>
                        :
                        ""
                    }
                    {
                        panierItems.length > 0 && u=='rien trouvé'
                        ?
                        <Link
                            onClick={() => showHidePanier()}
                            to={`/panier/0`}
                            className="produitBuyBtn">
                                Voir panier
                        </Link>
                        :
                        ""
                    }
                    </div>
                </div>
            </div>
      
            <div className="d-none modalContainer">
                <div className="quitterModal" onClick={(e) => props.showHideModal(e,"")}></div>
                <div className="modalC">
                    <div className="w-100 h-100 position-relative m-0 p-0">
                        <img src={closeimg} alt="" className="m-2 position-absolute start-100 bottom-100 pointer" style={{height:'15px',width:'15px'}} onClick={(e) => props.showHideModal(e,"")}/>
                        {props.modalContent}
                    </div>
                </div>
            </div>

        </>
    );
}

export default Navtop;
