import React, { Component } from "react"
import "./Settings.css"


export default class Settings extends Component {
    constructor() {
        super()
        this.state = {
            addr: window.localStorage.getItem("addr"),
        }
    }
    
    render() {
        const {amount, beep, setServer, setAmount, setBeep} = this.props
        const {addr} = this.state

        return (
            <div className="settings-container">
                <form>
                    <label htmlFor="address">Set Server IP address: </label>
                    <input type="button" name="address" value={addr} onClick={() => {localStorage.removeItem("addr"); setServer()}}/>
                    <label htmlFor="amount">Amount of plus/minus: </label>
                    <input type="text" placeholder={amount} name="amount" onChange={(e) => setAmount(e.target.value)}/>
                    <label htmlFor="beep">Beep on change: </label>
                    <select name="beep" onChange={(e) => setBeep(e.target.value)} value={beep}>
                        <option>YES</option>
                        <option>NO</option>
                    </select>
                </form>
            </div>
        )
    }
}