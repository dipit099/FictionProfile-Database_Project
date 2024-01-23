import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SidebarData } from './SideBarData';
import './SideBar.css';
import { IconContext } from 'react-icons';

function SideBar() {
  const [selectedItem, setSelectedItem] = useState(0);
  const navigate = useNavigate();
  const handleItemClick = (index) => {
    setSelectedItem(index);
    console.log("in sidebar, index " + index);
    if (index === SidebarData.length - 1) {
      // If "Log Out" item is clicked
      localStorage.removeItem('token'); // Clear token from localStorage
      localStorage.removeItem('role'); // Clear role from localStorage
      localStorage.removeItem('email'); // Clear email from localStorage
      localStorage.removeItem('people_id'); // Clear people_id from localStorage      
      console.log("logout done");
      // Navigate to the home page
      window.location.reload();
    }
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
