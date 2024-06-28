import first from "../assets/testimoni/1.png";

const itemAmount = 11;

const testimoniItem: string[] = [];

testimoniItem.push(first);

for (let i = 0; i < itemAmount; i++) {
  const imagePath = `../assets/testimoni/${i + 1}.png`;
  const image = await import(imagePath);

  testimoniItem.push(image.default);
}

console.log(testimoniItem);

export { testimoniItem };
