import React, { useState, useEffect } from "react";
import "./transaction.css";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import { Editmodal } from "../modal/editmodal";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { PiPizza, PiGift } from "react-icons/pi"; // Import icons for Food and Entertainment
import { BsSuitcase2 } from "react-icons/bs"; // Import icon for Travel
import ExpenseBarChart from "../bar chart/BarChart";
const ITEMS_PER_PAGE = 3;

export default function Transaction({
    transaction,
    setTransaction,
    updateexpenseBalance,
    setCategoryTotals, // Ensure setCategoryTotals is passed as a prop
}) {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [editModalStates, setEditModalStates] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoryTotals, setLocalCategoryTotals] = useState({}); // Local state for categoryTotals

    useEffect(() => {
        const localItems = JSON.parse(localStorage.getItem("transactions")) || [];
        setItems(localItems);
        const modalStates = new Array(localItems.length).fill(false);
        setEditModalStates(modalStates);
        const total = localItems.reduce(
            (acc, data) => acc + parseInt(data.price),
            0
        );
        setTotal(total);
        updateexpenseBalance(total);
        localStorage.setItem("total", total);

        // Calculate total expenses for each category
        const categoryTotals = localItems.reduce((acc, item) => {
            const { category, price } = item;
            acc[category] = (acc[category] || 0) + parseFloat(price);
            return acc;
        }, {});

        setLocalCategoryTotals(categoryTotals); // Set local state
        setCategoryTotals(categoryTotals); // Pass categoryTotals up to parent
    }, [transaction]);

    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(items));
    }, [items]);

    const handleAddExpense = (newItem) => {
        const updatedItems = [...items, newItem];
        localStorage.setItem("transactions", JSON.stringify(updatedItems));
        setTransaction(updatedItems);
    };

    const handleEditExpense = (updatedItem) => {
        const updatedItems = items.map((item) => {
            if (item.id === updatedItem.id) {
                return updatedItem;
            }
            return item;
        });
        setItems(updatedItems);
        localStorage.setItem("transactions", JSON.stringify(updatedItems));
        updateTotal(updatedItems);
    };

    const handleDeleteExpense = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
        localStorage.setItem("transactions", JSON.stringify(updatedItems));
        updateTotal(updatedItems);
    };

    const updateTotal = (items) => {
        const total = items.reduce((acc, data) => acc + parseInt(data.price), 0);
        setTotal(total);
        updateexpenseBalance(total);
        localStorage.setItem("total", total);

        // Update category totals
        const categoryTotals = items.reduce((acc, item) => {
            const { category, price } = item;
            acc[category] = (acc[category] || 0) + parseFloat(price);
            return acc;
        }, {});

        setLocalCategoryTotals(categoryTotals); // Set local state
        setCategoryTotals(categoryTotals); // Pass categoryTotals up to parent
    };

    const handleEditButtonClick = (index) => {
        const newEditModalStates = [...editModalStates];
        newEditModalStates[index] = true;
        setEditModalStates(newEditModalStates);
    };

    const handleCloseEditModal = (index) => {
        const newEditModalStates = [...editModalStates];
        newEditModalStates[index] = false;
        setEditModalStates(newEditModalStates);
    };

    const handleNextPage = () => {
        if (currentPage * ITEMS_PER_PAGE < items.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const categoryIcons = {
        food: <PiPizza />,
        entertainment: <PiGift />,
        travel: <BsSuitcase2 />,
    };

    return (
        <div className="headdiv">
            <div className="transaction">
                <h2 className="heading2box">Recent Transactions</h2>
                <div>
                    <ul>
                        {paginatedItems.map((item, index) => (
                            <div key={index} className="firstdivli">
                                <div className="seconddivli">
                                    <div className="icons">
                                        <div className="cardIcon">
                                            {categoryIcons[item.category.toLowerCase()] || (
                                                <FastfoodIcon />
                                            )}
                                        </div>
                                    </div>
                                    <div className="lipdiv">
                                        <h4 className="liptag">{item.title}</h4>
                                        <p className="lip2tag">{item.date}</p>
                                    </div>
                                </div>
                                <div className="lipdivright">
                                    <p>₹{item.price}</p>
                                    <CancelRoundedIcon
                                        className="iconsright"
                                        onClick={() => handleDeleteExpense(startIndex + index)}
                                    />
                                    <button
                                        className="iconsright2"
                                        onClick={() => handleEditButtonClick(startIndex + index)}
                                    >
                                        <ModeEditOutlineRoundedIcon className="iconsright2" />
                                    </button>
                                    {editModalStates[startIndex + index] && (
                                        <Editmodal
                                            transaction={item}
                                            closeeditModal={() =>
                                                handleCloseEditModal(startIndex + index)
                                            }
                                            handleEditExpense={handleEditExpense}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </ul>
                    <div className="pagination">
                        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                            <IoIosArrowRoundBack />
                        </button>
                        <span>{currentPage}</span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage * ITEMS_PER_PAGE >= items.length}
                        >
                            <IoIosArrowRoundForward />
                        </button>
                    </div>
                </div>
            </div>
            <div className="expense">
                <h2 className="heading2box">Top Expenses</h2>
                <div className="topdiv">
                    {Object.entries(categoryTotals).length > 0 ? (
                        Object.entries(categoryTotals).map(([category, total]) => (
                            <ExpenseBarChart
                                category={category}
                                amount={total}
                                key={category}
                            />
                        ))
                    ) : (
                        <div className="empty-box">No Expenses Record</div>
                    )}
                </div>
            </div>
        </div>
    );
}
