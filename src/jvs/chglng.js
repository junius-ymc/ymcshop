const usl = window.location.search.substr(5);
let uslc = getCookie("uslc");

if (usl) {
  setCookie("uslc", usl, 1); // เลข 1 คือหมดอายุ 1 วัน
  document.write(`<script src=\"/src/jvs/lang/` + usl + `lang.js\"><\/script>`)
} else {
  setCookie("uslc", usld, 1); // เลข 1 คือหมดอายุ 1 วัน
  document.write(`<script src=\"/src/jvs/lang/` + usld + `lang.js\"><\/script>`)
}