import React, { useEffect, useState } from 'react'
// import icons from './Icons'
import { user_icons } from '../assets/Icons'
import { Link } from 'react-router-dom'
import GoogleButton from 'react-google-button'
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth'
import { auth } from './Firebase'


export default function Login(props) {
    const [user, setUser] = useState({
        mail: "",
        password: ""
    })

    const [active, setActive] = useState("")
    const [show, setShow] = useState({
        val: false,
        message: "",
        bg: 'danger'
    })

    let st = {
        height: '60px',
        padding: '10px'
    }

    let handledata = (event) => {
        if (event.target.name !== active && active != 'password')
            setActive(event.target.name)
        setUser(prev => { return { ...prev, [event.target.name]: event.target.value } })
    }
    useEffect(() => {
        if (show.val === true) {
            setTimeout(() => {
                setShow({ ...show, val: false })
            }, 1500);
        }
    }, [show])

    let handlesubmit = async(event) => {

        event.preventDefault()
        if (user.password.length < 8 || user.password.length > 16) {
            setShow(prev => { return { ...prev, val: true, message: "Password must contain 8-16 characters" } })
            return
        }
        // let userlist = JSON.parse(localStorage.getItem("userdetails"))
        try {
           await signInWithEmailAndPassword(auth,user.mail,user.password)
            setShow({ val: true, bg: 'success', message: "Logged in successfully" })
        } catch (error) {
            console.log("error: ",error)
        setShow({ val: true, bg: 'danger', message: "Error occured" })

        }


        
        // setShow({ val: true, bg: 'danger', message: "mail does not exist" })

        // console.log(data)
    }
    // user_icons
    //    {console.log(user_icons.mail)}

    const handlegooglesubmit=async()=>{
        const googleAuthProvider=new GoogleAuthProvider()
        await signInWithPopup(auth,googleAuthProvider)
    }
    return (
        <>
            <form onSubmit={handlesubmit} >
                {show.val && <div class={`alert alert-${show.bg} alert-dismissible fade show`} role="alert">
                    <strong>{show.message}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => {
                        setShow(prev => {
                            return { ...prev, val: false, bg: 'danger', message: '' }
                        })
                    }}></button>
                </div>}



                <div className="d-flex justify-content-center align-items-center my-3 fs-5">
                    <label htmlFor="mail" className=' rounded-start-5 d-flex justify-content-center align-items-center' style={{ ...st, width: '40px' }}>{user_icons.mail}</label>
                    <input type="email" id="mail" className='rounded-5' placeholder='mail' style={{ ...st, width: '70%' }} name='mail' value={user.mail} onChange={handledata} required />

                </div>

                <div className="d-flex  justify-content-center align-items-center my-3 fs-5">
                    <label htmlFor="mail" className=' rounded-start-5 d-flex justify-content-center align-items-center' style={{ ...st, width: '40px' }}>{user_icons.password}</label>
                    <input type="password" id="mail" className={`${(active === 'password' && user.password.length < 8 || user.password.length > 16) ? 'border border-danger border-5' : ''} rounded-5`} placeholder='password' style={{ ...st, width: '70%' }} name="password" value={user.password} onChange={handledata} required />

                </div>
                <div className=" mx-5 d-flex justify-content-end">
                    <Link href="/" style={{ textDecoration: 'none' }}>Forgot password?</Link>
                </div>
                <div className="d-flex justify-content-center">

                    <button className="btn btn-success btn-large rounded" >Submit</button>
                </div>
                <hr />
                <div className=" mx-5 d-flex justify-content-center align-items-center">
                    <GoogleButton className='my-2' onClick={handlegooglesubmit}></GoogleButton>

                </div>

            </form>
        </>
    )
}
