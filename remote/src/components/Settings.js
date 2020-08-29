import React, { Component } from "react"
import "../styles/Settings.css"


export default class Settings extends Component {

    saveSettings = e => {
        const { socket } = this.props
        var amountVal = document.getElementById("amount-input").value
        var beepVal = document.getElementById("beep-input").value

        var settingsObject = {
            "amount": parseInt(amountVal),
            "beep": beepVal
        }

        socket.emit("settings", JSON.stringify(settingsObject))
        window.location.replace("/")
    }

    deleteProfiles = () => {
        var dec = window.confirm("Delete ALL servers?")
        if (dec == true) {
            localStorage.removeItem("profiles")
            localStorage.removeItem("connectedAddress")
            window.location.replace("/profiles")
        }
    }

    render() {
        const { status, socket } = this.props

        return (
            <div className="settings-container">
                <form id="settings-form">
                    <label htmlFor="amount">Volume change amount:</label>
                    <input type="text" name="amount" placeholder={status.vol_change_amount} id="amount-input" />
                    <label htmlFor="beep">Beep on change:</label>
                    <select name="beep" id="beep-input">
                        {
                            status.should_beep ?
                                <React.Fragment>
                                    <option selected>True</option>
                                    <option>False</option>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <option selected>False</option>
                                    <option>True</option>
                                </React.Fragment>
                        }
                    </select>
                    <label htmlFor="delete-profiles">ONLY FOR TESTING:</label>
                    <input type="button" value="DELETE SERVERS" name="delete-profiles" onClick={() => this.deleteProfiles()}></input>
                    <label htmlFor="sync">SYNC SERVER:</label>
                    <input type="button" value="SYNC" name="sync" onClick={() => socket.emit("sync")}></input>
                    <input type="button" value="SAVE" id="save-button" onClick={() => this.saveSettings()}></input>
                </form>
            </div>
        )
    }
}