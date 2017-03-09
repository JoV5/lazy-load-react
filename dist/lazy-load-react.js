'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lazyme = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * https://doc.webpack-china.org/guides/lazy-load-react/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var lazyme = exports.lazyme = function lazyme(getModule) {

  return function (_React$Component) {
    _inherits(LazyComponent, _React$Component);

    function LazyComponent() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, LazyComponent);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LazyComponent.__proto__ || Object.getPrototypeOf(LazyComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        Module: undefined
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(LazyComponent, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.load();
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this._isMounted = true;
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps() {
        this.load();
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this._isMounted = false;
      }
    }, {
      key: 'load',
      value: function load() {
        var _this2 = this;

        getModule().then(function (result) {
          if (!_this2._isMounted) return null;
          _this2.setState({ Module: result.default });
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var Module = this.state.Module;

        if (!Module) return null;
        return _react2.default.createElement(Module, this.props);
      }
    }]);

    return LazyComponent;
  }(_react2.default.Component);
};

exports.default = lazyme;
