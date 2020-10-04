function loginButton() {
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    let op = document.getElementById('output');
    let form = document.getElementById('logInForm');
    op.hidden = true;
    op.innerText = "";

    let usernameText = DOMPurify.sanitize(username.value);
    let passwordText = password.value;

    if (usernameText === "" || passwordText === "") {
        return false;
    } else {
        let request = new XMLHttpRequest();
        let url = "http://fa19server.appspot.com/api/Users/login";
        request.open("POST", url, true);
        request.setRequestHeader("Content-Type", "application/json");
        let data = {
            "username": usernameText,
            "password": passwordText
        };
        const a = JSON.stringify(data);
        request.send(a);

        request.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let temp = JSON.parse(this.responseText);
                temp["username"] = usernameText;
                localStorage.setItem('login', JSON.stringify(temp));
                document.getElementById('output').innerText = "";
                document.getElementById('output').hidden = true;
                window.location = 'crud.html';
            } else {
                document.getElementById('output').innerText = "Sorry, login failed. Please check your username and password, and try again.";
                document.getElementById('output').hidden = false;
                form.reset();
            }
        };
        return true;
    }

}

export {loginButton}