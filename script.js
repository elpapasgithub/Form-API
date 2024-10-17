class User {
    constructor(username, password, date) {
        this.username = username;
        this.password = password;
        this.date = date;
    }
}

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const newUser = new User(username, password);

    const jsonUser = JSON.stringify(newUser);

    fetch('/saveUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonUser,
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
});
