import React, {useEffect, useState}  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from "gsap";
import FB from "../assets/icon/fb.png"
import newsletterimg from "../assets/img/newsletter.jpg"
import Insta from "../assets/icon/insta.png"
import TW from "../assets/icon/twitter.png"
import SNAP from "../assets/icon/snap.png"
import $ from "jquery";
import Contact from './Contact';

const Footer = (props) => {
    const [error,setError] = useState("")
    const [categories, setcategorie] = useState([''])

    const newsletter = async (e) =>{
        e.preventDefault();
        let inputs = new Object()
        inputs[$("#newsletter-email")[0].name] = $("#newsletter-email")[0].value
        var validRegex = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!regex.test($("#newsletter-email")[0].value)){
            setError("Format de l'email incorrect")
            console.log(regex.test($("#newsletter-email")[0].value))
            return ('email erreur')
        }
        setError('')
        var inputsForm = JSON.stringify(inputs);
        var url = "http://localhost:8000/newsletter/"
        let data = await fetch(url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }, 
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
            if (data=="félicitation"){
                props.showHideModal(e,
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <h3 className='modline' >Merci de vous être inscrit à notre newsletter</h3>
                    <p className='modline' >Vous recevrez par mail les promotions, nouveautés et disponibilités des produits Cam Securite</p>
                    <img  className='modline' src={newsletterimg} alt="" style={{maxWidth:'400px',objectFit:'contain',}} />
                    
                </div>
                )
            }
            else{
                props.showHideModal(e,
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <h3 className='modline text-danger'>Merci mais vous ètes déja inscrit à notre newsletter</h3>
                    <p className='modline' >Vous recevrez par mail les promotions, nouveautés et disponibilités des produits Cam Securite</p>
                    <img className='modline' src={newsletterimg} alt="" style={{maxWidth:'400px',objectFit:'contain',}} />
                </div>)
                gsap.from(".modline",{opacity: 0, scale: 0, duration: 0.4, stagger: 0.4, delay:0.5})

            }

    }

    useEffect(() => {    
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
        return () => {
            
        };
    }, []);

    return (
        <footer className="site-footer">
            <div className="container">
                <div id='newsletter' className="row">
                    <div className="col-sm-12 col-md-6">
                        <h6>Newsletter</h6>
                        <p className="text-danger">
                            {error}
                        </p>
                        <form>
                            <div className="mb-3">
                                <div className="formrow pb-2">
                                    <input id="newsletter-email" name='nl_email' type="email" className="inputforminv" placeholder=" " required/>
                                        <label htmlFor="in1" className="labelforminv">Email*</label>
                                </div>
                                <div id="emailHelp" className="form-text">Votre email ne sera jamais partager</div>
                            </div>
                            <button type="submit" className="produitBuyBtn" onClick={(e) => newsletter(e)} >S'abonner</button>
                        </form>
                    </div>

                    <div className="col-xs-6 col-md-3">
                        <h6>Catégories</h6>
                        <ul className="footer-links">
                        {
                        categories.map(m => (
                        <li className="">
                            <a href={`/categorie/${m.id}`} className="">
                            {m.nom}
                            </a>
                        </li>))
                        
                        }
                        </ul>
                    </div>

                    <div className="col-xs-6 col-md-3">
                        <h6>Liens utiles</h6>
                        <ul className="footer-links">
                            <li><Link to="/qui-sommes-nous">A propos de nous</Link></li>
                            <li><a href="" onClick={(e) => {
                                    e.preventDefault();
                                    props.showHideModal(e,<Contact setModalcontent={props.setModalcontent} showHideModal={props.showHideModal} />)
                                }}>Nous contacter</a></li>
                            <li><Link to="/cgu">CGU</Link></li>
                            <li><Link to="/privacy">Politique de vie privé</Link></li>
                            <li><Link to="/sitemap">Plan du site</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">

                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-sm-6 col-xs-12">
                        <p className="copyright-text mt-2">Copyright &copy; 2022 All Rights Reserved by
                            <a href="#"> Cam Securite</a>.
                        </p>
                    </div>

                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <ul className="social-icons d-flex">
                            <li className='d-flex justify-content-center align-items-center w-100'><a className="facebook d-flex  justify-content-center align-items-center" href="#"> <img src={FB} alt="" className="iconS m-0" style={{height:"25px"}} /> </a></li>
                            <li className='d-flex justify-content-center align-items-center w-100'><a className="twitter d-flex  justify-content-center align-items-center" href="#"><img src={Insta} alt="" className="iconS m-0" style={{height:"25px"}} /></a></li>
                            <li className='d-flex justify-content-center align-items-center w-100'><a className="dribbble d-flex  justify-content-center align-items-center" href="#"><img src={SNAP} alt="" className="iconS m-0" style={{height:"25px"}} /></a></li>
                            <li className='d-flex justify-content-center align-items-center w-100'><a className="linkedin d-flex  justify-content-center align-items-center" href="#"><img src={TW} alt="" className="iconS m-0" style={{height:"25px"}} /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
