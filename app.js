var newTask = document.getElementById("task");
var addButton = document.getElementsByTagName("button")[0];
var notFinished = document.getElementById("not-done");
var finishedDone = document.getElementById("done");
var removeButton = document.getElementsByClassName("remove");
var finishedButton = finishedDone.getElementsByClassName("remove");

notFinishedData();
finishedData();


function createNewTaskElement(str,i) {

	var listItem = document.createElement("li");
	var label = document.createElement("label");
	var checkBox = document.createElement("input");
	var span = document.createElement("span");
	var removeButton = document.createElement("button");
	label.className = "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect";
	label.setAttribute("for",(i+1));
	checkBox.type = "checkbox";
	checkBox.id = (i+1);
	checkBox.setAttribute("onclick","finished(this)");
	checkBox.className = "mdl-checkbox__input";
	span.className = "mdl-checkbox__label";
	span.id = "text-" + (Number(i)+1);
	span.innerText = str;
	removeButton.className = "mdl-button mdl-js-button mdl-js-ripple-effect remove";
	removeButton.innerText = "remove";
	removeButton.id = i+1;
	label.appendChild(checkBox);
  	label.appendChild(span);
  	listItem.appendChild(label);
  	listItem.appendChild(removeButton);

  	return listItem;

};

function finishedTaskElement(str, i){
	var listItem = document.createElement("li");
	var span = document.createElement("span");
	var icon = document.createElement("i");
	var removeButton = document.createElement("button");
	listItem.className = "mdl-list";
	span.className = "mdl-list__item-primary-content";
	icon.className = "material-icons mdl-list__item-icon";
	icon.innerText = "done";
	str = document.createTextNode(str);
	span.appendChild(icon);
	span.appendChild(str);
	removeButton.className = "mdl-button mdl-js-button mdl-js-ripple-effect remove";
	removeButton.innerText = "remove";
	removeButton.id = i+1;
  	listItem.appendChild(span);
  	listItem.appendChild(removeButton);

  	return listItem;

};

function finished(element){
	var id = element.getAttribute('id');
	var finished = getfinishedData();
	str = document.getElementById("text-" + Number(id)).innerText;
	finished.push(str);
	localStorage.setItem('finished',JSON.stringify(finished));
	finishedDone.appendChild(finishedTaskElement(str,finished.length-1));
	finishedButton[finished.length-1].addEventListener('click', doneFinished);
	var data = getData();
	data.splice(id-1,1);
	localStorage.setItem('todo', JSON.stringify(data));
	notFinished.innerHTML="";
	notFinishedData();
	componentHandler.upgradeDom();
};

function getData(){
	var data = new Array;
	var data_str = localStorage.getItem('todo');
	if (data_str != null){
		data = JSON.parse(data_str);
	}
	return data;
};

function getfinishedData(){
	var data = new Array;
	var data_str = localStorage.getItem('finished');
	if (data_str != null){
		data = JSON.parse(data_str);
	}
	return data;	
};


function addTask() {
	var data = getData();
	var task = newTask.value;
	if(task != "") {
		data.push(newTask.value);
		localStorage.setItem('todo', JSON.stringify(data));
		add(newTask.value,data.length-1);
		newTask.value="";
		componentHandler.upgradeDom();
	}
	return false;
};

function add(str,i){
	notFinished.appendChild(createNewTaskElement(str,i));
	removeButton[i].addEventListener('click', removal);
};
function notFinishedData(){
	var data = getData();
	for(var i=0; i<data.length;i++){
		notFinished.appendChild(createNewTaskElement(data[i],i));
		removeButton[i].addEventListener('click', removal);
	}
};

function finishedData(){
	var finished = getfinishedData();
	for(var i=0; i<finished.length;i++){
		finishedDone.appendChild(finishedTaskElement(finished[i],i));
		finishedButton[i].addEventListener('click', doneFinished);
	}

};

function removal(){
	var id = this.getAttribute('id');
	var data = getData();
	data.splice(id-1,1);
	localStorage.setItem('todo', JSON.stringify(data));
	notFinished.innerHTML="";
	notFinishedData();
	componentHandler.upgradeDom();
	return false;
};

function doneFinished() {
	var id = this.getAttribute('id');
	var data = getfinishedData();
	data.splice(id-1,1);
	localStorage.setItem('finished', JSON.stringify(data));
	finishedDone.innerHTML="";
	finishedData();
	return false;
};

addButton.addEventListener("click",addTask);
