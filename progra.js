const pacientes = [];
const usuarios = [{ usuario: 'admin', clave: '123456' }]; // Cuenta de ejemplo

// Bootstrap modales
const loginModalEl = document.getElementById('loginModal');
const loginModal = new bootstrap.Modal(loginModalEl);

const registerModalEl = document.getElementById('registerModal');
const registerModal = new bootstrap.Modal(registerModalEl);

const appContent = document.getElementById('appContent');
const loginError = document.getElementById('login-error');
const registerError = document.getElementById('register-error');

// Función para iniciar sesión
function iniciarSesion() {
  const usuario = document.getElementById("usuario").value.trim();
  const clave = document.getElementById("clave").value.trim();

  if (clave.length < 6) {
    loginError.textContent = "La clave debe tener al menos 6 caracteres.";
    return;
  }

  // Buscar usuario
  const encontrado = usuarios.find(u => u.usuario === usuario && u.clave === clave);

  if (!encontrado) {
    loginError.textContent = "Usuario o clave incorrectos.";
    return;
  }

  // Login exitoso
  loginError.textContent = "";
  loginModal.hide();

  // Mostrar contenido principal
  appContent.classList.remove('d-none');

  // Limpiar inputs
  document.getElementById("usuario").value = '';
  document.getElementById("clave").value = '';
}

// Función para crear cuenta (sin backend, solo simulado)
function crearCuenta() {
  const newUsuario = document.getElementById('newUsuario').value.trim();
  const newClave = document.getElementById('newClave').value.trim();

  if (!newUsuario || newClave.length < 6) {
    registerError.textContent = "Complete todos los campos y clave mínimo 6 caracteres.";
    return;
  }

  // Verificar si usuario ya existe
  const existe = usuarios.some(u => u.usuario === newUsuario);
  if (existe) {
    registerError.textContent = "El usuario ya existe.";
    return;
  }

  // Agregar nuevo usuario
  usuarios.push({ usuario: newUsuario, clave: newClave });
  registerError.textContent = "";
  alert("Cuenta creada con éxito. Ahora puede iniciar sesión.");

  // Limpiar y cerrar modal, abrir login
  document.getElementById('newUsuario').value = '';
  document.getElementById('newClave').value = '';

  registerModal.hide();
  loginModal.show();
}

// Agregar eventos botones
document.getElementById('btnLogin').addEventListener('click', iniciarSesion);
document.getElementById('btnRegister').addEventListener('click', crearCuenta);

// Manejador del formulario pacientes
document.getElementById("formPaciente").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const edad = parseInt(document.getElementById("edad").value);
  const genero = document.getElementById("genero").value;
  const documento = document.getElementById("documento").value.trim();
  const sintomas = document.getElementById("sintomas").value.trim();
  const gravedad = document.getElementById("gravedad").value;
  const tratamiento = document.getElementById("tratamiento").value.trim();
  const medicamentos = document.getElementById("medicamentos").value.trim();
  const examenes = document.getElementById("examenes").value;

  if (!nombre || isNaN(edad) || edad <= 0 || !genero || documento.length < 5 ||
      !sintomas || !gravedad || !tratamiento || !medicamentos || !examenes) {
    alert("Por favor complete todos los campos correctamente.");
    return;
  }

  const paciente = {
    nombre, edad, genero, documento, gravedad
  };

  pacientes.push(paciente);
  mostrarPacientes();
  this.reset();

  if (gravedad === "crítico") {
    alert("⚠ Paciente en estado CRÍTICO registrado.");
  }
});

function mostrarPacientes() {
  const tabla = document.querySelector("#tablaPacientes tbody");
  tabla.innerHTML = "";

  const prioridad = { crítico: 1, urgente: 2, moderado: 3, leve: 4 };
  pacientes.sort((a, b) => prioridad[a.gravedad] - prioridad[b.gravedad]);

  pacientes.forEach((p, index) => {
    const fila = document.createElement("tr");
    fila.className = p.gravedad;

    fila.innerHTML = `
      <td>${p.nombre}</td>
      <td>${p.edad}</td>
      <td>${p.genero}</td>
      <td>${p.documento}</td>
      <td class="text-capitalize">${p.gravedad}</td>
      <td><button class="btn btn-danger btn-sm" onclick="eliminarPaciente(${index})">Eliminar</button></td>
    `;

    tabla.appendChild(fila);
  });
}

function eliminarPaciente(index) {
  pacientes.splice(index, 1);
  mostrarPacientes();
}
