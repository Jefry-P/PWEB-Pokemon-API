const baseURL = "https://pokeapi.co/api/v2/pokemon";

const errorLabel = document.querySelector('.error');
const list = document.querySelector(".pokemon-list");
const form = document.querySelector('#search-form')
const isEditing = false;
const currentEditingItem = null;

async function searchPokemon(paramName) {
    try {
        const res = await fetch(`${baseURL}/${paramName}`); 
        const data = await res.json();

        const li = document.createElement('li');
        li.classList.add('card');

        const cardSection = document.createElement('div');
        cardSection.classList.add('card-section');
        const img = document.createElement('img');

        const infoSection = document.createElement('div');
        infoSection.classList.add('info');

        const id =document.createElement('span');
        const name = document.createElement('span');
        name.classList.add('span-name');

        const types = document.createElement('ul');
        img.setAttribute("src", data.sprites.other['official-artwork'].front_default);
        id.innerText = `#${data.id}`;
        name.innerText = data.name;

        data.types.forEach(element => {
            const liType = document.createElement('li');
            liType.innerText = element.type.name;
            types.appendChild(liType);
        });

        infoSection.appendChild(id);
        infoSection.appendChild(name);
        infoSection.appendChild(types);

        cardSection.appendChild(img);
        cardSection.appendChild(infoSection);
        

        const buttons = document.createElement('div');
        buttons.classList.add('card-buttons');

        const updateButton = document.createElement('button');
        updateButton.innerText = "Edit";

        updateButton.classList.add('btn');
        updateButton.classList.add("update"); 

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add("btn");
        deleteButton.classList.add("delete"); 
        deleteButton.addEventListener("click", () => deletePokemon(li));

        buttons.appendChild(updateButton);
        buttons.appendChild(deleteButton);
        
        li.appendChild(cardSection);
        li.appendChild(buttons);
        list.appendChild(li);
    } catch (error) {
        console.log(error);
        errorLabel.innerText = "No se encontró ningún Pokémon con ese nombre";
        errorLabel.classList.add("error-display");
        
    }
}


const editMode = (li, span) => {
  document.getElementById("name").value = span.innerText;
  isEditing = true;
  currentEditingItem = { li, span };
  attendantForm.querySelector('input[type="submit"]').value =
    "Update Attendant";
};

// const updatePokemon = (name) => {
//   currentEditingItem.span.innerText = name;
//   resetForm();
// };

// const resetForm = () => {
//   document.getElementById("name").value = "";
//   isEditing = false;
//   currentEditingItem = null;
//   attendantForm.querySelector('input[type="submit"]').value = "Add Attendant";
// };

const deletePokemon = (li) => {
  if (confirm("Are you sure you want to delete this Pokémon?")) {
    li.remove();
  }
};

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    errorLabel.classList.remove("error-display");
    const inputs = form.elements;
    const name = inputs['name'];

    if (name.value.trim() !== "") {
      if (isEditing) {
        //updatePokemon(name.value.toLowerCase());
      } else {
        searchPokemon(name.value.toLowerCase());
      }
      name.value = "";
    } else {
      errorLabel.innerText = 'Ingrese el nombre de un Pokémon';
      errorLabel.classList.add('error-display');
    }
})