import React from 'react';

const Message = (props) => {
    const showMessage = (e) => {
        props.showHideModal(e,
            <div className="d-flex flex-column justify-content-center w-100">
                <h3 className=" text-dark ">{props.objet}</h3>
                <div className="w-100 d-flex justify-content-between">
                    <span className="mt-2 text-dark me-5">{props.expediteur}</span>
                    <span className="mt-2 text-dark ms-5">{props.date}</span>
                </div>
                <p className="mt-4 text-dark">
                    {props.contenu}
                </p>
            </div>
            )
    }
    return (
        <div className="message d-flex flex-column w-100 mb-4 position-relative" onClick={(e) => showMessage(e)}>
            <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="d-flex flex-column">
                        <span className=" text-dark ">{props.objet}</span>
                        <small className="mt-2 text-dark">{props.date}</small>
                        <small className="mt-2 text-dark">{props.expediteur}</small>
                    </div>
                    <span className="m-2 p-2 position-absolute end-0 top-0">
                        <a href="/sauron/profile/1/message/145/delete/" className="">
                            <img src="" alt="" className="iconS" />
                        </a>
                    </span>
                </div>
        </div>	
    );
}

export default Message;
