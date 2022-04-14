import React from 'react';

const Dashboard = (props) => {
    return (
        <div className='w-100 p-3'>
            <div className="d-flex align-items-center justify-content-between pe-3">
                <h1 className='fs-3' >Tableau de bord administrateur </h1>
                <span className="fs-4">{props.user.user.first_name} {props.user.user.last_name}</span>
            </div>
            <div className="d-flex align-items-center justify-content-between pe-3">
                <div className="d-flex align-items-center">
                    <div className="d-flex flex-column me-3">
                        <span className="fs-2"></span>
                        <span>Commandes</span>
                    </div>
                    <div className="d-flex flex-column me-3">
                        <span className="fs-2"></span>
                        <span>Utilisateurs</span>
                    </div>
                    <div className="d-flex flex-column me-3">
                        <span className="fs-2"></span>
                        <span>Abonnée Newsletter</span>
                    </div>
                </div>
                <span className="fs-4">{props.user.user.email}</span>
            </div>
            <div className="pt-4 d-flex flex-wrap">
                
            </div>
        </div>
    );
}

export default Dashboard;
