import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addcartitem, removelist, setlist } from '../Redux/Actions/Action'
import { stars } from '../assets/Icons'
import { Link, useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { app } from './Firebase'
import { ref, getDatabase, set, onValue } from 'firebase/database'
// import { setlist } from '../Redux/Reducers/MainReducers'

export default function Productlist(props) {
    const dispatch = useDispatch()
    const product_list = useSelector((state) => state.list)
    const param = useParams()
    const { user, isAuthenticated } = useAuth0()
    // console.log(param)
    // const product=useSelector((state)=>)
    const fetch_details_setlist = async () => {
        let response = await axios.get(`https://fakestoreapi.com/products${props.category !== "" ? `/category/${props.category}` : ''}`).catch((err) => {
            console.log("erro: ", err)
        })
        // let response
        // if(props.category===''){
        //     response = await axios.get('https://fakestoreapi.com/products').catch((err) => {
        //     console.log("erro: ", err)
        // })
        // }
        // else{
        //     response = await axios.get(`'https://fakestoreapi.com/products/category/jewelery`).catch((err) => {
        //     console.log("erro: ", err)
        // })
        // }
        // console.log(response.data)
        // dispatch(setlist(["hello","hi"]))

        dispatch(setlist(response.data))

    }
    // console.log(isAuthenticated + "from productlist")
    useEffect(() => {
        fetch_details_setlist()
        return () => {
            dispatch(removelist())
        }
    }, [param])

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
    const handleclick = (item) => {
        // event.stop
        dispatch(addcartitem({ ...item, quantity: 1 }))
    }

    // console.log(product_list)
    let display_list = []
    const disp = () => {
        if (product_list.length > 0) {
            display_list = product_list.map((item) => {
                return (
                    // {/* <div > */}

                    <div className="my-3 prod-class  col-lg-4 col-sm-12 col-md-6 " >
                        <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }} >

                            <div className="card  px-0  " key={item.id} style={{ height: '400px' }} >
                                <div className="d-flex justify-content-center px-2 py-2 " style={{ width: "100%", height: "50%", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1) " }}>

                                    <img src={item.image} className="card-img-top" alt="..." width="70%" height="80%" />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{item.title.length > 40 ? item.title.slice(0, 41).concat('...') : item.title}</h5>
                                    <div className="rating  d-flex">
                                        <p className="card-text mx-2">{contstars(item.rating.rate)}</p>

                                        <p className="card-text">({item.rating.count})</p>
                                    </div>
                                    <div className="price d-flex">
                                        <h5>${item.price}</h5>
                                    </div>

                                    <button className="btn btn-primary" onClick={(event) => {
                                        // event.stopPropagation();
                                        event.preventDefault()
                                        if (isAuthenticated === false)
                                            alert("You need to sign in first");
                                        else {
                                            const db = getDatabase(app)

                                            set(ref(db, `users/${user.name}/${item.id}`), { ...item, quantity: 1 })
                                            setShow('show')
                                            // handleclick(item)
                                        }
                                        
                                    }}>Add to Cart</button>
                                </div>
                                {/* </div> */}
                            </div>
                        </Link>
                    </div>

                )
            })
            return display_list
        }
    }
    const [show, setShow] = useState('')

    useEffect(() => {
        setTimeout(() => {

            setShow('')
        }, 1500);
    }, [show])

    return (
        <div className="whole d-flex justify-content-center" style={{ width: '100%' }}>
            <div className=' row ' style={{ width: '80%' }}>
                <div className={`alert alert-success alert-dismissible fixed-top fade ${show}`} role="alert">
                    <strong>Added 1 item to the cart!</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                {disp()}

            </div>
        </div>
    )
}
