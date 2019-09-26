const newBook = document.querySelector(
    "#newBook"
);
const submitBook = document.querySelector(
    "#submitBook"
);
const header = document.querySelector(".header");
const table = document.querySelector(".table");

function book(
    title,
    author,
    publicationYear,
    status
) {
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
    this.status = status;
}

const anna = new book(
    "Anna Karenina",
    "Tolstoy",
    1873,
    "Unread"
);
const bovary = new book(
    "Madame Bovary",
    "Flaubert",
    1873,
    "In Progress"
);
const gatsby = new book(
    "The Great Gatsby",
    "Fitzgerald",
    1873,
    "Completed"
);
const quixote = new book(
    "Don Quixote",
    "Cervantes",
    1873,
    "Unread"
);
const lolita = new book(
    "Lolita",
    "",
    1873,
    "Completed"
);
// console.log(anna);
//
let library = [
    anna,
    bovary,
    gatsby,
    quixote,
    lolita
];

function getSelectedOption(sel) {
    var opt;
    for (
        var i = 0, len = sel.options.length;
        i < len;
        i++
    ) {
        opt = sel.options[i];
        if (opt.selected === true) {
            break;
        }
    }
    return opt;
}

let noob = true;

newBook.addEventListener("click", () => {
    document
        .querySelector(".noobie")
        .classList.toggle("hidden");
    noob
        ? (newBook.textContent = "Cancel")
        : (newBook.textContent = "New Book");
    noob = !noob;
});

function grabInputData() {
    const val1 = document.querySelector(
        "#inputTitle"
    ).value;
    const val2 = document.querySelector(
        "#inputAuthor"
    ).value;
    const val3 = document.querySelector(
        "#inputYear"
    ).value;
    const val4 = document.querySelector(
        "#inputStatusU"
    ).value;
    console.log(val4);
    if (val1 !== "")
        return new book(val1, val2, val3, val4);
    else return undefined;
}
if (submitBook) {
    submitBook.addEventListener("click", () => {
        let userDefinedBook = grabInputData();
        console.log(userDefinedBook);
        if (userDefinedBook)
            addBookToLibrary(userDefinedBook);
    });
}

function addBookToLibrary(selectedBook) {
    library.push(selectedBook);
    rebuild();
}

function rebuild() {
    if (document.querySelector("#booko"))
        document.querySelector("#booko").remove();
    header.insertAdjacentHTML(
        "afterend",
        `<div id='booko'>${gridbuilder(
            library
        )}</div>`
    );
    const deleters = document.querySelectorAll(
        ".deleteButton"
    );
    const selectors = document.querySelectorAll(
        ".statSelect"
    );

    for (let i = 0; i < selectors.length; i++) {
        selectors[i].addEventListener(
            "change",
            e => {
                const booktoChange =
                    library[
                        e.target.id.split("-")[1]
                    ];
                booktoChange.status =
                    e.target.value;
            }
        );
    }

    for (let i = 0; i < deleters.length; i++) {
        deleters[i].addEventListener(
            "click",
            info => {
                // console.log("delete was clicked");
                const delEl = info.toElement.parentNode.parentNode.id.split(
                    "-"
                );
                // console.log(delEl[1]);
                library.splice(delEl[1], 1);
                rebuild();
            }
        );
    }
}

// status.addEventListener("click");

function setOption(index, bookStatus) {
    if (bookStatus === "Unread") {
        return `          <select name="status" class="statSelect" id="inputStatus-${index}"
            ><option selected>Unread</option
            ><option 
              >In Progress</option
            ><option 
              >Completed</option
            ></select
          >`;
    } else if (bookStatus === "In Progress") {
        return `<select class="statSelect" 
                name="status" id="inputStatus-${index}"
            ><option>Unread</option
            ><option selected
              >In Progress</option
            ><option 
              >Completed</option
            ></select
          >`;
    } else {
        return `<select class="statSelect" name="status" id="inputStatus-${index}"
            ><option >Unread</option
            ><option 
              >In Progress</option
            ><option selected
              >Completed</option
            ></select
          >`;
    }
}

function gridbuilder(library) {
    let rawBookData = [];
    let index = 0;
    for (let books in library) {
        let bookProp1 = library[books].title;
        let bookProp2 = library[books].author
            ? library[books].author
            : "<div class='warning'>Not specified</div>";
        let bookProp3 = library[books]
            .publicationYear
            ? library[books].publicationYear
            : "<div class='warning'>Not specified<div>";
        let bookProp4 = setOption(
            index,
            library[books].status
        );
        let bookProp5 =
            "<button class='deleteButton'>Delete</button>";
        rawBookData[
            index
        ] = `   <ul id='book-${index}'>
                    <li class="bookProp1">${bookProp1}</li>
                    <li class="bookProp2">${bookProp2}</li>
                    <li class="bookProp3">${bookProp3}</li>
                    <li class="bookProp4">${bookProp4}</li>
                    <li class="bookProp5">${bookProp5}</li>
                </ul>`;
        index++;
    }
    return rawBookData.join("");
}

function initialize() {
    rebuild();
}
initialize();
