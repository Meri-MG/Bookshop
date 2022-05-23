// import { saveToStorage, getFromStorage } from './storage.js';

const id = (id) => document.getElementById(id);
const classes = (classes) => document.getElementsByClassName(classes);
const elements = (elements) => document.createElement(elements);

// header elements

const headerDiv = elements('div');
headerDiv.setAttribute('class', 'header_div');
const catalogHeader = elements('h2');
catalogHeader.className += 'catalog_header';
catalogHeader.innerText = 'Order Books';
const cardHeader = elements('h2');
cardHeader.className += 'card_header';
cardHeader.innerText = 'Books Catalog';
headerDiv.appendChild(cardHeader);
headerDiv.appendChild(catalogHeader);

// main container elements

const pageTitle = elements('h2');
pageTitle.innerText = 'Learn how to learn with our books';
const modalSection = elements('section');
modalSection.className += 'modal_section';
const mainWrapper = elements('section');
mainWrapper.setAttribute('id', 'main_wrapper');
const catalogSection = elements('section');
catalogSection.className += 'cart_section';
const catalogTotalDiv = elements('div');
catalogTotalDiv.setAttribute('class', 'catalog_total_div');
const showTotal = elements('p');
showTotal.setAttribute('class', 'show_total');
showTotal.innerText = `Total: $`;
const orderLink = elements('a');
orderLink.setAttribute('href', './form/form.html');
const orderBtn = elements('button');
orderBtn.setAttribute('id', 'order_btn');
orderBtn.setAttribute('type', 'button');
orderLink.innerText = 'Order now';
const catalogCartDiv = elements('div');
catalogCartDiv.setAttribute('class', 'catalog_cart_div dropzone');
catalogTotalDiv.appendChild(showTotal);
orderBtn.appendChild(orderLink);
catalogTotalDiv.appendChild(orderBtn);
catalogSection.appendChild(catalogCartDiv);
catalogSection.appendChild(catalogTotalDiv);
const mainContainer = id('main_container');
const mainContainerSections = elements('div');
mainContainerSections.setAttribute('class', 'sections_wrapper');
mainContainer.after(modalSection);
mainContainer.appendChild(pageTitle);
mainContainer.appendChild(headerDiv);
mainContainerSections.appendChild(mainWrapper);
mainContainerSections.appendChild(catalogSection);
mainContainer.appendChild(mainContainerSections);
const mainCards = classes('card_wrapper');

// target buttons
let showBtns = classes('card_show_btn');
let addBtns = classes('card_add_btn');
let deleteBtns = classes('cart_delete_btn');

let addedBooks = [];

const header = () => {
  const header = elements('header');
  const container = elements('div');
  container.className += 'container';
  const logoWrapper = elements('div');
  const logoTag = elements('a');
  logoTag.setAttribute('href', '#');
  const logoHeader = elements('h1');
  logoHeader.innerText = 'BoOkShOp';
  const navBar = elements('nav');
  const navUl = elements('ul');
  for (let i = 0; i < 3; i++) {
    const navLink = elements('li');
    navUl.append(navLink);
    const navTag = elements('a');
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
};

const footer = () => {
  const footer = elements('footer');
  const footerWrapper = elements('div');
  const container = elements('div');
  container.className += 'container';
  const copyR = elements('p');
  copyR.innerText = '©  Copyright 2022 Meri Gogichashvili';
  const linksWrapper = elements('div');
  const gitHubTag = elements('a');
  gitHubTag.setAttribute('href', 'https://github.com/Meri-MG');
  const githubImg = elements('img');
  githubImg.src = './images/github.svg';
  githubImg.alt = 'github_icon';
  const linkedinImg = elements('img');
  linkedinImg.src = './images/linkedin.png';
  linkedinImg.alt = 'linkedin_icon';
  const linkedInTag = elements('a');
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
  const container = elements('div');
  container.className += 'container';
  for (let card of obj) {
    const cardWrapper = elements('div');
    cardWrapper.className += 'card_wrapper';
    cardWrapper.draggable = true;
    cardWrapper.setAttribute('id', card.id);
    const imageDiv = elements('div');
    imageDiv.className += 'image_wrapper';
    const imgTag = elements('img');
    imgTag.src = card.imageLink;
    imgTag.alt = 'book image';
    const deleteBtn = elements('button');
    deleteBtn.className += 'card_delete_btn';
    deleteBtn.setAttribute('id', card.id);
    deleteBtn.setAttribute('data', obj.length);
    deleteBtn.type = 'button';
    deleteBtn.innerText = 'X';
    const contentDiv = elements('div');
    contentDiv.className += 'content_wrapper';
    const cardTitle = elements('h3');
    cardTitle.className += 'title';
    cardTitle.innerText = card.title;
    const cardAuthor = elements('p');
    cardAuthor.innerText = `by ${card.author}`;
    const cardPrice = elements('p');
    cardAuthor.className += 'author';
    cardPrice.className += 'price';
    cardPrice.innerText = `$ ${card.price}`;
    const buttonsWrap = elements('div');
    buttonsWrap.setAttribute('class', 'buttons_wrap');
    const showBtn = elements('button');
    showBtn.className += 'card_show_btn';
    showBtn.setAttribute('id', 'show_btn');
    showBtn.setAttribute('data', card.id);
    showBtn.type = 'button';
    showBtn.innerText = 'Show More';
    const addBtn = elements('button');
    addBtn.className += 'card_add_btn';
    addBtn.setAttribute('id', 'add_btn');
    addBtn.setAttribute('data', card.id);
    addBtn.type = 'button';
    addBtn.innerText = 'Add to bag';
    contentDiv.appendChild(cardTitle);
    contentDiv.appendChild(cardAuthor);
    contentDiv.appendChild(cardPrice);
    contentDiv.appendChild(buttonsWrap);
    buttonsWrap.appendChild(showBtn);
    buttonsWrap.appendChild(addBtn);
    imageDiv.appendChild(imgTag);
    cardWrapper.appendChild(deleteBtn);
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
    if (book.id === index) {
      const modalWrapper = elements('div');
      modalWrapper.setAttribute('id', index);
      modalWrapper.className += 'modal_wrapper';
      const modalInnerWrap = elements('div');
      const modalDesc = elements('p');
      modalDesc.innerText = book.description;
      const closeBtn = elements('button');
      closeBtn.className += 'card_close_btn';
      closeBtn.setAttribute('id', 'close_btn');
      closeBtn.type = 'button';
      closeBtn.innerText = 'Close';
      modalInnerWrap.appendChild(modalDesc);
      modalInnerWrap.appendChild(closeBtn);
      modalWrapper.appendChild(modalInnerWrap);
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

const closeCart = (target) => {
  target.parentElement.remove();
};

const getTotalAmount = (books) => {
  return books.reduce((total, book) => {
    total += book.price;
    saveToStorage('total', total);
    return total;
  }, 0);
};

const addToCart = (index) => {
  clearElement(catalogCartDiv);
  let obj = getFromStorage();
  [...obj].forEach((catalog) => {
    const catalogWrapper = elements('div');
    catalogWrapper.className += 'catalog_wrapper';
    catalogWrapper.setAttribute('id', catalog.id);
    catalogWrapper.setAttribute('data', obj.length);
    const imageDiv = elements('div');
    imageDiv.className += 'catalog_image_wrapper';
    const imgTag = elements('img');
    imgTag.src = catalog.imageLink;
    imgTag.alt = 'book image';
    const contentDiv = elements('div');
    contentDiv.className += 'content_wrapper';
    const catalogTitle = elements('h3');
    catalogTitle.className += 'title';
    catalogTitle.innerText = catalog.title;
    const catalogAuthor = elements('p');
    catalogAuthor.innerText = `by ${catalog.author}`;
    const catalogPrice = elements('p');
    catalogAuthor.className += 'author';
    catalogAuthor.className += 'author';
    catalogPrice.className += 'price';
    catalogPrice.innerText = `$ ${catalog.price}`;
    const deleteBtn = elements('button');
    deleteBtn.className += 'cart_delete_btn';
    deleteBtn.setAttribute('id', catalog.id);
    deleteBtn.setAttribute('data', obj.length);
    deleteBtn.type = 'button';
    deleteBtn.innerText = 'X';
    imageDiv.appendChild(imgTag);
    contentDiv.appendChild(catalogTitle);
    contentDiv.appendChild(catalogAuthor);
    contentDiv.appendChild(catalogTitle);
    contentDiv.appendChild(catalogPrice);
    catalogWrapper.appendChild(deleteBtn);
    catalogWrapper.appendChild(imageDiv);
    catalogWrapper.appendChild(contentDiv);
    catalogCartDiv.appendChild(catalogWrapper);
    showTotal.innerText = `Total: $` + getTotalAmount(addedBooks);
    deleteBtn.addEventListener('click', () => {
      const filtered = [...addedBooks].filter((item) => item.id !== index);
      closeCart(deleteBtn);
      saveToStorage(filtered);
    });
  });
};

// drag events

let dragged = null;

const dragStart = () => {
  console.log('start');
};

const dragOver = (e) => {
  e.preventDefault();
};

const dragEnd = (e) => {
  e.preventDefault;
  let drag = e.target;
  let element = e.srcElement;
  let dropzone = classes('catalog_cart_div');
  let booksList = getFromStorage();
  let clonedElement = drag.cloneNode(true);
  const styles = window.getComputedStyle(drag);
  let cssText = styles.cssText;
  let delbtn = classes('card_delete_btn');
  [...delbtn].forEach((btn) => btn.classList.add('active'));
  if (!cssText) {
    cssText = Array.from(styles).reduce((str, property) => {
      return `${str}${property}:${styles.getPropertyValue(property)};`;
    }, '');
  }
  clonedElement.style.cssText = cssText;

  if (dropzone[0].classList.contains('catalog_cart_div')) {
    dropzone[0].appendChild(clonedElement);
  }
};

const dragCard = (e) => {
  e.dataTransfer.setData('elemendid', e.target.id);
};

const drop = () => {
  [...mainCards].forEach((card) => {
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragover', (e) => dragEnd(e));
    card.addEventListener('dragend', (e) => dragEnd(e));
  });
};

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
  [...addBtns].forEach((btn, index) => {
    btn.addEventListener('click', () => {
      if (index === booksList[index].id) {
        addedBooks = [...addedBooks, booksList[index]];
        saveToStorage(addedBooks);
        addToCart(index);
      }
    });
  });
  addToCart();
  drop();
});

footer();
