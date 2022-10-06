const baseURL = "https://pokeapi.co/api/v2/pokemon";
const input = document.getElementById("input");
const form = document.getElementById("form");
const title = document.getElementById("title");
const namePoke = document.getElementById("name_poke");
const imgPoke = document.getElementById("img_poke");
const typePoke = document.getElementById("type_poke");
const weightPoke = document.getElementById("weight_poke");
const heightPoke = document.getElementById("height_poke");

const fetchPokemons = async (input) => {
  try {
    const res = await fetch(`${baseURL}/${input}`);
    const data = await res.json();
    return renderPokes(data);
  } catch (error) {
    renderError();
    title.textContent = `No existe ese Pókemon en el registro.`;
  }
};

const renderError = () => {
  title.parentElement.classList.remove(`box_poke_render`);
  title.classList.remove(`none`);
  title.parentElement.classList.add(`box_poke`);
  title.classList.add(`title_init`);

  namePoke.classList.add(`none`);
  imgPoke.parentElement.classList.add(`none`);
  typePoke.classList.add(`none`);
  weightPoke.classList.add(`none`);
  heightPoke.classList.add(`none`);
};

const renderPokes = (dataPokes) => {
  const { name, types, height, weight, sprites } = dataPokes;

  const typesPokes = () => {
    return types
      .map((tipo) => tipo.type.name)
      .join(" - ")
      .toUpperCase();
  };

  title.classList.remove(`title_init`);
  title.classList.add(`none`);
  title.parentElement.classList.remove(`box_poke`);
  title.parentElement.classList.add(`box_poke_render`);

  namePoke.classList.remove(`none`);
  imgPoke.parentElement.classList.remove(`none`);
  typePoke.classList.remove(`none`);
  weightPoke.classList.remove(`none`);
  heightPoke.classList.remove(`none`);

  namePoke.textContent = name.toUpperCase();
  imgPoke.setAttribute("src", sprites.other.home.front_default);
  typePoke.textContent = typesPokes();
  weightPoke.textContent = `${weight / 10} Kg`;
  heightPoke.textContent = `${height / 10} m`;
};

const getInput = (e) => {
  e.preventDefault();

  const inputValue = input.value.trim();

  if (!inputValue || inputValue < 1) {
    renderError();
    title.textContent = `Por favor ingrese un número válido.`;
  } else {
    fetchPokemons(inputValue);
  }

  form.reset();
};

const init = () => {
  form.addEventListener("submit", getInput);
};

init();
