
var accIds = 0;
var accClass = 0;
var counter = 0;


// chequear el funcionamiento del edit, delete, y casos generales



function submitItem(){
    var currentDiv = document.getElementById('simpleList').childNodes[0];
    if(!currentDiv.getElementsByTagName('p')[0].innerHTML){alert("There's no text");return;} 
    if(currentDiv.getElementsByTagName('img')[0].src == ""){ alert("There's no image");return;} 
    document.getElementById('divAddItem').style.visibility = 'visible';
    document.getElementById('divButtons').style.visibility = 'hidden';

    currentDiv.getElementsByTagName("input")[0].style.visibility = 'visible'; // the edit button is the first input appended
    currentDiv.getElementsByTagName("input")[1].style.visibility = 'visible'; // the delete button is the second input appended

    let newDiv = {
        id: currentDiv.id,
        text: currentDiv.getElementsByTagName('p')[0].innerHTML,
        src: currentDiv.getElementsByTagName('img')[0].src
    };
    
    let divs = JSON.parse(localStorage.getItem('divs'));
    divs.push(newDiv);

    localStorage.setItem('divs', JSON.stringify(divs));
    
    document.getElementById('counterDiv').innerHTML = parseInt(localStorage.getItem('counter'))+1;
    localStorage.setItem('counter', document.getElementById('counterDiv').innerHTML);
}

function editItem(){
    var currentDiv = event.target.parentElement;
    currentDiv.setAttribute('class','class'+accClass);
    document.getElementById('fileEdit').setAttribute("class","class"+accClass);
    accClass++;

    var newText = prompt("New Text: ");
    while(newText.length > 300){
        alert("The text was too long (>300 chars)");
        newText = prompt("Text: ");
    }
    if(newText.length == 0)return;
    currentDiv.getElementsByTagName('p')[0].innerHTML = newText;
    
    
    var divList = JSON.parse(localStorage.getItem('divs'));

    for (var i = 0; i < divList.length ; i++){
        if(divList[i].id == currentDiv.id) {
            divList[i].text = newText;
            break;
        }
    }
    
    localStorage.setItem('divs',JSON.stringify(divList));

}

function addText(){
    var text = prompt("Text: ");
    while (text.length > 300 || text.length ==0){
        if(text.length > 300 ){
            alert("The text was too long (>300 chars)");
            text = prompt("Text: ");
        }
        if(text.length == 0) {
            alert("No text entered");
            text = prompt("Text: ");
        }
    }
    document.getElementById('simpleList').childNodes[0].getElementsByTagName('p')[0].innerHTML = text;
}

function createDiv(){
    var newDiv = document.createElement('div');
    newDiv.setAttribute('id','div1');
    newDiv.setAttribute('class','list-group-item');
    newDiv.setAttribute('id', 'divItem'+accIds);
    accIds++;


    var newImg = document.createElement('img');
    newImg.height = 60;
    newDiv.appendChild(newImg);

    var newP = document.createElement('p');
    newDiv.appendChild(newP);

    var newEdit = document.createElement('input');
    newEdit.setAttribute("type","button");
    newEdit.setAttribute("value","Edit Item");
    newEdit.setAttribute("onclick","editItem()");
    newEdit.style.marginLeft = "270px";
    newEdit.style.visibility = "hidden";
    newEdit.addEventListener("click", function (e) {
        if (fileEdit) {
          fileEdit.click();
        }
        e.preventDefault(); // prevent navigation to "#"
      }, false);

    newDiv.appendChild(newEdit);     
    
    var newDelete = document.createElement("input");
    newDelete.setAttribute("type","button");
    newDelete.setAttribute("value","Delete Item");
    newDelete.style.marginLeft = "270px";
    newDelete.style.marginTop = "20px";
    newDelete.setAttribute('onclick','deleteItem()');
    newDelete.style.visibility = "hidden";
    newDiv.appendChild(newDelete);    

    return newDiv;
}

function addItem(){
    
    var newDiv = createDiv();

    document.getElementById('simpleList').insertBefore(newDiv,document.getElementById('simpleList').childNodes[0]);
    document.getElementById('divAddItem').style.visibility = 'hidden';
    document.getElementById('divButtons').style.visibility = 'visible';

}

function removeItemFromLocalstorage(divId){
    var divList = JSON.parse(localStorage.getItem('divs'));
    for(var i =0; i<divList.length; i++){
        if(divList[i].id == divId) {
            divList.splice(i,1);
            break;
        }
    }    
    return JSON.stringify(divList);
}

function deleteItem(){
    var  currentDiv = event.target.parentElement;
    document.getElementById('simpleList').removeChild(currentDiv);    
    document.getElementById('counterDiv').innerHTML = parseInt(localStorage.getItem('counter'))-1;

    localStorage.setItem('divs',removeItemFromLocalstorage(currentDiv.id));
    localStorage.setItem('counter', parseInt(document.getElementById('counterDiv').innerHTML));

    
}

function handleEdit(file){
    if(file){
        var currentClass = event.target.className;
        var currentDiv = document.getElementsByClassName(currentClass)[1];
        var img = currentDiv.getElementsByTagName('img')[0];
        img.src = window.URL.createObjectURL(file[0]);       
        img.onload = function() {
            window.URL.revokeObjectURL(this.src);
          }
        var divList = JSON.parse(localStorage.getItem('divs'));
        for (var i=0; i<divList.length; i++){
            if(divList[i].id == currentDiv.id) {
                divList[i].src = img.src;
                break;
            }
        }
        localStorage.setItem('divs',JSON.stringify(divList));
    }
}

function handleFiles(files) {      
     if(files){
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        var currentDiv = document.getElementById('simpleList').childNodes[0];
        reader.onloadend = function() {
            currentDiv.getElementsByTagName('img')[0].src = reader.result;
        }                     
    }
      
}

function load_localstorage(){
    if(parseInt(localStorage.getItem('counter'))){
        document.getElementById('counterDiv').innerHTML = localStorage.getItem('counter'); 
    
        var divList = JSON.parse(localStorage.getItem('divs'));

        for (var i = 0; i < divList.length; i++){
            var newDiv = createDiv();
            newDiv.getElementsByTagName('p')[0].innerHTML = divList[i].text;
            newDiv.getElementsByTagName('img')[0].src = (divList[i].src);
            document.getElementById('simpleList').appendChild(newDiv);
            newDiv.getElementsByTagName("input")[0].style.visibility = 'visible'; // the edit button is the first input appended
            newDiv.getElementsByTagName("input")[1].style.visibility = 'visible'; // the delete button is the second input appended
        }

    }else{
        localStorage.setItem('divs',"[]");
        localStorage.setItem('counter',0);
    }    
}

document.getElementById('divButtons').style.visibility = 'hidden';
Sortable.create(simpleList, { 
    onEnd: function(ev) {
        var childNodesList = document.getElementById('simpleList').childNodes;
        var arr = [];   

        for (var i = 0; i < document.getElementById('simpleList').childNodes.length ; i++){
            if (childNodesList[i].nodeType !== Node.ELEMENT_NODE) continue;
            let newDiv = {
                id: childNodesList[i].id,
                src: childNodesList[i].getElementsByTagName('img')[0].src,
                text: childNodesList[i].getElementsByTagName('p')[0].innerHTML
            };
            arr.push(newDiv);
        } 
        localStorage.setItem('divs',JSON.stringify(arr));
    }
 });

window.URL = window.URL || window.webkitURL;

const fileSelect = document.getElementById("fileSelect"),
    fileElem = document.getElementById("fileElem");


fileSelect.addEventListener("click", function (e) {
  if (fileElem) {
    fileElem.click();
  }
  e.preventDefault(); // prevent navigation to "#"
}, false);

window.onload = load_localstorage();




//localStorage.clear();