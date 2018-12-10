$(function(){
    // Initialize Firebase
    var config = {
      /*****
      
      Add your API key below
      
      *****/
      apiKey: "<API_KEY>"
    };
    firebase.initializeApp(config);

    //Connect to database
    var database = firebase.database();
    var table = database.ref('quizCreator');

    // jQuery Event Listeners
    function resetForm(){
      $('#quizTitle').val('');
      $('#quizCategory').val('');
      $('#question1Text').val('');
      $('#question1Option1').val('');
      $('#question1Option2').val('');
      $('#question1Option3').val('');
      $('#question1Option4').val('');

      $('#question2Text').val('');
      $('#question2Option1').val('');
      $('#question2Option2').val('');
      $('#question2Option3').val('');
      $('#question2Option4').val('');

      $('#question3Text').val('');
      $('#question3Option1').val('');
      $('#question3Option2').val('');
      $('#question3Option3').val('');
      $('#question3Option4').val('');

      $('#question4Text').val('');
      $('#question4Option1').val('');
      $('#question4Option2').val('');
      $('#question4Option3').val('');
      $('#question4Option4').val('');
    }
    var action = '';
    //ADD
    $('#showQuizCreator').on('click', function() {
      if ( action === '' || action === 'add'){
          $('#formCreateQuiz').toggle();
        }
        //show "CREATE" and hide "SAVE"
        $('#create').show();
        $('#update').hide();

        resetForm();
        action = 'add';
    });

    //CREATE
    $('#create').on('click', function() {
      var quiz = {
          title: $('#quizTitle').val(),
          category: $('#quizCategory').val(),
          questions: [{
            text: $('#question1Text').val(),
            answer: $('#question1').find('input:checked').val(),
            options: [$('#question1Option1').val(),$('#question1Option2').val(),$('#question1Option3').val(),$('#question1Option4').val()]
          },
          {
            text: $('#question2Text').val(),
            answer: $('#question2').find('input:checked').val(),
            options: [$('#question2Option1').val(),$('#question2Option2').val(),$('#question2Option3').val(),$('#question2Option4').val()]
          },
          {
            text: $('#question3Text').val(),
            answer: $('#question3').find('input:checked').val(),
            options: [$('#question3Option1').val(),$('#question3Option2').val(),$('#question3Option3').val(),$('#question3Option4').val()]
          },
          {
            text: $('#question4Text').val(),
            answer: $('#question4').find('input:checked').val(),
            options: [$('#question4Option1').val(),$('#question4Option2').val(),$('#question4Option3').val(),$('#question4Option4').val()]
          }]
      };
      table.push(quiz);
      resetForm();
      $('#formCreateQuiz').hide();
    });

    //READ - this is a Firebase Event Listener
    table.on('value', function(response) {
        var quizzes = response.val();

        $('#quiz').html(''); //reset articles
        for(key in quizzes) {
            var quiz = quizzes[key];
            console.log(quiz);

            //build template
            var s = `
                <div class="col-md-12 mb-5">
                    <div class="card bg-dark text-light">
                        <div class="card-top">
                            <h2 class="card-title pt-3 px-4 pb-0 m-0">` + quiz.title + `&nbsp;&nbsp;<sup class="badge badge-danger" style="font-size:0.5em;">` + quiz.category + `</sup></h2>
                        </div>
                        <div class="card-body">
                          <div class="row card-deck">`;

            for(index in quiz.questions){
              var question = quiz.questions[index];
                      s  +=`<div class="col-md-6 mb-3">
                              <div class="card bg-light text-dark">
                                <div class="card-top">
                                    <h4 class="card-title m-0 pt-3 px-3 pb-0">` + ( parseInt(index) + 1) + `. ` + question.text + `</h4>
                                </div>
                                <div class="card-body">
                                  <ol class="list-group">
                                    <li class="list-group-item list-group-item-action">1. ` + question.options[0] + `</li>
                                    <li class="list-group-item list-group-item-action">2. ` + question.options[1] + `</li>
                                    <li class="list-group-item list-group-item-action">3. ` + question.options[2] + `</li>
                                    <li class="list-group-item list-group-item-action">4. ` + question.options[3] + `</li>
                                  </ol>
                                </div>
                                <div class="card-footer">
                                  <p>Answer: Option #` + ( parseInt(question.answer) + 1) + `</p>
                                </div>
                              </div>
                            </div>
                          `;
            }


            s += `</div>
                        <div class="card-footer">

                        </div>
                        <div class="card-footer">
                            <button data-id="` + key + `" class="btn btn-danger delete float-right ml-1"><i class="fa fa-trash"></i></button>
                            <button data-id="` + key + `" class="btn btn-success edit float-right"><i class="fa fa-pencil-alt"></i></button>
                        </div>
                    </div>
                </div>
            `;

            //append to DOM
            $('#quiz').append(s);
        }
    });

    //EDIT
    $('#quiz').on('click', '.edit', function(){
        var id = $(this).data('id');
        //var article = database.ref('articles/' + id).remove();
        table.child(id).once("value", function(response)
        {
            var quiz = response.val();

            $('#formCreateQuiz').toggle(true);

            $('#quizTitle').val(quiz.title);
            $('#quizCategory').val(quiz.category);
            $('#question1Text').val(quiz.questions[0].text);
            $('#question1Option1').val(quiz.questions[0].options[0]);
            $('#question1Option2').val(quiz.questions[0].options[1]);
            $('#question1Option3').val(quiz.questions[0].options[2]);
            $('#question1Option4').val(quiz.questions[0].options[3]);
            $('#question1').find('input[type=radio]')[quiz.questions[0].answer].checked = true;

            $('#question2Text').val(quiz.questions[1].text);
            $('#question2Option1').val(quiz.questions[1].options[0]);
            $('#question2Option2').val(quiz.questions[1].options[1]);
            $('#question2Option3').val(quiz.questions[1].options[2]);
            $('#question2Option4').val(quiz.questions[1].options[3]);
            $('#question2').find('input[type=radio]')[quiz.questions[1].answer].checked = true;

            $('#question3Text').val(quiz.questions[2].text);
            $('#question3Option1').val(quiz.questions[2].options[0]);
            $('#question3Option2').val(quiz.questions[2].options[1]);
            $('#question3Option3').val(quiz.questions[2].options[2]);
            $('#question3Option4').val(quiz.questions[2].options[3]);
            $('#question3').find('input[type=radio]')[quiz.questions[2].answer].checked = true;

            $('#question4Text').val(quiz.questions[3].text);
            $('#question4Option1').val(quiz.questions[3].options[0]);
            $('#question4Option2').val(quiz.questions[3].options[1]);
            $('#question4Option3').val(quiz.questions[3].options[2]);
            $('#question4Option4').val(quiz.questions[3].options[3]);
            $('#question4').find('input[type=radio]')[quiz.questions[3].answer].checked = true;
            // console.log(quiz);

            //show "SAVE" and hide "CREATE"
            $('#create').hide();
            $('#update').data('id', id);
            $('#update').show();
        });
        action = 'edit';
    });

    //UPDATE
    $('#update').on('click', function(){
        var id = $(this).data('id');
        var quiz = {
            title: $('#quizTitle').val(),
            category: $('#quizCategory').val(),
            questions: [{
              text: $('#question1Text').val(),
              answer: $('#question1').find('input:checked').val(),
              options: [$('#question1Option1').val(),$('#question1Option2').val(),$('#question1Option3').val(),$('#question1Option4').val()]
            },
            {
              text: $('#question2Text').val(),
              answer: $('#question2').find('input:checked').val(),
              options: [$('#question2Option1').val(),$('#question2Option2').val(),$('#question2Option3').val(),$('#question2Option4').val()]
            },
            {
              text: $('#question3Text').val(),
              answer: $('#question3').find('input:checked').val(),
              options: [$('#question3Option1').val(),$('#question3Option2').val(),$('#question3Option3').val(),$('#question3Option4').val()]
            },
            {
              text: $('#question4Text').val(),
              answer: $('#question4').find('input:checked').val(),
              options: [$('#question4Option1').val(),$('#question4Option2').val(),$('#question4Option3').val(),$('#question4Option4').val()]
            }]
        };
        database.ref('quizCreator/' + id).update(quiz);
        $('#formCreateQuiz').hide();
    });

    //DELETE
    $('#quiz').on('click', '.delete', function(){
        var id = $(this).data('id');
        database.ref('quizCreator/' + id).remove();
    });

    //Prevent Form Submission
    $('#formCreateQuiz').on('submit', function(event){
        event.preventDefault();
    });

});
