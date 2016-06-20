
$( document ).ready( function(){
  $.ajax({
      type: 'GET',
      url: '/getlist',
      success: function( data ){
        showList(data);
      } // end success
    }); //end ajax
    $( '#submit' ).on( 'click', function(event){
    $('#taskIn').val(""); //clear input after submit is clicked
    processTask(); //send object
    }); //end submit click


  var processTask = function(){ //object to send
      var taskItem = $('#taskIn').val();
      // assemble an oject (always for post call)
      var taskObject = {
              "task" : taskItem,
              "active" : true
              }; //end taskObject
      console.log("New Task: " + taskObject.task + taskObject.active);
      $.ajax({
            type: "POST",
            url:'/createnew',
            data: taskObject
          }); //end ajax
  }; //processTask



      function showList( todolist ){
              $.ajax({
                  type: 'GET',
                  url: '/getlist',
                  success: function( data ){
                  } // end success
                }); //end ajax

              for (i=0; i< todolist.length; i++){
              $('#taskIn').val("");
              var newTaskItem = todolist[i].task;
              $('#listDisplay').append("<div id = '[i]'><p>"+ newTaskItem + " " + "<button type='button' id='" + i + "done' value = 'complete'>complete</button></div>");
              //Create a click event for the submit button
               $('#' + i + 'done').click(function(){
                   //Update the task object
                   var updatedTask ={
                           "task" : newTaskItem,
                           "active" : false
                         }; //end updatedTaskObject

                   $.ajax({
                         type: "POST",
                         url:'/createupdate',
                         data: updatedTask
                       }); //end ajax
                       $(this).parent().empty();
                       $('#listDisplay').append("<div id = '[i]'><p>"+'<strike>'+ newTaskItem +'</strike></div>');
                      });// end listDisplay
                  }//end loop
              }//end show  list
}); //end document ready
