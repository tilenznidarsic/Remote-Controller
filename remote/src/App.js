import React, { Component } from "react";
import "./App.css";
import io from "socket.io-client";
import Settings from "./components/Settings";

let socket = io(`http://${window.localStorage.getItem("addr")}`);

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            bm: require("./button-map.json"),
            amount: 10,
            mute: false,
            settings: false,
            volume: 50,
            beep: "YES"
        };
    }

    handleLock = item => {
        if (window.prompt("Password: ") === "pass") {
            socket.emit("execute", item.action);
        } else {
            window.alert("Nice try Eva!");
        }
    };

    handleSetVolume = item => {
        let level = window.prompt("Set to: ");
        level != null &&
            socket.emit("execute", item.action.replace("{}", level));
        this.setState({ volume: parseInt(level) });
    };

    handleVolume = item => {
        const { amount } = this.state;
        socket.emit("execute", item.action.replace("{}", amount));
        item.action === "plus_volume({})"
            ? this.setState(state => {
                  return { volume: (state.volume += parseInt(amount)) };
              })
            : this.setState(state => {
                  return { volume: (state.volume -= parseInt(amount)) };
              });
    };

    handleMute = item => {
        const { mute } = this.state;
        if (mute) {
            socket.emit("execute", item.action[1]);
            this.setState({ mute: false });
        } else {
            socket.emit("execute", item.action[0]);
            this.setState({ mute: true });
        }
    };

    setServer = () => {
        if (!window.localStorage.getItem("addr")) {
            window.localStorage.setItem(
                "addr",
                window.prompt("Enter server IP and PORT: ")
            );
            window.location.reload();
        }
    };

    componentDidMount() {
        this.setServer();
        setTimeout(
            () => !socket.connected && window.alert("Disconected!"),
            3000
        );
    }

    render() {
        const { settings, amount, beep, volume, mute } = this.state;
        let addr = window.localStorage.getItem("addr");

        return (
            <div className="App">
                <div
                    className="header"
                    onClick={() => console.log(socket.connected)}
                >
                    <h1>REMOTE</h1>
                    <span>{!mute ? volume : "MUTE"}</span>
                </div>
                {settings === false ? (
                    <div className="main">
                        {this.state.bm["buttons"].map((item, index) => {
                            return (
                                <div
                                    className="button"
                                    key={index}
                                    onClick={() => eval(item.func)(item)}
                                >
                                    <h3>{item.name}</h3>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <Settings
                        amount={amount}
                        beep={beep}
                        setServer={this.setServer}
                        setAmount={a => this.setState({ amount: a })}
                        setBeep={b => this.setState({ beep: b })}
                    />
                )}
                <div className="footer">
                    <button
                        onClick={() => this.setState({ settings: !settings })}
                    >
                        {settings ? "REMOTE" : "SETTINGS"}
                    </button>
                </div>
            </div>
        );
    }
}
