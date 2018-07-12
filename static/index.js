var leftBlock = document.querySelector(".left");
var rightBlock = document.querySelector(".right");
var item = leftBlock.children[0];

cleanLists(leftBlock, rightBlock);

function cleanLists(...listsArrey) {
  for(let i in listsArrey){
    while (listsArrey[i].firstChild) {
        listsArrey[i].removeChild(listsArrey[i].firstChild);
    }
  }
};

function getJson(){
  fetch('static/data.json')
   .then((res)=> {
     if (res.status === 200) return res.json();
     throw new Error("UPS")
   })
   .then(data => renderBooks(data))
   .catch(err => console.log(err));
};
console.log(item.querySelector('.pic'))
function renderBooks(books) {
  for(let i in books){

  }

}
