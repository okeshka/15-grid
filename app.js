import random from "./random.js";
random[random.indexOf(0)] = '';
console.log(random);

//Create containers element
const container = document.createElement('div');
container.className = "container";
const fifteen =  document.createElement('div');
fifteen.className = "fifteen";

//pointer of score
let pointsNumber = '0';
const points = document.createElement('div');
points.className = "score";
function pointsInsert(pointsNumber) {
    return points.innerHTML = `<p><span>Кол-во ходов:</span> ${pointsNumber}</p>`;
}
pointsInsert(pointsNumber);
container.append(points);


//Create puzzle element
function createPuzzle () {
    return random.map(element => {
        const box = document.createElement('div');
        if (element === '') box.classList = "hidden"
        else box.innerHTML = `<p>${element}</p>`;
        return box
    })    
}

//Add puzzle to container, add container to body
fifteen.append(...createPuzzle());
container.append(fifteen);
document.body.append(container);

const btns = document.body.querySelectorAll('.fifteen div');

//define number of empty cell
function emptyOrder() {
    return Array.from(btns).map(node => node.textContent).indexOf('');
}

let order = emptyOrder();

//Create message 'you win'

const alert = document.createElement('div');
alert.innerHTML = `<p>YOU WIN !!!</p>` 
alert.classList.add('alert', 'hidden');
points.after(alert);



//Inisiate moves logica
function move() {
    
    for (let btn of btns) {
        btn.addEventListener('click', (e) => {
        // 

           

            //if we click empty element
            if (btn.textContent === '') return;

            //move if we click frind element
            let friend = Math.abs(Array.from(btns).indexOf(btn) - order);
            const condition = (friend == 4) || (friend == 1);
            if ( !condition ) return;

            btns.forEach(
                (element) => {
                if (element.classList.contains("hidden")) {
                    element.classList.remove("hidden");
                    element.innerHTML = btn.innerHTML;
                }
                }
            );
            btn.classList.add('hidden');
            btn.textContent = '';
            order = emptyOrder();
            pointsNumber ++;
            pointsInsert(pointsNumber);

             //check on right checkDesishon
             let btnsArray = Array.from(btns);
             btnsArray.pop();
             let checkDesishon = btnsArray.every((element, index) => {return Number(element.textContent) === index + 1});
             if (checkDesishon) {
                alert.classList.remove('hidden');
                 console.log("You win");
            }
            
    })
}
}

move();

