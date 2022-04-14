import { gsap } from "gsap";
import React, { useState, useCallback } from 'react';
import Google from "../assets/icon/google.png"
import loginimg from "../assets/img/loginimg.jpg"
import SignupForm from './SignupForm';
import $ from 'jquery';
import Cookies from "universal-cookie";
import { GoogleLogin } from 'react-google-login';
import Passwordforgot from "./PasswordForgot";
import { Navigate, useNavigate } from "react-router";

const Loginform = (props) => {
    const navigate = useNavigate()
    const Login = () => {
      return (
        <GoogleLogin
          clientId={'939545017446-osbdaovv81appnbs2g45m350j55sksd8.apps.googleusercontent.com'}  // your Google app client ID
          buttonText="Sign in with Google"
          onSuccess={onGoogleLoginSuccess} // perform your user logic here
          onFailure={onGoogleLoginFailure} // handle errors here
        />
      );
    };
    const onGoogleLoginSuccess = useCallback(
        async response => {
        console.log('goooooooogle reponse', response)
        let inputs = new Object()
        inputs["googleid"] = response.googleId
        inputs["mdp"] = response.tokenId
        inputs["prenom"] = response.profileObj.givenName
        inputs["nom"] = response.profileObj.familyName
        inputs["email"] = response.profileObj.email
        var inputsForm = JSON.stringify(inputs);
        console.log(inputsForm)   
        let r = await getCSRF() 
        var url2 = "http://localhost:8000/google-auth/"
        let d = ""
        d = await fetch(url2,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': r.csrfToken
                }, 
                credentials: 'include',
                body: inputsForm
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
            if(d!=undefined){
                props.setPrenom(d.firstname)
                localStorage.setItem('token', d.token);
                props.setToken(true)
                props.setLogin(true)
                console.log('ls',localStorage.getItem('token'))
                props.setModalcontent(
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <h3 className='modline'>Bonjour, {d.firstname} !</h3>
                    <p className='modline'>Profitez dès a présent des promotions et de la livraison gratuite à partir de 100 € d'achat.</p>
                    <img className='' src={loginimg} alt="" style={{maxWidth:'400px',objectFit:'contain',}} />
                    
                </div>)
                gsap.from(".modline",{opacity: 0, y: -100, duration: 0.4, stagger: 0.1, delay:0.5})
            }
            else{
                console.log('errrrrrrrrrrrrrrrrrrrrrrrr')
                setError('Vos identifiants sont éronnés, veuillez essayer a nouveau...')
            }
        },
        []
      );
      const onGoogleLoginFailure = useCallback(
          response => {
            setError('La connexion via Google a échoué, veuillez réessayer')
          },
          []
        );
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
    console.log(props)
    const fs = props.setModalcontent
    const logo = (
        <svg className='logoM' xmlns="http://www.w3.org/2000/svg" width="661" height="315" viewBox="0 0 661 315" fill="none">
            <path d="M349.656 179.344C344.42 179.344 339.506 178.42 334.914 176.572C330.322 174.724 326.276 172.162 322.776 168.886C319.276 165.582 316.546 161.76 314.586 157.42C312.626 153.08 311.646 148.418 311.646 143.434C311.646 138.422 312.626 133.746 314.586 129.406C316.574 125.038 319.304 121.216 322.776 117.94C326.276 114.636 330.308 112.06 334.872 110.212C339.464 108.364 344.364 107.44 349.572 107.44C353.828 107.44 357.874 108.042 361.71 109.246C365.574 110.45 368.878 112.032 371.622 113.992L365.742 125.542C363.866 124.058 361.584 122.896 358.896 122.056C356.208 121.216 353.394 120.796 350.454 120.796C347.01 120.796 343.818 121.37 340.878 122.518C337.966 123.666 335.418 125.262 333.234 127.306C331.078 129.35 329.398 131.744 328.194 134.488C326.99 137.232 326.388 140.2 326.388 143.392C326.388 146.584 326.99 149.552 328.194 152.296C329.398 155.04 331.078 157.434 333.234 159.478C335.418 161.522 337.966 163.118 340.878 164.266C343.818 165.414 347.01 165.988 350.454 165.988C353.394 165.988 356.208 165.568 358.896 164.728C361.584 163.888 363.866 162.726 365.742 161.242L371.622 172.792C368.99 174.696 365.756 176.264 361.92 177.496C358.084 178.728 353.996 179.344 349.656 179.344ZM374.028 178L401.874 108.7H414.516L442.32 178H427.662L421.782 162.208H394.566L388.686 178H374.028ZM399.228 150.28H417.162L408.174 127.054L399.228 150.28ZM449.379 178L456.267 108.7H470.715L487.263 152.044L503.811 108.7H518.259L525.147 178H511.539L507.255 133.144L491.421 176.278H483.063L467.271 133.144L462.945 178H449.379Z" fill="#BB0505"/>
            <path d="M196.125 273V198.75H237.435V211.53H210.705V229.395H236.355V242.175H210.705V260.22H237.435V273H196.125ZM298.61 274.44C293 274.44 287.735 273.45 282.815 271.47C277.895 269.49 273.56 266.745 269.81 263.235C266.06 259.695 263.135 255.6 261.035 250.95C258.935 246.3 257.885 241.305 257.885 235.965C257.885 230.595 258.935 225.585 261.035 220.935C263.165 216.255 266.09 212.16 269.81 208.65C273.56 205.11 277.88 202.35 282.77 200.37C287.69 198.39 292.94 197.4 298.52 197.4C303.08 197.4 307.415 198.045 311.525 199.335C315.665 200.625 319.205 202.32 322.145 204.42L315.845 216.795C313.835 215.205 311.39 213.96 308.51 213.06C305.63 212.16 302.615 211.71 299.465 211.71C295.775 211.71 292.355 212.325 289.205 213.555C286.085 214.785 283.355 216.495 281.015 218.685C278.705 220.875 276.905 223.44 275.615 226.38C274.325 229.32 273.68 232.5 273.68 235.92C273.68 239.34 274.325 242.52 275.615 245.46C276.905 248.4 278.705 250.965 281.015 253.155C283.355 255.345 286.085 257.055 289.205 258.285C292.355 259.515 295.775 260.13 299.465 260.13C302.615 260.13 305.63 259.68 308.51 258.78C311.39 257.88 313.835 256.635 315.845 255.045L322.145 267.42C319.325 269.46 315.86 271.14 311.75 272.46C307.64 273.78 303.26 274.44 298.61 274.44ZM370.894 274.44C361.594 274.44 354.559 272.115 349.789 267.465C345.019 262.785 342.634 255.855 342.634 246.675V198.75H357.214V242.49C357.214 248.76 358.279 253.275 360.409 256.035C362.569 258.765 366.064 260.13 370.894 260.13C375.724 260.13 379.204 258.765 381.334 256.035C383.494 253.275 384.574 248.76 384.574 242.49V198.75H399.154V246.675C399.154 255.855 396.769 262.785 391.999 267.465C387.259 272.115 380.224 274.44 370.894 274.44ZM428.061 273V198.75H453.351C458.421 198.75 462.816 199.65 466.536 201.45C470.286 203.22 473.181 205.785 475.221 209.145C477.291 212.475 478.326 216.495 478.326 221.205C478.326 224.925 477.666 228.285 476.346 231.285C475.026 234.255 473.136 236.76 470.676 238.8C468.216 240.84 465.231 242.355 461.721 243.345L486.021 273H467.526L446.106 245.01H442.641V273H428.061ZM442.641 232.86H448.851C451.881 232.86 454.446 232.425 456.546 231.555C458.646 230.685 460.251 229.41 461.361 227.73C462.501 226.02 463.071 223.98 463.071 221.61C463.071 218.01 461.826 215.25 459.336 213.33C456.876 211.38 453.381 210.405 448.851 210.405H442.641V232.86ZM505.901 273V198.75H520.481V273H505.901ZM556.827 273V211.62H538.017V198.75H590.217V211.62H571.362V273H556.827ZM611.921 273V198.75H653.231V211.53H626.501V229.395H652.151V242.175H626.501V260.22H653.231V273H611.921Z" fill="#AEAEAE"/>
            <path d="M96.4807 26.2141L233.846 97.924L169.456 131.115L30.5298 61.8642L96.4807 26.2141Z" fill="#FF8080" fillOpacity="0.75"/>
            <path d="M30.5298 61.8642L168.675 133.984L171.814 191.761L31.3266 116.773L30.5298 61.8642Z" fill="#9D1C1C" fillOpacity="0.63"/>
            <path d="M173.748 133.164L244.382 95.8752L247.114 151.604L171.797 192.581L173.748 133.164Z" fill="#721212" fillOpacity="0.61"/>
            <path d="M170.341 193.103L211.211 171.683L170.438 195.637L170.341 193.103Z" fill="#AEAEAE"/>
            <path d="M96.1496 11.8721L103.458 22.4558L23.0332 65.7754L18.8445 52.3126L96.1496 11.8721Z" fill="#AEAEAE"/>
            <path d="M163.019 255.28L173.096 272.498L93 314L85.7143 295.721L163.019 255.28Z" fill="#AEAEAE"/>
            <path d="M155.957 252.885L158.299 254.525L93 289L93 285.5L155.957 252.885Z" fill="#AEAEAE"/>
            <path d="M241.513 93.896L246.173 95.1677L169.128 135.762L169.128 131.115L241.513 93.896Z" fill="#AEAEAE"/>
            <path d="M18.8225 51.9866L30.3153 50.3906L31.3102 120.871H18L18.8225 51.9866Z" fill="#AEAEAE"/>
            <path d="M168.675 133.495L173.748 131.935L171.797 186.844L168.675 133.495Z" fill="#AEAEAE"/>
            <path d="M244.382 95.4623L246.537 94.6458V141L244.382 95.4623Z" fill="#AEAEAE"/>
            <path d="M160 191.5L172 192.5L173 272L160 270.454V191.5Z" fill="#AEAEAE"/>
            <path d="M155 185L157.761 189.516L158 255L155 253.574V185Z" fill="#AEAEAE"/>
            <path d="M246.462 94.6571L235.507 99.0944L87.4142 21.7373L96.3966 11.9465L246.462 94.6571Z" fill="#AEAEAE"/>
            <path d="M102.314 296.93L92.6786 313.928L6.41026 266.104L8.84167 246L102.314 296.93Z" fill="#AEAEAE"/>
            <path d="M93.3074 285.5L93.3074 289L9.2319 243.324L9.14839 240.821L93.3074 285.5Z" fill="#AEAEAE"/>
            <path d="M170.044 131.274L171.37 135.695L36.7737 65.1423L170.044 131.274Z" fill="#AEAEAE"/>
            <path d="M172.188 191.761L172.188 205L18.0422 120.466L27.0994 110.685L172.188 191.761Z" fill="#AEAEAE"/>
            <path d="M250.543 159.755C249.187 172.922 239.309 185.615 227.211 179.468C213.943 172.727 201.774 161.157 203.13 147.99C204.486 134.823 224.655 132.784 237.748 136.033C250.841 139.282 251.899 146.588 250.543 159.755Z" fill="#EB9D9D"/>
            <path d="M232.913 178.64C231.072 177.97 229.305 175.743 228.463 171.577C227.644 167.52 227.87 162.227 229.476 156.731C231.083 151.234 233.697 146.811 236.503 144.073C239.384 141.262 241.988 140.625 243.829 141.295C245.67 141.965 247.437 144.192 248.278 148.358C249.098 152.415 248.872 157.708 247.265 163.204C245.659 168.701 243.045 173.124 240.239 175.862C237.358 178.673 234.754 179.31 232.913 178.64Z" fill="#312424" stroke="#661919" strokeWidth="5"/>
            <mask id="path-21-inside-1_40_57" fill="white">
            <ellipse rx="3.28934" ry="3.17073" transform="matrix(-0.280562 0.959836 -0.939708 -0.341978 185.066 178.383)"/>
            </mask>
            <ellipse rx="3.28934" ry="3.17073" transform="matrix(-0.280562 0.959836 -0.939708 -0.341978 185.066 178.383)" fill="#E70303"/>
            <path d="M185.546 176.741C186.656 177.145 187.001 178.269 186.785 179.008L177.387 175.589C176.152 179.815 178.338 184.737 182.74 186.339L185.546 176.741ZM186.785 179.008C186.569 179.748 185.696 180.429 184.586 180.025L187.391 170.426C182.99 168.825 178.623 171.362 177.387 175.589L186.785 179.008ZM184.586 180.025C183.475 179.621 183.131 178.496 183.347 177.757L192.744 181.177C193.979 176.95 191.793 172.028 187.391 170.426L184.586 180.025ZM183.347 177.757C183.563 177.018 184.435 176.337 185.546 176.741L182.74 186.339C187.142 187.941 191.508 185.404 192.744 181.177L183.347 177.757Z" fill="#871818" mask="url(#path-21-inside-1_40_57)"/>
            <path d="M182.275 167.519L182.221 167.523L182.167 167.53C181.987 167.554 181.833 167.575 181.696 167.591C181.682 167.357 181.672 167.071 181.67 166.723C181.661 165.682 181.709 164.264 181.776 162.283C181.801 161.521 181.941 161.187 182.016 161.061C182.067 160.977 182.122 160.921 182.278 160.868C182.484 160.797 182.821 160.751 183.374 160.772C183.89 160.79 184.456 160.859 185.141 160.941C185.188 160.947 185.236 160.952 185.285 160.958C185.293 160.959 185.3 160.96 185.307 160.961C185.343 161.026 185.413 161.181 185.473 161.486C185.638 162.321 185.583 163.497 185.449 164.729C185.438 164.836 185.427 164.938 185.416 165.037C185.317 165.949 185.256 166.509 185.169 166.927C185.144 167.048 185.122 167.13 185.105 167.183C185.035 167.207 184.91 167.242 184.705 167.28C184.185 167.374 183.449 167.433 182.275 167.519ZM185.348 160.971C185.348 160.971 185.347 160.971 185.346 160.97L185.348 160.971ZM185.073 167.267C185.073 167.267 185.074 167.266 185.075 167.264C185.074 167.266 185.073 167.267 185.073 167.267Z" fill="#F3CF4E" stroke="#FFFDC1" strokeWidth="4"/>
            <path d="M224.48 158.152C221.748 165.946 226.041 176.6 223.309 174.953C219.861 174.953 207.699 161.829 206.529 158.152C206.529 158.152 201.91 149.137 205.358 149.137C208.806 149.137 224.48 152.947 224.48 158.152Z" fill="#B75858" fillOpacity="0.57"/>
            <path d="M34.842 98.7548L34.8419 68.022L42.2127 109.409L168.651 185.216L34.842 112.676L34.842 98.7548Z" fill="#E1A5A5"/>
            <path d="M96.0904 28.6729L225.651 97.5144L96.0904 36.0487L35.9932 61.0447L96.0904 28.6729Z" fill="white" fillOpacity="0.48"/>
            <path d="M243.602 98.7435L244.772 136.033L231.504 123.74L178.041 135.17L243.602 98.7435Z" fill="#E1E1E1" fillOpacity="0.28"/>
        </svg>
    )
    const connexion = async (e) => {
        e.preventDefault()
        let inputs = new Object()
        for(let i=0;i<$(".inputform").length;i++)
          inputs[$(".inputform")[i].name] = $(".inputform")[i].value
        var inputsForm = JSON.stringify(inputs);
        console.log(inputsForm)
        let r = await getCSRF()
        console.log("csrftoken OK",r.csrfToken)
        await setCsrftoken(r.csrfToken)
        await setCsrftoken(r.csrfToken)
        localStorage.setItem('csrftoken',r.csrfToken)
        console.log("csrftoken OK2",csrftoken)
        var url2 = "http://localhost:8000/api-token-auth/"
        let d = ""
        d = await fetch(url2,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': r.csrfToken
                }, 
                credentials: 'include',
                body: inputsForm
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
        console.log("ddddddddddddddddddddddddddddddddddddddd",d)      
        if(d!=undefined){
            props.setPrenom(d.firstname)
            localStorage.setItem('token', d.token);
            props.setToken(true)
            props.setLogin(true)
            console.log('ls',localStorage.getItem('token'))
            if(document.URL.includes('panier'))
                navigate('/')
            props.setModalcontent(
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <h3 className='modline'>Bonjour, {d.firstname} !</h3>
                <p className='modline'>Profitez dès a présent des promotions et de la livraison gratuite à partir de 100 € d'achat.</p>
                <img className='' src={loginimg} alt="" style={{maxWidth:'400px',objectFit:'contain',}} />
                
            </div>)
                gsap.from(".modline",{opacity: 0, y: -100, duration: 0.4, stagger: 0.1, delay:0.5})
            }
        else{
            console.log('errrrrrrrrrrrrrrrrrrrrrrrr')
            setError('Vos identifiants sont éronnés, veuillez essayer a nouveau...')
        }
    }
    const responseGoogle = (response) => {
        console.log('goooooooooooooooooooooooogle rep',response);
      }
    return (
        <div className="d-flex flex-column align-items-center justify-content-center p-3">
            <h2 className='mb-4'>
                Re-bonjour !
            </h2>
            <form action="" className="formclassName">
                <GoogleLogin
                className="w-100 bg-danger text-white"
                clientId={'939545017446-osbdaovv81appnbs2g45m350j55sksd8.apps.googleusercontent.com'}  // your Google app client ID
                buttonText="Se connecter avec Google"
                onSuccess={onGoogleLoginSuccess} // perform your user logic here
                onFailure={onGoogleLoginFailure} 
                />
                <p className="text-danger">
                    {error}
                </p>
                <div className="formrow">
                    <input id="in1" type="email" name='username' className="inputform" placeholder=" " required/>
                        <label htmlFor="in1" className="labelform">Email*</label>
                </div>
                <div className="formrow ">
                    <input id="in2" type="password" name='password' className="inputform " placeholder=" " required/>
                        <label htmlFor="in2" className="labelform">Mot de passe*</label>
                </div>
                <div className="w-100 d-flex justify-content-between align-items-center pb-3">
                    <div className="d-flex align-items-center ">
                        <input type="checkbox" className="formCheckbox me-2"/>
                            <label htmlFor="stayco" className="m-0"  >
                                Rester connecté
                            </label>
                    </div>
                    <span className="link ms-2 pointer" onClick={() => props.setModalcontent(<Passwordforgot setModalcontent={fs} showHideModal={props.showHideModal} />)}  >Mot de passe oublié</span>
                </div>
                <button className="formbtn" onClick={(e) => connexion(e)}>
                    Se connecter
                </button>
                <div className="traitHorizontal my-5">
                    <span className="textTrait">
                        Pas encore inscrit ? 
                    </span>
                </div>
                <a className="googleBtn " onClick={() => props.setModalcontent(<SignupForm  setModalcontent={props.setModalcontent}  showHideModal={props.showHideModal} user={props.user} token={props.token} setToken={props.setToken} logged_in={props.logged_in} setLogin={props.setLogin} setPrenom={props.setPrenom} />)}>
                    Créer un compte
                </a>
            </form>
        </div>
    );
}

export default Loginform;