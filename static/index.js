const leftBlock = document.querySelector(".left");
const rightBlock = document.querySelector(".right");
const leftItem = leftBlock.children[0];
const rightItem = rightBlock.children[0];
var booksList = {};
//-----------------------------------algorithm----------------------------------

clearLists(leftBlock, rightBlock);



getBooks()
 .then(books => {
   booksList = {...books};
   var booksForLeftBlock = getBooksForLeftBlock(books);
   var booksForRightBlock = getBooksFromLS().mass;
   renderBooks(leftBlock, leftItem, booksForLeftBlock);
   renderBooks(rightBlock, rightItem, booksForRightBlock);
 })
 .catch(err => console.log(err));


//---------------------------------- functions----------------------------------
function getBooksForLeftBlock(books) {
  var likedBooks = getBooksFromLS().mass;
  for(let i in books) {
    for(let j in likedBooks) {
      if(JSON.stringify(books[i]) === JSON.stringify(likedBooks[j])){
        delete books[i];
        likedBooks.splice(j, 1);
        break;
      }
    }
  }
  return books;
}

function clearLists(...listsArrey) {
  for(let i in listsArrey){
    while (listsArrey[i].firstChild) {
        listsArrey[i].removeChild(listsArrey[i].firstChild);
    }
  }
};

function writeBookToLS(book) {
  var books = getBooksFromLS();
  books.mass.push(book);
  localStorage.setItem("likedBooks", JSON.stringify(books));
}

function searchBook(list, bookName) {
  for(let i in list) {
    if(list[i].name == bookName)
      return list[i];
  }
}

function removeBookFromLS(book) {
  var books = getBooksFromLS();
  for(let i in books.mass){
    if(JSON.stringify(books.mass[i]) === JSON.stringify(book)) {
      books.mass.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("likedBooks", JSON.stringify(books));
}

function getBooksFromLS() {
  if(localStorage["likedBooks"])
  return JSON.parse(localStorage.getItem("likedBooks"));
  return {mass:[]};
}

async function getBooks(){
  return fetch('static/data.json')
          .then(response => {
            if (response.status === 200) return response.json();
            throw new Error("We have problem with books")
          })
};

function renderBooks(block,itemType, books) {
  if (Object.keys(books).length == 0) return;
  for(let i in books) {
    addBook(block, books[i], itemType)
  }
}

function moveToNeighborBlock(e){
  var bookName = e.target.parentNode.querySelectorAll('span')[1].childNodes[2].data;
  var book = searchBook(booksList, bookName);
  if(e.target.parentNode.parentNode.className === "left") {
    addBook(rightBlock, book, rightItem);
    writeBookToLS(book)
  } else {
    addBook(leftBlock, book, leftItem);
    removeBookFromLS(book);
  }
  e.target.parentNode.remove();
}

function addBook(block, book, elementType) {
  var element = elementType.cloneNode(true);
  element.querySelector('img').src = book.img;
  element.querySelectorAll('span')[2].childNodes[2].remove();
  element.querySelectorAll('span')[1].childNodes[2].remove();
  element.querySelectorAll('span')[2].appendChild(document.createTextNode(book.author));
  element.querySelectorAll('span')[1].appendChild(document.createTextNode(book.name));

  element.querySelector(".after, .before").addEventListener("click",moveToNeighborBlock);
  block.appendChild(element);
};
