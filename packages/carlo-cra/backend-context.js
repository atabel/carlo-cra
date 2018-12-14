import * as React from "react";

const Context = React.createContext(null);
const BackendProvider = Context.Provider;

Context.Provider = class extends React.Component {
  componentDidMount() {
    window.carlo.loadParams().then(params => {
      this.setState({ backend: params[0] });
    });
  }

  render() {
    const { backend } = this.state || {};

    if (!backend) {
      return null;
    }

    return React.createElement(
      BackendProvider,
      { value: backend },
      this.props.children
    );
  }
};

export default Context;
