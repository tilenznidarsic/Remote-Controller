import React, { Component } from "react"
import "../styles/CreateProfile.css"


export default class CreateProfile extends Component {
    constructor() {
        super()
    }

    createProfile = () => {
        // I suck :)
        var compName = document.getElementById("computer-name").value
        var addressIP = document.getElementById("ip-address").value
        var portNum = document.getElementById("port-number").value
        var compOS = document.getElementById("computer-os").value

        if (compName == "" || addressIP == "" || portNum == "" || compOS == "") {
            document.getElementById("error-msg").innerHTML = "Empty Field!"
            return
        }

        // returns array
        if (localStorage.getItem("profiles")) {
            var profileObject = JSON.parse(localStorage.getItem("profiles"))
            profileObject.push({ computerName: compName, ip: addressIP, port: portNum, os: compOS })
            localStorage.setItem("profiles", JSON.stringify(profileObject))
            window.location.replace("/profiles")
        }
        else {
            var newObject = [{ computerName: compName, ip: addressIP, port: portNum, os: compOS }]
            localStorage.setItem("profiles", JSON.stringify(newObject))
            window.location.replace("/profiles")
        }
    }

    render() {
        return (
            <div className="create-profile">
                <div id="error-msg" style={{ color: "red" }}></div>
                <form>
                    <label htmlFor="computer-name">Computer name:</label>
                    <input type="text" name="computer-name" id="computer-name" />
                    <label htmlFor="ip-address">IP address:</label>
                    <input type="text" name="ip-address" id="ip-address" />
                    <label htmlFor="port-number">Port:</label>
                    <input type="text" name="port-number" id="port-number" defaultValue="8080" />
                    <select id="computer-os">
                        <option selected>Windows</option>
                        <option>Linux</option>
                    </select>
                    <input type="button" value="CREATE" onClick={() => this.createProfile()} />
                </form>
            </div>
        )
    }
}