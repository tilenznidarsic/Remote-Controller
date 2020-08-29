import React, { Component } from "react";
import "./styles/App.css";
import io from "socket.io-client";
import Settings from "./components/Settings";
import Header from "./components/Header"
import RemoteButton from "./components/RemoteButton";
import Profiles from "./components/Profiles"
import Footer from "./components/Footer"
import CreateProfile from "./components/CreateProfile";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


let parsedAddress = JSON.parse(window.localStorage.getItem("connectedAddress")) || ""
let socket = io(`http://${parsedAddress.ip + ":" + parsedAddress.port}`);


export default class App extends Component {
    constructor() {
        super();
        this.state = {
            connection: true,
            status: {}
        };
    }

    exe = val => {
        socket.emit("execute", val)
        socket.emit("status")
    }

    componentDidMount() {

        setInterval(
            () => !socket.connected && this.setState({ connection: false }),
            3000
        );

        socket.on("reply", (msg) => {
            this.setState({ status: JSON.parse(msg) })
        })

        socket.emit("status")
    }

    render() {
        const buttonMap = require("./button-map.json")

        return (
            <Router>
                <div className="app">
                    <Header connection={this.state.connection} status={this.state.status} />
                    <div className="main">
                        <Switch>
                            <Route exact path="/">
                                <div className="button-grid">
                                    {buttonMap.map((item, index) => {
                                        return <RemoteButton
                                            socket={socket}
                                            item={item}
                                            key={`remote-button - ${index} `}
                                        />
                                    })}
                                </div>
                            </Route>
                            <Route path="/profiles">
                                <Profiles />
                            </Route>
                            <Route path="/create">
                                <CreateProfile />
                            </Route>
                            <Route path="/settings">
                                <Settings socket={socket} status={this.state.status} />
                            </Route>
                        </Switch>
                    </div>
                    <Footer />
                </div >
            </Router>
        );
    }
}
