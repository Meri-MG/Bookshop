function addCards() {
  const pageTitle = document.createElement('h1');
  pageTitle.innerText = 'Welcome to Dream World Books';
  const cardWrapper = document.createElement('div');
  cardWrapper.className += 'card_wrapper';
  const imageDiv = document.createElement('div');
  imageDiv.className += 'image_wrapper';
  const imgTag = document.createElement('img');
  imgTag.src =
    'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80';
  imgTag.alt = 'book image';
  const contentDiv = document.createElement('div');
  contentDiv.className += 'content_wrapper';
  const cardTitle = document.createElement('h3');
  cardTitle.className += 'title';
  cardTitle.innerText = `${data.author[0]}`;
  const cardAuthor = document.createElement('p');
  const cardPrice = document.createElement('p');
  cardAuthor.className += 'author';
  cardPrice.className += 'price';
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
  document.body.prepend(cardWrapper);
  document.body.prepend(pageTitle);
}

// function getData() {
const data = () => {
  fetch('books.json')
    .then((response) => response.json())
    .then((obj) => console.log(obj))
    .catch((error) => console.log(error));
};

window.addEventListener('DOMContentLoaded', (event) => {
  addCards();
  // getData();
  console.log('DOM fully loaded and parsed');
});
