"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = "\n  window.onerror = function(message, url, line, column, error) {\n    executeNativeFunction('jsError', {message: message, url: url, line: line, column: column});\n  };\n";
//# sourceMappingURL=errorHandler.js.map