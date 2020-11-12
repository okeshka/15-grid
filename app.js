import random from "./random.js";
import {timer, time} from "./timer.js";

random[random.indexOf(0)] = '';

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
container.append(points);

pointsInsert(pointsNumber);
const nextPoint = () => {
    pointsNumber ++;
    pointsInsert(pointsNumber);
}

const checkDesishion = () => {
    let btnsArray = Array.from(btns);
             btnsArray.pop();
             return btnsArray.every((element, index) => {return Number(element.textContent) === index + 1});
}

//add timer
timer.className = "score";
const stopTimerbtn = document.createElement('button');
stopTimerbtn.textContent = "Stop game";
stopTimerbtn.classList = 'stop-btn';
stopTimerbtn.addEventListener('click', (e) => time(e));
container.append(timer, stopTimerbtn);



//Create puzzle element
function createPuzzle () {
    return random.map(element => {
        const box = document.createElement('div');
        box.draggable = true;
        if (element === '') box.classList = "hidden"
        else {
            box.innerHTML = `<p>${element}</p>`
        };
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

        const moveHandler = e => {
            
            
            //console.log(typeof +e.target.textContent)
            //if we click empty element
            if (btn.textContent === '') return;
            //start timer
            if (timer.textContent === "00:00") time(e);

            //move if we click friend element
            let friend = Math.abs(Array.from(btns).indexOf(btn) - order);
            const condition = (friend == 4) || (friend == 1);
            if (!condition) return;

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

            nextPoint();

             //check on right checkDesishon
             if (checkDesishion()) alert.classList.remove('hidden');
        }

        btn.addEventListener('click', moveHandler);

        btn.addEventListener(`dragstart`, (e) => {
            if (btn.textContent) 
            {
                btn.classList.add(`selected`);
                if (timer.textContent === "00:00") time(e);
            }
        });

        btn.addEventListener(`dragend`, () => {
            if (!btn.textContent) btn.classList.remove(`selected`);

            
            if (checkFriendDraggable()) btn.classList.remove(`selected`);;
        });

        //Check condition to drag: friend or not
        const checkFriendDraggable = () => {
            let friend = Math.abs(Array.from(btns).indexOf(document.querySelector('.selected')) - order);
            const condition = (friend == 4) || (friend == 1);
            return !condition;
        }

        btn.addEventListener('dragover', e => {

            if (!btn.textContent) e.preventDefault();
        });

        btn.addEventListener('drop', e => {
            if (checkFriendDraggable()) return;
            if (!btn.textContent) {
                const element = document.querySelector('.selected');  
                e.target.classList.remove("hidden");
                e.target.innerHTML = element.innerHTML;
                element.classList.add('hidden');
                element.textContent = '';                
            }
            order = emptyOrder();
            nextPoint();
            if (checkDesishion()) alert.classList.remove('hidden');
            
        });    
        
            

    }
}

move();

