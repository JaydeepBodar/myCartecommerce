'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Custompagination from '../Custompagination'
const Adminproduct = ({product}) => {
    const{productperpage,productcount,filterproductscount,products}=product
  return (
    <div className='adminproduct'>
    {products.map((val)=>{
        const{title,price,thumbnail,category,_id}=val
        return(<div key={_id} className='bg-[#f2f2f2] mb-2 p-3 rounded-lg flex justify-between items-center'>
            <div className='flex leading-6 gap-x-8'>
                <div>
                    <Image src={thumbnail} width={90} height={90} className='w-[90px] h-[90px] rounded-full'/>
                </div>
                <div>
                    <h3>{title}</h3>
                    <h4>{category}</h4>
                    <h3>{price}$</h3>
                </div>
            </div>
						<div>
							<Link href={`/productdata/${_id}`} className='btn bg-blue-700'>View</Link>
							<Link href="/"className='btn bg-green-600'>Edit</Link>
							<Link href="/" className='btn bg-red-600'>Delete</Link>
						</div>
        </div>)
    })}
		<Custompagination totalitem={filterproductscount} itemperpage={productperpage}/>
    </div>
  )
}

export default Adminproduct
