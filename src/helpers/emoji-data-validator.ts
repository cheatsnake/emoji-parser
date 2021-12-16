import { IEmoji } from "../types/emoji";

export function emojiDataValidator(data: string[][], category: string) {
    const result: IEmoji[] = [];
    data.forEach((el) => {
        const group: string =
            groupValidator(el[0]) || categoryValidator(category);

        for (let i = 1; i < el.length; i++) {
            const params = new URLSearchParams(el[i]);
            const name: string = nameValidator(params.get("unicodeName"));
            const htmlCode: string[] = htmlCodeValidator(params.get("decimal"));
            const unicode: string[] = unicodeValidator(
                params.get("hexadecimal")
            );

            const emoji: IEmoji = {
                category: categoryValidator(category),
                group,
                name,
                htmlCode,
                unicode,
            };

            result.push(emoji);
        }
    });
    return result;
}

function nameValidator(name: string): string {
    let result: string = name;
    if (name.includes("_")) result = name.replace(/_/g, " ");
    return result.toLocaleLowerCase();
}

function htmlCodeValidator(code: string): string[] {
    const codes: string[] = code.split(",");
    const result: string[] = [];

    codes.forEach((el) => result.push(`&#${el};`));

    return result;
}

function unicodeValidator(code: string): string[] {
    const codes: string[] = code.split(",");
    const result: string[] = [];

    codes.forEach((el) => result.push(`U+${el}`));

    return result;
}

function categoryValidator(category: string): string {
    let result = category.replace(".cfm", "");
    if (result.includes("_")) result = result.replace(/_/g, " ");
    if (result.includes("-")) result = result.replace(/-/g, " ");
    return result;
}

function groupValidator(group: string): string {
    let result = group;
    if (result.includes("-")) result = result.replace(/-/g, " ");
    if (result.includes("_")) result = result.replace(/_/g, " ");
    return result;
}
