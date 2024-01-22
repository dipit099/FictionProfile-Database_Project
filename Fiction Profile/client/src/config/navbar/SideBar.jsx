import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SideBarData';
import './SideBar.css';
import { IconContext } from 'react-icons';

function SideBar() {
  // State removed as it's not needed for the sidebar to be always visible

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='sidebar-container'>
          {/* <button className='menu-bars'>
            <FaIcons.FaBars />
          </button> */}
        </div>
        <nav className='side-menu active'> {/* Sidebar is always active */}
          <ul className='side-menu-items'>
            <li className='sidebar-toggle'>
              {/* <button className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </button> */}
            </li>


            {SidebarData.map((item, index) => (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  <li>{item.icon}</li>
                  
                 <li> <span>{item.title}</span></li>                  
                </Link>
              </li>
            ))}
            
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default SideBar;
