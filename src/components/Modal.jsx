import React, { useEffect, useState } from "react";
import '../utils/styles.css'

export default function Modal({ username, modal, closeModal }) {

    const name = username;

    return (
        <>
            {modal && (
                <div className="modal">
                    <div onClick={closeModal} className="overlay"></div>
                    <div className="modal-content">
                        <h2>জনাব, {name} </h2>
                        <p>
                            আপনার আবেদনটি সফলভাবে সম্পন্ন হয়েছে, খুব শীঘ্রই একজন প্রতিনিধি আপনার সাথে যোগাযোগ করবে।

                        </p>
                        <p>-ধন্যবাদ-</p>
                        <button className="close-modal" onClick={() => closeModal()}>
                            X
                        </button>
                    </div>
                </div>
            )}

        </>
    );
}