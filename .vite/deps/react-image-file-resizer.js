import {
  __commonJS
} from "./chunk-PR4QN5HX.js";

// node_modules/react-image-file-resizer/build/index.js
var require_build = __commonJS({
  "node_modules/react-image-file-resizer/build/index.js"(exports, module) {
    (() => {
      "use strict";
      var e = { d: (t2, a2) => {
        for (var r2 in a2) e.o(a2, r2) && !e.o(t2, r2) && Object.defineProperty(t2, r2, { enumerable: true, get: a2[r2] });
      }, o: (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2), r: (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      } }, t = {};
      function a(e2, t2) {
        for (var a2 = 0; a2 < t2.length; a2++) {
          var r2 = t2[a2];
          r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(e2, r2.key, r2);
        }
      }
      e.r(t), e.d(t, { default: () => n });
      var r = function() {
        function e2() {
          !function(e3, t3) {
            if (!(e3 instanceof t3)) throw new TypeError("Cannot call a class as a function");
          }(this, e2);
        }
        var t2, r2;
        return t2 = e2, r2 = [{ key: "changeHeightWidth", value: function(e3, t3, a2, r3, n2, i) {
          return a2 > r3 && (e3 = Math.round(e3 * r3 / a2), a2 = r3), e3 > t3 && (a2 = Math.round(a2 * t3 / e3), e3 = t3), n2 && a2 < n2 && (e3 = Math.round(e3 * n2 / a2), a2 = n2), i && e3 < i && (a2 = Math.round(a2 * i / e3), e3 = i), { height: e3, width: a2 };
        } }, { key: "resizeAndRotateImage", value: function(e3, t3, a2, r3, n2) {
          var i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "jpeg", o = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 100, l = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : 0, h = o / 100, g = document.createElement("canvas"), u = e3.width, d = e3.height, c = this.changeHeightWidth(d, a2, u, t3, r3, n2);
          !l || 90 !== l && 270 !== l ? (g.width = c.width, g.height = c.height) : (g.width = c.height, g.height = c.width), u = c.width, d = c.height;
          var s = g.getContext("2d");
          return s.fillStyle = "rgba(0, 0, 0, 0)", s.fillRect(0, 0, u, d), s.imageSmoothingEnabled && s.imageSmoothingQuality && (s.imageSmoothingQuality = "high"), l && (s.rotate(l * Math.PI / 180), 90 === l ? s.translate(0, -g.width) : 180 === l ? s.translate(-g.width, -g.height) : 270 === l ? s.translate(-g.height, 0) : 0 !== l && 360 !== l || s.translate(0, 0)), s.drawImage(e3, 0, 0, u, d), g.toDataURL("image/".concat(i), h);
        } }, { key: "b64toByteArrays", value: function(e3, t3) {
          t3 = t3 || "image/jpeg";
          for (var a2 = atob(e3.toString().replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "")), r3 = [], n2 = 0; n2 < a2.length; n2 += 512) {
            for (var i = a2.slice(n2, n2 + 512), o = new Array(i.length), l = 0; l < i.length; l++) o[l] = i.charCodeAt(l);
            var h = new Uint8Array(o);
            r3.push(h);
          }
          return r3;
        } }, { key: "b64toBlob", value: function(e3, t3) {
          var a2 = this.b64toByteArrays(e3, t3);
          return new Blob(a2, { type: t3, lastModified: /* @__PURE__ */ new Date() });
        } }, { key: "b64toFile", value: function(e3, t3, a2) {
          var r3 = this.b64toByteArrays(e3, a2);
          return new File(r3, t3, { type: a2, lastModified: /* @__PURE__ */ new Date() });
        } }, { key: "createResizedImage", value: function(t3, a2, r3, n2, i, o, l) {
          var h = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : "base64", g = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : null, u = arguments.length > 9 && void 0 !== arguments[9] ? arguments[9] : null, d = new FileReader();
          if (!t3) throw Error("File Not Found!");
          if (t3.type && !t3.type.includes("image")) throw Error("File Is NOT Image!");
          d.readAsDataURL(t3), d.onload = function() {
            var c = new Image();
            c.src = d.result, c.onload = function() {
              var d2 = e2.resizeAndRotateImage(c, a2, r3, g, u, n2, i, o), s = "image/".concat(n2);
              switch (h) {
                case "blob":
                  var f = e2.b64toBlob(d2, s);
                  l(f);
                  break;
                case "base64":
                  l(d2);
                  break;
                case "file":
                  var b = t3.name.toString().replace(/(png|jpeg|jpg|webp)$/i, "").concat(n2.toString()), v = e2.b64toFile(d2, b, s);
                  l(v);
                  break;
                default:
                  l(d2);
              }
            };
          }, d.onerror = function(e3) {
            throw Error(e3);
          };
        } }], null, r2 && a(t2, r2), e2;
      }();
      const n = { imageFileResizer: function(e2, t2, a2, n2, i, o, l, h, g, u) {
        return r.createResizedImage(e2, t2, a2, n2, i, o, l, h, g, u);
      } };
      module.exports = t;
    })();
  }
});
export default require_build();
//# sourceMappingURL=react-image-file-resizer.js.map
