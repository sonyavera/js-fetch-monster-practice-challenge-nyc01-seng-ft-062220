document.addEventListener('DOMContentLoaded', (event) => {
let monsterData = {};
const monsterContainer = document.getElementById("monster-container");
const buttonDiv = document.getElementById("button-div");
const nextButton = document.createElement('button');
const previousButton = document.createElement('button');
const createMonster = document.getElementById("create-monster")
nextButton.innerText = `=>`
previousButton.innerText = `<=`
monsterContainer.nextElementSibling = buttonDiv;
buttonDiv.append(previousButton);
buttonDiv.append(nextButton);
let pageNumber = 0

const createMonsterForm = () => {
    const monsterForm = document.createElement('form')
    monsterForm.innerHTML = 
    `<label>Name: </label>
    <input type="text" name="name">
    <br>
    <label>Age: </label>
    <input type="text" name="age">
    <br>
    <label>Bio: </label>
    <input type="text" name="bio">
    <br>
    <input type="submit" value="Create Monster">`
    createMonster.append(monsterForm)
}

createMonster.addEventListener("submit", (e) => {
    e.preventDefault()
    const newMonsterForm = e.target
    const name = newMonsterForm.name.value
    const age = newMonsterForm.age.value
    const bio = newMonsterForm.bio.value
    const monsterObj = {
        name: name,
        bio: bio,
        age: age,
    }
    renderMonster(monsterObj)
    newMonsterForm.reset()

    const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify(monsterObj)
      }

      fetch('http://localhost:3000/monsters/', options) 
    })


buttonDiv.addEventListener("click", e => {    
    if(e.target === nextButton){
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
createMonsterForm()
});