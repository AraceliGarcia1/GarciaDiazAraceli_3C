// General variables
var users = [];
var listPokemon = [];
var btnRegister = $("#register");
var btnUpdate = $("#update");

// Hides update button
btnUpdate.hide();

// Mostrar 
const mostrarPokemones = () => {
    $.ajax({
        type: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon?limit=50&offset=100'
    }).done(function(res){
        listPokemon = res.results;
        let selectPokemon = $("#selectPokemon");

        selectPokemon.append('<option> Despliega la lista</option>');
        for(let i = 0; i < listPokemon.length; i++){
            selectPokemon.append(`<option value="${ i + 1 }">${ listPokemon[i].name }</option>`);
        }
    });
};

// Fill users table with local storage list
const fill = () => {
    let content = "";

    if(users.length > 0){
        for(let i = 0; i < users.length; i++){
            content += `
                <tr>
                    <td>${ i + 1 }</td>
                    <td>${ users[i].name } ${ users[i].lastname } ${ users[i].lastname2 }</td>
                    <td>${ users[i].Pokfavorite }</td>
                    <td>${ users[i].imgPokemon }</td>
                    <td>
                        <button onclick="getUserByIndex(${ i })" class="btn btn-primary"><i class="fas fa-edit"></i> Modificar</button>
                        <button onclick="deleteU(${ i })" class="btn btn-danger"><i class="fas fa-trash"></i> Eliminar</button>
                    </td>
                </tr>
            `;
        }
    } else {
        content = `
            <tr>
                <td>No hay usuarios registradas.</td>
            </tr>
        `;
    }

    $("#tablePokemon > tbody").html(content);
};

// Find list in local storage
const findAll = () => {
    if(typeof(Storage) !== "undefined"){
        if(!localStorage.listUsers){
            localStorage.listUsers = JSON.stringify([]);
        }

        users = JSON.parse(localStorage.listUsers);
        fill();
    } else {
        alert("El navegador no soporta almacenamiento WEB.");
    }
};

// Create new user
const create = () => {
    let user = new Object();

    let name = $("#name").val();
    let lastname = $("#lastname").val();
    let lastname2 = $("#lastname2").val();
    let imgPokemon= $("#imgPokemon")
    let selectPokemon = $("#selectPokemon option:selected").text();

    user.name = name;
    user.lastname = lastname;
    user.lastname2 = lastname2;
    user.imgPokemon= imgPokemon
    user.Pokfavorite = selectPokemon;

    users.push(user);
    localStorage.listUsers = JSON.stringify(users);
    findAll();
};

// Set inputs with data of user by index
const getUserByIndex = (index) => {
    btnRegister.hide();
    btnUpdate.show();
    for(let i = 0; i < users.length; i++){
        if(i === index){
            document.getElementById("name").value = users[i].name;
            document.getElementById("lastname").value = users[i].lastname;
            document.getElementById("lastname2").value = users[i].lastname2;
            document.getElementById("imgPokemon").value = users[i].imgPokemon;
            document.getElementById("index").value = index;

            let selectPokemon = $("#selectPokemon");
            for(let j = 0; j < listPokemon.length; j++){
                if(listPokemon[j].name === users[i].Pokfavorite){
                    selectPokemon.append('<option selected value="'+ (i + 1) +'">'+ listPokemon[j].name +'</option>');
                } else {
                    selectPokemon.append('<option value="'+ (i + 1) +'">'+ listPokemon[j].name +'</option>');
                }
            }
        }
    }
};

// Update user
const update = () => {
    btnRegister.show();
    btnUpdate.hide();
    let index = document.getElementById("index").value;

    for(let i = 0; i < users.length; i++){
        if(i == index){
            users[i].name = $("#name").val();
            users[i].lastname = $("#lastname").val();
            users[i].lastname2 = $("#lastname2").val();
            users[i].imgPokemon = $("#imgPokemon").val();
            users[i].Pokfavorite = $("#selectPokemon option:selected").text();
        }
    }

    localStorage.listUsers = JSON.stringify(users);
    findAll();
};

// Delete user
const deleteU = (index) => {

    for(let i = 0; i < users.length; i++){
        if(i === index){
            users.splice(i, 1);
            break;
        }
    }

    localStorage.listUsers = JSON.stringify(users);
    findAll();
};

mostrarPokemones();
findAll();