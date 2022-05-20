export function getFromStorage() {
  return localStorage.getItem('books')
    ? JSON.parse(localStorage.getItem('books'))
    : [];
}

export function saveToStorage(list) {
  localStorage.setItem('books', JSON.stringify(list));
  return list;
}

export default { getFromStorage, saveToStorage };
