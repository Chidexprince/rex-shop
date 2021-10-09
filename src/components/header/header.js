import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.util';

import {ReactComponent as Logo} from '../../assets/rex-shop-logo.svg';

import './header.scss';
import CartIcon from '../cart-icon/cart-icon';
import CartDropdown from '../cart-dropdown/cart-dropdown';

const Header = ({currentUser, hidden}) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>

        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {
                currentUser ? 
                (
                    <div className='option' onClick={() => auth.signOut()}> LOG OUT</div>
                ) : (
                    <Link to='/login'>LOGIN</Link> 
                )
            }
            <CartIcon />
        </div>

        {hidden ? null : <CartDropdown />}
        
    </div>
);

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    hidden: state.cart.hidden
})

export default connect(mapStateToProps)(Header)