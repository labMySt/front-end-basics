class Item {

  create(data, onCklick){
    var node = this.tamp.cloneNode(true);
    node.querySelector('img').src = data.img;
    node.querySelectorAll('span')[2].childNodes[2].remove();
    node.querySelectorAll('span')[1].childNodes[2].remove();
    node.querySelectorAll('span')[2].appendChild(document.createTextNode(data.author));
    node.querySelectorAll('span')[1].appendChild(document.createTextNode(data.name));
    node.querySelector(".after, .before").addEventListener("click",onCklick);
    return node;
  }
}

class ItemDirector {
  cconstructor() {

  }
  createList(books, item) {
    var fragment = document.createDocumentFragment();
    for (let i in books){
      fragment.appendChild(item.create(books[i], this.onClick));
    }
    return fragment;
  }
}

class Component {
  constructor (element) {
    this.element = element;
    this.clearLists();
    this.vue = this.createVue();
  }
  addBooks(fragment) {
    this.element.appendChild(fragment);
  }

  clearLists() {
     this.element.remove();
     this.element.innerHTML = "";
  };

   createVue() {
     var vue = document.createElement("div");
     this.element.style.height = '600px'
     vue.style.minWidth = "450px";
     vue.appendChild(this.element);
     vue.appendChild(this.getCounter(this.element));
     return vue;
   }
   getCounter() {
     var counter = document.createElement("div");
     counter.innerHTML = `<b>Total:
      ${this.getFilterCounter()} /
      ${this.element.children.length}</b>`;
     return counter;
   }

   getFilterCounter() {
     return "0"
   }

  render(){
    return this.vue;
  }
}

class Store {
  constructor() {
    this.books =
    this.favorite = this.getBooksFromLS();
  }

  getBooksFromLS() {
    if(localStorage["likedBooks"])
    return JSON.parse(localStorage.getItem("likedBooks"));
    return [];
  }

  getBooksForLeftBlock(books) {
    var likedBooks = this.getBooksFromLS();
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

  getFavorite() {
    return this.favorite;
  }

  getBooks() {
    return this.getBooksForLeftBlock();
  }

}

class App {
   constructor () {
     this.store = new Store();
     this.ItemDirector = new ItemDirector();
     this.leftBlock = new Component(document.querySelector(".left")),
     this.rightBlok = new Component(document.querySelector(".right"))
  }

    fillBlocks(){
      var leftFragment = this.ItemDirector.createList(this.store.getBooks(), );
      this.leftBlock.addBooks(leftFragment);
      var fightFragment = this.ItemDirector.createList(this.store.getFavorite());
      this.rightBlok.addBooks(fightFragment);
    }

    render () {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(this.leftBlock.render());
      fragment.appendChild(this.rightBlok.render());
      var content = document.querySelector('.content');
      content.appendChild(fragment);
    }
  }


var app = new App();
app.fillBlocks();
app.render();
