import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavbarItem.scss';
import { NavbarItemProps } from './NavbarItem.d';

const NavbarItem: React.FC<NavbarItemProps> = ({ name, url }) => (
  <div className='navbar-item'>
    <NavLink to={url}>{name}</NavLink>
  </div>
);

export default NavbarItem;
