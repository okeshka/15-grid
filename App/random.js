let arr = new Set();

function create15() {
  while (arr.size < 16) {
    arr.add(Math.trunc(Math.random()*16))
  }
return Array.from(arr);
}

function shuffle(a, b) {
  return Math.random() - 0.5;
}
const random = create15().sort(shuffle);

export default random;