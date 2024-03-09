import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SidebarData } from './SideBarData';
import './SideBar.css';
import { IconContext } from 'react-icons';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { toast } from 'react-toastify';
import { MdOutlineReport } from "react-icons/md";
import { GrAnnounce } from "react-icons/gr";
import MediaIcon from '../../assets/MediaIcon';
import HomeIcon from '../../assets/HomeIcon';


function SideBar() {
  const [selectedItem, setSelectedItem] = useState(0);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const handleItemClick = (index) => {
    setSelectedItem(index);
    console.log("in sidebar, index " + index);
    if (index === SidebarData.length - 1) {
      // If "Log Out" item is clicked
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      localStorage.removeItem('people_id');
      console.log("logout done");
      toast.success("Logout successful");
      window.location.reload();
    }
  };
  /*keep useeffect of role*/
  useEffect(() => {
    console.log("in sidebar, role " + role);
  }, [role]);

  const MirroredLogoutIcon = () => {
    return (
      <IoLogOut
        style={{
          fontSize: "40px",
          transform: "scaleX(-1)",
        }}
      />
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('people_id');
    console.log("logout done");
    toast.success("Logout successful");
    window.location.reload();
  };

  return (
    <div className='sidebar-container'>
      {role !== ('moderator') && (
        <div className='side-menu-items'>
          <div
            className={`home-bar ${selectedItem === 0 ? 'selected' : ''}`}
            onClick={() => handleItemClick(0)}
          >
            <Link to='/'>
              <HomeIcon className='side-bar-icon' />
              <p className='side-bar-title'>Home</p>
            </Link>
          </div>
          <div
            className={`discover-bar ${selectedItem === 1 ? 'selected' : ''}`}
            onClick={() => handleItemClick(1)}
          >
            <Link to='/discover'>
              <MediaIcon className='side-bar-icon' />
              <p className='side-bar-title'>Discover</p>
            </Link>
          </div>
          <div
            className={`feed-bar ${selectedItem === 2 ? 'selected' : ''}`}
            onClick={() => handleItemClick(2)}
          >
            <Link to='/feed'>
              <RiIcons.RiCompassDiscoverFill className='side-bar-icon' />
              <p className='side-bar-title'>Feed</p>
            </Link>
          </div>
          {role === ('user') && (
            <div
              className={`account-bar ${selectedItem === 3 ? 'selected' : ''}`}
              onClick={() => handleItemClick(3)}
            >
              <Link to='/account'>
                <MdAccountCircle className='side-bar-icon' />
                <p className='side-bar-title'>Account</p>
              </Link>
            </div>
          )}

          {role === 'user' && (
            // Render content for user or moderator
            <div className='logout-bar' onClick={handleLogout}>
              <Link to='/'>
                <MirroredLogoutIcon className={`side-bar-icon ${selectedItem === 4 ? 'selected' : ''}`} />
                <p className={`side-bar-title ${selectedItem === 4 ? 'selected' : ''}`}>Logout</p>
              </Link>
            </div>
          )}

        </div>
      )}

      {role === ('moderator') && (
        <div className='side-menu-items'>
          <div
            className={`home-bar ${selectedItem === 0 ? 'selected' : ''}`}
            onClick={() => handleItemClick(0)}
          >
            <Link to='/'>
              <HomeIcon className='side-bar-icon' />
              <p className='side-bar-title'>Home</p>
            </Link>
          </div>

          <div
            className={`discover-bar ${selectedItem === 1 ? 'selected' : ''}`}
            onClick={() => handleItemClick(1)}
          >
            <Link to='/media'>
              <MediaIcon className='side-bar-icon' />
              <p className='side-bar-title'>Media</p>
            </Link>
          </div>

          <div
            className={`feed-bar ${selectedItem === 2 ? 'selected' : ''}`}
            onClick={() => handleItemClick(2)}
          >
            <Link to='/announcement'>
              <GrAnnounce className='side-bar-icon' />
              <p className='side-bar-title'>Announce</p>
            </Link>
          </div>

          {/* <div
            className={`feed-bar ${selectedItem === 2 ? 'selected' : ''}`}
            onClick={() => handleItemClick(2)}
          >
            <Link to='/report'>
              <MdOutlineReport className='side-bar-icon' />
              <p className='side-bar-title'>Report</p>
            </Link>
          </div> */}

          <div
            className={`account-bar ${selectedItem === 3 ? 'selected' : ''}`}
            onClick={() => handleItemClick(3)}
          >
            <Link to='/account'>
              <MdAccountCircle className='side-bar-icon' />
              <p className='side-bar-title'>Account</p>
            </Link>
          </div>
          <div className='logout-bar' onClick={handleLogout}>
            <Link to='/'>
              <MirroredLogoutIcon className={`side-bar-icon ${selectedItem === 4 ? 'selected' : ''}`} />
              <p className={`side-bar-title ${selectedItem === 4 ? 'selected' : ''}`}>Logout</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default SideBar;
