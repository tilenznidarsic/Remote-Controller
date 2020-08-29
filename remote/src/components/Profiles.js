import React, { Component } from "react"
import ComputerProfile from "./ComputerProfile"
import "../styles/Profiles.css"
import { Link } from "react-router-dom"


function checkProfileLen() {
    if (JSON.parse(localStorage.getItem("profiles")) != null && JSON.parse(localStorage.getItem("profiles")).length >= 3) {
        return false
    }
    return true
}

class Profiles extends Component {

    render() {

        var profiles = JSON.parse(localStorage.getItem("profiles")) || []

        return (
            <div className="profiles">
                {profiles.map((item, index) => {
                    return <ComputerProfile profile={item} key={`item-${index}`} />
                })}
                {
                    checkProfileLen() ?
                        <Link to="/create" id="create-button">NEW</Link>
                        :
                        null
                }
            </div>
        )
    }
}


export default Profiles