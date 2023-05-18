import React from 'react';
import './Navbar.scss';
import NavbarItem from './NavbarItem/NavbarItem';
import { NavbarItemProps } from './NavbarItem/NavbarItem.d';
import { connect } from 'react-redux';
import { StoreState } from 'store/store';
import { User } from 'features/auth/types/User';
import { isAdmin } from 'features/auth/helpers/isAdmin';

interface Props {
  user: User | null;
}

const Navbar: React.FC<Props> = ({ user }) => {
  const navbarItems: NavbarItemProps[] = [
    { name: 'Projections', url: '/projections' },
    { name: 'Movies', url: '/movies' },
  ];

  if (user !== null) {
    if (isAdmin(user)) navbarItems.push({ name: 'Users', url: '/users' });
    navbarItems.push({
      name: 'Profile',
      url: '/profile',
    });
  } else {
    navbarItems.push({ name: 'Login', url: '/login' });
    navbarItems.push({ name: 'Register', url: '/register' });
  }

  return (
    <div className='navbar'>
      {navbarItems.map((item: NavbarItemProps) => (
        <NavbarItem key={item.name} {...item} />
      ))}
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  user: state.auth.loggedUser,
});

export default connect(mapStateToProps)(Navbar);
