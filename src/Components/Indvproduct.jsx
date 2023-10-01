import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addcartitem, removeselectitem, selectitem } from '../Redux/Actions/Action'
import axios from 'axios'
import { stars } from '../assets/Icons'
import { cart_items } from '../Redux/Reducers/MainReducers'
import { getDatabase, ref, set } from 'firebase/database'
import { useAuth0 } from '@auth0/auth0-react'
import { app } from './Firebase'

export default function Indvproduct({size}) {
  const page = useParams().productId
  const { user, isAuthenticated } = useAuth0()
  // console.log(page)
  const dispatch = useDispatch()
  const product = useSelector((state) => state.product)
  const cart = useSelector((state) => state.cartitems)
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
  const dividedpoints = () => {
    let arr = product.description.split('.')
    let ullist = arr.map((item) => {
      return (<li className='mx-0'>{item}</li>)
    })
    return ullist

  }
  const findquant = () => {
    let i = 0
    for (i = 0; i < cart.length; i++) {
      if (product.id === cart[i].id)
        return cart[i].quantity
    }
    return 0
  }
  const [count, setCount] = useState(findquant())

  const updatecount = (val) => {
    if (val === 1)
      setCount(prev => prev + 1)
    else if (val === 0)
      setCount(prev => prev - 1)
    else
      setCount(findquant() + 1)
    //  addtocart()
  }
  const [show, setShow] = useState('')
  const addtocart = (event) => {
    // console.log('added to cart')
    // dispatch(addcartitem({ ...product, quantity: count }))
    event.preventDefault()
    if (isAuthenticated === false)
      alert("You need to sign in first");
    else {
      const db = getDatabase(app)

      set(ref(db, `users/${user.name}/${product.id}`), { ...product, quantity: count })
      // handleclick(item)
      setShow('show')
    }
  }

  useEffect(() => {
    setTimeout(() => {

      setShow('')
    }, 1500);
  }, [show])



  //  console.log(cart)
  // boxShadow: "4px 0 4px rgba(0, 0, 0, 0.1) "
  return (
    <>
      <div className="d-flex justify-content-center m-auto" style={{ width: '100%' }}>
        {Object.keys(product).length === 0 ?
          <div>...Loading</div> :
          <div >
            {/* {alertmess} */}
            <div className={`alert alert-success alert-dismissible fade ${show}`} role="alert">
              <strong>Added {count} items to the cart!</strong>
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <div className={`total_page ${size.width>700?'d-flex':''} my-3`} style={{ width: '70%', boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1) " }}>
              <div className={`mt-2 image_portion d-flex justify-content-center  me-auto align-items-center `} style={{ boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.1) " }} >
                {/* <div className="blur_overlay" style={{backdropFilter:'blur(8px) ',zIndex:'1'}}></div> */}
                {/* ${size.width>600?'image_portion  me-auto':'d-flex justify-content-center'} */}
                <img className='mx-3' src={product.image} alt="..." width="90%" height={size.width>700?'70%':'40%'} />
              </div>
              <div className={`text_portion px-5 ${size.width<700?'my-3':''}`}>
                <h2>{product.title}</h2>
                <div className="description mx-2 my-2 "><ul className='mx-0 px-0'>{dividedpoints()}</ul></div>
                {/* <div></div> */}
                <div className="rating  ">
                  <div className="d-flex">

                  <p className="mx-2 d-flex">{contstars(product.rating.rate)}</p>
                  <p className="me-auto">({product.rating.count})</p>
                  </div>
                  <div className="d-flex justify-content-center">
                  <button className="btn bg-primary text-light px-2" >Assured</button>
                  </div>
                    

                </div>
                <div className="price d-flex justify-content-center py-3">
                  <h3>${product.price}</h3>
                </div>
                <div className={`d-flex justify-content-center my-5 `}>
                  {count > 0 && <div className='d-flex justify-content-center' style={{ height: '10%' }}>
                    <button className="btn btn-lg btn-primary mx-2 my-2" onClick={() => { updatecount(0) }}>-</button>
                    <input type="text" onChange='' className='my-2' value={count} style={{ width: '30%', height: '30px', cursor: 'none' }} />
                    <button className="btn btn-lg  btn-primary mx-2 my-2" onClick={() => { updatecount(1) }}>+</button>
                  </div>
                  }
                  <button className="btn btn-warning" onClick={(event) => { count === 0 ? updatecount(2) : addtocart(event) }} style={{ width: '40%' }}>Add to cart</button>
                </div>

              </div>
            </div>
          </div>}
      </div>
    </>
  )
}
