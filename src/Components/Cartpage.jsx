import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { stars, trash } from '../assets/Icons'
import { removeitemcart } from '../Redux/Actions/Action'
import { getDatabase, onValue, ref,set,remove } from 'firebase/database'
// import {firebase} from 'firebase/app'
import { app } from './Firebase'
import { useAuth0 } from '@auth0/auth0-react'


export default function Cartpage({size}) {
    const { user, isAuthenticated } = useAuth0()
    console.log(isAuthenticated)
    const dispatch = useDispatch()
    let total = 0
    const [cart_items, setcart_items] = useState([])
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
    const removeitem = (item) => {
        const db = getDatabase(app)
        // dispatch(removeitemcart(item))
        // admin.ref(`users/${user.name}/${item.id}`).remove()
        
        let arr=Object.values(data)
        
        arr=arr.filter((it)=>it!==item)
        console.log(arr)
        // const userref=`users/${user.name}/${item.id}`
        // userref.remove().then(()=>{console.log("item removed")}).catch(()=>{
        //     console.log("some error occured")
        // })
        set(ref(db,`users/${user.name}/${item.id}`),null)
       getmydata()
        
        

    }

    let arr = []
    const [data,setData]=useState('')
    const getmydata =  () => {
        const db = getDatabase(app)

        if (isAuthenticated === true) {
            const starCountRef = ref(db, `users/${user.name}`);
             onValue(starCountRef, (snapshot) => {

                // data = snapshot.val()
                setData(snapshot.val())

            });

        }
        console.log(data)
       
    }
    // console.log(typeof(data))
    useEffect(() => {
        const fetchObjectData = async () => {
            try {
                if(data===null){
                    console.log("null value received")
                    setcart_items([])
                    return
                }
                const dataArray = Object.values(data);

                // Update the state with the new array
                if(dataArray!==null)
                setcart_items(dataArray);
                else
                setcart_items([])
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchObjectData();
    }, [data])
    useEffect(()=>{getmydata()},[])


    // const cart_items = useSelector((state) => state.cartitems)
    // console.log(cart_items)
    const displayitem = () => {
        return cart_items.map((item) => {
            total += item.quantity * item.price
            return (
                <div className='mt-5 d-flex justify-content-center' >
                    <div className="content d-flex" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1) ", width: '80%', height: `${size.height/40}rem` }}>
                        <div className="image_part px-5 pb-2 d-flex justify-content-center align-items-center" style={{ maxWidth: '50%' }}>
                            <img src={item.image} alt="..." width='100%' height='40%' />
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
                                <button className="btn btn-danger d-flex align-items-center" onClick={() => { removeitem(item) }}>

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
                <button className="btn btn-primary" disabled={total === 0} onClick={() => { alert('no payment option yet') }}>Pay now</button>
            </div>

        </div>
    )
}
