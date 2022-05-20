// import { saveToStorage, getFromStorage } from './storage.js';

// let fragment = new DocumentFragment();

const id = (id) => document.getElementById(id);
const classes = (classes) => document.getElementsByClassName(classes);
const mainWrapper = id('main_wrapper');
const pageTitle = document.createElement('h2');
pageTitle.innerText = 'Learn how to learn with our books';
mainWrapper.prepend(pageTitle);
const modalSection = document.createElement('section');
modalSection.className += 'modal_section';
const catalogSection = document.createElement('section');
catalogSection.className += 'cart_section';
let showBtns = document.getElementsByClassName('card_show_btn');
// let addBtns = document.getElementsByClassName('card_add_btn');
mainWrapper.after(modalSection);
// mainWrapper.appendChild(catalogSection);
// document.body.append(catalogSection);

const header = () => {
  const header = document.createElement('header');
  const container = document.createElement('div');
  container.className += 'container';
  const logoWrapper = document.createElement('div');
  const logoTag = document.createElement('a');
  logoTag.setAttribute('href', '#');
  const logoHeader = document.createElement('h1');
  logoHeader.innerText = 'BoOkShOp';
  const navBar = document.createElement('nav');
  const navUl = document.createElement('ul');
  for (let i = 0; i < 3; i++) {
    const navLink = document.createElement('li');
    navUl.append(navLink);
    const navTag = document.createElement('a');
    navLink.append(navTag);
    navTag.setAttribute('href', '#');
    const links = [['Books'], ['My bag'], ['Contacts']];
    navTag.innerText = `${links[i]}`;
  }

  header.appendChild(container);
  container.appendChild(logoWrapper);
  logoWrapper.appendChild(logoTag);
  logoTag.appendChild(logoHeader);
  container.appendChild(navBar);
  navBar.appendChild(navUl);
  document.body.prepend(header);
  header.before(catalogSection);
};

const footer = () => {
  const footer = document.createElement('footer');
  const footerWrapper = document.createElement('div');
  const container = document.createElement('div');
  container.className += 'container';
  const copyR = document.createElement('p');
  copyR.innerText = '©  Copyright 2022 Meri Gogichashvili';
  const linksWrapper = document.createElement('div');
  const gitHubTag = document.createElement('a');
  gitHubTag.setAttribute('href', 'https://github.com/Meri-MG');
  const githubImg = document.createElement('img');
  githubImg.src = './images/github.svg';
  githubImg.alt = 'github_icon';
  const linkedinImg = document.createElement('img');
  linkedinImg.src = './images/linkedin.png';
  linkedinImg.alt = 'linkedin_icon';
  const linkedInTag = document.createElement('a');
  linkedInTag.setAttribute(
    'href',
    'https://www.linkedin.com/in/meri-gogichashvili/'
  );
  footer.appendChild(container);
  container.appendChild(footerWrapper);
  footerWrapper.appendChild(copyR);
  container.appendChild(linksWrapper);
  linksWrapper.appendChild(gitHubTag);
  linksWrapper.appendChild(linkedInTag);
  gitHubTag.appendChild(githubImg);
  linkedInTag.appendChild(linkedinImg);
  modalSection.after(footer);
};

const addCards = (obj) => {
  const container = document.createElement('div');
  container.className += 'container';
  for (let card of obj) {
    const cardWrapper = document.createElement('div');
    cardWrapper.className += 'card_wrapper';
    const imageDiv = document.createElement('div');
    imageDiv.className += 'image_wrapper';
    const imgTag = document.createElement('img');
    imgTag.src = card.imageLink;
    imgTag.alt = 'book image';
    const contentDiv = document.createElement('div');
    contentDiv.className += 'content_wrapper';
    const cardTitle = document.createElement('h3');
    cardTitle.className += 'title';
    cardTitle.innerText = card.title;
    const cardAuthor = document.createElement('p');
    cardAuthor.innerText = `by ${card.author}`;
    const cardPrice = document.createElement('p');
    cardAuthor.className += 'author';
    cardPrice.className += 'price';
    cardPrice.innerText = `$ ${card.price}`;
    const showBtn = document.createElement('button');
    showBtn.className += 'card_show_btn';
    showBtn.setAttribute('id', 'show_btn');
    showBtn.setAttribute('data', card.id);
    showBtn.type = 'button';
    showBtn.innerText = 'Show More';
    const addBtn = document.createElement('button');
    addBtn.className += 'card_add_btn';
    addBtn.setAttribute('id', 'add_btn');
    addBtn.setAttribute('data', card.id);
    addBtn.type = 'button';
    addBtn.innerText = 'Add to bag';
    contentDiv.appendChild(cardTitle);
    contentDiv.appendChild(cardAuthor);
    contentDiv.appendChild(cardPrice);
    contentDiv.appendChild(showBtn);
    contentDiv.appendChild(addBtn);
    imageDiv.appendChild(imgTag);
    cardWrapper.appendChild(imageDiv);
    cardWrapper.appendChild(contentDiv);
    container.appendChild(cardWrapper);
  }
  mainWrapper.appendChild(container);
};

const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const openPopup = (target) => {
  target.parentElement.parentElement.parentElement.classList.add('active');
  target.parentElement.parentElement.parentElement.classList.remove('hide');
};

const closePopup = (target) => {
  target.parentElement.parentElement.parentElement.classList.add('hide');
  target.parentElement.parentElement.parentElement.classList.remove('active');
};

const modal = (obj, index) => {
  clearElement(modalSection);
  obj.forEach((book) => {
    const modalWrapper = document.createElement('div');
    modalWrapper.setAttribute('id', index);
    modalWrapper.className += 'modal_wrapper';
    const modalInnerWrap = document.createElement('div');
    const modalDesc = document.createElement('p');
    modalDesc.innerText = book.description;
    const closeBtn = document.createElement('button');
    closeBtn.className += 'card_close_btn';
    closeBtn.setAttribute('id', 'close_btn');
    closeBtn.type = 'button';
    closeBtn.innerText = 'Close';
    modalInnerWrap.appendChild(modalDesc);
    modalInnerWrap.appendChild(closeBtn);
    modalWrapper.appendChild(modalInnerWrap);
    if (book.id === index) {
      modalSection.appendChild(modalWrapper);
    }
  });
  closeBtn = document.getElementById('close_btn');
  closeBtn.addEventListener('click', () => {
    closePopup(closeBtn);
  });
  [...showBtns].forEach((btn) => {
    btn.addEventListener('click', () => {
      openPopup(closeBtn);
    });
  });
};

const populate = async () => {
  const response = await fetch('./books.json');
  const booksList = await response.json();
  return booksList;
};

const getFromStorage = () => {
  return localStorage.getItem('books')
    ? JSON.parse(localStorage.getItem('books'))
    : [];
};

const saveToStorage = (list) => {
  localStorage.setItem('books', JSON.stringify(list));
  return list;
};

const addToCart = (obj, index) => {
  clearElement(catalogSection);
  obj.forEach((catalog) => {
    const catalogWrapper = document.createElement('div');
    catalogWrapper.className += 'catalog_wrapper';
    catalogWrapper.setAttribute('id', index);
    const imageDiv = document.createElement('div');
    imageDiv.className += 'catalog_image_wrapper';
    const imgTag = document.createElement('img');
    imgTag.src = catalog.imageLink;
    imgTag.alt = 'book image';
    const contentDiv = document.createElement('div');
    contentDiv.className += 'content_wrapper';
    const catalogTitle = document.createElement('h3');
    catalogTitle.className += 'title';
    catalogTitle.innerText = catalog.title;
    const catalogAuthor = document.createElement('p');
    catalogAuthor.innerText = `by ${catalog.author}`;
    const catalogPrice = document.createElement('p');
    catalogAuthor.className += 'author';
    catalogAuthor.className += 'author';
    catalogPrice.className += 'price';
    catalogPrice.innerText = `$ ${catalog.price}`;
    const deleteBtn = document.createElement('button');
    deleteBtn.className += 'card_delete_btn';
    deleteBtn.setAttribute('id', 'delete_btn');
    // deleteBtn.setAttribute('data', catalog.id);
    deleteBtn.type = 'button';
    deleteBtn.innerText = 'X';
    catalogWrapper.appendChild(imageDiv);
    imageDiv.appendChild(imgTag);
    contentDiv.appendChild(catalogTitle);
    contentDiv.appendChild(catalogAuthor);
    contentDiv.appendChild(catalogTitle);
    contentDiv.appendChild(catalogPrice);
    catalogWrapper.appendChild(contentDiv);
    catalogWrapper.appendChild(deleteBtn);
    catalogSection.appendChild(catalogWrapper);
    if (catalog.id === index) {
      catalogSection.appendChild(catalogWrapper);
    }
  });
};

// console.log(addBtns, 'btns');

window.addEventListener('DOMContentLoaded', () => {
  header();
  populate().then((booksList) => {
    addCards(booksList);
    [...showBtns].forEach((btn, index) => {
      btn.addEventListener('click', () => {
        if (index === booksList[index].id) {
          modal(booksList, booksList[index].id);
        }
      });
    });
    let addBtns = document.getElementsByClassName('card_add_btn');

    [...addBtns].forEach((btn, index) => {
      btn.addEventListener('click', () => {
        console.log(index, 'index', booksList[index].id, 'id-id');
        if (index === booksList[index].id) {
          addToCart(booksList, booksList[index].id);
        }
      });
    });
    // console.log(modalCloseBtn, 'close');
    // modalCloseBtn.addEventListener('click', () => {
    //   closePopup(modalCloseBtn);
    // });
  });

  footer();
  console.log('DOM fully loaded and parsed');
});
