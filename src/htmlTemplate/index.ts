export default function content(script: string): string {
  return `<html>
    <style>
      * {
        margin:0;
        padding:0;
      }
      canvas {
        margin-top: 0;
        margin-left: 0;
        position: absolute;
        transform: translateZ(0);
        /* In case the React Transformation is not performant, we'll fall back to this one
        transform-origin:left top;
        -ms-transform-origin:left top;
        -webkit-transform-origin:left top;
        transform:rotate(-90deg) translate(-100%, 0px);
        -ms-transform:rotate(-90deg)  translate(-100%, 0px);
        -webkit-transform:rotate(-90deg)  translate(-100%, 0px);*/
      }
    </style>
    <body>
      <canvas></canvas>
      <script>${script}</script>
    </body>
  </html>`
}
