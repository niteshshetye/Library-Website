// This is created by the ES6 class as you can see it is much more readable and understandable
console.log('welcome to the project 2');


// Created Book constructor
class Book{
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

// All display function are here like add, clear, show, validate
class Display{
    add(book) {
        console.log('Add in UI');
        let tableBody = document.getElementById('tableBody');
        let uiString = '';
        uiString += 
        `<tr id="tableRow">
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.type}</td>
        </tr>
        `;            
        tableBody.innerHTML = uiString;
            
    }
    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }
    validate(book) {
        if (book.name.length<2 || book.author.length<2) {
            return false;
        }
        else{
            return true;
        }
    }
    show(type, message) {
        let msg = document.getElementById('msg');
        let boldText;
        if (type === 'success') {
            boldText = 'Success';
        }
        else{
            boldText = 'Error';
        }
        msg.innerHTML = `
                <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                    <strong>${boldText}: </strong>${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
        `;
        setTimeout(function() {
            msg.innerHTML = '';
        }, 2000);
    }
}


// Event listner to listne when somone submit the form
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);
function libraryFormSubmit(e) {
    e.preventDefault(); // this help to show the console error if we not do this than page realod and error cant see properly
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    // grab type
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }
    let book = new Book(name, author, type)
    console.log(book);

    let display = new Display();
    if (display.validate(book)){
        display.add(book);
        display.clear();
        display.show(`success`, ' Your book is added successfully')
    }
    else{
        display.show(`danger`, ' Somthing is wrong....! Please check Name or Author')
    }
    console.log('Form Submited');
}


// what we can do further
// 1. grab the book from storage or databas (here for practice you can use localstorage);
// 2. add 1 extra coloumn and add delete  button
// 3. Add a scrollbar to the view