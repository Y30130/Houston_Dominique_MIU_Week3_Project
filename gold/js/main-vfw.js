// Dominique Houston
// 1306 - VFW I
// Assignment 4
//

// Wait until the DOM is ready.
var radios = document.forms[0].readTitle;
window.addEventListener("DOMContentLoaded", function(){


	// getElementByID Function
	function ge(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	var radios = document.forms[0];
console.log(radios);

	// Create select field element and populate options.

 function makePlatforms(){
        var formtag = document.getElementsByTagName("form"),
            selLi = ge('dropDown'),
            createSelect = document.createElement('select');
            createSelect.setAttribute("id", "platforms");
            createSelect.setAttribute("data-native-menu", "false");
        for(var i=0, j=readPlatform.length; i<j; i++){
            var createOption = document.createElement('option');
            var optText = readPlatform[i];
            createOption.setAttribute("value", optText);
            createOption.innerHTML = optText;
            createSelect.appendChild(createOption);
        }
        selLi.appendChild(createSelect);
    };
    
     // Find value of selcted radio button 
    function getSelectedRadio(){
      var radio = document.forms[0].readTitle;
      for(var i=0; i<radio.length; i++){
         if(radio[i].checked){
         completedValue = radio[i].value;
         }
      }
   }
    // Find the value of checkboxes
    function getCheckboxValue() {
	    if(ge('fav').checked){
		    favoriteValue = ge('fav').value;
	    }else {
		    favoriteValue = "No";
	    }
    }
    
    // Save Our Data
    function storeData(data) {
    	// if there is no key, this mean there is a new title, and a new key is necessary
    	
    	if(!data) {
	    	var id 				= Math.floor(Math.random()*10000001);
    	}else {
    		// set id to existing key we're editing so it will save over data
    		// the key is same that's been passed along from the editSubmit event handler
    		// to the validate function, and then passed here into the storeData function.
	    	id = data;
    	}
	    // Gather all form field values and store in an object
	    // Object properties contain an array with the form label and input value.
	    getSelectedRadio();
	    getCheckboxValue();
	    var item 			= {};
	    	item.workTitle				= ["Title:", ge('workTitle').value];
	    	item.workAuthorName			= ["Author:", ge('workAuthorName').value];
	    	item.workAuthorPublished 	= ["Year Published:", ge('workYearPublished').value];
	    	item.workAuthorUrl 			= ["Work Author URL:", ge('workUrl').value];
	    	item.workCompleted			= ["Finished Reading:", completedValue];
	    	item.favorite 				= ["Saved as Favorite? :", favoriteValue];
	    	item.platform				= ["Platform:", ge('platforms').value];
	    	item.notes 					= ["Notes:",ge('notes').value];
	    	item.readStart		    	= ["Read Start Date:",ge('readStart').value];
	    	item.readFinish 			= ["Read Finish Date:",ge('readFinish').value];
	    	item.stars 					= ["Rating:",ge('stars').value];
	    	// Save data into Local Storage: Use Stringify to convert our object to a string
	    	localStorage.setItem(id, JSON.stringify(item));
	    	alert("Title saved. Bookept!")
    }
    
    // Display our Data on the Front-End
       function displayData(){
       if(localStorage.length === 0) {
	       alert("There is currently no data in local storage. Default data added.");
	       autoFillData();
       }
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		ge('items').style.display = "block";
		for(var i=0, len=localStorage.length; i<len;i++) {
			var makeLi = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			    //convert string back to object
		         var infoObj = JSON.parse(value);
		         var createSubList = document.createElement('ul');
		         makeLi .appendChild(createSubList);
		         getImage(infoObj.platform[1], createSubList);
		         for(var y in infoObj){
		            var createSubli = document.createElement('li');
		            createSubList.appendChild(createSubli);
		            var optSubText = infoObj[y] [0] +" "+ infoObj[y] [1];
		            createSubli.innerHTML = optSubText;
		            createSubList.appendChild(linksLi);
		         }
		         createItemLinks(localStorage.key(i), linksLi);  // Creates the edit and delete link for the items in LocalStorage
		         
		      }
		    
		   }
		   
		   // Get Platform Type Image
		   function getImage(platformName,createSubList) {
			   var imgLi = document.createElement('li');
			   createSubList.appendChild(imgLi);
			   var newImg = document.createElement('img');
			   var setSrc = newImg.setAttribute("src", "img/"+ platformName + ".png");
			   imgLi.appendChild(newImg);
		   };

	// Autofill Data 
	function autoFillData() {
		// the JSON object data required for this to work is coming from json.js, which is loaded in my HTML page
		// store json object in Local storage 
		for(var n in json) {
			var id = Math.floor(Math.random()*10000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}


    // Make Item Links
    // Create the edit and delete links for each stored item when displayed
    function createItemLinks(key, linksLi) {
    	// add edit single item link
	    var editLink = document.createElement('a');
	    editLink.href = "#";
	    editLink.key = key;
	    var editText = "Edit Title";
	    editLink.addEventListener("click", editItem);
	    editLink.innerHTML = editText;
	    linksLi.appendChild(editLink);
	    
	    // add line break
	    var lineBreak = document.createElement('br');
	    linksLi.appendChild(lineBreak);
	    
	    
	    // add delete single item link
	    var deleteLink = document.createElement('a');
	    deleteLink.href = "#";
	    deleteLink.key = key;
	    var deleteText = "Remove Title";
	    deleteLink.addEventListener("click", deleteItem);
	    deleteLink.innerHTML = deleteText;
	    linksLi.appendChild(deleteLink);
    }
    
    // Edit Single Work Title 
    function editItem() {
	    // grab the data from item in Local Storage
	    var value = localStorage.getItem(this.key);
	    var item = JSON.parse(value);
	    
	    

	    
	    //populate the form fields with current localStorage values
	    ge('platforms').value = item.platform[1];
	    ge('workTitle').value = item.workTitle[1];
	    ge('workAuthorName').value = item.workAuthorName[1];
	    ge('workYearPublished').value = item.workAuthorPublished[1];
	    ge('workUrl').value = item.workAuthorUrl[1];
	    ge('notes').value = item.notes[1];
	    ge('readStart').value = item.readStart[1];
	    ge('readFinish').value = item.readFinish[1];
	    ge('stars').value = item.stars[1];
	    var fav = document.forms[0].fav;
	    if(item.favorite[1] == "Yes") {
		    ge('fav').setAttribute("checked","checked");
	    }
	    var radios = document.forms[0].readTitle;
	    for(var i=0; i < radios.length; i++){
		    if(radios[i].value == "Yes" && item.workCompleted[1] == "Yes"){
			    radios[i].setAttribute("checked", "checked");
		    }else if (radios[i].value == "No" && item.workCompleted[1] == "No"){
			    radios[i].setAttribute("checked", "checked"); 
		    }
	    }


	    // Remove the initial listener from the input "save" button
	    save.removeEventListener("click", storeData);
	    // Change submit button value to "edit button"
	    ge('submit').value = "Edit Title";
	    var editSubmit = ge('submit');
	    // save the key value as property of editSubmit Event
	    // to use value when saving data that has been edited
	    editSubmit.addEventListener("click", validate);
	    editSubmit.key = this.key;
	    
    }

    // Delete Single Item
    function deleteItem() {
	    var ask = confirm("Are you sure you want to delete this title?");
	    if(ask) {
		    localStorage.removeItem(this.key);
		    alert("Title was deleted!");
		    window.location.reload();
	    }else {
		    alert("Title was NOT removed.");
	    }
    }

    // Clear Data
    function clearData() {
	    if(localStorage.length === 0){
	    alert("There is no data to clear.");		    
	    }else {
		    localStorage.clear();
		    alert("All titles have been removed.");
		    window.location.reload();
		    return false;
	    }
    }



   	// Variable defaults
	var readPlatform = ["-- Choose A Platform --", "Book - Paperback", "Book - Hardcover", "Book - Other", "Digital - Personal Computer", "Digital - Tablet", "Digital - Other"], 
	completedValue, 
	favoriteValue = "No"; errMsg = ge('errors');
    makePlatforms();

// Set Link & Submit Click Events
	var displayLink = ge('displayLink');
	displayLink.addEventListener("click", displayData);
	var clearLink = ge('clearLink');
	clearLink.addEventListener("click",clearData);
	var save = ge('submit');
	save.addEventListener("click", storeData);


});

