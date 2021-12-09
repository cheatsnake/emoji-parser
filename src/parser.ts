import { parse } from "node-html-parser";
import fetch from "node-fetch";

async function getHTML(url: string): Promise<string | null> {
    const result = await fetch(url).then(function (res) {
        return res.text();
    });
    return result;
}

const html: Promise<string | null> =
    getHTML("https://x-math.herokuapp.com/") || "none";

// const root = parse(String(html));

// console.log(root.querySelector(".body__title"));

console.log(html);
