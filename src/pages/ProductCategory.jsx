import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import ProductCard from '../components/ProductCard'
import EmptyCard from '../components/EmptyCard'

const ProductCategory = () => {

    const {products}=useAppContext()
    const {category}=useParams()

    const searchCategory=categories.find((item)=>category==item.path.toLocaleLowerCase())
    const filteredProducts=products.filter((product)=>product.category.toLocaleLowerCase()===category)

  return (
    <div className='mt-16'>
      {searchCategory && (
        <div className='flex flex-col items-end w-max'>
            <p className='text-2xl font-medium'>{searchCategory.text.toUpperCase()}</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
      )}
      {
        filteredProducts.length>0 ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
                {filteredProducts.map((product)=>(
                    <ProductCard key={product._id} product={product}/>
                ))}
            </div>
        ) : (
            <EmptyCard/>
        )
      }
    </div>
  )
}

export default ProductCategory