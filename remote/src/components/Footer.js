import React from "react"
import "../styles/Footer.css"
import { Link } from "react-router-dom"


export default function Footer(props) {
    return (
        <div className="footer">
            <div className="button-item">
                <Link to="/profiles" className="not-link">SERVERS</Link>
            </div>
            <div className="button-item special-button">
                <Link to="/settings" className="not-link">SETTINGS</Link>
            </div>
        </div>
    )
}