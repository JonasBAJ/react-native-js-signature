"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var injectableJsTemplate_1 = require("./injectableJsTemplate");
var htmlTemplate_1 = require("./htmlTemplate");
var SignaturePad = /** @class */ (function (_super) {
    __extends(SignaturePad, _super);
    function SignaturePad(props) {
        var _this = _super.call(this, props) || this;
        _this.source = '';
        _this.reParameters = /&(.*?)&/g;
        _this.injectableJS = "" + injectableJsTemplate_1.nativeCodeExecutor + injectableJsTemplate_1.errorHandler + injectableJsTemplate_1.signaturePad;
        _this.state = {
            base64Data: props.dataUrl || ''
        };
        return _this;
    }
    /**
     * We don't use WebView's injectedJavaScript because on Android,
     * the WebView re-injects the JavaScript upon every url change.
     * Given that we use url changes to communicate signature changes
     * to the React Native app, the JS is re-injected every time a stroke is drawn.
     */
    SignaturePad.prototype.componentWillMount = function () {
        this.initWebView(this.props);
    };
    SignaturePad.prototype.componentWillReceiveProps = function (nextProps) {
        this.initWebView(nextProps);
    };
    SignaturePad.prototype.onMessage = function (event) {
        var base64DataUrl = JSON.parse(event.nativeEvent.data);
        this.finishedStrokeBridge(base64DataUrl);
    };
    SignaturePad.prototype.render = function () {
        var _this = this;
        var style = this.props.style;
        return (<react_native_1.WebView style={style} javaScriptEnabled={true} source={{ html: this.source }} onMessage={function (e) { return _this.onMessage(e); }} onError={function (e) { return _this.jsErrorBridge(e); }} automaticallyAdjustContentInsets={false} onNavigationStateChange={function (e) { return _this.onNavigationChange(e); }}/>);
    };
    SignaturePad.prototype.initWebView = function (props) {
        var style = props.style, penColor = props.penColor, dotSize = props.dotSize, strokeMaxWidth = props.strokeMaxWidth, strokeMinWidth = props.strokeMinWidth, dataUrl = props.dataUrl;
        var backgroundColor = react_native_1.StyleSheet.flatten(style).backgroundColor;
        this.injectableJS += injectableJsTemplate_1.application(strokeMinWidth, strokeMaxWidth, dotSize, penColor, backgroundColor, dataUrl);
        this.source = htmlTemplate_1.default(this.injectableJS);
    };
    SignaturePad.prototype.onNavigationChange = function (event) {
        this.parseMessageFromWebViewNavigationChange(unescape(event.url));
    };
    SignaturePad.prototype.attemptToExecuteNativeFunctionFromWebViewMessage = function (message) {
        if (message.executeFunction && message.arguments) {
            var parsedArguments = JSON.parse(message.arguments);
            var reference = message.executeFunction + 'Bridge';
            var fnRef = reference in this
                ? this[reference]
                : null;
            if (typeof fnRef === 'function') {
                fnRef.apply(this, [parsedArguments]);
                return true;
            }
        }
        return false;
    };
    /**
     * Example input:
     * applewebdata://4985ECDA-4C2B-4E37-87ED-0070D14EB985#executeFunction=jsError&arguments=%7B%22message%22:%22ReferenceError:%20Can't%20find%20variable:%20WHADDUP%22,%22url%22:%22applewebdata://4985ECDA-4C2B-4E37-87ED-0070D14EB985%22,%22line%22:340,%22column%22:10%7D"
     * All parameters to the native world are passed via a hash url where every parameter is passed as &[ParameterName]<-[Content]&
     */
    SignaturePad.prototype.parseMessageFromWebViewNavigationChange = function (newUrl) {
        var hashUrlIndex = newUrl.lastIndexOf('#');
        if (hashUrlIndex !== -1) {
            var parameters = {};
            var hashUrl = newUrl.substring(hashUrlIndex);
            var decodedUrl = decodeURIComponent(hashUrl);
            var parameterMatch = this.parseParameters(hashUrl);
            if (parameterMatch instanceof Array && parameterMatch.length > 2) {
                while (parameterMatch) {
                    // For example executeFunction=jsError or arguments=...
                    var parameterPair = parameterMatch[1];
                    var parameterPairSplit = parameterPair.split('<-');
                    if (parameterPairSplit.length === 2) {
                        parameters[parameterPairSplit[0]] = parameterPairSplit[1];
                    }
                    parameterMatch = this.parseParameters(hashUrl);
                }
                if (!this.attemptToExecuteNativeFunctionFromWebViewMessage(parameters)) {
                    console.warn({ parameters: parameters, hashUrl: hashUrl }, 'Received an unknown set of parameters from WebView');
                }
            }
        }
    };
    SignaturePad.prototype.jsErrorBridge = function (error) {
        var onError = this.props.onError;
        if (typeof onError === 'function') {
            onError({ error: error });
        }
    };
    SignaturePad.prototype.finishedStrokeBridge = function (event) {
        var onChange = this.props.onChange;
        this.setState(event);
        if (typeof onChange === 'function') {
            onChange(event);
        }
    };
    SignaturePad.prototype.parseParameters = function (parametersUrl) {
        return this.reParameters.exec(parametersUrl);
    };
    return SignaturePad;
}(React.Component));
exports.default = SignaturePad;
//# sourceMappingURL=index.js.map