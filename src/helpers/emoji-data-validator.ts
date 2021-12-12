export default function emojiDataValidator(data: string) {
    const emojiData = [];
    const dataArr: string[] = data.split("&");
    for (let i = 1; i < dataArr.length; i++) {
        emojiData.push(dataArr[i].split("=")[1].replace("_", " ").split(","));
    }
    return emojiData;
}
