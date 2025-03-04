const usld = 'th'; // ตั้งภาษาให้แสดงเริ่มต้น
let uslc = getCookie("uslc");

if (uslc) {
    setCookie("uslc", uslc, 1); // เลข 1 คือหมดอายุ 1 วัน
    document.write(`<script src=\"/src/jvs/lang/` + uslc + `lang.js\"><\/script>`)
} else {
    setCookie("uslc", usld, 1); // เลข 1 คือหมดอายุ 1 วัน
    document.write(`<script src=\"/src/jvs/lang/` + usld + `lang.js\"><\/script>`)
}


//const uslca = document.cookie;
//document.write("(Used cookie = " +  uslc + ")<br>"); // for Test
//document.write("(All cookie = " +  uslca + ")"); // for Test
//document.cookie = "uslc=" + uslc + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";