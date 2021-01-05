// This is created by old style and after that we create using ES6 class

// Constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

// Display Constructor
function Display() {

}

// Add methods to display prototype
Display.prototype.validate = function (book) {
    if (book.name.length<2 || book.author.length<2) {
        return false;
    }
    else{
        return true;
    }
}
Display.prototype.add = function (book) {
    console.log('Add in UI');
    let tableBody = document.getElementById('tableBody');
    let uiString = 
        `
        <tr id="tableRow">
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.type}</td>
        </tr>
        `;
        tableBody.innerHTML += uiString;
}
Display.prototype.show = function (type, message) {
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
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}



// Add submit event listner
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);
function libraryFormSubmit(e) {
    e.preventDefault();
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
