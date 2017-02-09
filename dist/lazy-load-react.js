'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lazymeF = exports.lazyme = exports.importLazy = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImLazy = function (_React$Component) {
  _inherits(ImLazy, _React$Component);

  function ImLazy() {
    _classCallCheck(this, ImLazy);

    var _this = _possibleConstructorReturn(this, (ImLazy.__proto__ || Object.getPrototypeOf(ImLazy)).apply(this, arguments));

    _this.state = {
      isLoaded: false
    };
    return _this;
  }

  _createClass(ImLazy, [{
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
      if (next.module === this.props.module) return null;
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

      var module = props.module;


      module().then(function (result) {
        if (!_this2._isMounted) return null;
        _this2.setState({ module: result, isLoaded: true });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state.isLoaded) return null;
      return _react2.default.createElement(this.state.module, null);
    }
  }]);

  return ImLazy;
}(_react2.default.Component);

var importLazy = exports.importLazy = function importLazy(promise) {
  return promise.then(function (result) {
    return result.default;
  });
};

var lazyme = exports.lazyme = function lazyme(getModule) {
  return _react2.default.createElement(ImLazy, { module: function module() {
      return importLazy(getModule());
    } });
};

var lazymeF = exports.lazymeF = function lazymeF(getModule) {
  return function () {
    return _react2.default.createElement(ImLazy, { module: function module() {
        return importLazy(getModule());
      } });
  };
};

exports.default = lazyme;
