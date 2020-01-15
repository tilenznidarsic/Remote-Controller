import React, { Component } from 'react';
import './App.css';
import io from "socket.io-client"

const socket = io("http://192.168.1.109:8080")

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      bm: require("./button-map.json"),
      amount: 5,
      mute: false,
      active: "Remote App",
      volume: 50
    }
  }

  handleClick = (action, sudo, item) => { 
    const {mute, volume} = this.state
    this.setState({active: item.name})

    if (sudo && window.prompt("Password: ") === "pass") {
        socket.emit("execute", action)
    }

    if (!sudo && typeof(action) === "string") {
        socket.emit("execute", action)
        action === "plus" ? this.setState({volume: volume + 5}) : this.setState({volume: volume - 5})
    }
    else if (typeof(action) === "object") {
      if (mute) {
        socket.emit("execute", action[1])
        this.setState({mute: false})
      }
      else {
        socket.emit("execute", action[0])
        this.setState({mute: true})
      }
    }
  }

  componentDidMount() {
      //socket.emit("execute", {""})
  }

  render() {
    return (
      <div className="App">
        <div className="header">
            <h1>REMOTE</h1>
            <span>{this.state.volume}</span>
        </div>
        <div className="main">
          {this.state.bm["buttons"].map((item, index) => {
            return (
              <div className="button" key={index} onClick={() => this.handleClick(item.action, item.sudo, item)} >
                <h3>{item.name}</h3>
              </div>
            )
          })}
        </div>
        <div className="footer">
            {this.state.active}
        </div>
      </div>
    )
  }
}
