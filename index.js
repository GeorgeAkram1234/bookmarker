var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");

var bookmarkList = [];

if (localStorage.getItem('bookmark') != null) {
    bookmarkList = JSON.parse(localStorage.getItem('bookmark'));
    displayURL();
} else {
    bookmarkList = [];
}

function submit() {
    var bookmark = {
        name: bookmarkName.value,
        url: bookmarkURL.value
    }  
    if (bookmarkName.classList.contains('is-valid')&&
    bookmarkURL.classList.contains('is-valid')){
        bookmarkList.push(bookmark);
        localStorage.setItem('bookmark', JSON.stringify(bookmarkList));
        displayURL()
        clearForm()
    }else{
        alert('please fill all fields correctly');
    }



}
function clearForm() {
    bookmarkName.value = "";
    bookmarkURL.value = "";
}

function displayURL() {
    var box = ``;
    for (var i = 0; i < bookmarkList.length; i++) {
        box += `                
        <tr>
        <td class="text-capitalize">${i + 1}</td>
        <td class="text-capitalize">${bookmarkList[i].name}</td>
        <td class="text-capitalize"><a target="_blank" href="https://www.${bookmarkList[i].url}/"<button class="btn text-bg-success" ><i class="fa fa-eye me-1"></i>Visit</a></button></td>
        <td class="text-capitalize"><button onclick="deleteURL(${i})" class="btn text-bg-danger"><i class="fa fa-trash me-1"></i>Delete</button></td>
        
    </tr>`
    }
    tableContent.innerHTML = box;
}

function deleteURL(delIndex) {
    bookmarkList.splice(delIndex, 1);
    localStorage.setItem('bookmark', JSON.stringify(bookmarkList));
    displayURL();
}


function validateInputs(element) {
    var regex = {
        bookmarkName : /\w{3,}/, 
        bookmarkURL : /\w\.\w{2,}/
    }
    if (regex[element.id].test(element.value)) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        element.nextElementSibling.classList.add('d-none');

    } else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        element.nextElementSibling.classList.remove('d-none');

    }
}