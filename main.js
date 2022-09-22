// Fetch the items from the JSON file
function loadItems() {
    return fetch('data/data.json')
      .then(response => response.json())
      .then(json => json.items);
  }
  
  // Update the list with the given items
  function displayItems(items) {
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
  }
  
  // Create HTML list item from the given data item
  function createHTMLString(item) {
    return `
      <li class="item">
          <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
          <span class="item__description">${item.gender}, ${item.size}</span>
      </li>
      `;
  }
  
  function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    // 어떤 것도 없을때 
    if (key == null || value == null) {
      return;
    }

    // 해당하는 key 와 value가 보여질 수 있도록 
    displayItems(items.filter(item => item[key] === value));
  }
  
//   버튼이 클릭했을 때 동작할 수 있도록 정의 
  function setEventListeners(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items));
  }
  
  // main
  loadItems()
    .then(items => {
      displayItems(items);
      setEventListeners(items);
    })
    .catch(console.log);
  