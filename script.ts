var offset = 0;

function setup(): void {
    generateCipherWheel();
    document.getElementById("input").addEventListener("input", (event) => translate());
}

function generateCipherWheel(): void {
    const rows = document.getElementsByClassName("row");
    for (var r of rows) r!.innerHTML = "";
    for (let c = 0; c < 26; c++) {
        let latinLetter = document.createElement("button");
        let cipherLetter = document.createElement("button");
        latinLetter.innerText = String.fromCharCode(c + 97);
        cipherLetter.innerText = String.fromCharCode(wrapAlpha(c + offset) + 97);
        rows[0]?.appendChild(latinLetter);
        rows[1]?.appendChild(cipherLetter);
    }
    translate();
}

function translate(): void {
    const message = (<HTMLTextAreaElement>document.getElementById("input"))!.value;
    var output = "";
    [...message].forEach((c) => output += translateCharacter(c));
    (<HTMLTextAreaElement>document.getElementById("output"))!.value = output;
}

function rotate(direction: number): void {
    offset = ((offset + direction) + 26) % 26;
    generateCipherWheel();
}

function random(): void {
    offset = randomInt(26);
    generateCipherWheel();
}

function reset(): void {
    offset = 0;
    generateCipherWheel();
}

function wrapAlpha(chr: number): number {
    return ((chr % 26) + 26) % 26;
}

function randomInt(max): number {
    return Math.floor(Math.random() * max);
}

function translateCharacter(c: String): String {
    if (c.match(/^[ .,!@£$%^&*()<>;:"'/?1234567890]/)) return c;
    return String.fromCharCode(wrapAlpha(c.charCodeAt(0) + offset - 97) + 97);
}