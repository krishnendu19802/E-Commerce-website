import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addcartitem, removeselectitem, selectitem } from '../Redux/Actions/Action'
import axios from 'axios'
import { stars } from '../assets/Icons'
import { cart_items } from '../Redux/Reducers/MainReducers'

export default function Indvproduct() {
  const page = useParams().productId
  // console.log(page)
  const dispatch = useDispatch()
  const product = useSelector((state) => state.product)
  const cart=useSelector((state)=>state.cartitems)
  const setselectedproduct = async () => {
    // console.log(`https://fakestoreapi.com/products/${page}`)
    const response = await axios.get(`https://fakestoreapi.com/products/${page}`)
    dispatch(selectitem(response.data))
    // console.log(response.data)
  }
  // console.log(product)
  useEffect(() => {
    setselectedproduct()
    return () => {
      dispatch(removeselectitem())
    }
  }, [page])

  const contstars = (val) => {
    let list = []
    for (let i = 0; i < 5; i++) {
        if (val > 0 && val < 1)
            list.push(stars.half_filled)
        else if (val > 1)
            list.push(stars.filled)
        else
            list.push(stars.empty)
        val--;
    }
    return list
}
 const dividedpoints=()=>{
   let arr=product.description.split('.')
   let ullist=arr.map((item)=>{
     return (<li className='mx-0'>{item}</li>)
    })
    return ullist

 }
 const findquant=()=>{
  let i=0
  for(i=0;i<cart.length;i++){
    if(product.id===cart[i].id)
    return cart[i].quantity
  }
  return 0
}
 const [count,setCount]=useState(findquant())
 
 const updatecount=(val)=>{
   if(val===1)
   setCount(prev=>prev+1)
   else if(val===0)
   setCount(prev=>prev-1)
   else
   setCount(findquant()+1)
  //  addtocart()
 }
 const addtocart=()=>{
   
   dispatch(addcartitem({...product,quantity:count}))
 }
 console.log(cart)
  // boxShadow: "4px 0 4px rgba(0, 0, 0, 0.1) "
  return (
    <>
      {Object.keys(product).length === 0 ?
        <div>...Loading</div> :
        <div>
          <div className="total_page d-flex my-3" style={{ width: '90%',boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1) " }}>
            <div className="image_portion me-auto"style={{ boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.1) "}} >
            {/* <div className="blur_overlay" style={{backdropFilter:'blur(8px) ',zIndex:'1'}}></div> */}
              <img className='mx-3' src={product.image} alt="..." width="50%" height="70%"  />
            </div>
            <div className="text_portion px-5">
                <h2>{product.title}</h2>
                <div className="description mx-2 my-2 "><ul className='mx-0 px-0'>{dividedpoints()}</ul></div>
                {/* <div></div> */}
                <div className="rating d-flex">
                  <p className="mx-2">{contstars(product.rating.rate)}</p>
                  <p className="me-auto">({product.rating.count})</p>
                  <button className="btn bg-primary text-light px-2" >Assured</button>

                </div>
                <div className="d-flex justify-content-center my-5 ">
                  {count>0 && <div className='d-flex justify-content-center' style={{height:'10%'}}>
                    <button className="btn btn-lg btn-primary mx-2 my-2" onClick={()=>{updatecount(0)}}>-</button>
                    <input type="text" onChange='' className='my-2'value={count} style={{width:'30%',height:'30px',cursor:'none'}}  />
                    <button className="btn btn-lg  btn-primary mx-2 my-2"  onClick={()=>{updatecount(1)}}>+</button>
                    </div>
                  }
                  <button className="btn btn-warning" onClick={()=>{count===0?updatecount(2):addtocart()}} style={{width:'40%'}}>Add to cart</button>
                </div>

            </div>
          </div>
        </div>}
    </>
  )
}
