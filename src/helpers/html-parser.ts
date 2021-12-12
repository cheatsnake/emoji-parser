import axios from "axios";
import cheerio from "cheerio";

const BASE_URL: string =
    "https://www.quackit.com/character_sets/emoji/emoji_v3.0/emoji_icons_";

export default async function parseHTML(category: string): Promise<string[][]> {
    try {
        const data = await axios.get(`${BASE_URL}${category}`);
        const html = await data.data;
        const emojiData: string[][] = [];
        const $ = cheerio.load(html);
        $("ul.list-unstyled.charset-ref")
            .children()
            .each((i, elem) => {
                emojiData[i - 1] = [$(elem).find("h2").text()];
                $(elem)
                    .find("ul")
                    .children()
                    .each((i2, elem2) => {
                        emojiData[i - 1].push($(elem2).children().attr("href"));
                    });
            });
        return emojiData;
    } catch (error) {
        console.log(error);
    }
}
