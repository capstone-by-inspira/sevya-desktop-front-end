import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PageNotFound = () => {
    const navigate = useNavigate();
  return (
    <div className='notFound-page'>
        <div className="notFound-content">
          <h2>404</h2>
          <h4>Oops the page you were looking for was not found</h4>
          <button className="button-purple-fill" onClick={() => navigate('/landingPage')}>Go to Homepage</button>
        </div>
    </div>
  )
}