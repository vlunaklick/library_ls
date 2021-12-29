// Constantes new book

const titleN = document.getElementById('form-addbook-form-title')
const authN = document.getElementById('form-addbook-form-author')
const pageN = document.getElementById('form-addbook-form-pages')
const checkN = document.getElementById('form-addbook-form-checker-check')
const addN = document.getElementById('form-addbook-form')
const bookLib = document.getElementById('library-table-addedrows')
let btnDel = Array()
let btnRed = Array()
let library = checkLocalStorage()

addN.addEventListener('submit', e => {
	e.preventDefault()
	addBook()
	showInTable()
	clearForm()
})

// Función librería array

function Book(name, auth, pages, read) {
	;(this.name = name),
		(this.auth = auth),
		(this.pages = pages),
		(this.read = read)
}

function addBook() {
	let valP = new Book(titleN.value, authN.value, pageN.value, checkN.checked)
	library.push(valP)
	saveLocalStorage(library)
}

function clearForm() {
	titleN.value = ''
	authN.value = ''
	pageN.value = ''
	checkN.checked = false
}

function checkStatus(check) {
	return check == true ? 'Read' : 'Not Read'
}

function seeBookPlace(libro) {
	for (let i = 0; i < library.length; i++) {
		if (library[i] == libro) {
			return i
		}
	}
}

function changeReadOption(e) {
	if (e.target.textContent == 'Read') {
		e.target.textContent = 'Not Read'
		let ind = e.target.parentElement.parentElement.id
		library[ind].read = false
	} else {
		e.target.textContent = 'Read'
		let ind = e.target.parentElement.parentElement.id
		library[ind].read = true
	}
	saveLocalStorage(library)
}

function showInTable() {
	bookLib.innerHTML = ''
	if (library) {
		library.forEach(libro => {
			let numI = seeBookPlace(libro)
			const addBookk = `
                        <tr id="${numI}" class="book">
                            <td>${libro.name}</td>
                            <td>${libro.auth}</td>
                            <td>${libro.pages}</td>
                            <td class="library-table-firstrow-titles-btn">
                                <button class="btn-read">${checkStatus(
																	libro.read
																)}</button>
																<button class="btn-delete ${numI}">Delete</button>
                            </td>
                        </tr>
                `
			bookLib.insertAdjacentHTML('afterbegin', addBookk)
		})
		btnDel = Array.from(document.getElementsByClassName('btn-delete'))
		btnRed = Array.from(document.getElementsByClassName('btn-read'))
		btnDel.forEach(function (btn) {
			btn.addEventListener('click', e => {
				deleteBook(e)
			})
		})
		btnRed.forEach(function (btn) {
			btn.addEventListener('click', changeReadOption)
		})
	}
}

function deleteBook(e) {
	let busc = e.target.classList[1]
	library.splice(busc, 1)
	saveLocalStorage(library)
	showInTable(library)
}

// Función localStorage

function checkLocalStorage() {
	let libArray = Array()
	if (
		localStorage.getItem('lalib') !== '[]' &&
		localStorage.getItem('lalib') !== null
	) {
		let val = localStorage.getItem('lalib')
		libArray = JSON.parse(val)
	} else {
		localStorage.removeItem('lalib')
		const testVal = new Book(
			'El principito',
			'Antoine de Saint-Exupéry',
			116,
			true
		)
		libArray.push(testVal)
	}
	return libArray
}

function saveLocalStorage(array) {
	let subida = JSON.stringify(array)
	localStorage.setItem('lalib', subida)
}

showInTable()
