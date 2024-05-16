import React, { useState, useEffect } from "react";
import styles from "./editmodal.module.css";

export function Editmodal({ closeeditModal, transaction, handleEditExpense }) {
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        category: "",
        date: "",
    });

    useEffect(() => {
        setFormData({
            title: transaction.title,
            price: transaction.price,
            category: transaction.category,
            date: transaction.date,
        });
    }, [transaction]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        const { title, price, category, date } = formData;
        const enteredPrice = parseInt(price);

        if (!title || !price || !category || !date) {
            alert("All fields must be filled out.");
            return;
        }

        if (enteredPrice <= 0) {
            alert("Price must be greater than zero.");
            return;
        }

        handleEditExpense({ id: transaction.id, ...formData });
        closeeditModal();
    };

    return (
        <div className={styles.expenseformdiv}>
            <div className={styles.modalContainer}>
                <h2 style={{ marginLeft: "25px" }}>Edit Expenses</h2>
                <div className={styles.expenseform}>
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="Price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                    />
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
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
                        value={formData.date}
                        onChange={handleInputChange}
                    />
                    <button
                        className={styles.addexpensebtn}
                        style={{ marginLeft: "10px" }}
                        onClick={handleSubmit}
                    >
                        Save Changes
                    </button>
                    <button
                        className={styles.cancelbtn}
                        onClick={() => closeeditModal(false)}
                        style={{ background: "#D9D9D9", marginRight: "10px" }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
