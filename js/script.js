document.addEventListener("DOMContentLoaded", function () {
  const email = {
    de: "",
    para: "",
    asunto: "",
    mensaje: "",
  };

  const inputEmail__de = document.querySelector("#de");
  const inputEmail__para = document.querySelector("#para");
  const inputEmail__cc = document.querySelector("#cc");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const formulario = document.querySelector("#formulario");
  const btnEnviar = document.querySelector(".btn-enviar");
  const btnReset = document.querySelector(".btn-reset");
  const spinner = document.querySelector("#spinner");

  inputEmail__de.addEventListener("blur", validar);
  inputEmail__para.addEventListener("blur", validar);
  inputAsunto.addEventListener("blur", validar);
  inputMensaje.addEventListener("blur", validar);
  formulario.addEventListener("submit", enviarEmail);

  inputEmail__cc.addEventListener("input", function (e) {
    if (e.target.id === "cc" && !validarEmail(e.target.value)) {
      mostrarAlerta("El email no es valido", e.target.parentElement);
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }
    limpiarAlerta(e.target.parentElement);

    // asignar los valores
    email[e.target.name] = e.target.value.trim().toLowerCase();

    // comprobar el objeto email
    comprobarEmail();
  });

  btnReset.addEventListener("click", function (e) {
    e.preventDefault();

    // Obtén el formulario
    const formulario = document.getElementById("formulario");

    // Busca todos los elementos con la clase "alerta" dentro del formulario
    const alertas = formulario.querySelectorAll(".alerta");

    // Elimina las alertas
    alertas.forEach(function (alerta) {
      alerta.classList.remove("alerta");
      alerta.parentElement.removeChild(alerta);
    });

    // limpiarAlerta(e.target.parentElement);
    resetForms();
  });

  function enviarEmail(e) {
    e.preventDefault();

    spinner.classList.add("spinner");
    spinner.classList.remove("hidden");

    setTimeout(() => {
      spinner.classList.remove("spinner");
      spinner.classList.add("hidden");

      // reiniciar el objeto
      resetForms();

      // Crear una alerta
      const alertaExito = document.createElement("P");
      alertaExito.classList.add("exito");
      alertaExito.textContent = "Mensaje enviado correctamente";
      formulario.appendChild(alertaExito);

      setTimeout(() => {
        alertaExito.remove();
      }, 3000);
    }, 5000);
  }

  function validar(e) {
    // console.log(e.target.parentElement);
    if (e.target.value.trim() == "") {
      mostrarAlerta(
        `El campo ${e.target.name} es obligatorio`,
        e.target.parentElement
      );
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    if (e.target.type === "email" && !validarEmail(e.target.value)) {
      mostrarAlerta("El email no es valido", e.target.parentElement);
      email[e.target.name] = "";
      return;
    }

    limpiarAlerta(e.target.parentElement);

    // asignar los valores
    email[e.target.name] = e.target.value.trim().toLowerCase();

    // comprobar el objeto email
    comprobarEmail();
  }

  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);

    // Generar la alerta en html
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("alerta");

    // inyectar en le formulario
    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector(".alerta");
    if (alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    // expression regular
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }
  // console.log(email);
  function comprobarEmail() {
    // console.log(email);
    if (Object.values(email).includes("")) {
      btnEnviar.classList.add("opacity");
      btnEnviar.disabled = true;
      return;
    } else {
      btnEnviar.classList.remove("opacity");
      btnEnviar.disabled = false;
    }
  }
  function resetForms() {
    // reiniciar el objeto
    email.de = "";
    email.para = "";
    email.cc = "";
    email.asunto = "";
    email.mensaje = "";
    formulario.reset();
    comprobarEmail();
  }
});
