import * as React from 'react'

import { ISignaturePadProps, IState } from './index.d'
import { StyleSheet, View, WebView } from "react-native"
import {
  application,
  errorHandler,
  nativeCodeExecutor,
  signaturePad,
} from './injectableJsTemplate'

import htmlTemplate from './htmlTemplate'

export default class SignaturePad extends React.Component<ISignaturePadProps, IState> {
  private source: string = ''
  private injectableJS: string = `${nativeCodeExecutor}${errorHandler}${signaturePad}`

  constructor(props: ISignaturePadProps) {
    super(props)
    this.state = {
      base64Data: props.dataUrl || ''
    }
  }

  /**
   * We don't use WebView's injectedJavaScript because on Android,
   * the WebView re-injects the JavaScript upon every url change.
   * Given that we use url changes to communicate signature changes
   * to the React Native app, the JS is re-injected every time a stroke is drawn.
   */
  public componentWillMount() {
    const { style, penColor, dataUrl } = this.props
    const { backgroundColor } = StyleSheet.flatten(style)
    this.injectableJS += application(penColor, backgroundColor, dataUrl)
    this.source = htmlTemplate(this.injectableJS)
  }

  public onMessage(event: any) {
    const base64DataUrl = JSON.parse(event.nativeEvent.data)
    this.bridgeFinishedStroke(base64DataUrl)
  }

  public render() {
    const { style } = this.props
    return (
      <WebView
        style={style}
        javaScriptEnabled={true}
        source={{ html: this.source }}
        onMessage={e => this.onMessage(e)}
        onError={e => this.bridgeJSError(e)}
        automaticallyAdjustContentInsets={false}
        onNavigationStateChange={e => this.onNavigationChange(e)}
      />
    )
  }

  private bridgeJSError(error: any) {
    const { onError } = this.props
    if (typeof onError === 'function') {
      onError({ error })
    }
  }

  private bridgeFinishedStroke(event: any) {
    const { onChange } = this.props
    this.setState({ base64Data: event })
    if (typeof onChange === 'function') {
      onChange(event)
    }
  }

  private onNavigationChange(event: any) {
    this.parseMessageFromWebViewNavigationChange(unescape(event.url))
  }

  private attemptToExecuteNativeFunctionFromWebViewMessage(message: any) {
    if (message.executeFunction && message.arguments) {
      const parsedArguments = JSON.parse(message.arguments)
      const reference: string = "bridge" + (message.executeFunction as string)

      const fnRef: any = reference in this ? (this as any)[reference] : null

      if (typeof fnRef === "function") {
        fnRef.apply(this, [parsedArguments])
        return true
      }
    }
    return false
  }

  /**
   * Example input:
   * applewebdata://4985ECDA-4C2B-4E37-87ED-0070D14EB985#executeFunction=jsError&arguments=%7B%22message%22:%22ReferenceError:%20Can't%20find%20variable:%20WHADDUP%22,%22url%22:%22applewebdata://4985ECDA-4C2B-4E37-87ED-0070D14EB985%22,%22line%22:340,%22column%22:10%7D"
   * All parameters to the native world are passed via a hash url where every parameter is passed as &[ParameterName]<-[Content]&
   */
  private parseMessageFromWebViewNavigationChange(newUrl: string) {
    const hashUrlIndex = newUrl.lastIndexOf("#")
    const hashUrl = newUrl.substring(hashUrlIndex)
    const decodedUrl = decodeURIComponent(hashUrl)

    if (hashUrlIndex === -1) {
      return
    }

    const regexFindAllSubmittedParameters = /&(.*?)&/g;

    const parameters: any = {};
    let parameterMatch: any = regexFindAllSubmittedParameters.exec(hashUrl);
    if (!parameterMatch) {
      return;
    }

    while (parameterMatch) {
      //For example executeFunction=jsError or arguments=...
      const parameterPair = parameterMatch[1]

      const parameterPairSplit = parameterPair.split("<-");
      if (parameterPairSplit.length === 2) {
        parameters[parameterPairSplit[0]] = parameterPairSplit[1];
      }

      parameterMatch = regexFindAllSubmittedParameters.exec(hashUrl);
    }

    if (!this.attemptToExecuteNativeFunctionFromWebViewMessage(parameters)) {
      console.warn(
        { parameters, hashUrl },
        "Received an unknown set of parameters from WebView"
      )
    }
  }
}
