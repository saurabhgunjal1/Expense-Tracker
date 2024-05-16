import React, { useState } from "react";
import styled from "./modal.module.css";
import { v4 as uuidv4 } from 'uuid';

export function Modal({ closeModal, transaction, setTransaction, walletBalance, updatedbalance }) {
    const [formdata, setFormData] = useState({
        title: "",
        price: "",
        category: "",
        date: "",
    });

    const handleTransaction = (event) => {
        const { name, value } = event.target;
        setFormData((prevTransaction) => ({
            ...prevTransaction,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        const { title, price, category, date } = formdata;
        const enteredPrice = parseInt(price);

        if (!title || !price || !category || !date) {
            alert("All fields must be filled out.");
            return;
        }

        if (enteredPrice <= 0) {
            alert("Price must be greater than zero.");
            return;
        }

        if (enteredPrice > updatedbalance) {
            alert("Expense is more than balance.");
            closeModal(false);
            return;
        }

        const storedData = JSON.parse(localStorage.getItem('transactions')) || [];

        const newId = uuidv4();
        const newData = { id: newId, ...formdata };
        const updatedData = [...storedData, newData];

        localStorage.setItem('transactions', JSON.stringify(updatedData));
        setTransaction(updatedData);
        closeModal(false);
        setFormData({
            title: "",
            price: "",
            category: "",
            date: "",
        });
    };

    const handleCloseModal = () => {
        closeModal(false);
        setFormData({
            title: "",
            price: "",
            category: "",
            date: "",
        });
    };

    return (
        <div className={styled.expenseformdiv}>
            <div className={styled.modalContainer}>
                <h2 style={{ marginLeft: "25px" }}>Add Expenses</h2>
                <div className={styled.expenseform}>
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={formdata.title}
                        onChange={handleTransaction}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Price"
                        name="price"
                        value={formdata.price}
                        onChange={handleTransaction}
                        required
                    />
                    <select
                        id="category"
                        name="category"
                        value={formdata.category}
                        onChange={handleTransaction}
                        required
                    >
                        <option disabled hidden value="">
                            Select category
                        </option>
                        <option value="food">Food</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="travel">Travel</option>
                    </select>
                    <input
                        type="date"
                        placeholder="dd/mm/yyyy"
                        name="date"
                        value={formdata.date}
                        onChange={handleTransaction}
                        required
                    />
                    <button
                        className={styled.addexpensebtn}
                        style={{ marginLeft: "10px" }}
                        onClick={handleSubmit}
                    >
                        Add Expense
                    </button>
                    <button
                        className={styled.cancelbtn}
                        onClick={handleCloseModal}
                        style={{ background: "#D9D9D9", marginRight: "10px" }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
