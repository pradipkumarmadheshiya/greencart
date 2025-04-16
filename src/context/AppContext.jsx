import { createContext, useState, useContext, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext=createContext()

export const AppContextProvider=({children})=>{

    const currency=import.meta.VITE_CURRENCY

    const navigate=useNavigate()
    const [user, setUser]=useState(null)
    const [isSeller, setIsSeller]=useState(false)
    const [showUserLogin, setShowUserLogin]=useState(false)
    const [products, setProducts]=useState([])
    const [cartItems, setCartItems]=useState({})
    
    // Fetch Products
    const fetchProducts=async()=>{
        setProducts(dummyProducts)
    }
    useEffect(()=>{
        fetchProducts()
    },[])

    // Add to Cart
    const addToCart= (itemId)=>{
        let cartData= structuredClone(cartItems)

        if (cartData[itemId]){
            cartData[itemId]+=1
        }
        else{
            cartData[itemId]=1
        }

        setCartItems(cartData)
        toast.success("Added to Cart")
    }

    // Update cart item quantity
    const updateCartItem= (itemId, quantity)=>{
        let cartData= structuredClone(cartItems)
        cartData[itemId]= quantity
        setCartItems(cartData)
        toast.success("Cart Updated")
    }

    // Remove Product from Cart
    const removeFromCart=(itemId)=>{
        let cartData=structuredClone(cartItems)
        if (cartData[itemId]){
            cartData[itemId]-=1
            if (cartData[itemId]===0){
                delete cartData[itemId]
            }
        }
        toast.success("Removed from Cart")
        setCartItems(cartData)
    }

    const value={
        navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart, cartItems
    }

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext=()=>{
    return useContext(AppContext)
}