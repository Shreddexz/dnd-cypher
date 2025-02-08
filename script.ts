var offset = 0;
function setup() {
    generateCipherWheel();
    document.getElementById("input").addEventListener("input", (event) => translate());
}
function generateCipherWheel() {
    var _a, _b;
    const rows = document.getElementsByClassName("row");
    for (var r of rows)
        r.innerHTML = "";
    for (let c = 0; c < 26; c++) {
        let latinLetter = document.createElement("button");
        let cipherLetter = document.createElement("button");
        latinLetter.innerText = String.fromCharCode(c + 97);
        cipherLetter.innerText = String.fromCharCode(wrapAlpha(c + offset) + 97);
        (_a = rows[0]) === null || _a === void 0 ? void 0 : _a.appendChild(latinLetter);
        (_b = rows[1]) === null || _b === void 0 ? void 0 : _b.appendChild(cipherLetter);
    }
    translate();
}
function translate() {
    const message = document.getElementById("input").value;
    var output = "";
    [...message].forEach((c) => {
        var char = translateCharacter(c);
        if (char == null) return;
        return output += char;
    });
    document.getElementById("output").value = output;
}
function rotate(direction) {
    offset = ((offset + direction) + 26) % 26;
    generateCipherWheel();
}
function random() {
    offset = randomInt(26);
    generateCipherWheel();
}
function reset() {
    offset = 0;
    generateCipherWheel();
}
function wrapAlpha(chr) {
    return ((chr % 26) + 26) % 26;
}
function randomInt(max) {
    return Math.floor(Math.random() * max);
}
function translateCharacter(c) {
    c = c.toLowerCase();
    if (c.match(/^[.,!@£$%^&*()<>;:"'/?1234567890p\r?\n]/)) return null;
    if (c == " ") return c;
    return String.fromCharCode(wrapAlpha(c.charCodeAt(0) + offset - 97) + 97);
}
