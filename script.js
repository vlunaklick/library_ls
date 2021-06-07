// Constantes new book

const titleN = document.getElementById('titau');
const authN = document.getElementById('auau');
const pageN = document.getElementById('paau');
const checkN = document.getElementById('readau');
const addN = document.getElementById('adding');
const bookLib = document.getElementById('addons');
let btnDel = [];
let btnRed = [];

addN.addEventListener('submit', e =>{
    e.preventDefault();
    agregarLibre();
    tableAppear();
    clearForm();
});

// Función librería array

function Book(name,auth,pages,read){
    this.name = name,
    this.auth = auth,
    this.pages = pages,
    this.read = read;
}

let laLibreria;


function agregarLibre(){
    let valP = new Book(titleN.value,authN.value,pageN.value,checkN.checked);
    laLibreria.push(valP);
    saveS(laLibreria);
}

function clearForm(){
    titleN.value = "";
    authN.value = "";
    pageN.value = "";
    checkN.checked = false;
}

function checkStatus(check){
    return (check == true) ? "Read" : "Not Read"
}

function checkBook(libro){
    for (let i = 0; i < laLibreria.length;i++){
        if (laLibreria[i] == libro) return i
    }
}

function changeRead(e){
    if(e.target.textContent == "Read"){
        e.target.textContent = "Not Read";
        let ind = e.target.parentElement.parentElement.id
        laLibreria[ind].read = false;
    } else {
        e.target.textContent = "Read"
        let ind = e.target.parentElement.parentElement.id
        laLibreria[ind].read = true;
    }
    saveS(laLibreria);
}

function tableAppear(){
    bookLib.innerHTML = ""; 
    laLibreria.forEach((libro) =>{
        let numI = checkBook(libro);
        const addBookk = `
                    <tr id="${numI}" class="book">
                        <td>${libro.name}</td>
                        <td>${libro.auth}</td>
                        <td>${libro.pages}</td>
                        <td class="buttonsss">
                            <button class="pread">${checkStatus(libro.read)}</button>
                        </td>
                        <td class="buttonsss">
                            <button class="pDel ${numI}">Delete</button>
                        </td>
                    </tr>
            `;
        bookLib.insertAdjacentHTML("afterbegin", addBookk);
    });
    btnDel = Array.from(document.getElementsByClassName('pDel'));
    btnRed = Array.from(document.getElementsByClassName('pread'));
    btnDel.forEach(function(btn){
        btn.addEventListener('click', e=>{
            deleTa(e);
        });
    });
    btnRed.forEach(function(btn) {
        btn.addEventListener('click', changeRead)
    });
}

function deleTa(e){
    let busc = e.target.classList[1];
    laLibreria.splice(busc,1);
    saveS(laLibreria);
    tableAppear();
}

// Función localStorage

function checkS(){
    if(localStorage.getItem('lalib') !== "[]"){
        let val = localStorage.getItem('lalib');
        laLibreria = JSON.parse(val);
    } else{
        localStorage.removeItem('lalib')
        laLibreria = [];
        const testVal = new Book("El principito","Antoine de Saint-Exupéry",116,true);
        laLibreria.push(testVal);
    }  
}

function saveS(array){
    let subida = JSON.stringify(array);
    localStorage.setItem('lalib',subida);
}


checkS()
tableAppear()
