import React from "react";
import { Toast } from "react-bootstrap";

export default function MyToast({ show, message, type }) {
    const toastCss = {
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: "9999",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
    };

    return (
        <div style={show ? toastCss : { display: "none" }}>
            <Toast
                className={`border text-white ${
                    type === "success" ? "border-success bg-success" : "border-danger bg-danger"
                }`}
                show={show}
            >
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </div>
    );
}
