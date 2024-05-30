var bookmarkName = document.querySelector("#bookmarkName");
var bookmarkUrl = document.querySelector("#bookmarkUrl");
var bookmarkSearch = document.querySelector("#bookmarkSearch");
var submitBtn = document.querySelector("#submitBtn");
var updateBtn = document.querySelector("#updateBtn");
var tbody = document.querySelector("tbody");
var deletetBt = document.querySelector("#deletetBtn");
var visitBtn = document.querySelector("#visitBtn");
var layer = document.querySelector(".layer");
var closeBtn = document.querySelector(".closeBtn");
// var cursor = document.querySelector(".cursor");
var myIndex;
var booklist = [];
var regx = {
  bookmarkName: /^[a-z]{3,10}$/,
  bookmarkUrl: /^(ftp|http|https):\/\/[^ \"]+$/,
};

if (localStorage.getItem("bookmark") != null) {
  booklist = JSON.parse(localStorage.getItem("bookmark"));
}
dispaly();

// ===== Events ==========
submitBtn.addEventListener("click", function () {
  addbookmark();
  dispaly();
  clear();
});
bookmarkName.addEventListener("input", function (e) {
  vaildation(e.target);
});
bookmarkUrl.addEventListener("input", function (e) {
  vaildation(e.target);
});
closeBtn.addEventListener("click", function () {
  layer.classList.replace("d-flex", "d-none");
});
updateBtn.addEventListener("click", function () {
  Update();
  dispaly();
});
bookmarkSearch.addEventListener("input", function (e) {
  var word = e.target.value;
  var cartona = ``;
  for (var i = 0; i < booklist.length; i++) {
    if (booklist[i].webName.toLowerCase().includes(word.toLowerCase())) {
      cartona += `
      <tr>
            <td class="text-center py-3" >${i + 1}</td>
            <td class="text-center py-3" >${booklist[i].webName}</td>
            <td class="text-center py-3"><a id="visitBtn" target="_blank" class="btn btn-outline-success rounded-pill" href="${
              booklist[i].webUrl
            }"> <i class="fa-solid fa-eye pe-2 fa-beat-fade "></i> Visit</a></td>
            <td class="text-center py-3"><button id="deletetBtn" onclick="Set_up(${i})" class="btn btn-outline-warning rounded-pill">  <i class="fa-solid fa-pencil pe-2 "></i></i> Update</button></td>
            <td class="text-center py-3"><button id="deletetBtn" onclick="Delete(${i})" class="btn btn-outline-danger rounded-pill">  <i class="fa-solid fa-trash-can pe-2 fa-shake"></i> Delete</button></td>
      </tr>
      `;
    }
    tbody.innerHTML = cartona;
  }
});

// document.addEventListener("mousemove",function(e){
//   cursor.style.left = e.clientX  + "px";
//   cursor.style.top = e.clientY + "px";
// })

// ===== Functions =======
function addbookmark() {
  if (
    bookmarkUrl.classList.contains("is-valid") &&
    bookmarkName.classList.contains("is-valid")
  ) {
    var website = {
      webName: bookmarkName.value,
      webUrl: bookmarkUrl.value,
    };
    booklist.push(website);
    localStorage.setItem("bookmark", JSON.stringify(booklist));

    bookmarkUrl.classList.remove("is-valid");
    bookmarkName.classList.remove("is-valid");
  } else {
    layer.classList.replace("d-none", "d-flex");
  }
}
function dispaly() {
  var cartona = "";
  for (var i = 0; i < booklist.length; i++) {
    cartona += `
      <tr>
            <td class="text-center py-3" >${i + 1}</td>
            <td class="text-center py-3" >${booklist[i].webName}</td>
            <td class="text-center py-3"><a id="visitBtn" target="_blank" class="btn btn-outline-success rounded-pill" href="${
              booklist[i].webUrl
            }"> <i class="fa-solid fa-eye pe-2 fa-beat-fade "></i> Visit</a></td>
            <td class="text-center py-3"><button id="deletetBtn" onclick="Set_up(${i})" class="btn btn-outline-warning rounded-pill">  <i class="fa-solid fa-pencil pe-2 fa-fade"></i></i> Update</button></td>
            <td class="text-center py-3"><button id="deletetBtn" onclick="Delete(${i})" class="btn btn-outline-danger rounded-pill">  <i class="fa-solid fa-trash-can pe-2 fa-shake"></i> Delete</button></td>
      </tr>
      `;
  }
  tbody.innerHTML = cartona;
}
function Delete(index) {
  booklist.splice(index, 1);
  localStorage.setItem("bookmark", JSON.stringify(booklist));
  dispaly();
}
function clear() {
  bookmarkName.value = "";
  bookmarkUrl.value = "";
}
function vaildation(element) {
  if (regx[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
  }
}

function Set_up(index) {
  myIndex = index;

  bookmarkName.value = booklist[index].webName;
  bookmarkUrl.value = booklist[index].webUrl;

  submitBtn.classList.add("d-none");
  updateBtn.classList.replace("d-none", "d-block");

  bookmarkUrl.classList.add("is-valid");
  bookmarkName.classList.add("is-valid");
}
function Update() {
  if (
    bookmarkUrl.classList.contains("is-valid") &&
    bookmarkName.classList.contains("is-valid")
  ) {
    booklist[myIndex].webName = bookmarkName.value;
    booklist[myIndex].webUrl = bookmarkUrl.value;

    localStorage.setItem("bookmark", JSON.stringify(booklist));
    updateBtn.classList.replace("d-block", "d-none");
    submitBtn.classList.replace("d-none", "d-block");
    bookmarkUrl.classList.remove("is-valid");
    bookmarkName.classList.remove("is-valid");
    clear();
  } else {
    layer.classList.replace("d-none", "d-flex");
  }
}
