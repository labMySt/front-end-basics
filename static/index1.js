const leftBlock = document.querySelector(".left");
const rightBlock = document.querySelector(".right");
const leftItem = leftBlock.children[0];
const rightItem = rightBlock.children[0];
var booksList = {};
//-----------------------------------algorithm----------------------------------
clearLists(leftBlock, rightBlock);
addFilterListener();


getBooks()
 .then(books => {
   booksList = {...books};
   var booksForLeftBlock = getBooksForLeftBlock(books);
   var booksForRightBlock = getBooksFromLS();
   renderBooks(leftBlock, leftItem, booksForLeftBlock);
   renderBooks(rightBlock, rightItem, booksForRightBlock);
   addCounter();
 })
 .catch(err => console.log(err));


//---------------------------------- functions----------------------------------
function addCounter() {
  function craateCounter(block, str) {
    var total = document.createElement("span");
    total.style.margin = "20px";
    total.innerHTML = str + ": <span class = '"+str+"'>"+block.children.length+"</span>";
    document.querySelector('.content').childNodes[1].appendChild(total);
  }
  craateCounter(leftBlock, "Total");
  craateCounter(rightBlock, "Favorite");
}


function addFilterListener() {
  document.querySelector('input').addEventListener('keyup', filter);
}

function filter(e) {
  var key = e.target.value.toLowerCase();
  console.log(key, e.target.value );
  leftBlock.childNodes.forEach(function(bookBlock) {
    let author = bookBlock.querySelectorAll('span')[2].childNodes[2].data.toLowerCase();
    if(author.indexOf(key) != -1) {
      bookBlock.style.display = "flex";
    } else {
      bookBlock.style.display = "none";
    }
  })
}

function getBooksForLeftBlock(books) {
  var likedBooks = getBooksFromLS();
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
     listsArrey[i].innerHTML = "";
  }
};

function writeBookToLS(book) {
  var books = getBooksFromLS();
  books.push(book);
  localStorage.setItem("likedBooks", JSON.stringify(books));
}

function getBooksFromLS() {
  if(localStorage["likedBooks"])
  return JSON.parse(localStorage.getItem("likedBooks"));
  return [];
}

function searchBook(list, bookName) {
  for(let i in list) {
    if(list[i].name == bookName)
      return list[i];
  }
}

function removeBookFromLS(book) {
  var books = getBooksFromLS();
  for(let i in books){
    if(JSON.stringify(books[i]) === JSON.stringify(book)) {
      books.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("likedBooks", JSON.stringify(books));
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
  updateCounter();
}

function updateCounter() {
  document.querySelector(".Total").innerText = leftBlock.children.length;
  document.querySelector(".Favorite").innerText = rightBlock.children.length;
}
