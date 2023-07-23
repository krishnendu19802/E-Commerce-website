import React, { useState } from 'react'
import { user_icons } from '../assets/Icons'
import Login from './Login'

export default function ModalLogIn() {
    // useState
    const [user, setUser] = useState({
        username: "",
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

    let handlesubmit = (event) => {

        event.preventDefault()
        if (user.password.length < 8 || user.password.length > 16) {
            setShow(prev => { return { ...prev, val: true, message: "Password must contain 8-16 characters" } })
            return
        }
        // let userlist = JSON.parse(localStorage.getItem("userdetails"))
        for (let i = 0; i < userlist.length; i++) {
            let obj = userlist[i]
            // console.log(obj)
            if (obj.username === user.username) {
                if (obj.password !== user.password)
                    setShow({ val: true, bg: 'danger', message: "Username and password don't match" })
                else {
                    setShow({ val: true, bg: 'success', message: "Logged in successfully" })
                    // let data= props.handleactive('')
                    // setInterval(() => {
                    //     clearInterval(data)
                    // }, 1500);
                    return
                }
            }


        }
        setShow({ val: true, bg: 'danger', message: "username does not exist" })

        // console.log(data)
    }

    return (
        <div className='mx-3'>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal-2">
                Log In
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal-2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header d-flex justify-content-center" >
                            <h4 className=' d-flex justify-content-center ps-5' style={{ width: '80%' }}>Login</h4>
                            <button type="button" className="btn-close ms-auto ps-5" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                           <Login/>
                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
