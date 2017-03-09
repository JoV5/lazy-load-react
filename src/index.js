/**
 * https://doc.webpack-china.org/guides/lazy-load-react/
 */
import React from 'react';

export const lazyme = (getModule) => {

  return class LazyComponent extends React.Component {

    state = {
      Module: undefined
    };

    componentWillMount() {
      this.load();
    }

    componentDidMount() {
      this._isMounted = true;
    }

    componentWillReceiveProps() {
      this.load();
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    load() {
      getModule().then((result) => {
        if (!this._isMounted) return null;
        this.setState({Module: result.default});
      });
    }

    render() {
      const {Module} = this.state;
      if (!Module) return null;
      return <Module {...this.props}/>;
    }
  }
};

export default lazyme;