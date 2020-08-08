document.addEventListener('DOMContentLoaded', (event) => {
monsterData = {};
const monsterContainer = document.getElementById("monster-container");
const buttonDiv = document.createElement("div");
const nextButton = document.createElement('button');
const previousButton = document.createElement('button');
nextButton.innerText = `=>`
previousButton.innerText = `<=`
buttonDiv.append(previousButton);
buttonDiv.append(nextButton);
monsterContainer.append(buttonDiv);



buttonDiv.addEventListener("click", e => {
        if(e.target === nextButton){
            pageNumber += 1
        }else if(e.target === previousButton){
            pageNumber -= 1
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
    monsterLi.innerHTML = 
    `${monster.name}<br>
    Age:${monster.age}<br>
    Bio:${monster.description}<br><br>`   
    monsterContainer.append(monsterLi)
}





getMonsters(0)
});