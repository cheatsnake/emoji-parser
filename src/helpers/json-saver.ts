import { IEmoji } from "./emoji-data-validator";

const fs = require("fs");

export function jsonSaver(data: IEmoji[], category: string) {
    const groups: string[] = [];

    fs.mkdir(`data/${category}`, { recursive: true }, (err: Error) => {
        if (err) throw err;
        console.log(`Folder ${category} created.`);
    });

    data.forEach((el, i) => {
        if (!groups.includes(el.group)) groups.push(el.group);

        fs.appendFileSync(
            `data/${category}/${el.group.replace(/\s/g, "_") || category}.json`,
            `"${i}":${JSON.stringify(el)},`,
            (err: Error) => {
                if (err) throw err;
            }
        );
    });

    groups.forEach((group) => {
        const jsonString = fs
            .readFileSync(`data/${category}/${group}.json`, (err: Error) => {
                if (err) throw err;
            })
            .toString()
            .slice(0, -1);

        fs.writeFileSync(
            `data/${category}/${group}.json`,
            `{${jsonString}}`,
            (err: Error) => {
                if (err) throw err;
            }
        );
    });
}

export function clearData() {
    try {
        fs.rmdirSync("data");
    } catch (e) {
        console.log(e);
    }
}
