import { createContext, useState, useContext, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext=createContext()

export const AppContextProvider=({children})=>{

    const currency=import.meta.env.VITE_CURRENCY

    const navigate=useNavigate()
    const [user, setUser]=useState(null)
    const [isSeller, setIsSeller]=useState(false)
    const [showUserLogin, setShowUserLogin]=useState(false)
    const [products, setProducts]=useState([])
    const [cartItems, setCartItems]=useState(JSON.parse(localStorage.getItem("localStCartItems")) || {})
    const [searchQuery, setSearchQuery]=useState({})
    
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
        localStorage.setItem("localStCartItems", JSON.stringify(cartData))
        toast.success("Added to Cart")
    }

    // Update cart item quantity
    const updateCartItem= (itemId, quantity)=>{
        let cartData= structuredClone(cartItems)
        cartData[itemId]= quantity
        setCartItems(cartData)
        toast.success("Cart Updated")
    }

    // Get cart items count
    const getCartCount=()=>{
        let totalCount=0
        for(const item in cartItems){
            totalCount+=cartItems[item]
        }
        return totalCount
    }

    // Get cart total amount
    const getCartAmount=()=>{
        let totalAmount=0
        for(const item in cartItems){
            let itemInfo=products.find((product)=>item===product._id)
            if (cartItems[item]>0){
                totalAmount+=itemInfo.offerPrice*cartItems[item]
            }
        }
        return Math.floor(totalAmount*100)/100
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
        navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart, cartItems, searchQuery, setSearchQuery, getCartCount, getCartAmount
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