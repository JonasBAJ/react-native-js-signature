"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function content(script) {
    return "<html>\n    <style>\n      * {\n          margin:0;\n          padding:0;\n      }\n      canvas {\n        position:absolute;transform:translateZ(0);\n        /* In case the React Transformation is not performant, we'll fall back to this one\n        transform-origin:left top;\n        -ms-transform-origin:left top;\n        -webkit-transform-origin:left top;\n        transform:rotate(-90deg) translate(-100%, 0px);\n        -ms-transform:rotate(-90deg)  translate(-100%, 0px);\n        -webkit-transform:rotate(-90deg)  translate(-100%, 0px);*/\n      }\n    </style>\n    <body>\n      <canvas style=\"margin-left: 0; margin-top: 0;\"></canvas>\n      <script>" + script + "</script>\n    </body>\n  </html>";
}
exports.default = content;
//# sourceMappingURL=index.js.map