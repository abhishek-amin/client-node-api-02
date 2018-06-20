
let userList = [];

// add new user to the list
function addUser () {
    let userFirstName = document.getElementById('firstName').value;
    let userAge = document.getElementById('ageDropdown').value;
    let userID = '_' + Math.random().toString(36).substr(2, 9);

    let userDetails = {
        'firstname' : userFirstName,
        'age' : userAge,
        'id' : userID
    };

    new User(userDetails);
}

class User {
    constructor(data) {
        this.userData = data;
    }

    get userData() {
        return this.data;
    }

    set userData(data) {
        this.firstname = data.firstname;
        this.age = data.age;
        this.id = data.id;

        userList.push(data);
        console.log(userList);
        updateTable();
    }
}

// function to create table
function createTable() {
    // create table elements
    let table = document.createElement('TABLE');
    let tableRow = document.createElement('TR');
    let nameHeader = document.createElement('TH');
    let ageHeader = document.createElement('TH');

    // assign id attributes
    table.setAttribute('id', 'usersTable');
    tableRow.setAttribute('id', 'headerRow');
    nameHeader.setAttribute('id', 'nameHeader');
    ageHeader.setAttribute('id', 'ageHeader');

    // fill header values
    nameHeader.innerHTML = 'First Name';
    ageHeader.innerHTML = 'Age';

    // append elements
    tableRow.appendChild(nameHeader);
    tableRow.appendChild(ageHeader);
    table.appendChild(tableRow);
    document.body.appendChild(table);
}

// fill or update table
function updateTable () {
    if (userList.length == 0) return;

    let tableExists = document.getElementById('usersTable');
    
    if (tableExists) {
        tableExists.remove(tableExists);
    }

    createTable();
    
    for (let i = 0; i < userList.length; i++) {
        userRow = document.createElement('TR');
        tableDataName = document.createElement('TD');
        tableDataAge = document.createElement('TD');

        userRow.setAttribute('id', userList[i].id);
        userRow.setAttribute('class', 'dataRow');
        userRow.setAttribute('onclick', 'deleteUser(this)');

        tableDataName.innerHTML = userList[i].firstname;
        tableDataAge.innerHTML = userList[i].age;

        userRow.appendChild(tableDataName);
        userRow.appendChild(tableDataAge);
        document.getElementById('usersTable').appendChild(userRow);
    }
}

// function to delete user
function deleteUser (rowToDelete) {
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].id === rowToDelete.id) {
            userList.splice(i, 1);
        }
    }
    updateTable();
}
