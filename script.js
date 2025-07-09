let lists = JSON.parse(localStorage.getItem("smartLists")) || [];

const listContainer = document.getElementById("lists");
const listNameInput = document.getElementById("list-name");
const createListBtn = document.getElementById("create-list-btn");

function save() {
  localStorage.setItem("smartLists", JSON.stringify(lists));
}

function render() {
  listContainer.innerHTML = '';
  lists.forEach((list, listIndex) => {
    const card = document.createElement("div");
    card.className = "list-card";

    const header = document.createElement("div");
    header.className = "list-header";
    header.innerHTML = `
      <span>${list.name}</span>
      <button class="delete-list" onclick="deleteList(${listIndex})">🗑</button>
    `;

    const ul = document.createElement("ul");
    list.items.forEach((item, itemIndex) => {
      const li = document.createElement("li");

      const left = document.createElement("div");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = item.done;
      checkbox.onchange = () => toggleItem(listIndex, itemIndex);

      const span = document.createElement("span");
      span.textContent = item.text;
      if (item.done) span.className = "completed-text";

      left.appendChild(checkbox);
      left.appendChild(span);

      const delBtn = document.createElement("button");
      delBtn.textContent = "❌";
      delBtn.style.border = "none";
      delBtn.style.background = "none";
      delBtn.style.color = "#ff7675";
      delBtn.style.fontSize = "16px";
      delBtn.style.cursor = "pointer";
      delBtn.onclick = () => deleteItem(listIndex, itemIndex);

      li.appendChild(left);
      li.appendChild(delBtn);
      ul.appendChild(li);
    });

    const addSection = document.createElement("div");
    addSection.className = "add-item";
    addSection.innerHTML = `
      <input type="text" id="item-input-${listIndex}" placeholder="Add item...">
      <button onclick="addItem(${listIndex})">Add</button>
    `;

    card.appendChild(header);
    card.appendChild(ul);
    card.appendChild(addSection);

    listContainer.appendChild(card);
  });
}

function createList() {
  const name = listNameInput.value.trim();
  if (name) {
    lists.push({ name, items: [] });
    listNameInput.value = '';
    save();
    render();
  }
}

function addItem(index) {
  const input = document.getElementById(`item-input-${index}`);
  const text = input.value.trim();
  if (text) {
    lists[index].items.push({ text, done: false });
    input.value = '';
    save();
    render();
  }
}

function deleteItem(listIndex, itemIndex) {
  lists[listIndex].items.splice(itemIndex, 1);
  save();
  render();
}

function toggleItem(listIndex, itemIndex) {
  lists[listIndex].items[itemIndex].done = !lists[listIndex].items[itemIndex].done;
  save();
  render();
}

function deleteList(index) {
  lists.splice(index, 1);
  save();
  render();
}

createListBtn.onclick = createList;
render();