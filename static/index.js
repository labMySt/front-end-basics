const leftBlock = document.querySelector(".left");
const rightBlock = document.querySelector(".right");
const item = leftBlock.children[0];

cleanLists(leftBlock, rightBlock);





getListFromServer()
 .then(response => {
   if (response.status === 200) return response.json();
   throw new Error("We have problem with books")
 })
 .then(books => renderBooks(leftBlock, books))
 .catch(err => console.log(err));

function cleanLists(...listsArrey) {
  for(let i in listsArrey){
    while (listsArrey[i].firstChild) {
        listsArrey[i].removeChild(listsArrey[i].firstChild);
    }
  }
};



async function getListFromServer(){
  return fetch('static/data.json')
};

function renderBooks(block, books) {
  for(let i in books) {
    addBook(block, books[i])
  }
}

function addBook(block, book, type = item) {
  var element = type.cloneNode(true);
  element.querySelector('img').src = book.img;
  element.querySelectorAll('span')[2].childNodes[2].remove();
  element.querySelectorAll('span')[1].childNodes[2].remove();
  element.querySelectorAll('span')[2].appendChild(document.createTextNode(book.author));
  element.querySelectorAll('span')[1].appendChild(document.createTextNode(book.name));
  block.appendChild(element);
};
