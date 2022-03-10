var _app = _interopRequireDefault(require("./app"))

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj } }

_app["default"].listen(_app["default"].get('port'), function () {
  console.log("Server listen on ".concat(_app["default"].get('host'), ":").concat(_app["default"].get('port')))
})
