
var UserList = []; 
var count = 1;

function addUser(name, email) {
  var newUser = {
    id: count++, 
    name: name, 
    email: email,
    date: new Date().toLocaleString()
  };
  UserList.push(newUser);
  localStorage.setItem('UserList', JSON.stringify(UserList));
  renderUserList();
}

function deleteUser(UserId) {
  UserList = UserList.filter(function (user) {
    return user.id !== UserId;
  });

  localStorage.setItem('UserList', JSON.stringify(UserList)); 
  renderUserList();
}

function deleteAllUsers() {
  UserList = [];
  localStorage.removeItem('UserList'); 
  renderUserList();
}

function getUserList() {
  var storedList = JSON.parse(localStorage.getItem('UserList')); 
  UserList = storedList || []; 
}

function renderUserList(filteredList = UserList) {
  var UserListElement = document.getElementById('UserList');
  var titleElement = document.getElementById('user-list-title');
  var searchInputElement = document.getElementById('search-input');

  if (filteredList.length > 0) {
    if (!titleElement) {
      titleElement = document.createElement('h3');
      titleElement.id = 'user-list-title';
      titleElement.classList.add('center-title');
      titleElement.textContent = 'Lista de Usuários';
      UserListElement.parentElement.insertBefore(titleElement, UserListElement); 
    }
    searchInputElement.style.display = 'block'; 
  } else {
    if (titleElement) {
      titleElement.remove(); 
    }
    searchInputElement.style.display = 'none';
  }

  UserListElement.innerHTML = '';

  filteredList.forEach(function (user) {
    var listItem = document.createElement('li');
    listItem.classList.add('user-item');
    listItem.innerHTML = 
    `
        <br>
        <div class="listUser">
        <div><strong>Nome:</strong> ${user.name}</div>
        <div><strong>Email:</strong> ${user.email}</div>
        <div><strong>Data de Cadastro:</strong> ${user.date}</div>
        <button class="delete-button" onclick="deleteUser(${user.id})">X</button>
        </div>
    `;
    UserListElement.appendChild(listItem);
  });

  var clearAllButton = document.getElementById('clear-all');
  if (filteredList.length > 0) {
    clearAllButton.style.display = 'inline'; 
  } else {
    clearAllButton.style.display = 'none';
  }
}

function searchUserList(query) {
  var filteredList = UserList.filter(function (user) {
    return user.name.toLowerCase().includes(query.toLowerCase()) || 
           user.email.toLowerCase().includes(query.toLowerCase());
  });
  renderUserList(filteredList); 
}

getUserList();

renderUserList();

document.getElementById('user-form').addEventListener('submit', function (event) {
  event.preventDefault();
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  
  if (name && email) { 
    addUser(name, email); 
    document.getElementById('name').value = ''; 
    document.getElementById('email').value = ''; 
  } else {
    alert("Por favor, preencha todos os campos.");
  }
});

document.getElementById('clear-form').addEventListener('click', function () {
    document.getElementById('name').value = ''; 
    document.getElementById('email').value = ''; 
  });

document.getElementById('clear-all').addEventListener('click', function () {
  if (confirm('Tem certeza que deseja excluir todos os usuários?')) {
    deleteAllUsers(); 
  }
});

document.getElementById('search-input').addEventListener('input', function () {
  var query = document.getElementById('search-input').value;
  searchUserList(query); 
});
