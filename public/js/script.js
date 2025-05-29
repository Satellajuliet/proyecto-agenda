// public/js/script.js
document.addEventListener('DOMContentLoaded', () => {
  renderizarContactos();
});

async function renderizarContactos() {
  try {
    const response = await fetch('/api/contactos');
    const contactos = await response.json();
    const contenedor = document.getElementById('lista-contactos');
    contenedor.innerHTML = '';
    contactos.forEach((contacto, i) => {
      const div = document.createElement('div');
     div.className = 'contacto';
     div.innerHTML = `
        <span>${contacto.nombre} - ${contacto.telefono} - ${contacto.correo_eletronico}</span>
        <span class="acciones">
          <button onclick="eliminarContacto(${contacto.id})">Eliminar</button>
        </span>
      `;
      contenedor.appendChild(div);
    });
  } catch (error) {
    console.error('Error al cargar contactos:', error);
  }
}

async function agregarContacto() {
  const nombre = document.getElementById('nombre').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const correo_eletronico = document.getElementById('correo_eletronico').value.trim();

  // Validar que el nombre contenga solo letras y espacios
  const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  if (!soloLetras.test(nombre)) {
    alert("El nombre solo debe contener letras.");
    return;
  }

  // Validar que el teléfono tenga exactamente 10 dígitos numéricos
  const soloNumeros = /^\d{10}$/;
  if (!soloNumeros.test(telefono)) {
    alert("El teléfono debe contener exactamente 10 números.");
    return;
  }

  try {
    const response = await fetch('/api/contactos', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({ nombre, telefono, correo_eletronico })
   });
    await response.json();
    renderizarContactos();
    mostrarMensaje("Contacto agregado");
    document.getElementById('nombre').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('correo_eletronico').value = '';
  } catch (error) {
    console.error('Error al agregar contacto:', error);
  }
}

async function eliminarContacto(id) {
  if (confirm("¿Seguro que deseas eliminar este contacto?")) {
    try {
      const response = await fetch(`/api/contactos/${id}`, {
       method: 'DELETE'
     });
     if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      renderizarContactos();
      mostrarMensaje("Contacto eliminado");
    } catch (error) {
      console.error('Error al eliminar contacto:', error);
    }
  }
}

 async function limpiarContactos() {
  if (confirm("¿Eliminar todos los contactos?")) {
    try {
      await fetch('/api/contactos', {
        method: 'DELETE'
      });
      renderizarContactos();
    } catch (error) {
      console.error('Error al limpiar contactos:', error);
    }
  }
}

 function mostrarMensaje(texto) {
  const mensaje = document.getElementById('mensaje');
  mensaje.textContent = texto;
  setTimeout(() => mensaje.textContent = '', 2000);
 }

async function filtrarContactos() {
  const texto = document.getElementById('buscador').value.toLowerCase();
  try {
    const response = await fetch(`/api/contactos?texto=${texto}`);
    const contactosFiltrados = await response.json();
    const contenedor = document.getElementById('lista-contactos');
    contenedor.innerHTML = '';
    contactosFiltrados.forEach((contacto, i) => {
      const div = document.createElement('div');
      div.className = 'contacto';
      div.innerHTML = `
        <span>${contacto.nombre} - ${contacto.telefono} - ${contacto.correo_eletronico}</span>
        <span class="acciones">
          <button onclick="eliminarContacto(${contacto.id})">Eliminar</button>
        </span>
      `;
      contenedor.appendChild(div);
    });
  } catch (error) {
    console.error('Error al filtrar contactos:', error);
  }
}