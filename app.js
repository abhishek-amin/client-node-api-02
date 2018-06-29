this.page = 1;
let limit = 2;

let userList = [];

function getUsers() {
	document.getElementById('showPageNumber').innerHTML = `Page: <bold>${this.page}</bold>`;
	return fetch(`http://localhost:5000/api/user?limit=${limit}&page=${this.page}`, {
		mode: 'cors',
		method: 'GET',
		header: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Headers' : '*',
			'Access-Control-Allow-Origin' : '*'
		}
		})
		.then((response) => { return response.json() })
		.then((data) => addUser(data))
		.catch(function(e) {
			console.log(e);
		});
}

// add new user to the list
function addUser (response) {
	userList = [];
	for (let i = 0; i < limit; i++) {
    // let div = document.createElement('DIV');
    // div.setAttribute('id', i);
    // div.innerHTML = `${response.docs[i]._id} ${response.docs[i].name} ${response.docs[i].age}`;
    // // console.log(response.docs[i]);
    // appDiv = document.getElementById('appDiv');
		// appDiv.appendChild(div);

		let userFirstName = response.docs[i].name;
		let userAge = response.docs[i].age;
		let userID = response.docs[i]._id;
	
		let userDetails = {
				'firstname' : userFirstName,
				'age' : userAge,
				'id' : userID
		};
	
		new User(userDetails);
	}
	setPageDiv(response.total / limit);
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
		let idHeader = document.createElement('TH');

		// assign id attributes
		table.setAttribute('id', 'usersTable');
		tableRow.setAttribute('id', 'headerRow');
		nameHeader.setAttribute('id', 'nameHeader');
		ageHeader.setAttribute('id', 'ageHeader');
		idHeader.setAttribute('id', 'ID');

		// fill header values
		nameHeader.innerHTML = 'Name';
		ageHeader.innerHTML = 'Age';
		idHeader.innerHTML = 'Id';

		// append elements
		tableRow.appendChild(idHeader);
		tableRow.appendChild(nameHeader);
		tableRow.appendChild(ageHeader);

		table.appendChild(tableRow);
		document.getElementById('container').appendChild(table);
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
				tableDataId = document.createElement('TD');

				userRow.setAttribute('id', userList[i].id);
				userRow.setAttribute('class', 'dataRow');
				// userRow.setAttribute('onclick', 'deleteUser(this)');

				tableDataId.innerHTML = userList[i].id;
				tableDataName.innerHTML = userList[i].firstname;
				tableDataAge.innerHTML = userList[i].age;

				userRow.appendChild(tableDataId);
				userRow.appendChild(tableDataName);
				userRow.appendChild(tableDataAge);

				document.getElementById('usersTable').appendChild(userRow);
		}
}

function setPageDiv (page) {
	let pageNav = document.getElementById('pageNav');
	if(pageNav) {
		pageNav.remove(pageNav);
	}

	pageNav = document.createElement('UL');
	pageNav.setAttribute('id', 'pageNav');
	document.getElementById('container').appendChild(pageNav);

	for (let i = 0; i < page; i++) {
		let pageButtonItem = document.createElement('LI');
		let pageButton = document.createElement('button');

		pageButton.value = i + 1;
		pageButton.innerHTML = i + 1;
		pageButton.setAttribute('onClick', 'changePage(this)');

		pageButtonItem.appendChild(pageButton);
		pageNav.appendChild(pageButtonItem);
	}
}

function changePage(page) {
	this.page = page.value;
	getUsers();
}

getUsers();

// function to delete user
// function deleteUser (rowToDelete) {
// 		for (let i = 0; i < userList.length; i++) {
// 				if (userList[i].id === rowToDelete.id) {
// 						userList.splice(i, 1);
// 				}
// 		}
// 		updateTable();
// }
