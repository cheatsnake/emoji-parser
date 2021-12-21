import fs from "fs";
import { IEmoji } from "../types/emoji";

export function jsonSaver(data: IEmoji[], category: string) {
    try {
        data.forEach((el, i) => {
            const jsonFileName: string = category;

            fs.appendFileSync(
                `data/${jsonFileName}.json`,
                `"${i}":${JSON.stringify(el)},`
            );
        });

        const jsonString = fs
            .readFileSync(`data/${category}.json`)
            .toString()
            .slice(0, -1);

        fs.writeFileSync(`data/${category}.json`, `{${jsonString}}`);
    } catch (error) {
        console.log(error);
    }
}
