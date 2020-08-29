import React, { Component } from "react"
import "../styles/ComputerProfile.css"


class ComputerProfile extends Component {
    constructor() {
        super()
        this.state = {
            connected: false
        }
    }

    handleClick = () => {
        const { profile } = this.props
        localStorage.setItem("connectedAddress", JSON.stringify(profile))
        window.location.reload()
    }

    componentDidMount() {
        var parsedProfile = JSON.parse(localStorage.getItem("connectedAddress")) || {}
        if (parsedProfile.ip == this.props.profile.ip) {
            this.setState({ connected: true })
        }
    }

    render() {
        const { profile } = this.props
        var win = "linear-gradient(to right, #00adff , #0082be)"
        var ubt = "linear-gradient(to right, #E95420 , #c23200)"
        var osIcon = profile.os == "Windows" ?
            <img src="https://img.icons8.com/metro/26/000000/windows-logo.png" />
            :
            <img src="https://img.icons8.com/ios-filled/30/000000/linux.png" />

        return (
            <div className="computer-profile"
                style={{
                    background: profile.os == "Windows" ?
                        win
                        :
                        ubt,
                    border: this.state.connected ?
                        "2px solid lightgreen"
                        :
                        null
                }}
                onClick={() => this.handleClick()
                }>
                <h1>{profile.computerName}</h1>
                <span>{profile.os} {osIcon}</span>
                <div className="address">
                    {profile.ip}:{profile.port}
                </div>
            </ div >
        )
    }
}


export default ComputerProfile