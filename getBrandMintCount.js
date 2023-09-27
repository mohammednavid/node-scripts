var dishes = require("./AllDishes.json");
const dishesContract = require("./contract/dishesContract");

async function getBrandMintCount() {
  const brand = "MAGGI";
  const address = "0x236475eEc9f3C8597fbd0C76016b18F494160399";
  let tempArray = [];
  let countArray = [];
  let dishesIds = dishes.filter((dish) => dish.Brand === brand);
  await Promise.all(
    dishesIds.map(async (dish, i) => {
      await dishesContract()
        .methods.balanceOf(address, dish.tokenId)
        .call((err, res) => {
          return tempArray.push({
            level: dish.level,
            count: parseInt(res),
          });
        });
      return tempArray;
    })
  );
  console.log("dishes", tempArray);
  await Promise.all(
    tempArray.map((item, i) => {
      // L1 X 1
      if (item.level === 1) countArray.push(item.count);
      // L2 X 2
      else if (item.level === 2) countArray.push(item.count * 2);
      // L3 X 4
      else if (item.level === 3) countArray.push(item.count * 4);
      // L4 X 8
      else if (item.level === 4) countArray.push(item.count * 8);
      // L5 X 16
      else if (item.level === 5) countArray.push(item.count * 16);
      // L6 X 32
      else if (item.level === 6) countArray.push(item.count * 32);
      // L7 X ß
      else if (item.level === 7) countArray.push(item.count * 64);

      return countArray;
    })
  );
  console.log(
    "dishesCount",
    ":",
    countArray.reduce((a, b) => a + b)
  );
}
getBrandMintCount();
