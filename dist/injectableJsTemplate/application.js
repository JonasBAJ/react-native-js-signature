"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function content(minWidth, maxWidth, dotSize, penColor, backgroundColor, dataURL) {
    return "\n    var showSignaturePad = function (signaturePadCanvas, bodyWidth, bodyHeight) {\n      /*We're rotating by 90% -> Flip X and Y*/\n      /*var width = bodyHeight;\n      var height = bodyWidth;*/\n\n      var width = bodyWidth;\n      var height = bodyHeight;\n\n      var sizeSignaturePad = function () {\n        var devicePixelRatio = 1; /*window.devicePixelRatio || 1;*/\n        var canvasWidth = width * devicePixelRatio;\n        var canvasHeight = height * devicePixelRatio;\n        signaturePadCanvas.width = canvasWidth;\n        signaturePadCanvas.height = canvasHeight;\n        signaturePadCanvas.getContext('2d').scale(devicePixelRatio, devicePixelRatio);\n      };\n\n      var finishedStroke = function(base64DataUrl) {\n        executeNativeFunction('finishedStroke', {base64DataUrl: base64DataUrl});\n      };\n\n      var enableSignaturePadFunctionality = function () {\n        var signaturePad = new SignaturePad(signaturePadCanvas, {\n          dotSize: " + dotSize + ",\n          minWidth: " + minWidth + ",\n          maxWidth: " + maxWidth + ",\n          penColor: '" + (penColor || "black") + "',\n          backgroundColor: '" + (backgroundColor || "white") + "',\n          onEnd: function() { finishedStroke(signaturePad.toDataURL()); }\n        });\n        /* signaturePad.translateMouseCoordinates = function (point) {\n          var translatedY = point.x;\n          var translatedX = width - point.y;\n          point.x = translatedX;\n          point.y = translatedY;\n        }; */\n        signaturePad.minWidth = 1;\n        signaturePad.maxWidth = 4;\n        if ('" + dataURL + "') {\n          signaturePad.fromDataURL('" + dataURL + "');\n        }\n      };\n\n      sizeSignaturePad();\n      enableSignaturePadFunctionality();\n    };\n\n    var bodyWidth = document.body.clientWidth;\n    var bodyHeight = document.body.clientHeight;\n    if(!bodyWidth) {\n      bodyWidth = window.innerWidth;\n    }\n    if(!bodyHeight) {\n      bodyHeight = window.innerHeight;\n    }\n\n    var canvasElement = document.querySelector('canvas');\n    showSignaturePad(canvasElement, bodyWidth, bodyHeight);\n  ";
}
exports.default = content;
//# sourceMappingURL=application.js.map