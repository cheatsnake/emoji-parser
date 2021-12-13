import emojiDataValidator from "./helpers/emoji-data-validator";
import parseEmojiData from "./helpers/html-parser";

enum EmojiCategories {
    Smileys_People = "smileys_and_people.cfm",
    Animals_Nature = "animals_and_nature.cfm",
    Food_Drink = "food_and_drink.cfm",
    Activity = "activities.cfm",
    Travel_Places = "travel_and_places.cfm",
    Objects = "activities.cfm",
    Symbols = "symbols.cfm",
    Flags = "flags.cfm",
}

class Parser {
    static async getEmojiByCategory(category: string) {
        const emojiData = await parseEmojiData(category);
        const emoji = emojiDataValidator(emojiData, category);
        console.log(emoji);
    }

    static getAllEmoji() {}
}

Parser.getEmojiByCategory(EmojiCategories.Smileys_People);
