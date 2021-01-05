console.log('Welcome to advance ');

// class Book {
//     constructor(name, author, type) {
//         this.name = name;
//         this.author = author;
//         this.type = type;
//     }
// }

class Display {
    add(storeBookObj, storeAuthorObj, storeTypeObj) {
        let bookName = document.getElementById('bookName').value;
        let author = document.getElementById('author').value;
        let type;

        // lets grab the types
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

        let storeBook = localStorage.getItem(`storeBook`);
        let storeAuthor = localStorage.getItem(`storeAuthor`);
        let storeType = localStorage.getItem(`storeType`);
        if (storeBook == null || storeAuthor == null || storeType == null) {
            storeBookObj = [];
            storeAuthorObj = [];
            storeTypeObj = [];

        }
        else {
            storeBookObj = JSON.parse(storeBook);
            storeAuthorObj = JSON.parse(storeAuthor);
            storeTypeObj = JSON.parse(storeType);

        }
        let uiString;
        bookStoreObj.forEach(function (element, index) {
            uiString =
                `
                <tr id="tableRow">
                    <td>${element.name}</td>
                    <td>${element.author}</td>
                    <td>${element.type}</td>
                </tr>
                `;
            tableBody.innerHTML += uiString;
        })
        // uiString =
        //     `
        //         <tr id="tableRow">
        //             <td>${book.name}</td>
        //             <td>${book.author}</td>
        //             <td>${book.type}</td>
        //         </tr>
        //         `;
        // tableBody.innerHTML += uiString;
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    show(type, message) {
        let msg = document.getElementById('msg');
        let boldText;
        if (type === 'success') {
            boldText = 'Success';
        }
        else {
            boldText = 'Error';
        }
        msg.innerHTML = `
                <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                    <strong>${boldText}: </strong>${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
        `;
        setTimeout(function () {
            msg.innerHTML = '';
        }, 2000);
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        }
        else {
            return true;
        }
    }
}



// Event listner
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', submitForm);

// Creat a function to submit the form
function submitForm(e) {
    e.preventDefault();
    let bookName = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;

    // lets grab the types
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

    // Create the new object of book
    // let book = new Book(bookName,author,type);
    // console.log(book);
    let storeBook = localStorage.getItem(`storeBook`);
    let storeAuthor = localStorage.getItem(`storeAuthor`);
    let storeType = localStorage.getItem(`storeType`);
    if (storeBook == null || storeAuthor == null || storeType == null) {
        storeBookObj = [];
        storeAuthorObj = [];
        storeTypeObj = [];

    }
    else {
        storeBookObj = JSON.parse(storeBook);
        storeAuthorObj = JSON.parse(storeAuthor);
        storeTypeObj = JSON.parse(storeType);

    }
    // bookStoreObj.push(bookName, author, type);
    // let book = new Book(bookName, author, type);
    // bookStoreObj.push(book);
    storeBookObj.push(bookName);
    storeAuthorObj.push(author);
    storeTypeObj.push(type);
    localStorage.setItem(`storeBook`, JSON.stringify(storeBookObj));
    localStorage.setItem(`storeAuthor`, JSON.stringify(storeAuthorObj));
    localStorage.setItem(`storeType`, JSON.stringify(storeTypeObj));

    // console.log(bookStoreObj);
    // console.log(bookStore);
    let display = new Display();
    if (display.validate(book)) {
        display.add(storeBookObj, storeAuthorObj, storeTypeObj);
        display.clear();
        display.show(`success`, ' Your book is added successfully')
    }
    else {
        display.show(`danger`, ' Somthing is wrong....! Please check Name or Author')
    }
}
