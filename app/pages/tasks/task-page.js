import "boxicons"; // Asegúrate de que 'boxicons' esté importado correctamente según tu configuración

export function TaskManager() {
  const $content = /*html*/ `
        <h1>Hello welcome to your task manager</h1>

        <div class=".modalCrear">

        </div>

        <button id="crear"><box-icon name='book-add' ></box-icon></button>


        <div id='container' class="grid grid-cols-3">

        </div>
    `;

  const logic = async () => {
    const $container = document.getElementById("container");
    const $crearTask = document.getElementById("crear");
    const url = "http://localhost:3000/tasks";

    //Modal para crear una nueva tarea
    $crearTask.onclick = function () {
      let modal = document.querySelector(".modalCrear");

      if (!modal) {
        modal = document.createElement("DIV");
        modal.classList.add("modalCrear");

        modal.innerHTML = /*html*/ `
                
                <form>
                    <label for="nombre">Name</label>
                    <input type="text" id="nombre" class="mx-2 p-3 bg-black text-white rounded-full">

                    <label for="description">Description</label>
                    <input type="text" id="description" class="mx-2 p-3 bg-black text-white rounded-full">

                    <select id="status">
                        <option value="0" disabled>Select a state</option>
                        <option value="iniciando">Starting</option>
                        <option value="progreso">In progress</option>
                    </select>

                    <input type="submit" value="send" class="mx-2 p-3 bg-black text-white rounded-full">
                    <button id="close" class="mx-2 p-3 bg-black text-white rounded-full">Close</button>
                </form>
            `;

        document.body.appendChild(modal);

        const $nombre = document.getElementById("nombre");
        const $description = document.getElementById("description");
        const $status = document.getElementById("status");
        const $submit = document.getElementsByTagName("form")[0];

        $submit.addEventListener("submit", async (e) => {
          e.preventDefault();

          try {
            const createTask = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: $nombre.value,
                description: $description.value,
                status: $status.value,
              }),
            });

            if (!createTask.ok) {
              throw new Error("No ha sido posible crear la tarea");
            }

            alert("Tarea creado exitosamente");
            window.location.reload();
          } catch (err) {
            alert(err);
          }
        });

        modal.style.display = "block";
        const closeBtn = document.getElementById("close");

        closeBtn.addEventListener("click", (e) => {
          e.preventDefault();
          document.body.removeChild(modal);
        });
      }
    };

    //imprimimos tareas que tengamos ya almacenadas en la base de datos
    try {
      const getTask = await fetch(url);

      if (!getTask) {
        throw new Error("No es posible obtener la info");
      }

      const taskToJson = await getTask.json();

      taskToJson.forEach((task) => {
        $container.innerHTML += /*html*/ `
                    <div class="border border-sky-300 mx-3">
                        <h1 class="text-xl">${task.name}</h1>
                        <p>${task.description}</p>
                        <p>${task.status}</p>

                        <button class="edit"><box-icon name='edit-alt' type='solid' ></box-icon></button>
                        <button class="delete"><box-icon name='trash' type='solid' ></box-icon></button>
                    </div>
                `;

        const edit = document.getElementsByClassName("edit");
        const deleteTask = document.getElementsByClassName("delete");

        for (let f of deleteTask) {
          f.addEventListener("click", async () => {
            const inputUSer = confirm("¿Seguro quieres eliminar esta tarea?");

            if (inputUSer) {
              try {
                const _deleteTask = await fetch(
                  ` http://localhost:3000/tasks/${task.id}`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );

                if (!_deleteTask.ok) {
                  throw new Error("No ha sido posible eliminar la tarea");
                }

                alert("Tarea eliminada exitosamente");
                window.location.reload();
              } catch (err) {
                alert(err);
              }
            }
          });
        }

        for (let f of edit) {
          f.addEventListener("click", async () => {
            let modal = document.querySelector(".modalCrear");

            if (!modal) {
              modal = document.createElement("DIV");
              modal.classList.add("modalCrear");

              modal.innerHTML = /*html*/ ` 
                            <form>
                                <label for="nombre" >Name</label>
                                <input type="text" id="nombre" disabled value=${task.name}>
            
                                <label for="description">Description</label>
                                <input type="text" id="description" disabled value=${task.description}>
            
                                <select id="status">
                                    <option value="0" disabled>Select a state</option>
                                    <option value="iniciando">Starting</option>
                                    <option value="progreso">In progress</option>
                                    <option value="finalizada">Finished</option>
                                </select>
            
                                <input type="submit" value="send" class="mx-2 p-3 bg-black text-white rounded-full">
                                <button id="close" class="mx-2 p-3 bg-black text-white rounded-full">close</button>
                            </form>
                        `;

              document.body.appendChild(modal);

              const $nombre = document.getElementById("nombre");
              const $description = document.getElementById("description");
              const $status = document.getElementById("status");
              const $submit = document.getElementsByTagName("form")[0];

              modal.style.display = "block";
              const closeBtn = document.getElementById("close");

              closeBtn.addEventListener("click", (e) => {
                e.preventDefault();
                document.body.removeChild(modal);
              });

              $submit.addEventListener("submit", async (e) => {
                e.preventDefault();

                const updateTask = {
                  name: $nombre.value,
                  description: $description.value,
                  status: $status.value,
                };

                try {
                  const update = await fetch(
                    `http://localhost:3000/tasks/${task.id}`,
                    {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(updateTask),
                    }
                  );

                  if (!update.ok) {
                    throw new Error("error to update your task");
                  }

                  alert("update succesful");
                  window.location.reload();
                } catch (err) {
                  alert(err);
                }
              });
            }
          });
        }
      });
    } catch (err) {
      alert(err);
    }
  };

  return {
    $content,
    logic,
  };
}
