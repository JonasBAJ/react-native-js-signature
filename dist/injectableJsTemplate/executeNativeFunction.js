"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = "\n  function executeNativeFunction(fnName, args) {\n    window.location.hash = \n      '&executeFunction<-' + fnName + '&' + \n      '&arguments<-' + JSON.stringify(args) + \n      '&' + window.postMessage(JSON.stringify(args)) + '&';\n  }\n";
//# sourceMappingURL=executeNativeFunction.js.map