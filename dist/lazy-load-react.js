'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lazyme = exports.importLazy = exports.LazilyLoadFactory = exports.LazilyLoad = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * https://doc.webpack-china.org/guides/lazy-load-react/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var LazilyLoad = exports.LazilyLoad = function (_React$Component) {
  _inherits(LazilyLoad, _React$Component);

  function LazilyLoad() {
    _classCallCheck(this, LazilyLoad);

    var _this = _possibleConstructorReturn(this, (LazilyLoad.__proto__ || Object.getPrototypeOf(LazilyLoad)).apply(this, arguments));

    _this.state = {
      isLoaded: false
    };
    return _this;
  }

  _createClass(LazilyLoad, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.load(this.props);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._isMounted = true;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(next) {
      if (next.modules === this.props.modules) return null;
      this.load(next);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._isMounted = false;
    }
  }, {
    key: 'load',
    value: function load(props) {
      var _this2 = this;

      this.setState({
        isLoaded: false
      });

      var modules = props.modules;

      var keys = Object.keys(modules);

      Promise.all(keys.map(function (key) {
        return modules[key]();
      })).then(function (values) {
        return keys.reduce(function (agg, key, index) {
          agg[key] = values[index];
          return agg;
        }, {});
      }).then(function (result) {
        if (!_this2._isMounted) return null;
        _this2.setState({ modules: result, isLoaded: true });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state.isLoaded) return null;
      return _react2.default.Children.only(this.props.children(this.state.modules));
    }
  }]);

  return LazilyLoad;
}(_react2.default.Component);

LazilyLoad.propTypes = {
  children: _react2.default.PropTypes.func.isRequired
};

var LazilyLoadFactory = exports.LazilyLoadFactory = function LazilyLoadFactory(Component, modules) {
  return function (props) {
    return _react2.default.createElement(
      LazilyLoad,
      { modules: modules },
      function (mods) {
        return _react2.default.createElement(Component, _extends({}, mods, props));
      }
    );
  };
};

var importLazy = exports.importLazy = function importLazy(promise) {
  return promise.then(function (result) {
    return result.default;
  });
};

var lazyme = exports.lazyme = function lazyme(getModule) {
  return function (props) {
    return _react2.default.createElement(
      LazilyLoad,
      { modules: {
          Module: function Module() {
            return importLazy(getModule());
          }
        } },
      function (_ref) {
        var Module = _ref.Module;
        return _react2.default.createElement(Module, props);
      }
    );
  };
};

exports.default = lazyme;
