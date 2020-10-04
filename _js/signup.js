function signupListener() {
    let username = document.getElementById('username');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let re_password = document.getElementById('re_password');
    let form = document.getElementById('signUpForm');
    let op = document.getElementById('output');
    op.hidden = true;
    op.innerText = "";

    let usernameText = DOMPurify.sanitize(username.value);
    let emailText = DOMPurify.sanitize(email.value);
    let passwordText = password.value;
    let re_passwordText = re_password.value;

    if (passwordText !== re_passwordText && passwordText != "" && re_password != "") {
        alert("password and confirm password do not match");
        return false;
    } else if (usernameText === "" || emailText === "" || passwordText === "" || re_password === "") {
        return false;
    } else {
        var request = new XMLHttpRequest();
        var url = "http://fa19server.appspot.com/api/Users";
        request.open("POST", url, true);
        request.setRequestHeader("Content-Type", "application/json");

        request.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                alert('Sign up successful. Redirecting to login page');
                window.location = 'login.html';
                document.getElementById('output').innerText = "";
                document.getElementById('output').hidden = true;
            } else {
                document.getElementById('output').innerText = "Username/email may have exist";
                document.getElementById('output').hidden = false;
                //console.log((JSON.parse(this.responseText)["error"]["message"]));
            }
        };

        const data = {
            "username": usernameText,
            "email": emailText,
            "password": passwordText
        };
        const a = JSON.stringify(data);
        request.send(a);
        return true;
    }
}

export {signupListener};