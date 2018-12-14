import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import BackendContext from "carlo-cra/backend-context";

class App extends Component {
  state = { env: null };
  render() {
    const { env } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <BackendContext.Consumer>
            {backend => (
              <div>
                <button
                  onClick={async () => {
                    const env = await backend.getEnv();
                    this.setState({ env });
                  }}
                >
                  load env
                </button>
                {env && <pre>{JSON.stringify(env, null, 2)}</pre>}
              </div>
            )}
          </BackendContext.Consumer>
        </header>
      </div>
    );
  }
}

export default App;
