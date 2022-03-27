import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Backdrop from '../UIElements/Backdrop'
import MainHeader from './MainHeader'
import classes from './MainNavigation.module.css'
import Navlinks from './Navlinks'
import SideDrawer from './SideDrawer'

function MainNavigation(props) {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)
    const openDrawerHandler = () => {
        setDrawerIsOpen(true)
    }

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false)
    }

    return (
        <React.Fragment>
            {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}/>}
            {drawerIsOpen &&
                <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                    <nav className={classes['main-navigation__drawer-nav']}>
                        <Navlinks />
                    </nav>
                </SideDrawer>
            }
            <MainHeader>
                <button
                    className={classes['main-navigation__menu-btn']}
                    onClick={openDrawerHandler} >
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className={classes['main-navigation__title']}>
                    <Link to="/">
                        Your Places
                    </Link>
                </h1>
                <nav className={classes['main-navigation__header-nav']}>
                    <Navlinks />
                </nav>
            </MainHeader>
        </React.Fragment>

    )
}

export default MainNavigation