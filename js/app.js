const params = new URLSearchParams(window.location.search);
const categoria = params.get("cat");

const contenedor = document.getElementById("contenedor");
const titulo = document.getElementById("tituloCategoria");
const filtro = document.getElementById("filtro");

const modal = document.getElementById("modal");
const imgModal = document.getElementById("imgModal");
const descModal = document.getElementById("descModal");

if(titulo) titulo.innerText = categoria.toUpperCase();

let datos = [];

fetch("data/trabajos.json")
  .then(res => res.json())
  .then(data => {
    datos = data[categoria];
    mostrar(datos);
  });

function mostrar(lista){
  contenedor.innerHTML = "";

  lista.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${item.imagen}">
      <p>${item.descripcion}</p>
    `;

    card.onclick = () => {
      modal.style.display = "block";
      imgModal.src = item.imagen;
      descModal.innerText = item.descripcion;
    };

    contenedor.appendChild(card);
  });
}

if(filtro){
  filtro.addEventListener("change", () => {
    const valor = filtro.value;

    if(valor === "todos"){
      mostrar(datos);
    } else {
      const filtrados = datos.filter(d => d.material === valor);
      mostrar(filtrados);
    }
  });
}

document.getElementById("cerrar")?.addEventListener("click", () => {
  modal.style.display = "none";
});