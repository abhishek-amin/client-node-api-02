
let userList = [];

class User {
    constructor(firstname, age, id) {
        this.firstname = firstname;
        this.age = age;
        this.id = id;
    }

    // get userData() {
    //     return {
    //         'firstname' : this.firstname,
    //         'age' : this.age,
    //         'id' : this.id
    //     };
    // }

    // set userData(user) {
    //     this.firstname = user.firstname;
    //     this.age = user.age;
    //     this.id = id;
    // }
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

// function to fill table row
function addTableRow (user) {
    userRow = document.createElement('TR');
    tableDataName = document.createElement('TD');
    tableDataAge = document.createElement('TD');

    userRow.setAttribute('id', user.id);

    tableDataName.innerHTML = user.firstname;
    tableDataAge.innerHTML = user.age;

    userRow.appendChild(tableDataName);
    userRow.appendChild(tableDataAge);
    document.getElementById('usersTable').appendChild(userRow);
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
    // document.getElementById(rowToDelete.id).remove(rowToDelete);
}

// add new user to the list
function addUser () {
    let userFirstName = document.getElementById('firstName').value;
    let userAge = document.getElementById('ageDropdown').value;
    let userID = '_' + Math.random().toString(36).substr(2, 9);

    let user = new User(userFirstName, userAge, userID);
    userList.push(user);
    console.log(userList);
    updateTable();
}
