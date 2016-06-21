
$( document ).ready( function(){
  $(window).load(function(){
    showList();
  });

$('#submit').on('click', function(){
  processTask();
  $('#taskIn').val("");
});

function getTask (){
  $.ajax({
      type: 'GET',
      url: '/getlist',
      success: function( data ){
        showList(data);
      } // end success
    }); //end ajax
  }

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
            data: taskObject,
            success: function(){
              showList();
            } // end success
          }); //end ajax
  }; //processTask

    var showList =  function( ){
          $.ajax({
              type: 'GET',
              url: '/getlist',
              success: function( data ){
                for (i=0; i< data.length; i++){
                $('#taskIn').val("");
                var newTaskItem = data[i].task;
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
                        });// end listDisplay
                    }//end loop
              } // end success
            }); //end ajax

              }; //end show  list
}); //end document ready
