import React, { useEffect, useState } from 'react'
// import icons from './Icons'
import { user_icons } from '../assets/Icons'

export default function Login(props) {
    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const [active, setActive] = useState("")
    const [show, setShow] = useState({
        val: false,
        message: "",
        bg:'danger'
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
    useEffect(()=>{
        if(show.val===true){
            setTimeout(() => {
                setShow({...show,val:false})
            }, 1500);
        }
    },[show])

    let handlesubmit = (event) => {

        event.preventDefault()
        if (user.password.length < 8 || user.password.length > 16) {
            setShow(prev => { return { ...prev,val: true, message: "Password must contain 8-16 characters" } })
            return
        }
        // let userlist = JSON.parse(localStorage.getItem("userdetails"))
        for (let i = 0; i < userlist.length; i++) {
            let obj = userlist[i]
            // console.log(obj)
            if (obj.username === user.username) {
                if (obj.password !== user.password)
                    setShow({ val: true,bg:'danger', message: "Username and password don't match" })
                else {
                    setShow({ val: true,bg:'success', message: "Logged in successfully" })
                        // let data= props.handleactive('')
                    // setInterval(() => {
                    //     clearInterval(data)
                    // }, 1500);
                    return
                }
            }


        }
        setShow({ val: true, bg:'danger',message: "username does not exist" })

        // console.log(data)
    }
// user_icons
    //    {console.log(user_icons.username)}
    return (
        <>
            <form onSubmit={handlesubmit} >
                {show.val && <div class={`alert alert-${show.bg} alert-dismissible fade show`} role="alert">
                    <strong>{show.message}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>{setShow(prev=>{
                        return {...prev,val:false,bg:'danger',message:''}
                    })}}></button>
                </div>}



                <div className="d-flex justify-content-center align-items-center my-3 fs-5">
                    <label htmlFor="username" className=' rounded-start-5 d-flex justify-content-center align-items-center' style={{ ...st, width: '40px' }}>{user_icons.username}</label>
                    <input type="text" id="username" className='rounded-5' placeholder='Username' style={{ ...st, width: '70%' }} name='username' value={user.username} onChange={handledata} required />

                </div>

                <div className="d-flex  justify-content-center align-items-center my-3 fs-5">
                    <label htmlFor="username" className=' rounded-start-5 d-flex justify-content-center align-items-center' style={{ ...st, width: '40px' }}>{user_icons.password}</label>
                    <input type="password" id="username" className={`${(active === 'password' && user.password.length < 8 || user.password.length > 16) ? 'border border-danger border-5' : ''} rounded-5`} placeholder='password' style={{ ...st, width: '70%' }} name="password" value={user.password} onChange={handledata} required />

                </div>
                <div className=" mx-5 d-flex justify-content-end">
                    <a href="/" style={{ textDecoration: 'none' }}>Forgot password?</a>
                </div>

                <div className=" mx-5 d-flex justify-content-center align-items-center">
                    <button className="btn btn-success btn-large">Submit</button>
                </div>
            </form>
        </>
    )
}
