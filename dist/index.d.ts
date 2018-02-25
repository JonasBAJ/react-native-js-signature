/// <reference types="react" />
import * as React from 'react';
import { ISignaturePadProps, IState } from './index.d';
import { NativeSyntheticEvent, WebViewMessageEventData } from "react-native";
export default class SignaturePad extends React.Component<ISignaturePadProps, IState> {
    private source;
    private injectableJS;
    constructor(props: ISignaturePadProps);
    /**
     * We don't use WebView's injectedJavaScript because on Android,
     * the WebView re-injects the JavaScript upon every url change.
     * Given that we use url changes to communicate signature changes
     * to the React Native app, the JS is re-injected every time a stroke is drawn.
     */
    componentWillMount(): void;
    onMessage(event: NativeSyntheticEvent<WebViewMessageEventData>): void;
    render(): JSX.Element;
    private finishedStrokeBridge(event);
    private onNavigationChange(event);
    private attemptToExecuteNativeFunctionFromWebViewMessage(message);
    /**
     * Example input:
     * applewebdata://4985ECDA-4C2B-4E37-87ED-0070D14EB985#executeFunction=jsError&arguments=%7B%22message%22:%22ReferenceError:%20Can't%20find%20variable:%20WHADDUP%22,%22url%22:%22applewebdata://4985ECDA-4C2B-4E37-87ED-0070D14EB985%22,%22line%22:340,%22column%22:10%7D"
     * All parameters to the native world are passed via a hash url where every parameter is passed as &[ParameterName]<-[Content]&
     */
    private parseMessageFromWebViewNavigationChange(newUrl);
    private jsErrorBridge(error);
}
