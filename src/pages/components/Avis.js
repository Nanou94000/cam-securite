import React, {useEffect, useState}  from 'react';
import ReactStars from "react-rating-stars-component";

const Avis = (props) => {
    return (
        <div className="avis m-2">
            <div className="avisNote">
                <div className="d-flex flex-column align-items-center">
                    <span className="note">
                        <span className='fw-bold' >
                        {props.note}
                        </span> 
                        <small>
                        /5
                        </small>
                    </span>
                    <ReactStars
                        count={5}
                        value={props.note}
                        edit={false}
                        size={16}
                        activeColor="#ffd700"
                    />    
                </div>
            </div>
            <img src={props.produit.image1} alt="" className="imgM" />
            <div className="d-flex flex-column jusitify-content-between ms-3">
                <div className="d-flex flex-column mb-2">
                    <span className="fw-bold">
                        {props.titre}
                    </span>
                    <span className="avisDate">
                        L{props.date} posté par {props.user}
                    </span>
                </div>
                <div className="d-flex flex-column">
                    <p className="avisText">
                        {props.contenu}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Avis;
