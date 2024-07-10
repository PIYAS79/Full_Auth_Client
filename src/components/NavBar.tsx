
import { NavLink } from 'react-router-dom'
import { useAppDispatch } from '../redux/hook'
import { Logout_User } from '../redux/features/authSlice'

const NavBar = () => {
    const dispatch = useAppDispatch()

    const navLinks = <>
        <li><NavLink to={'/'}>Home Page</NavLink></li>
        <li><button onClick={() => dispatch(Logout_User())}>Logout</button></li>
    </>




    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {navLinks}
                </ul>
            </div>
        </div>
    )
}

export default NavBar