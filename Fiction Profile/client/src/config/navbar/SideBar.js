import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SidebarData } from './SideBarData';
import './SideBar.css';
import { IconContext } from 'react-icons';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

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
  const MirroredLogoutIcon = () => {
    return (
      <IoLogOut
        style={{
          transform: "scaleX(-1)", // Mirror horizontally
        }}
      />
    );
  };


  return (
    <div className='sidebar-container'>

      <div className='side-menu-items'>
        <div className='home-bar'>
          <Link to='/home'>         
          <AiIcons.AiFillHome className='side-bar-icon' />
          <p className='side-bar-title'>Home</p>
        </Link>
        </div>
        <div className='discover-bar'>
          <Link to='/discover'>
            <IoIcons.IoIosPaper className='side-bar-icon' />
            <p className='side-bar-title'>Discover</p>
          </Link>
        </div>
        <div className='feed-bar'>
          <Link to='/feed'>
            <RiIcons.RiCompassDiscoverFill className='side-bar-icon' />
            <p className='side-bar-title'>Feed</p>
          </Link>
        </div>
        <div className='account-bar'>
          <Link to='/account'>
            <MdAccountCircle className='side-bar-icon' />
            <p className='side-bar-title'>Account</p>
          </Link>
        </div>
        <div className='logout-bar'>
          <Link to='/'>
            <IoLogOut className='side-bar-icon' />
            <p className='side-bar-title'>Logout</p>
          </Link>
        </div>

      </div>

    </div>
  );
}

export default SideBar;
