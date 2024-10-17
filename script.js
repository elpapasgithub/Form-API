document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const date = document.getElementById('date').value;

    const newUser = new User(username, password, date);

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
