console.log("this is me")
showNotes();

let addBtn = document.getElementById('addBtn')

addBtn.addEventListener("click", function(e){
    let addTitle = document.getElementById("addTitle")
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes")

    if (notes == null) {
        notesObj = [];
        
    }
    else{
        notesObj = JSON.parse(notes);

    }
    let myObj = {
        title : addTitle.value,
        text : addTxt.value
    }
    notesObj.push(myObj)
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    console.log(notesObj);

    showNotes();
})

// function to  show element from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
        
    }
    else{
        notesObj = JSON.parse(notes);

    }
    let html = "";
    notesObj.forEach(function (element , index) {
        // <h5 class="card-title">Note ${index+1}</h5>
        // console.log(element.addTxt)
        html += `
                <div class="noteCard my-2 mx-2 card" style="width: 18rem;">

                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}" onclick="deleteNotes(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>
        `
    }) 
    ;

    let notesElm = document.getElementById("notes")
    if (notesObj.length !=0) {
        notesElm.innerHTML = html
    }
    else{
        notesElm.innerHTML = `Nothing to show ! se "Add a Note " section above to add notes`
    }
    
}

// function to delete a note

function deleteNotes(index) {
    // console.log("i am deleting" , index);

    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];    
    }
    else{
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1)
    localStorage.setItem("notes", JSON.stringify(notesObj));

    showNotes();
}




let search = document.getElementById('searchTxt')

search.addEventListener("input",function () {

    let inputVal = search.value.toLowerCase();
    // console.log('input event fired', inputVal)

    let noteCards = document.getElementsByClassName('noteCard')

    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block"
        }
        else{
            element.style.display = "none"

        }
    })
})