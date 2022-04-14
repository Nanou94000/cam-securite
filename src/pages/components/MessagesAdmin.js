import React from 'react';

const Messagesadmin = (props) => {
    return (
        <div className='w-100 p-3' >
            <h1 className='fs-3' >Mailing et Messages</h1>
            <h2 className="fs-5 mt-3">Envoyer un mail</h2>
            <div className="d-flex align-items-center justify-content-between pe-3">
                <div className="d-flex align-items-center">
                    <div className="d-flex flex-column me-3">
                        <span className="fs-2"></span>
                        <span>A tous les utilisateurs</span>
                    </div>
                    <div className="d-flex flex-column me-3">
                        <span className="fs-2"></span>
                        <span>Au abonnés Newsletter</span>
                    </div>
                    <div className="d-flex flex-column me-3">
                        <span className="fs-2"></span>
                        <span>A un utilisateur spécifique</span>
                    </div>
                    <div className="d-flex flex-column me-3">
                        <span className="fs-2"></span>
                        <span>A un mail spécifique</span>
                    </div>
                </div>
            </div>
            
            <h2 className="fs-5 mt-5">Envoyer un message</h2>
            <div className="d-flex align-items-center justify-content-between pe-3">
                <div className="d-flex align-items-center">
                    <div className="d-flex flex-column me-3">
                        <span className="fs-2"></span>
                        <span>A tous les utilisateurs</span>
                    </div>
                    <div className="d-flex flex-column me-3">
                        <span className="fs-2"></span>
                        <span>A un utilisateur spécifique</span>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Messagesadmin;
