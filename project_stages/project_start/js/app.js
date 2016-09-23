//Problem: User Interaction doesn't provide desired results.
//Solution: Add intractivity so the user can manage daily tasks.

var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks
/* use Mozilla Developers Network/WebAPI/DocumentObjectModel/Document/properties
getElementById (element = document.getElementById(id);)
For addButton go to methods instead of properties
*/

//New Task List item
var createNewTaskElement = function(taskString) {
  //Create List item
  var listItem = document.createElement("li");

  //input (checkbox)
  var checkBox = document.createElement("input"); // checkbox
  //label
  var label = document.createElement("label"); // checkbox
  //input (text)
  var editInput = document.createElement("input"); // text
  //button.edit
  var editButton = document.createElement("button");
  //button.delete
  var deleteButton = document.createElement("button");

      //Each element needs to be modifying

      checkBox.type = "checkbox";
      editInput.type = "text";

      editButton.innerText = "Edit";
      editButton.className = "edit";
      deleteButton.innerText = "Delete";
      deleteButton.className = "delete";

      label.innerText = taskString;

      //Each element needs appending
      listItem.appendChild(checkBox);
      listItem.appendChild(label);
      listItem.appendChild(editInput);
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);

    return listItem;
}

//Add a new task
var addTask = function() { //is the same as function addTask(){}
  console.log("Add task...");
  //Create a new list item with the text from #new-task:
  var listItem = createNewTaskElement(taskInput.value);
  //Append listItem to incompleteTasksHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);

  taskInput.value = "";
}

//Edit an existing task
var editTask = function() {
  console.log("Edit task...");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");

  var containsClass = listItem.classList.contains("editMode");

    //if the class of the parent is .editMode
    if (containsClass){
      //Switch from .editMode
      //label text become the input's value
      label.innerText = editInput.value;
    } else {
      //Switch to .editMode
      //input value becomes the label's text
      editInput.value = label.innerText;
    }
    //Toggle .editMode on the listItem
    listItem.classList.toggle("editMode");
}

//Delete an existing task
var deleteTask = function() {
  console.log("Delete task...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  //Remove the parent list item from the url
  ul.removeChild(listItem);
}

//Mark a task as complete
var taskCompleted = function() {
  console.log("Complete task...");
  //When the Checkbox is checked
    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskIncompleted);
}

//Mark a task as incomplete
var taskIncomplete = function(){
  console.log("Task incomplete...");
  //When the checkbox is unchecked
    //Append the task list item to the #incomplete-tasks
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");
  //Select taskListItem's children
var checkBox = taskListItem.querySelector("input[type=checkbox]");
var editButton = taskListItem.querySelector("button.edit");
var deleteButton = taskListItem.querySelector("button.delete");

  //Bind editTask to edit button
  editButton.onclick = editTask;

  //Bind deleteTask to delete button
  deleteButton.onclick = deleteTask;

  //Bind checkboxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;

}

var ajaxRequest = function() {
  console.log("AJAX request");
}

//Set the click handler to the add task function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

//cycle over the incompleteTasksHolder ul list items
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
    //bind events to list item's children (taskCompleted)
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over the completeTasksHolder ul list items
for(var i = 0; i < completedTasksHolder.children.length; i++)
      //bind events to list item's children (taskIncompleted)
      bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
