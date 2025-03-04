const tem = window.location.search.substr(5);
let temc = getCookie("temc");

if (tem) {
  setCookie("temc", tem, 1); // เลข 1 คือหมดอายุ 1 วัน
  document.write(`<link rel=\"stylesheet\" href=\"/src/style/style` + tem + `.css\">`)
} else {
  setCookie("temc", temd, 1); // เลข 1 คือหมดอายุ 1 วัน
  document.write(`<link rel=\"stylesheet\" href=\"/src/style/style` + temd + `.css\">`)
}


// const uslca = document.cookie;
// document.write("(Used cookie = " +  uslc + ")<br>"); // for Test
// document.write("(All cookie = " +  uslca + ")"); // for Test
// document.cookie = "uslc=" + uslc + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";