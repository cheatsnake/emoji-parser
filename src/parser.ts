import { emojiDataValidator } from "./helpers/emoji-data-validator";
import parseEmojiData from "./helpers/html-parser";
import { jsonSaver } from "./helpers/json-saver";

const EmojiCategories = {
    Smileys_People: "smileys_and_people.cfm",
    Animals_Nature: "animals_and_nature.cfm",
    Food_Drink: "food_and_drink.cfm",
    Activities: "activities.cfm",
    Travel_Places: "travel_and_places.cfm",
    Objects: "objects.cfm",
    Symbols: "symbols.cfm",
    Flags: "flags.cfm",
};

class Parser {
    static async getEmojiByCategory(category: string) {
        const emojiData = await parseEmojiData(category);
        const emoji = emojiDataValidator(emojiData, category);
        jsonSaver(emoji, category.slice(0, -4));
    }
    static async getAllEmoji() {
        for (const value of Object.values(EmojiCategories)) {
            this.getEmojiByCategory(value);
        }
    }
}

//Start parsing
Parser.getAllEmoji();
