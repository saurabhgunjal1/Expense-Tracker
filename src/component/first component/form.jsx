import React, { useState, useEffect } from "react";
import "./form.css";
import { Modal } from "../modal/modal";
import { Walletmodal } from "../modal/walletmodal";
import PieChartComponent from "../piechart/Piachart";

export default function Form({ transaction, setTransaction, expense, categoryTotals }) {
    const [openModal, setopenModal] = useState(false);
    const [openwalletModal, setwalletmodel] = useState(false);
    const [walletBalance, setwalletBalance] = useState(5000);
    const [updatedbalance, setupdatedbalance] = useState(null);

    const updateWalletBalance = (balance) => {
        setwalletBalance((previous) => parseInt(previous) + parseInt(balance));
    };

    useEffect(() => {
        setupdatedbalance(walletBalance - expense);
    }, [walletBalance, expense]);

    localStorage.setItem('updatedbalance', updatedbalance);

    return (
        <div className="maindiv">
            <div className="walletbalance">
                <h2>
                    Wallet Balance:
                    <span style={{ color: "#9AF959" }}>₹{walletBalance - expense}</span>
                </h2>
                <button
                    onClick={() => {
                        setwalletmodel(true);
                    }}
                >
                    +Add Income
                </button>
                {openwalletModal && (
                    <Walletmodal
                        closewalletModal={setwalletmodel}
                        updateWalletBalance={updateWalletBalance}
                    />
                )}
            </div>
            <div className="walletbalance">
                <h2>
                    Expenses:<span style={{ color: "#E4B658" }}>₹{expense}</span>
                </h2>
                <button
                    onClick={() => {
                        setopenModal(true);
                    }}
                    style={{ background: "linear-gradient(90deg, #FF9595, #FF4747, #FF3838)" }}
                >
                    +Add Expenses
                </button>
                {openModal && (
                    <Modal
                        closeModal={setopenModal}
                        transaction={transaction}
                        setTransaction={setTransaction}
                        walletBalance={walletBalance}
                        updatedbalance={updatedbalance}
                    />
                )}
            </div>
            <div className="piecompdiv">
                <PieChartComponent data={Object.entries(categoryTotals).map(([category, value]) => ({ name: category, value }))} />
            </div>
        </div>
    );
}
