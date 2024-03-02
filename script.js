var card = document.getElementById("table")
var searchBar = document.getElementById("searchBar")

fetch('http://localhost:4000/')
    .then(response => response.json())
    .then(data => {
        data.map(contact => {

            const allContacts = []
            data.map(contact => {
                allContacts.push({ name: contact.name, phone: contact.phone })
            })

            var newContact = document.createElement("tr");
            newContact.innerHTML = `
        <td>${contact.name}</td> 
        <td>${contact.phone}
            <img src="./assets/trash_bin.svg" onclick="deleteContact(${contact.id})" alt="delete" class="delete"> 
            <img src="./assets/pencil.svg" onclick="Togglemodify(${contact.id})" alt="modify" class="modify">      
        </td>`;
            card.appendChild(newContact);
        })
    })
    .catch(function (error) {
        console.log(error)
    })

// function search() {
//     searchBar.addEventListener('input', (e) => {
//         var searchedValue = e.target.value
//         console.log('ee:', searchedValue)
//         return searchedValue;
//     })

//     if (searchedValue) {
//         var find = false
//         for (let i = 0; i < allContacts.length; i++) {
//             if (allContacts[i].name.toLowerCase() === searchedValue.toLowerCase()) {
//                 find = true
//                 return Name = allContacts[i].name
//                 //Phone = allContacts[i].phone
//             }

//         }
//         return message = "Aucun contact trouvé avec ce nom";
//     }
//     if (find) {
//         var newContact = document.createElement("tr");

//         newContact.innerHTML = `
//             <td>${Name}</td> 
//             <td>${Phone}
//         <img src="./assets/trash_bin.svg" onclick="deleteContact(${contact.id})" alt="delete" class="delete"> 
//         <img src="./assets/pencil.svg" onclick="Togglemodify(${contact.id})" alt="modify" class="modify">      
//             </td>`;
//         card.appendChild(newContact);
//     }
// }


function VerifyPhone(phone) {
    const rule = /^6\d{8}$/;
    return rule.test(phone)
}


//ADD A CONTACT
function Toggleadd() {
    var add_card = document.getElementById('add_card');
    if (add_card.style.display === "none") {
        add_card.style.display = "flex"
    } else {
        add_card.style.display = "none"
    }
}
function addContact() {
    var newName = document.getElementById('addName').value
    var newPhone = document.getElementById('addPhone').value

    console.log(newName, newPhone)

    if (VerifyPhone(newPhone) && newName !== "") {
        fetch('http://localhost:4000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newName,
                phone: newPhone
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Nouveau contact crée:', data)
                window.location.reload()
            })
            .catch(error => {
                console.log(error)
                console.error('Erreur lors de la création du contact:', error)
                window.location.reload()
            })

    } else {
        alert("Enter a correct phone number !")
    }
}

//MODIFY CONTACT
function Togglemodify(id) {

    var modify_card = document.getElementById('modify_card');
    if (modify_card.style.display === "none") {
        modify_card.style.display = "flex"
    } else {
        modify_card.style.display = "none"
    }

    document.getElementById('modify').addEventListener('click', () => {
        fetch('http://localhost:4000/' + id, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.error(error)
        });

    })
    
}

function updateContact() {

    var updatedName = document.getElementById('updateName').value
    var updatedPhone = document.getElementById('updatePhone').value

    console.log(updatedName, updatedPhone)

    if (VerifyPhone(updatedPhone) && updatedName !== "") {
        fetch('http://localhost:4000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: updatedName,
                phone: updatedPhone
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Contact modifié:', data)
                window.location.reload()
            })
            .catch(error => {
                console.log(error)
                console.error('Erreur lors de la modification du contact:', error)
                window.location.reload()
            })

    } else {
        alert("Enter a correct phone number !")
    }
}

//DELETE CONTACT
function Toggledelete() {
    var delete_card = document.getElementById('delete_card');
    if (delete_card.style.display === "none") {
        delete_card.style.display = "flex"
    } else {
        delete_card.style.display = "none"
    }
}
function deleteContact(id) {
    fetch('http://localhost:4000/' + id, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            window.location.reload()
        })
        .catch(error => {
            console.error(error)
            window.location.reload()
        });
}