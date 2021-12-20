import fs from "fs";
import { IEmoji } from "../types/emoji";

export function jsonSaver(data: IEmoji[], category: string) {
    try {
        const groups: string[] = [];

        fs.mkdir(`data/${category}`, { recursive: true }, (err: Error) => {
            if (err) throw err;
            console.log(`Folder ${category} created.`);
        });

        data.forEach((el, i) => {
            const jsonFileName: string =
                el.group.replace(/\s/g, "_") || category;

            if (!groups.includes(jsonFileName)) groups.push(jsonFileName);

            fs.appendFileSync(
                `data/${category}/${jsonFileName}.json`,
                `"${i}":${JSON.stringify(el)},`
            );
        });

        groups.forEach((group) => {
            const jsonString = fs
                .readFileSync(`data/${category}/${group}.json`)
                .toString()
                .slice(0, -1);

            fs.writeFileSync(
                `data/${category}/${group}.json`,
                `{${jsonString}}`
            );
        });
    } catch (error) {
        console.log(error);
    }
}
