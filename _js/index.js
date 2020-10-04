function addMovieButton() {
    document.getElementById('loaded_n_total').innerText = "I Wish You a Merry Christmas";
    document.getElementById('progressBar').hidden = true;
    let divD = document.getElementById('divD');
    let backup = divD.innerHTML;

    // getter here
    let dialog = document.getElementById('dialog');
    let loginInfo = JSON.parse(localStorage.getItem('login'));
    let listItem = JSON.parse(localStorage.getItem('listItem'));
    let labelTitle = document.getElementById('title');
    let labelPrice = document.getElementById('price');
    let labelCategory = document.getElementById('category');
    let uploader = document.getElementById('image');
    let labelComment = document.getElementById('comment');
    let forms = document.getElementById('form');

    if (DOMPurify.sanitize(labelTitle.value) !== "" && DOMPurify.sanitize(labelPrice.value) !== "" &&
        DOMPurify.sanitize(labelCategory.value) !== "" && uploader.value !== "") {
        let exist = false;
        for (let k = 0; k < listItem['wishItems'].length; k++) {
            if (listItem['wishItems'][k].item === DOMPurify.sanitize(labelTitle.value)) {
                let request = new XMLHttpRequest();
                let url = "http://fa19server.appspot.com/api/wishlists/" + listItem['wishItems'][k].id + "/replace?access_token=" + loginInfo.id;
                request.open("POST", url, true);
                request.setRequestHeader("Content-Type", "application/json");
                let data = {
                    "item": DOMPurify.sanitize(labelTitle.value),
                    "price": DOMPurify.sanitize(labelPrice.value),
                    "category": DOMPurify.sanitize(labelCategory.value),
                    "image": (localStorage.getItem('img')) ? (JSON.parse(localStorage.getItem('img'))['data']['secure_url']) : (""),
                    "comment": DOMPurify.sanitize(labelComment.value)
                };
                const a = JSON.stringify(data);
                request.send(a);
                request.onreadystatechange = function () {
                    forceUpdate();
                    localStorage.removeItem('img');
                };
                exist = true;
                break;
            }
        }
        if (!exist) {
            let request = new XMLHttpRequest();
            let url = "http://fa19server.appspot.com/api/wishlists?access_token=" + loginInfo.id;
            request.open("POST", url, true);
            request.setRequestHeader("Content-Type", "application/json");

            let data = {
                "item": DOMPurify.sanitize(labelTitle.value),
                "price": DOMPurify.sanitize(labelPrice.value),
                "category": DOMPurify.sanitize(labelCategory.value),
                "image": (localStorage.getItem('img')) ? (JSON.parse(localStorage.getItem('img'))['data']['secure_url']) : (""),
                "comment": DOMPurify.sanitize(labelComment.value),
            };
            const a = JSON.stringify(data);
            request.send(a);
            request.onreadystatechange = function () {
                forceUpdate();
                localStorage.removeItem('img');
            }
        }

        forms.reset();
        dialog.close();

        divD.innerHTML = "";
        divD.innerHTML = backup;
        let dialog2 = document.getElementById('dialog');
        dialog2.close();
    } else {
        alert("item name, price, category and image are required");
    }
    return true;
}

export {addMovieButton}

function cancelBtn() {
    document.getElementById('loaded_n_total').innerText = "I Wish You a Merry Christmas";
    document.getElementById('progressBar').hidden = true;

    let divD = document.getElementById('divD');
    let backup = divD.innerHTML;

    let dialog = document.getElementById('dialog');
    let forms = document.getElementById('form');
    forms.reset();
    dialog.close();

    divD.innerHTML = "";
    divD.innerHTML = backup;
    let dialog2 = document.getElementById('dialog');
    dialog2.close();
    localStorage.removeItem('img');
    return false;
}

export {cancelBtn}

function deleteBtn(idd) {
    let divD = document.getElementById('divB');
    let backup = divD.innerHTML;

    let dialog = document.getElementById('dDelete');
    let loginInfo = JSON.parse(localStorage.getItem('login'));
    let request = new XMLHttpRequest();
    let url = "http://fa19server.appspot.com/api/wishlists/" + idd + "?access_token=" + loginInfo.id;
    request.open("DELETE", url, true);
    request.send();
    request.onreadystatechange = function () {
        forceUpdate();
    };
    dialog.close();

    divD.innerHTML = "";
    divD.innerHTML = backup;
    let dialog2 = document.getElementById('dDelete');
    dialog2.close();
    return true;
}

export {deleteBtn}

function deleteCancelBtn() {
    let divD = document.getElementById('divB');
    let backup = divD.innerHTML;

    let dialog = document.getElementById('dDelete');
    dialog.close();

    divD.innerHTML = "";
    divD.innerHTML = backup;
    let dialog2 = document.getElementById('dDelete');
    dialog2.close();
    return false;
}

export {deleteCancelBtn}

function editMovie(idd) {
    document.getElementById('loaded_n_total').innerText = "I Wish You a Merry Christmas";
    document.getElementById('progressBar').hidden = true;
    let divD = document.getElementById('divD');
    let backup = divD.innerHTML;

    let dialog = document.getElementById('dialog');
    let listItem = JSON.parse(localStorage.getItem('listItem'));
    let loginInfo = JSON.parse(localStorage.getItem('login'));
    let labelTitle = document.getElementById('title');
    let labelPrice = document.getElementById('price');
    let labelCategory = document.getElementById('category');
    let uploader = document.getElementById('image');
    let labelComment = document.getElementById('comment');
    let forms = document.getElementById('form');

    if (DOMPurify.sanitize(labelTitle.value) !== "" && DOMPurify.sanitize(labelPrice.value) !== "" &&
        DOMPurify.sanitize(labelCategory.value) !== "") {
        //let retrieve = JSON.parse(localStorage.getItem('temp'));
        /*
        for (let i = 0; i < retrieve.length; i++) {
            if (retrieve[i].item === DOMPurify.sanitize(labelTitle.value)) {
                //retrieve[i].price =  DOMPurify.sanitize(labelPrice.value);
                //retrieve[i].category = DOMPurify.sanitize(labelCategory.value);
                //retrieve[i].image = uploader.value;
                //retrieve[i].comment = DOMPurify.sanitize(labelComment.value);
                break;
            }
        }
         */
        for (let k = 0; k < listItem['wishItems'].length; k++) {
            if (listItem['wishItems'][k].id === idd) {
                let request = new XMLHttpRequest();
                let url = "http://fa19server.appspot.com/api/wishlists/" + idd + "/replace?access_token=" + loginInfo.id;
                request.open("POST", url, true);
                request.setRequestHeader("Content-Type", "application/json");

                let imgValue = uploader.value ? (JSON.parse(localStorage.getItem('img'))['data']['secure_url']) :
                    (listItem['wishItems'][k]['image'] ? listItem['wishItems'][k]['image'] : "");

                let data = {
                    "item": DOMPurify.sanitize(labelTitle.value),
                    "price": DOMPurify.sanitize(labelPrice.value),
                    "category": DOMPurify.sanitize(labelCategory.value),
                    "image": imgValue,
                    "comment": DOMPurify.sanitize(labelComment.value)
                };
                let a = JSON.stringify(data);
                request.send(a);
                request.onreadystatechange = function () {
                    forceUpdate();
                    localStorage.removeItem('img');
                };
                break;
            }
        }
        forms.reset();
        dialog.close();

        divD.innerHTML = "";
        divD.innerHTML = backup;
        let dialog2 = document.getElementById('dialog');
        dialog2.close();
    } else {
        alert("item name, price and category are required");
    }
    return true;
}

export {editMovie}

function initilizeList(o) {
    //let listItem = JSON.parse(localStorage.getItem('listItem'));

    let container = document.getElementById('container');
    container.innerHTML = "";

    for (let i = 0; i < o['wishItems'].length; i++) {
        let card = document.createElement('div');
        card.setAttribute('class', 'card');

        let h1 = document.createElement('h1');
        h1.textContent = o['wishItems'][i].item;

        let m1 = document.createElement('img');
        let imagePath = o['wishItems'][i]['image'];
        m1.src = imagePath;
        m1.alt = "NO IMAGE";
        m1.style.height = "30%";
        m1.style.width = "30%";

        let p1 = document.createElement('p');
        p1.textContent = "Price: " + o['wishItems'][i].price;
        let p2 = document.createElement('p');
        p2.textContent = "Category: " + o['wishItems'][i].category;
        let p3 = document.createElement('p');
        let commentSection = (o['wishItems'][i].comment) ? ("Comment: " + o['wishItems'][i].comment) : "No Comment";
        p3.textContent = commentSection;

        let s1 = document.createElement('span');
        s1.textContent = "Edit";
        s1.style.textDecoration = "underline";
        s1.style.marginRight = "10px";
        s1.setAttribute('class', 'spanClass');

        let s2 = document.createElement('span');
        s2.textContent = "Delete";
        s2.style.textDecoration = "underline";

        s1.addEventListener('click', function () {
            let dialog = document.getElementById('dialog');
            if (typeof dialog.showModal === "function") {
                dialog.showModal();
            } else {
                alert("The dialog API is not supported by this browser");
            }

            let labelTitle = document.getElementById('title');
            let labelPrice = document.getElementById('price');
            let labelCategory = document.getElementById('category');
            let labelComment = document.getElementById('comment');
            document.getElementById('editorHeader').innerText = 'Edit "' + o['wishItems'][i].item + '"';

            labelTitle.value = o['wishItems'][i].item;
            labelPrice.value = o['wishItems'][i].price;
            labelCategory.value = o['wishItems'][i].category;
            labelComment.value = o['wishItems'][i].comment;

            let uploader = document.getElementById('image');
            let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dlg8fzpfm/upload';
            let CLOUDINARY_PRESENT = 'tnnse4je';

            uploader.addEventListener('change', function (event) {
                document.getElementById('saveBtn').hidden = true;
                let file = event.target.files[0];
                let formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', CLOUDINARY_PRESENT);
                axios({
                    url: CLOUDINARY_URL,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: formData
                }).then(function (res) {
                    console.log(res);
                    localStorage.setItem('img', JSON.stringify(res));
                    document.getElementById('loaded_n_total').innerText = "Image upload successful!";
                    document.getElementById('progressBar').hidden = false;
                    document.getElementById('saveBtn').hidden = false;
                });
            });

            document.getElementById('saveBtn').addEventListener('click', function () {
                editMovie(o['wishItems'][i].id);
            });
            document.getElementById('cancelBtn').addEventListener('click', cancelBtn);
        });

        s2.addEventListener('click', function () {
            let dialog = document.getElementById('dDelete');
            if (typeof dialog.showModal === "function") {
                dialog.showModal();
            } else {
                alert("The dialog API is not supported by this browser");
            }

            document.getElementById('dDeleteP').innerText = 'Delete "' + o['wishItems'][i].item + '"';
            document.getElementById('dDeleteOk').addEventListener('click', function () {
                deleteBtn(o['wishItems'][i].id);
            });
            document.getElementById('dDeleteCancel').addEventListener('click', deleteCancelBtn);
        });

        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(m1);
        card.appendChild(p1);
        card.appendChild(p2);
        card.appendChild(p3);
        card.appendChild(s1);
        card.appendChild(s2);
    }
}

export {initilizeList}

function forceUpdate() {
    let loginInfo = JSON.parse(localStorage.getItem('login'));
    let out = document.getElementById('output');
    let request = new XMLHttpRequest();
    let url = "http://fa19server.appspot.com/api/wishlists/myWishlist?access_token=" + loginInfo.id;

    request.open("GET", url, true);
    request.send();

    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let temp = JSON.parse(this.responseText);
            localStorage.setItem('listItem', JSON.stringify(temp));
            if (temp["wishItems"].length === 0) {
                initilizeList(temp);
                out.hidden = false;
            } else {
                out.hidden = true;
                initilizeList(temp);
            }
        } else if (this.status === 401) {
            window.location = 'login.html';
        } else {

        }

    };
}

export {forceUpdate};

function logOut() {
    let loginInfo = JSON.parse(localStorage.getItem('login'));
    let request = new XMLHttpRequest();
    let url = "http://fa19server.appspot.com/api/Users/logout?access_token=" + loginInfo.id;
    request.open("POST", url, true);
    request.send();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 204) {
            //localStorage.clear();
            window.location = 'login.html';
        } else {
        }
    };
}

export {logOut}