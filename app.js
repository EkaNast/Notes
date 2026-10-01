const inputElement = document.getElementById('title') 
const createBtn = document.getElementById('create')  
const listElement = document.getElementById('list')    

const notes = [
  { title: 'learn js', completed: false },
]

// Принимает заметку и её номер в массиве, возвращает HTML-строку <li>.
function getNoteTemplate(note, index) {
  return `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <!-- Если заметка выполнена, добавляем класс зачёркивания -->
      <span class="${note.completed ? 'text-decoration-line-through' : ''}">${note.title}</span>
      <span>
        <!-- data-type: что делает кнопка, data-index: к какой заметке относится -->
        <span class="btn btn-sm btn-success" data-type="toggle" data-index="${index}">&check;</span>
        <span class="btn btn-sm btn-danger" data-type="remove" data-index="${index}">&times;</span>
      </span>
    </li>
  `
}

// Перерисовывает весь список по данным из массива notes.
function render() {
  // Если заметок нет, показываем подсказку и выходим
  if (notes.length === 0) {
    listElement.innerHTML = '<p class="text-center mt-3">Нет ни одной заметки</p>'
    return
  }

  // map превращает каждую заметку в HTML-строку,
  // join склеивает строки в одну, и всё записывается в список разом.
  // Запись в innerHTML заменяет старое содержимое, поэтому дублей нет.
  listElement.innerHTML = notes.map(getNoteTemplate).join('')
}

function addNote() {
  // trim() убирает пробелы по краям
  const title = inputElement.value.trim()

  // Пустую заметку не добавляем
  if (title.length === 0) {
    return
  }

  notes.push({ title, completed: false }) // добавляем в массив
  inputElement.value = ''                 // очищаем поле
  render()                                // перерисовываем список
}

createBtn.onclick = addNote

// event.target — это элемент, по которому кликнули.
listElement.onclick = function (event) {
  // Достаём data-type и data-index из нажатого элемента
  const { type, index } = event.target.dataset

  // Если у элемента нет data-index, значит клик был не по нашей кнопке
  if (index === undefined) {
    return
  }

  if (type === 'toggle') {
    // ✓ — переключаем «выполнено» на противоположное (true ↔ false)
    notes[index].completed = !notes[index].completed
  } else if (type === 'remove') {
    // × — удаляем одну заметку с номером index из массива
    notes.splice(index, 1)
  }

  render() // после любого изменения перерисовываем список
}

// --- Первый запуск: показываем начальные заметки ---
render()