const temd = '1'; // ตั้งธีมให้แสดงเริ่มต้น
let temc = getCookie("temc");

if (temc) {
    setCookie("temc", temc, 1); // เลข 1 คือหมดอายุ 1 วัน
    document.write(`<link rel=\"stylesheet\" href=\"/src/style/style` + temc + `.css\">`)
} else {
    setCookie("temc", temd, 1); // เลข 1 คือหมดอายุ 1 วัน
    document.write(`<link rel=\"stylesheet\" href=\"/src/style/style` + temd + `.css\">`)
}
