import "./style.css";

function cambiarImagen(idMiniatura: string): void {
  const principal = document.getElementById("principal") as HTMLImageElement;
  const miniatura = document.getElementById(idMiniatura) as HTMLImageElement;
  principal.src = miniatura.src;
  principal.alt = miniatura.alt;
}

const imagen1 = document.getElementById("imagen1");
const imagen2 = document.getElementById("imagen2");
const imagen3 = document.getElementById("imagen3");
const imagen4 = document.getElementById("imagen4");

if (imagen1 !== null && imagen1 !== undefined) {
  imagen1.addEventListener("click", () => cambiarImagen("imagen1"));
}
if (imagen2 !== null && imagen2 !== undefined) {
  imagen2.addEventListener("click", () => cambiarImagen("imagen2"));
}
if (imagen3 !== null && imagen3 !== undefined) {
  imagen3.addEventListener("click", () => cambiarImagen("imagen3"));
}
if (imagen4 !== null && imagen4 !== undefined) {
  imagen4.addEventListener("click", () => cambiarImagen("imagen4"));
}
