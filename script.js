const btnCriarTarefa = document.getElementById('criar-tarefa');
const listaTarefas = document.getElementById('lista-tarefas');
const btnApagarLista = document.getElementById('apaga-tudo');
const btnRemoverFinalizados = document.getElementById('remover-finalizados');
const btnSalvarTarefas = document.getElementById('salvar-tarefas');
const textoTarefa = document.getElementById('texto-tarefa');
const btnMoverCima = document.getElementById('mover-cima');
const btnMoverBaixo = document.getElementById('mover-baixo');
const btnRemoverSelecionado = document.getElementById('remover-selecionado');
const listItem = '.list-item';
let listItems = document.querySelectorAll(listItem);

function handleChangeColor(event) {
  listItems = document.querySelectorAll(listItem);
  listItems.forEach((element) => {
    element.classList.remove('selected');
  });
  event.target.classList.add('selected');
}

function handleCompleteTask(event) {
  event.target.classList.toggle('completed');
}

function criarTarefa(item) {
  const newListItem = document.createElement('li');

  newListItem.classList = 'list-item';
  newListItem.addEventListener('click', handleChangeColor);
  newListItem.addEventListener('dblclick', handleCompleteTask);
  newListItem.innerText = item;
  listaTarefas.appendChild(newListItem);
  textoTarefa.value = '';
}

function handleCriarTarefa() {
  criarTarefa(textoTarefa.value);
}

btnCriarTarefa.addEventListener('click', handleCriarTarefa);

function handleDeleteList() {
  while (listaTarefas.firstChild) {
    listaTarefas.removeChild(listaTarefas.lastChild);
  }
}

btnApagarLista.addEventListener('click', handleDeleteList);

function handleRemoverFinalizados() {
  const completedItems = document.querySelectorAll('.completed');
  completedItems.forEach((element) => {
    element.remove();
  });
}

btnRemoverFinalizados.addEventListener('click', handleRemoverFinalizados);

function saveCurrentSelected() {
  listItems = document.querySelectorAll(listItem);
  const selectedElement = document.querySelector('.selected');
  if (selectedElement.innerText === null) {
    return;
  }
  listItems.forEach((element, index) => {
    if (element.innerText === selectedElement.innerText) {
      localStorage.setItem('currentSelected', index);
    }
  });
}

function saveCurrentCompletedTasks() {
  const listCompletedItems = document.querySelectorAll('.completed');
  const completedTasks = [];
  listCompletedItems.forEach((element) => {
    completedTasks.push(element.innerText);
  });
  localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  saveCurrentSelected();
}

function handleSalvarTarefas() {
  listItems = document.querySelectorAll(listItem);
  const savedListItems = [];
  listItems.forEach((element) => {
    savedListItems.push(element.innerText);
  });
  localStorage.setItem('saved list', JSON.stringify(savedListItems));
  saveCurrentSelected();
  saveCurrentCompletedTasks();
}
btnSalvarTarefas.addEventListener('click', handleSalvarTarefas);

function loadList() {
  const savedListItems = JSON.parse(localStorage.getItem('saved list'));
  if (savedListItems) {
    savedListItems.forEach((element) => {
      criarTarefa(element);
    });
  }
}

function loadSelected() {
  const value = localStorage.getItem('currentSelected');
  if (value) {
    listItems = document.querySelectorAll(listItem);
    listItems[value].classList.add('selected');
  }
}
function addCompletedClass(element) {
  listItems = document.querySelectorAll(listItem);
  for (let index = 0; index < listItems.length; index += 1) {
    if (listItems[index].innerText === element) {
      listItems[index].classList.add('completed');
    }
  }
}
function loadCompleted() {
  const listCompletedItems = JSON.parse(localStorage.getItem('completedTasks'));
  if (listCompletedItems) {
    listCompletedItems.forEach((element) => {
      addCompletedClass(element);
    });
  }
}

function carregarTarefas() {
  loadList();
  loadSelected();
  loadCompleted();
}

function organizeFunctionCima(_listItems, _selectedElement, _value) {
  const insListItem = _listItems;
  const selectedElement = _selectedElement;
  let value = _value;
  for (let index = 0; index < insListItem.length; index += 1) {
    if (
      insListItem[index].innerHTML === selectedElement.innerHTML && index !== 0
    ) {
      value = insListItem[index - 1].innerHTML;
      insListItem[index - 1].innerHTML = insListItem[index].innerHTML;
      insListItem.forEach((element) => {
        element.classList.remove('selected');
      });
      insListItem[index - 1].classList.add('selected');
      insListItem[index].innerHTML = value;
    }
  }
}
function handleMoverCima() {
  const selectedElement = document.querySelector('.selected');
  listItems = document.querySelectorAll(listItem);
  const value = listItems[0];
  if (selectedElement === null) {
    return;
  }
  organizeFunctionCima(listItems, selectedElement, value);
}

btnMoverCima.addEventListener('click', handleMoverCima);

function organizeFunctionBaixo(_listItems, _selectedElement, _value) {
  const insListItem = _listItems;
  const selectedElement = _selectedElement;
  let value = _value;
  for (let index = 0; index < insListItem.length; index += 1) {
    if (
      insListItem[index].innerHTML === selectedElement.innerHTML && index !== insListItem.length - 1
    ) {
      value = insListItem[index + 1].innerHTML;
      insListItem[index + 1].innerHTML = insListItem[index].innerHTML;
      insListItem.forEach((element) => {
        element.classList.remove('selected');
      });
      insListItem[index + 1].classList.add('selected');
      insListItem[index].innerHTML = value;
    }
  }
}
function handleMoverBaixo() {
  const selectedElement = document.querySelector('.selected');
  listItems = document.querySelectorAll(listItem);
  const value = listItems[0];
  if (selectedElement === null) {
    return;
  }
  organizeFunctionBaixo(listItems, selectedElement, value);
}
btnMoverBaixo.addEventListener('click', handleMoverBaixo);

function handleRemoverSelecionado() {
  const selectedElement = document.querySelector('.selected');
  selectedElement.remove();
}
btnRemoverSelecionado.addEventListener('click', handleRemoverSelecionado);
window.onload = () => {
  carregarTarefas();
};
