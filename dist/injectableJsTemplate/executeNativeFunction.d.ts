declare const _default: "\n  function executeNativeFunction(fnName, args) {\n    window.location.hash = '&executeFunction<-' + fnName + '&' + '&arguments<-' + JSON.stringify(args) + '&' + window.postMessage(JSON.stringify(args)) + '&';\n  }\n";
export default _default;
