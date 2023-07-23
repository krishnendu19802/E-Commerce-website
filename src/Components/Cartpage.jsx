import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { stars, trash } from '../assets/Icons'
import { removeitemcart } from '../Redux/Actions/Action'

export default function Cartpage() {
    const dispatch = useDispatch()
    let total = 0

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
    const remove = (item) => {
        dispatch(removeitemcart(item))
    }


    const cart_items = useSelector((state) => state.cartitems)
    console.log(cart_items)
    const displayitem = () => {
        return cart_items.map((item) => {
            total += item.quantity * item.price
            return (
                <div className='my-2 d-flex justify-content-center' >
                    <div className="content d-flex" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1) ", width: '80%', height: '50%' }}>
                        <div className="image_part px-5 pb-2" style={{ width: '30%' }}>
                            <img src={item.image} alt="..." width='30%' height='100%' />
                        </div>
                        <div className="text_part mx-2">
                            <h4>{item.title}</h4>
                            <div className="rating d-flex">
                                <p className="me-2">{contstars(item.rating.rate)}</p>
                                <p className="me-auto">({item.rating.count})</p>

                            </div>
                            <div className="price d-flex  py-3">
                                <h5>${item.price}</h5>
                            </div>
                            <div className="d-flex count mb-2">
                                <input type="number" value={item.quantity} className='me-3' />
                                <button className="btn btn-danger d-flex align-items-center" onClick={() => { remove(item) }}>

                                    {trash}
                                </button>
                            </div>
                            {/* <button className="btn btn-warning"></button> */}
                        </div>
                    </div>
                </div>
            )
        })
    }
    return (
        <div className=''>
            {displayitem()}
            <div className='my-2 d-flex justify-content-center' >
                <h3>Total price : {total}</h3>
            </div>
            <div className='my-2 d-flex justify-content-center' >
                <button className="btn btn-primary" disabled={total===0} onClick={()=>{alert('no payment option yet')}}>Pay now</button>
            </div>

        </div>
    )
}
