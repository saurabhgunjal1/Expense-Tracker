import React, { useState } from "react";
import style from "./walletmodal.module.css";
export function Walletmodal({ closewalletModal, updateWalletBalance }) {
    const [walletBalance, setwalletBalance] = useState("");

    const handleInputchange = (event) => {
        setwalletBalance(event.target.value);

    }

    const handlesubmit = (event) => {
        event.preventDefault();
        try {
            updateWalletBalance(walletBalance)
            closewalletModal(false);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className={style.expenseformdiv}>
            <div className={style.modalContainer2}>
                <h2 style={{ marginLeft: "25px" }}>Add Balance</h2>
                <div className={style.expenseform}>
                    <input type="text" placeholder="Income Amount" onChange={handleInputchange} />
                    <button className={style.addexpensebtn} style={{ marginLeft: "10px" }} onClick={handlesubmit}>
                        Add Balance
                    </button>
                    <button
                        className={style.cancelbtn}
                        onClick={() => closewalletModal(false)}
                        style={{ background: "#D9D9D9", marginRight: "10px" }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
