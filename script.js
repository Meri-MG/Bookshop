const id = (id) => document.getElementById(id);
const classes = (classes) => document.getElementsByClassName(classes);
const mainWrapper = id('main_wrapper');
const pageTitle = document.createElement('h1');
pageTitle.innerText = 'Welcome to Dream World Books';
document.body.prepend(pageTitle);

function addCards(obj) {
  for (let i = 0; i < obj.length; i++) {
    const cardWrapper = document.createElement('div');
    cardWrapper.className += 'card_wrapper';
    const imageDiv = document.createElement('div');
    imageDiv.className += 'image_wrapper';
    const imgTag = document.createElement('img');
    imgTag.src = `${obj[i].imageLink}`;
    imgTag.alt = 'book image';
    const contentDiv = document.createElement('div');
    contentDiv.className += 'content_wrapper';
    const cardTitle = document.createElement('h3');
    cardTitle.className += 'title';
    cardTitle.innerText = `${obj[i].title}`;
    const cardAuthor = document.createElement('p');
    cardAuthor.innerText = `${obj[i].author}`;
    const cardPrice = document.createElement('p');
    cardAuthor.className += 'author';
    cardPrice.className += 'price';
    cardPrice.innerText = `${obj[i].price}`;
    const showBtn = document.createElement('button');
    showBtn.className += 'card_btn';
    showBtn.setAttribute('id', 'show_btn');
    showBtn.type = 'button';
    const addBtn = document.createElement('button');
    addBtn.className += 'card_btn';
    addBtn.setAttribute('id', 'add_btn');
    addBtn.type = 'button';
    contentDiv.appendChild(cardTitle);
    contentDiv.appendChild(cardAuthor);
    contentDiv.appendChild(cardPrice);
    contentDiv.appendChild(showBtn);
    contentDiv.appendChild(addBtn);
    imageDiv.appendChild(imgTag);
    cardWrapper.appendChild(imageDiv);
    cardWrapper.appendChild(contentDiv);
    mainWrapper.appendChild(cardWrapper);
  }
}

async function populate() {
  const requestURL = './books.json';
  const request = new Request(requestURL);

  const response = await fetch(request);
  const booksList = await response.json();
  addCards(booksList);
  return booksList;
}

window.addEventListener('DOMContentLoaded', () => {
  populate();
  console.log('DOM fully loaded and parsed');
});
