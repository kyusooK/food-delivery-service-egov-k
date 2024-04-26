import React from 'react';

import URL from 'constants/url';
import { NavLink } from 'react-router-dom';

function EgovLeftNavInform() { 
    console.groupCollapsed("EgovLeftNavInform");
    console.groupEnd("EgovLeftNavInform");
    return (
        <div className="nav">
            <div className="inner">
                <h2 style={{fontSize: "20px"}}>OrderManagement</h2>
                <ul className="menu4">
                    <li><NavLink to={'/orderManagement/orders'} className={({ isActive }) => (isActive ? "cur" : "")}>Order</NavLink></li>
                </ul>
            </div>
        </div>
    );
}

export default React.memo(EgovLeftNavInform);