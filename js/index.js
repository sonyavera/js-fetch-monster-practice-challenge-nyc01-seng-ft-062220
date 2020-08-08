document.addEventListener('DOMContentLoaded', (event) => {
let monsterData = {};
const monsterContainer = document.getElementById("monster-container");
const buttonDiv = document.getElementById("button-div");
const nextButton = document.createElement('button');
const previousButton = document.createElement('button');
nextButton.innerText = `=>`
previousButton.innerText = `<=`
monsterContainer.nextElementSibling = buttonDiv;
buttonDiv.append(previousButton);
buttonDiv.append(nextButton);
let pageNumber = 0



buttonDiv.addEventListener("click", e => {    
    if(e.target === nextButton){
            //document.querySelectorAll("div.monster").forEach(e => e.parentNode.removeChild(e)) //wat
            document.querySelectorAll("div.monster").forEach(e => e.remove())
            pageNumber = parseInt(pageNumber) + 1
        }else if(e.target === previousButton){
            document.querySelectorAll("div.monster").forEach(e => e.remove())
            pageNumber = parseInt(pageNumber) -  1
        }
        getMonsters(pageNumber)
    })


const getMonsters = (page) => {
    fetch('http://localhost:3000/monsters/?_limit=50&_page=' + page)
    .then(response => response.json())
    .then(data => {
        data.forEach(renderMonster)
        monsterData = data
    });      
}


const renderMonster = (monster) => {
    const monsterLi = document.createElement("div")
    monsterLi.id = monster.id
    monsterLi.classList.add("monster")
    monsterLi.innerHTML = 
    `${monster.name}<br>
    Age:${monster.age}<br>
    Bio:${monster.description}<br><br>`   
    monsterContainer.append(monsterLi)
}





getMonsters(0)
});