import fetch from "node-fetch";
import { parse } from "node-html-parser";

const pageUrl = "https://x-math.herokuapp.com";

const html = fetchHTML(pageUrl);
// const dom = parse(html);

async function fetchHTML(url: string) {
    const result = await fetch(url)
        .then((res) => res.text())
        .then((text) => {
            return text;
        });

    return result;
}

console.log(html);
