const tareas = [
    { id: 1, descripcion: "Mejorar Swing", realizada: false },
    { id: 2, descripcion: "Practicar más JavaScript", realizada: false },
    { id: 3, descripcion: "Hacer los quehaceres del hogar", realizada: false }
];

let idContador = 4;

const tablaTareas = document.getElementById('tablaTareas');
const totalTareas = document.getElementById('totalTareas');
const tareasRealizadas = document.getElementById('tareasRealizadas');

function agregarTarea() {
    const input = document.getElementById('nuevaTareaInput');
    const descripcion = input.value.trim();
    if (descripcion === '') {
        alert('Debes ingresar una tarea antes de agregar');
        return;
    }

    tareas.push({
        id: idContador++,
        descripcion,
        realizada: false
    });

    input.value = '';
    renderizarTareas();
}

function cambiarEstado(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.realizada = !tarea.realizada;
        renderizarTareas();
    }
}

function eliminarTarea(id) {
    if (!confirm('¿Está seguro de eliminar esta tarea?')) return;

    const index = tareas.findIndex(t => t.id === id);
    if (index !== -1) {
        tareas.splice(index, 1);
        renderizarTareas();
    }
}

function renderizarTareas() {
    tablaTareas.innerHTML = '';

    for (const tarea of tareas) {
        const tr = document.createElement('tr');

        const tdId = document.createElement('td');
        tdId.textContent = tarea.id;

        const tdDesc = document.createElement('td');
        tdDesc.textContent = tarea.descripcion;
        if (tarea.realizada) tdDesc.classList.add('realizada');

        const tdCheckbox = document.createElement('td');
        tdCheckbox.classList.add('text-center');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarea.realizada;
        checkbox.onclick = () => cambiarEstado(tarea.id);
        tdCheckbox.appendChild(checkbox);

        const tdEliminar = document.createElement('td');
        tdEliminar.classList.add('text-center');
        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'btn-delete';
        btnEliminar.innerHTML = '<i class="bi bi-x-circle-fill"></i>';
        btnEliminar.onclick = () => eliminarTarea(tarea.id);
        tdEliminar.appendChild(btnEliminar);

        tr.appendChild(tdId);
        tr.appendChild(tdDesc);
        tr.appendChild(tdCheckbox);
        tr.appendChild(tdEliminar);
        tablaTareas.appendChild(tr);
    }

    totalTareas.textContent = tareas.length;
    tareasRealizadas.textContent = tareas.filter(t => t.realizada).length;
}

renderizarTareas();
