import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setlist } from '../Redux/Actions/Action'
import { stars } from '../assets/Stars'
import { Link } from 'react-router-dom'
// import { setlist } from '../Redux/Reducers/MainReducers'

export default function Productlist() {

    const dispatch = useDispatch()
    const product_list = useSelector((state) => state.list)
    const fetch_details_setlist = async () => {
        const response = await axios.get('https://fakestoreapi.com/products').catch((err) => {
            console.log("erro: ", err)
        })
        // console.log(response.data)
        // dispatch(setlist(["hello","hi"]))

        dispatch(setlist(response.data))

    }
    useEffect(() => {
        fetch_details_setlist()
    }, [])

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
    // ${item.id}

    console.log(product_list)
    let display_list = []
    if (product_list.length > 0) {
        display_list = product_list.map((item) => {
            return (
                // {/* <div > */}
                <div className="my-3 col-4">
                    <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }} >
                        <div className="card  px-0  " key={item.id} style={{ height: '350px' }} >
                            <div className="d-flex justify-content-center px-2 py-2" style={{ width: "100%", height: "50%", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1) " }}>

                                <img src={item.image} className="card-img-top" alt="..." width="70%" height="80%" />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{item.title.length > 40 ? item.title.slice(0, 41).concat('...') : item.title}</h5>
                                <div className="rating  d-flex">
                                    <p className="card-text mx-2">{contstars(item.rating.rate)}</p>

                                    <p className="card-text">({item.rating.count})</p>
                                </div>

                                <button className="btn btn-primary">Add to Cart</button>
                            </div>
                            {/* </div> */}
                        </div>
                    </Link>
                </div>
            )
        })
    }


    return (
        <div className='my-2 ms-5 row ' style={{ width: '80%' }}>
            {display_list}
        </div>
    )
}
