import React, { Component } from "react"
import "../styles/RemoteButton.css"


class RemoteButton extends Component {

    generateFunc = (data) => {
        // ** -> password {} -> amount/value
        // buttons are limited to one parameter value with no type indication
        const { socket, item } = this.props

        var command = data

        if (item.permission) {
            var pwd = window.prompt("Enter password: ")
            command = command.replace("**", pwd)
        }
        if (item.amount) {
            var value = window.prompt("Enter value: ")
            command = command.replace("{}", value)
        }

        socket.emit("execute", command)
        socket.emit("status")
    }

    render() {
        const { item } = this.props

        return (
            <div
                className="remote-button"
                style={{ background: item.bg, color: item.color }}
                onClick={() => this.generateFunc(item.action)}
            >
                {item.name}
            </ div>
        )
    }
}


export default RemoteButton