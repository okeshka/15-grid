import random from "./random.js";

console.log(random);

const container = document.createElement('div');
container.className = "container";
const fifteen =  document.createElement('div');
fifteen.className = "fifteen";


function createPuzzle () {
    return random.map(element => {
        const box = document.createElement('div');
        if (element === 0) box.classList = "hidden"
        else box.innerHTML = `<p>${element}</p>`;
        return box
    })    
}

fifteen.append(...createPuzzle());
container.append(fifteen);
document.body.append(container);

const btns = document.body.querySelectorAll('.fifteen div');

for (let btn of btns) {
  btn.addEventListener('click', (e) => {
      btns.forEach(
        (element) => {
          if (element.classList.contains("hidden")) {
              element.classList.remove("hidden");
              element.innerHTML = btn.innerHTML;
          }
         }
      );
      btn.classList.add('hidden');
   })
}