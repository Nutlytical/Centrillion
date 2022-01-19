let data1 = {
  meta: [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 3, name: "C" },
    { id: 4, name: "D" },
    { id: 5, name: "E" },
    { id: 6, name: "F" },
  ],
  items: [1, 2, 4, 5, 1, 4],
};

function transform(data) {
  let meta = data.meta;
  let items = data.items;
  const output = [];

  for (var i = 0; i < items.length; i++) {
    const item = items[i] - 1;

    output.push(meta[item]);
  }

  return { items: [...output] };
}

let data2 = transform(data1);

console.log(data2);

// data2 should be like
// {
//   items: [
//     {id: 1, name: "A"},
//     {id: 2, name: "B"},
//     {id: 4, name: "D"},
//     {id: 5, name: "E"},
//     {id: 1, name: "A"},
//     {id: 4, name: "D"}
//   ],
// }
