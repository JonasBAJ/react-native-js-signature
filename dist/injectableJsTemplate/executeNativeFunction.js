"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = "\n  function executeNativeFunction(fnName, args) {\n    window.location.hash = '&executeFunction<-' + fnName + '&' + '&arguments<-' + JSON.stringify(args) + '&' + window.postMessage(JSON.stringify(args)) + '&';\n  }\n";
//# sourceMappingURL=executeNativeFunction.js.map