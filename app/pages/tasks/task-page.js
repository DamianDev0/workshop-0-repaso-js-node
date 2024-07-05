import 'boxicons'; // Asegúrate de que 'boxicons' esté importado correctamente según tu configuración
import styles from './task.css';

export function TaskManager() {
  const $content = /*html*/ ` 
    <div>
      <button id="add-btn"><box-icon name='book-add'></box-icon></button>
      <div id="mymodal" class="${styles['modalcontainer']}">
        <div class="${styles['modalcontent']}">
          <h2>Add a new task</h2>
          <form id="task-form">
            <span class="${styles['close']}" id="close-btn">x</span>
            <input type="text" id="task-title" placeholder="Title" required>
            <input type="text" id="task-desc" placeholder="Description" required>
            <button type="submit">Add Task</button>
          </form>
        </div>
      </div>

      <div id="modaledit" class="${styles['modalcontainer']}">
        <div class="${styles['modalcontent']}">
          <h2>Edit task</h2>
          <form id="edit-form">
            <span class="${styles['close']}" id="edit-close-btn">x</span>
            <input type="text" id="edit-title" placeholder="Title" required>
            <input type="text" id="edit-desc" placeholder="Description" required>
            <button type="submit">Update Task</button>
          </form>
        </div>
      </div>

      <div id="task-container"></div>
    </div>
  `;

  document.getElementById('root').innerHTML = $content;

  const $modal = document.getElementById('mymodal');
  const $editModal = document.getElementById('modaledit');
  const $button = document.getElementById('add-btn');
  const $close = document.getElementById('close-btn');
  const $editClose = document.getElementById('edit-close-btn');
  const $taskForm = document.getElementById('task-form');
  const $editForm = document.getElementById('edit-form');

  let editTaskId = undefined;

  $button.addEventListener('click', () => {
    $modal.style.display = 'block';
  });

  $close.addEventListener('click', () => {
    $modal.style.display = 'none';
  });

  $editClose.addEventListener('click', () => {
    $editModal.style.display = 'none';
  });

  $taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;
    const status = 'Pending';

    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, status }),
      });
      if (response.status === 201) {
        alert('Task created');
        logic(); // Refrescar las tareas sin recargar la página
        $modal.style.display = 'none'; // Cerrar el modal
      }
    } catch (error) {
      console.error('Error adding new task:', error);
    }
  });

  $editForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.getElementById('edit-title').value;
    const description = document.getElementById('edit-desc').value;

    try {
      const response = await fetch(`http://localhost:3000/tasks/${editTaskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
      if (response.status === 200) {
        alert('Task updated');
        logic(); // Refrescar las tareas sin recargar la página
        $editModal.style.display = 'none'; // Cerrar el modal
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  });

  const editTask = async (taskId) => {
    editTaskId = taskId;

    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
      const task = await response.json();

      document.getElementById('edit-title').value = task.title;
      document.getElementById('edit-desc').value = task.description;

      $editModal.style.display = 'block';
    } catch (error) {
      console.error(`Error fetching task ${taskId}:`, error);
    }
  }

  const updateStatus = async (taskId, newStatus) => {
    try {
      await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      logic(); // Llamar de nuevo a la función lógica para refrescar las tareas
    } catch (error) {
      console.error(`Error updating status for task ${taskId}:`, error);
    }
  };

  const deleteTask = async (taskId) => {
    const option = confirm('Are you sure you want to delete this task?');
    if (option) {
      try {
        await fetch(`http://localhost:3000/tasks/${taskId}`, {
          method: 'DELETE',
        });
        logic(); // Refrescar las tareas sin recargar la página
      } catch (error) {
        console.error(`Error deleting task ${taskId}:`, error);
      }
    }
  };

  const logic = async () => {
    const $taskContainer = document.getElementById('task-container');
    $taskContainer.innerHTML = ''; // Limpiar el contenedor antes de añadir las tareas

    try {
      const fetchTasks = await fetch('http://localhost:3000/tasks');
      const tasks = await fetchTasks.json();

      tasks.forEach(task => {
        const taskElement = document.createElement('DIV');

        taskElement.innerHTML = /*html*/ `
          <h3>${task.title}</h3>
          <p>${task.description}</p>
          <p>Status: ${task.status}</p>
          <div>
            <button class="complete-btn" data-id="${task.id}"><box-icon type='solid' name='like'></box-icon></button>
            <button class="progress-btn" data-id="${task.id}"><box-icon name='dislike' type='solid'></box-icon></button>
            <button class="delete-btn" data-id="${task.id}"><box-icon name='trash' type='solid'></box-icon></button>
            <button class="edit-btn" data-id="${task.id}"><box-icon type='solid' name='edit-alt'></box-icon></button>
          </div>
        `;

        const $completeBtn = taskElement.querySelector('.complete-btn');
        $completeBtn.addEventListener('click', () => updateStatus(task.id, 'completed'));

        const $progressBtn = taskElement.querySelector('.progress-btn');
        $progressBtn.addEventListener('click', () => updateStatus(task.id, 'in progress'));

        const $deleteBtn = taskElement.querySelector('.delete-btn');
        $deleteBtn.addEventListener('click', () => deleteTask(task.id));

        const $editBtn = taskElement.querySelector('.edit-btn');
        $editBtn.addEventListener('click', () => editTask(task.id));

        $taskContainer.appendChild(taskElement);
      });

    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

 logic()
}
