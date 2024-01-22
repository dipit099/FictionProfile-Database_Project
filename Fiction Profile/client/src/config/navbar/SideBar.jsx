import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SideBarData';
import './SideBar.css';
import { IconContext } from 'react-icons';

function SideBar() {
  const [selectedItem, setSelectedItem] = useState(0);

  const handleItemClick = (index) => {
    setSelectedItem(index);
    console.log("in sidebar, index "+ index);
  };

  return (
    <div className='sidebar-container'>
      <IconContext.Provider value={{ color: '#fff' }}>        
        <div className='side-menu'> {/* Sidebar is always active */}
          <ul className='side-menu-items'>       
            {SidebarData.map((item, index) => (
              <li
                key={index}
                className={`side-menu-two-items ${index === selectedItem ? 'selected' : ''}`}
                onClick={() => handleItemClick(index)}
              >
                <Link to={item.path}>
                  <li className='side-bar-icon'>{item.icon}</li>
                  <li className='side-bar-title'>
                    <span > {item.title}</span>
                  </li>
                </Link>
              </li>
            ))}            
          </ul>
        </div>
      </IconContext.Provider>
    </div>
  );
}

export default SideBar;
