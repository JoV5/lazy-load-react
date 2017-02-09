import React from 'react';

class ImLazy extends React.Component {

  constructor() {
    super(...arguments);
    this.state = {
      isLoaded: false,
    };
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillReceiveProps(next) {
    if (next.module === this.props.module) return null;
    this.load(next);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  load(props) {
    this.setState({
      isLoaded: false,
    });

    const {module} = props;

    module().then((result) => {
      if (!this._isMounted) return null;
      this.setState({module: result, isLoaded: true});
    });
  }

  render() {
    if (!this.state.isLoaded) return null;
    return <this.state.module />;
  }
}

export const importLazy = (promise) =>
  promise.then((result) => result.default);

export const lazyme = (getModule) => <ImLazy module={() => importLazy(getModule())}/>;

export const lazymeF = (getModule) => () => <ImLazy module={() => importLazy(getModule())}/>;

export default lazyme;
