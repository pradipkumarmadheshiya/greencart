import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import {assets} from "../assets/assets"
import { useAppContext } from '../context/AppContext'

const Navbar = () => {

    const [open, setOpen] = React.useState(false)
    const {user, setUser, setShowUserLogin, navigate, searchQuery, setSearchQuery, getCartCount} = useAppContext()

    useEffect(()=>{
        if (searchQuery.length>0){
            navigate("/products")
        }
    },[searchQuery])

    const logout=async ()=>{
        setUser(null)
        navigate("/")
    }

    return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

        <NavLink onClick={()=>setOpen(false)} to="/">
            <img className="h-9" src={assets.logo} alt="logo" />
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8">
            <NavLink className="border rounded-2xl px-2.5 py-0.5 text-[12px] text-gray-500 hover:bg-gray-100" to="/seller">Seller Dashboard</NavLink>
            <NavLink className={({isActive})=>`${isActive ? "text-primary" : ""} hover:text-primary`} to="/">Home</NavLink>
            <NavLink className={({isActive})=>`${isActive ? "text-primary" : ""} hover:text-primary`} to="/products">All Product</NavLink>

            <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                <input onChange={(e)=>setSearchQuery(e.target.value.trim())} className="py-1.5 w-35 bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                <img src={assets.search_icon} alt="search" className='w-4 h-4'/>
            </div>

            <div onClick={()=>navigate("/cart")} className="relative cursor-pointer">
                <img src={assets.nav_cart_icon} alt="cart" className='w-6 opacity-80'/>
                <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full cursor-pointer">{getCartCount()}</button>
            </div>

            { !user ? (<button onClick={()=>setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                Login
            </button>) :
            (
                <div className='relative group'>
                    <img src={assets.profile_icon} alt="profile_pic" className='w-10 cursor-pointer' />
                    <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-32 rounded-md text-sm z-40'>
                        <li onClick={()=>navigate("/my-orders")} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>My Orders</li>
                        <li onClick={logout} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Logout</li>
                    </ul>
                </div>
            )
            }
        </div>

        <div className='flex items-center gap-6 sm:hidden'>
            <div onClick={()=>navigate("/cart")} className="relative cursor-pointer">
                <img src={assets.nav_cart_icon} alt="cart" className='w-6 opacity-80'/>
                <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
            </div>
            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" >
                <img src={assets.menu_icon} alt="menu" />
            </button>
        </div>

        {/* Mobile Menu */}
        { open && (
        <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>

            <NavLink to="/" onClick={()=>setOpen(false)}>Home</NavLink>
            <NavLink to="/products" onClick={()=>setOpen(false)}>All Product</NavLink>
            {
            user && <NavLink to="/products" onClick={()=>setOpen(false)}>My Orders</NavLink>
            }
            <NavLink to="/contact" onClick={()=>setOpen(false)}>Contact</NavLink>

            { !user ? (
            <button onClick={()=>{
                setOpen(false); 
                setShowUserLogin(true);
            }}
            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
            Login
            </button>) : (
            <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                Logout
            </button>)
            }
        </div>
        )}
    </nav>

  )
}

export default Navbar