const id = (id) => document.getElementById(id);
const classes = (classes) => document.getElementsByClassName(classes);
const mainWrapper = id('main_wrapper');
const pageTitle = document.createElement('h2');
pageTitle.innerText = 'Learn how to learn with our books';
mainWrapper.prepend(pageTitle);
const modalSection = document.createElement('section');
modalSection.className += 'modal_section';
mainWrapper.after(modalSection);

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

const closePopup = (target) => {
  target.parentElement.parentElement.parentElement.classList.add('hide');
  target.parentElement.parentElement.parentElement.classList.remove('active');
};

const openPopup = (target) => {
  target.parentElement.parentElement.parentElement.classList.remove('hide');
  target.parentElement.parentElement.parentElement.classList.add('active');
};

const modal = (obj, index = 0) => {
  clearElement(modalSection);
  obj.forEach((book) => {
    const modalWrapper = document.createElement('div');
    modalWrapper.setAttribute('id', `${index}`);
    modalWrapper.className += 'modal_wrapper';
    const modalInnerWrap = document.createElement('div');
    const modalDesc = document.createElement('p');
    modalDesc.innerText = `${book.description}`;
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
  const showBtns = document.getElementsByClassName('card_show_btn');
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

window.addEventListener('DOMContentLoaded', () => {
  header();
  populate().then((booksList) => {
    addCards(booksList);
    const showBtns = document.getElementsByClassName('card_show_btn');
    const modalCloseBtn = document.getElementById('close_btn');
    [...showBtns].forEach((btn, index) => {
      btn.addEventListener('click', () => {
        console.log(index, 'index', booksList[index].id, 'id-id');
        if (index === booksList[index].id) {
          modal(booksList, booksList[index].id);
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
