import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Discover',
    path: '/discover',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Feed',
    path: '/feed',
    icon: <RiIcons.RiCompassDiscoverFill />,
    cName: 'nav-text'
  },
  {
    title: 'Account',
    path: '/account',
    icon: <MdAccountCircle/>,
    cName: 'nav-text'
  }
];