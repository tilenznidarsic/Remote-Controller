import React, { Component } from "react"
import "../styles/Header.css"


class Header extends Component {

    render() {
        const parsedProfile = JSON.parse(localStorage.getItem("connectedAddress")) || {}

        return (
            <div className="header" onClick={() => window.location.replace("/")}>
                <div className="title-box">
                    <h1>remote ({parsedProfile.computerName})</h1>
                </div>
                <div className="icon-box">
                    {
                        this.props.connection ?
                            <img src="https://img.icons8.com/color/48/000000/wi-fi-connected.png" />
                            :
                            <img src="https://img.icons8.com/flat_round/64/000000/wi-fi-disconnected.png" />
                    }
                    {
                        this.props.status.mute ?
                            <img src="https://img.icons8.com/flat_round/64/000000/mute.png" />
                            :
                            null
                    }
                </div>
                <div className="variable-box">
                    {this.props.status.audio_level}
                </div>
                <div className="msg-box">
                    Click here for REMOTE!
                </div>
            </div>
        )
    }
}


export default Header