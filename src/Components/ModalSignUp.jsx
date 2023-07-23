import React, { useState } from 'react'
// import icons from './Icons'
import { user_icons } from '../assets/Icons'
import Register from "./Register"


export default function ModalSignUp() {

    return (
        <div>
            <button type="button" className="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal-1">
                Register
            </button>
            <div className="modal fade" id="exampleModal-1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-center" >
                            <h4 className=' d-flex justify-content-center ps-5' style={{ width: '80%' }}>Register</h4>
                            <button type="button" className="btn-close ms-auto ps-5" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Register />
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
