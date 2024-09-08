$(document).ready(function () {

    var data, timer;
    var categories = [];
    var fin_order = [];
    
    var scores = [];

    var selected = 0;

    var quiz_on = false,
        timer_on = false;

    var time_remaining = 0
       

    console.log ('a', $('#mid').height());

    //load json data...
    $.ajax({

        dataType: "json",
        url: 'data.json',
        data: data,
        success: function (data) {
            for ( var i=0; i<data.length; i++) {

                categories.push ( data[i] );

                scores.push ({
                    'category' : data[i].category,
                    'items' : data[i].set.length,
                    'score' : 0,
                });
            }

            setUpPage ();
        }
    });

    $(document).on ('click','button[data-btn]', function() {

        var data = $(this).data();

        reset_btns();

        switch ( data.btn ) {

            case 'remove':

            $('#cookie_info').animate ({ 'bottom' : -$('#cookie_info').outerHeight() }, function () {
                $('#cookie_info').remove();
                console.log ('info removed');
            });
                

            break;
            case 'enter':

                enterPage();

            break;
            case 'end':

                endQuiz();

            break;
            case 'back':

                if (timer_on) clearInterval(timer);

                $('#questions_holder').empty();

                $('#questions_div').hide();

                setUpPage();

                $('#select_div').show();
              

            break;
            case 'start':

                

            break;
            default :
                //todo..
        }
        
    });

    $(document).on ('click','div[data-exam]', function() {

        selected = $(this).data('exam');

        var hr = categories[selected].time.hours,
            mm = categories[selected].time.minutes;

        $('input[name="timer_0"]').val( showDoubleDigits(hr) );
        $('input[name="timer_1"]').val( showDoubleDigits(mm) );
        $('input[name="timer_2"]').val( '00' );

        $('#exampleModal').modal('show');

    });

    $(document).on ('change','#countdown_timer', function () {

        timer_on = $(this).is(':checked');

        $('.timer').prop('disabled', !timer_on );
    });

    $(document).on ('focusout','.timer', function () {
        
        checkFormat();

    });

    $(document).on ('keyup','.timer', function () {
        
        console.log ( 'validate', validateTime() );

    });

 
    function setUpPage () {

        $('#selectitems_div').empty();

        for ( var i=0; i<scores.length; i++) {


            var hscore = getCookie ('hscore' + i);

            var show_score = hscore == "" ? 0 : parseInt (hscore);

            var sel_cls = i == selected ? 'select-active' : '';

            var perc = show_score / parseInt(scores[i].items) * 100;

            var cls = (perc < 80) ? 'text-danger' : 'text-success';


            var content = `<div class="items border border-secondary mb-1 bg-light p-2 rounded" data-exam="` + i +`">
                                <strong>` + scores[i].category + `</strong><br>
                                <small>Highest Score : `+ show_score  +`/`+ scores[i].items +` <span class="`+ cls+`">(`+ showPerc(perc) +`%) </span></small>
                            </div>`;

            $('#selectitems_div').append(content);
        } 

        
    }

    function enterPage () {

        $('#exampleModal').modal('hide');

        if ( timer_on && !validateTime() ) {
                    
            console.log ('checked');

            return;
        }

        $('#select_div').hide();
        $('#questions_div').show();

        var randQuest = $('#random_questions').is(':checked');

        setUpQuestions ( selected, randQuest );

        if ( timer_on ) startTimer( selected );
    }

    function reset_btns() {
        $('button[data-btn]').prop('disabled', false);
    }

    function showPerc ( val, max, min=1) {
        return val.toLocaleString(undefined, { maximumFractionDigits: max, minimumFractionDigits: min });
    }

    function setUpQuestions ( num, rand = false ) {

        fin_order = [];

        $('#h_category').html(categories[num].category);
        $('#h_direction').html(categories[num].direction);
        
        if ( !timer_on ) { 
            $('#h_data').empty().html('<strong>* Timer Off</strong>');
        }

        $('#questions_holder').empty
        
        var choices = 'abcde';

        var set = categories[num].set;

        var temp_order = getOrder( set.length, rand );

        for ( var i = 0; i<temp_order.length; i++ ) {

            var temp_data = {};

            temp_data.question = set[ temp_order[i] ].question;
            temp_data.answer = null;
            temp_data.options = [];
           
            var opts = set[ temp_order[i] ].option;

            var temp_optOrder = [];

            if ( rand ) {

                var optRandom =  (  opts.length < 5 ) ? true : false;

                temp_optOrder = getOrder (opts.length, optRandom);

            }else {
                temp_optOrder =  getOrder (opts.length);
            }

            //..
            for ( var j=0; j<temp_optOrder.length; j++) {
                temp_data.options.push ( opts[ temp_optOrder[j] ] );
            }
            
            fin_order.push ( temp_data );
        }

        //show questionnaire 
        for ( var i=0; i<fin_order.length; i++) {

            $('#questions_holder').append ('<div class="d-flex flex-row my-2"> <div class="mr-2"><strong>' + (i+1) + '.</strong></div><div> ' + fin_order[i].question + '</div></div>');

            var content = "";
            var options = fin_order[i].options;

            if ( options.length < 5 ){
                for ( var j=0; j<options.length; j++) {

                    var id = i +'_' + j;

                    content += '<div class="option option-4 d-flex flex-row hover" id="'+id+'"><div class="mr-1"><strong>' + choices.charAt(j) + ')</strong></div><div> '+ options[j].txt +'</div></div>';
                }
                $('#questions_holder').append ('<div class="d-flex flex-column flex-md-row justify-content-between flex-wrap"> '+ content +'</div><br>');
            }else {
                for ( var j=0; j<options.length; j++) {

                    var id = i +'_' + j;

                    content += '<div class="option option-5 d-flex mr-2 hover" id="'+id+'"> <div class="m-auto font-weight-bold">' + choices.charAt(j) + '</div></div>';
                }
                $('#questions_holder').append ('<div class="d-flex flex-row justify-content-end flex-wrap"> '+ content +'</div><br>');
            }
        
        }

        $('.option').on('click', function () {
            
            //if ( !quiz_on ) return;

            var str = $(this).attr('id');
            
            var arr = str.split('_');

            //reset options' btn status
            var temp_opt = fin_order [ parseInt(arr[0]) ].options;
            for ( var i=0; i<temp_opt.length; i++ ) {
                $('#' + arr[0] + '_' + i).removeClass('is-selected');
                $('#' + arr[0] + '_' + i).addClass('hover');
            }

            //save answer
            fin_order [  parseInt(arr[0]) ].answer = parseInt( arr[1] );

            $(this).removeClass('hover');
            $(this).addClass('is-selected');
        });

        $('#questions_holder').append('<div class="text-center text-danger"><small>-- End of Questionnaire --</small></div>');

    }

    function getOrder ( arr_length, isRandom = false ) {

        var temp_arr = [];
        for ( var i=0; i<arr_length; i++) {
            temp_arr.push ( i );
        }
        //....

        var fin_arr = [];
        
        if ( isRandom ) {

            while ( temp_arr.length > 0 ) {

                var randomIndex = Math.floor(Math.random() * temp_arr.length);

                fin_arr.push ( temp_arr[randomIndex] );

                temp_arr.splice ( randomIndex, 1);
            }
        
            return fin_arr;

        }

        return temp_arr;
    }

    function showDoubleDigits ( numb ) {
        if ( parseInt (numb) < 10 ) {
            return '0' + numb;
        }
        return numb;
    }

    function startTimer ( select ) {

        time_remaining = 0;

        var t_hrs = parseInt( $('input[name="timer_0"]').val() ),
            t_mins = parseInt( $('input[name="timer_1"]').val() ),
            t_secs = parseInt( $('input[name="timer_2"]').val() ),

        time_remaining = t_hrs * 3600 + (t_mins * 60) + t_secs; 

        insertContent ( showDoubleDigits(t_hrs) +':' + showDoubleDigits(t_mins) + ':' + showDoubleDigits(t_secs) );

        timer = setInterval ( function () {

            time_remaining += -1;

            var h = showDoubleDigits ( Math.floor ( time_remaining / 3600 ) ),
                m = showDoubleDigits ( Math.floor ( time_remaining / 60 ) % 60 ),
                s = showDoubleDigits( Math.floor ( time_remaining % 60 ) );

            insertContent ( h +':' + m + ':' + s );

            if ( time_remaining <= 0 ) {
                endQuiz();
            }


        }, 1000);
    }

    function insertContent  ( str, score=false ) {

        var cont = '';

        if ( !score ) {
            cont = '<h5 class="m-0">Timer : <span class="badge badge-light badge-pill"><strong>'+ str +'</strong></span></h5>';
        }else {
            cont = '<h5 class="m-0">Score : '+ str +'</h5>';
        }
        
        $('#h_data').html ( cont );

    }

    function endQuiz () {

        $('button[data-btn="end"]').prop('disabled', true);

        if ( timer_on ) clearInterval(timer);

        checkQuiz();

    }

    function checkQuiz ( ) {
        
        
        $('.option').off();
        
        var points = 0, items = fin_order.length;

        for ( var i = 0; i < fin_order.length; i++ ) {

            var answer = fin_order[i].answer;
        
            var opts = fin_order[i].options;

            if ( answer !== null && fin_order[i].options[answer].isAnswer ) {
               points += 1;
            }

           for ( var j=0; j<opts.length;j++) {

               if ( opts[j].isAnswer ) {

                    $('#' + i +'_' + j ).removeClass('hover');
                    if ( answer!== null && parseInt(answer) == j ) {
                        $('#' + i +'_' + j ).removeClass('is-selected');
                        $('#' + i +'_' + j ).addClass('is-correct');
                    }else {
                        $('#' + i +'_' + j ).addClass('is-answer');
                    }

               }else {

                    $('#' + i +'_' + j ).removeClass('hover');
                    if ( answer!== null && parseInt(answer) == j ) {
                        $('#' + i +'_' + j ).removeClass('is-selected');
                        $('#' + i +'_' + j ).addClass('is-incorrect');
                    }
               }

            } 
        }

        var perc = ( points/items) * 100;

        //var category_id = parseInt ($('#select-category').val());

        //var high_score = parseInt( scores [ selected ].score );

        //if ( points > high_score ) scores [ selected ].score = points;

        var cls = (perc > 80) ? 'text-red' : 'text-green';

        var hscore = getCookie( 'hscore' + selected );

        if (hscore != "") {
            if ( points > parseInt(hscore) ) setCookie ( 'hscore'+selected, points, 30 );
        } else {
            setCookie ( 'hscore'+selected, points, 30 )
        }


        //$('#h_data').html('<strong>Score : '+ points +'/' + items +' (' + showPerc(perc) +'%)</strong>');

        
        insertContent ( points +'/' + items +' <span class="'+cls+'"><strong>(' + showPerc(perc) +'%)</strong></span>', true );
    }

    function validateTime () {

        var myArr = [];

        $('.timer').each (function () {
            myArr.push ( parseInt($(this).val()) );
        });

        if ( isNaN(myArr[0]) || isNaN(myArr[1]) || isNaN(myArr[2]) ) {
            return false;
        }

        if ( myArr[1] > 59 || myArr[2] > 59 ) {
            return false;
        }

        //console.log ( myArr );

        return true;

    }

    function checkFormat ( val ) {

        var myArr = [];

        $('.timer').each (function () {
           
            var value = parseInt( $(this).val() );

            if ( $(this).val().length  < 2 ) {
                $(this).val ('0' + value );
            }

            if ( isNaN(value) ) {
                $(this).val('00');
            }


        });

    }

    function setCookie(cname, cvalue, exdays) {

        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }


});