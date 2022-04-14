import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

const Sidebar = () => {
    return (
        <div className="app-sidebar bg-black justify-content-cente vh-100">
          <Link to="/admin-cs" className="app-sidebar-link active" onClick={(e)=>{
              $(".app-sidebar-link").removeClass('active')
              e.target.classList.add('active')
          }} >
            Dashboard
          </Link>
          <Link to="/admin-cs/commandes" className="app-sidebar-link" onClick={(e)=>{
              $(".app-sidebar-link").removeClass('active')
              e.target.classList.add('active')
          }} >
            Commandes
          </Link>
          <Link to="/admin-cs/messages" className="app-sidebar-link" onClick={(e)=>{
              $(".app-sidebar-link").removeClass('active')
              e.target.classList.add('active')
          }} >
            Messages
          </Link>
          <Link to="/admin-cs/categories" className="app-sidebar-link" onClick={(e)=>{
              $(".app-sidebar-link").removeClass('active')
              e.target.classList.add('active')
          }} >
            Categories
          </Link>
          <Link to="/admin-cs/produits" className="app-sidebar-link" onClick={(e)=>{
              $(".app-sidebar-link").removeClass('active')
              e.target.classList.add('active')
          }} >
            Produits
          </Link>
        </div>
    );
}

export default Sidebar;
