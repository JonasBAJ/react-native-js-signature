declare const _default: "\n  window.onerror = function(message, url, line, column, error) {\n    executeNativeFunction('jsError', {message: message, url: url, line: line, column: column});\n  };\n";
export default _default;
