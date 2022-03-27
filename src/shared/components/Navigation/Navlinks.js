import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/auth-context'
import Button from '../FormElements/Button';
import classes from './Navlinks.module.css'

function Navlinks(props) {
    const auth = useContext(AuthContext);

    return (
        <ul className={classes['nav-links']}>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? `${classes['active']}` : undefined
                    }>
                    ALL USERS
                </NavLink>
            </li>
            {auth.isLoggedIn && <li >
                <NavLink
                    to={`/${auth.userId}/places`}
                    className={({ isActive }) =>
                        isActive ? `${classes['active']}` : undefined
                    }>
                    MY PLACES
                </NavLink>
            </li>
            }
            {auth.isLoggedIn && <li>
                <NavLink
                    to="/places/new"
                    className={({ isActive }) =>
                        isActive ? `${classes['active']}` : undefined
                    }>
                    ADD PLACE
                </NavLink>
            </li>
            }
            {!auth.isLoggedIn && <li>
                <NavLink
                    to="/auth"
                    className={({ isActive }) =>
                        isActive ? `${classes['active']}` : undefined
                    }>
                    AUTHENTICATE
                </NavLink>
            </li>
            }
            {auth.isLoggedIn && <li>
                <Button onClick={auth.logout}>
                    LOGOUT
                </Button>
            </li>
                
            }
        </ul>
    )
}

export default Navlinks