$(document).ready(function () {
    
    var serverURL = 'https://resbuild-server.herokuapp.com/';
    /**----------------------------- Login Form Submit -----------------------------**/
    if ($('#login-form').length !== 0) {
        $('#login-form').validate({
            highlight: function (element, errorClass) {
                $(element).addClass(errorClass);
                $(element.form).find("label[for=" + element.id + "]")
                    .addClass(errorClass);
            },
            unhighlight: function (element, errorClass) {
                $(element).removeClass(errorClass);
                $(element.form).find("label[for=" + element.id + "]")
                    .removeClass(errorClass);
            },
            rules: {
                
                email: {
                    required: true,
                    // Specify that email should be validated
                    // by the built-in "email" rule
                    email: true
                },
                password: {
                    required: true,
                    minlength: 5
                }
            },
            
            messages: {
                password: {
                    required: "Please provide a password",
                    minlength: "Please provide correct Password"
                },
                email: "Please enter a valid email address"
            }
        });
    }
    
    
    $('#login-form').on('submit', function (e) {
        e.preventDefault();
        var email = $('#email').val(),
            password = $('#password').val();
        $.ajax({
            method: 'POST',
            contentType: "application/json",
            dataType: 'json',
            url: serverURL + 'auth/signin',
            data: JSON.stringify({
                'email': email,
                'password': password
            }),
            success: function (result) {
                if (result) {
                    localStorage.setItem("email", email);
                    localStorage.setItem("token", result.token);
                    localStorage.setItem("user_id", result.user_id);
                    window.location.href = 'questionnaire.html';
                    
                }
            },
            error: function () {
                alert("Incorrect username / password!")
            }
        })
    });
    
    
    /**----------------------------- Login Form Submit Ends -----------------------------**/
    
    
    /**----------------------------- Signup Form Submit -----------------------------**/
    if ($('#signup-form').length !== 0) {
        $('#signup-form').validate({
            highlight: function (element, errorClass) {
                $(element).addClass(errorClass);
                $(element.form).find("label[for=" + element.id + "]")
                    .addClass(errorClass);
            },
            unhighlight: function (element, errorClass) {
                $(element).removeClass(errorClass);
                $(element.form).find("label[for=" + element.id + "]")
                    .removeClass(errorClass);
            },
            rules: {
                name: "required",
                email: {
                    required: true,
                    // Email validated by the built-in "email" rule
                    email: true
                },
                password: {
                    required: true,
                    minlength: 5
                },
                agree: {
                    required: true
                }
            },
            // Specify validation error messages
            messages: {
                name: "Please enter your Name",
                email: "Please enter a valid email address",
                password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long"
                },
                agree: {
                    required: "Please agree to the terms and conditions."
                }
            }
        });
    }
    
    $('#signup-form').on('submit', function (e) {
        e.preventDefault();
        var name = $('#name').val(),
            email = $('#email').val(),
            password = $('#password').val();
        $.ajax({
            method: 'PUT',
            url: serverURL + 'auth/signup',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify({
                'email': email,
                'password': password,
                'name': name
            }),
            success: function (result) {
                if (result) {
                    window.location = 'index.html'
                }
                
            },
            error: function () {
                alert("Something wrong!")
            }
        });
    });
    /**----------------------------- Signup Form Submit Ends -----------------------------**/
    
    /**----------------------------- Clear LocalStorage on logout click -----------------------------**/
    $('#logout').click(function (e) {
        e.preventDefault();
        localStorage.setItem("token", null);
        localStorage.setItem("user_id", null);
        window.location.replace('index.html');
    });
    
    /**----------------------------- SetUp International Telephone Input -----------------------------**/
    var settings = {
        utilsScript: "js/modules/utils.js"
    };
    var input = document.querySelector("#contactNumber");
    var iti;
    if (input) {
        iti = window.intlTelInput(input, settings);
    }
    /**----------------------------- SetUp International Telephone Input Ends -----------------------------**/
    
    /**----------------------------- Questionnaire Related -----------------------------**/
    $('.addAnother').click(function (e) {
        e.preventDefault();
        var formId = $(e.target.closest('form')).attr('id');
        $('#' + formId + ' .template').last().after("<hr style='border-top: 1px dotted;'/>");
        $('#' + formId + ' hr').last().after($('#' + formId + ' .template:first')[0].outerHTML);
        $('html,body').animate({
            scrollTop: $('#' + formId + ' .template:last').offset().top
        });
    });
    
    $('#currentWork').change(function () {
        if (this.checked) {
            $('#jobEndDate').prop('readonly', true);
        } else {
            $('#jobEndDate').removeProp('readonly');
        }
    });
    
    $('#currentStudy').change(function () {
        if (this.checked) {
            $('#endDate').get(0).type = 'text';
            $('#endDate').val('Present');
            $('#endDate').prop('readonly', true);
        } else {
            $('#endDate').get(0).type = 'date';
            $('#endDate').removeProp('readonly');
        }
    });
    
    $('#currentProject').change(function () {
        if (this.checked) {
            $('#projectEndDate').get(0).type = 'text';
            $('#projectEndDate').val('Present');
            $('#projectEndDate').prop('disabled', true);
        } else {
            $('#projectEndDate').get(0).type = 'date';
            $('#projectEndDate').prop('disabled', false);
        }
    });
    
    if ($('#personalInfo').length !== 0) {
        $('#personalInfo').validate({
            highlight: function (element, errorClass) {
                $(element).addClass(errorClass);
                $(element.form).find("label[for=" + element.id + "]")
                    .addClass(errorClass);
            },
            unhighlight: function (element, errorClass) {
                $(element).removeClass(errorClass);
                $(element.form).find("label[for=" + element.id + "]")
                    .removeClass(errorClass);
            },
            rules: {
                name: "required",
                emailID: {
                    required: true,
                    email: true
                },
                contactNumber: {
                    //ValidateContact: true,
                    required: true,
                    number: true,
                    minlength: 10
                },
                mailingAddress: {
                    required: true,
                    minlength: 4
                }
            },
            messages: {
                name: "Please specify your full name",
                emailID: {
                    required: "We need your email address for entering in your resume.",
                    email: "Your email address must be in the format of name@domain.com"
                },
                contactNumber: {
                    required: "Your contact number is essential.",
                    minlength: "Invalid Phone Number."
                },
                mailingAddress: {
                    required: "We need your mailing address for showing on your resume.",
                    minlength: "Mailing address can't be less than 4 letters."
                }
                
            }
        });
        
        $.validator.addMethod("ValidateContact", function (value, element) {
            // Do your usual stuff here.
        }, function (params, element) {
            var value = $(element).val(),
                errorMap = ["Invalid number", "Invalid country code", "The number is too short", "The number is too long", "Invalid number"];
            if (value.trim()) {
                if (!iti.isValidNumber()) {
                    var errorCode = iti.getValidationError();
                    msg = errorMap[errorCode];
                }
            }
            return msg;
        });
    }
    
    if ($('#education').length !== null) {
        $('#education').validate({
            highlight: function (element, errorClass) {
                $(element).addClass(errorClass);
                $(element.form).find("label[for=" + element.id + "]")
                    .addClass(errorClass);
            },
            unhighlight: function (element, errorClass) {
                $(element).removeClass(errorClass);
                $(element.form).find("label[for=" + element.id + "]")
                    .removeClass(errorClass);
            },
            rules: {
                endDate: {
                    required: true,
                    greaterThan: "#startDate"
                },
                gpa: {
                    //lesserThan: "#4"
                    range: [0, 4]
                }
            },
            messages: {
                gpa: {
                    range: "CGPA should be lesser than 4"
                },
                endDate: {
                    greaterThan: "End date should be greater than Start Date"
                },
            }
        });
        
        jQuery.validator.addMethod("greaterThan",
            function (value, element, params) {
                
                if (!/Invalid|NaN/.test(new Date(value))) {
                    return new Date(value) > new Date($(params).val());
                }
                
                return isNaN(value) && isNaN($(params).val())
                    || (Number(value) > Number($(params).val()));
            }, 'Must be greater than {0}.');
        
        jQuery.validator.addMethod("lesserThan",
            function (value, element, params) {
                
                if (!/Invalid|NaN/.test(new Date(value))) {
                    return new Date(value) < new Date($(params).val());
                }
                
                return isNaN(value) && isNaN($(params).val())
                    || (Number(value) < Number($(params).val()));
            }, 'Must be greater than {0}.');
    }
    
    if ($('#websites').length !== 0) {
        $('#websites').validate({
            highlight: function (element, errorClass) {
                $(element).addClass(errorClass);
                $(element.form).find("label[for=" + element.id + "]")
                    .addClass(errorClass);
            },
            unhighlight: function (element, errorClass) {
                $(element).removeClass(errorClass);
                $(element.form).find("label[for=" + element.id + "]")
                    .removeClass(errorClass);
            },
            rules: {
                ownWebsite: {
                    url: true,
                },
                linkedInURL: {
                    url: true,
                },
                githubURL: {
                    url: true,
                },
                googleScholarsURL: {
                    url: true,
                },
                otherURL: {
                    url: true,
                }
                
            },
            messages: {
                ownWebsite: {
                    url: "Please enter a valid url."
                },
                linkedInURL: {
                    url: "Please enter a valid url."
                },
                githubURL: {
                    url: "Please enter a valid url."
                },
                googleScholarsURL: {
                    url: "Please enter a valid url."
                },
                otherURL: {
                    url: "Please enter a valid url."
                }
            }
        });
    }
    
    var questionnaireObject = {};
    
    $('.next').click(function (e) {
        e.preventDefault();
        var thisForm = $(this).closest('form');
        if (thisForm.valid()) {
            var formId = thisForm.attr('id');
            var templates = $("#" + formId + " div.template");
            if (formId === 'education' || formId === 'experience' || formId === 'projects') {
                var tempList = [];
                for (var i = 0; i < templates.length; i++) {
                    var fields = $(templates[i]).find('.form-control').serializeArray();
                    var fieldObj = {};
                    $.each(fields, function (i, field) {
                        fieldObj[field.name] = field.value;
                    });
                    tempList.push(fieldObj);
                }
                questionnaireObject[formId] = tempList;
            } else {
                questionnaireObject[formId] = {};
                thisForm.serializeArray().map(function (x) {
                    questionnaireObject[formId][x.name] = x.value;
                });
            }
            thisForm.addClass('d-none');
            thisForm.next().removeClass('d-none');
        } else if (!thisForm.serializeArray()) {
            thisForm.addClass('d-none');
            thisForm.next().removeClass('d-none');
        }
    });
    
    $('.prev').click(function (e) {
        e.preventDefault();
        var thisForm = $(this).closest('form');
        if (thisForm.valid()) {
            var formId = thisForm.attr('id');
            var templates = $("#" + formId + " div.template");
            if (formId === 'education' || formId === 'experience' || formId === 'projects') {
                var tempList = [];
                for (var i = 0; i < templates.length; i++) {
                    var fields = $(templates[i]).find('.form-control').serializeArray();
                    var fieldObj = {};
                    $.each(fields, function (i, field) {
                        fieldObj[field.name] = field.value;
                    });
                    tempList.push(fieldObj);
                }
                questionnaireObject[formId] = tempList;
            } else {
                questionnaireObject[formId] = {};
                thisForm.serializeArray().map(function (x) {
                    questionnaireObject[formId][x.name] = x.value;
                });
            }
            thisForm.addClass('d-none');
            thisForm.prev().removeClass('d-none');
        } else if (!thisForm.serializeArray()) {
            thisForm.addClass('d-none');
            thisForm.prev().removeClass('d-none');
        }
    });
    /** 
    $('#questionnaireSubmit').click(function (e) {
        e.preventDefault();
        var day = $('#day').val(),
            activity = $('#activity').val(),
            email = localStorage.getItem('email');
        $.ajax({
            method: 'GET',
            contentType: "application/json",
            dataType: 'json',
           // beforeSend: function (xhr) {
            //    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
           // },
            //url: 'http://35.222.173.69/submit',
            //data: JSON.stringify(questionnaireObject),
            data: ({
                'timestamp': Date.now(),
                'user_id':localStorage.getItem('user_id'),
                'activities': activity,
                'days': day
            }),
            success: function (result) {
                if (result) {
                    getAMatch(allMatches, userChosenActivities, userChosenDays);
                    localStorage.setItem("timestamp", Date.now());
                    localStorage.setItem("activities", activity);
                    localStorage.setItem("days", day);
                    window.location.href = 'preview-and-generate.html';
                 alert( localStorage.getItem('activity'))
                }
            },
            error: function (result) {
                alert("Couldn't insert data!")
            }
        })
    });**/
    /**----------------------------- Get Matches-----------------------------**/
    //var day = $('#day').val(),
    //var activity = $('#activity').val();
    //email = localStorage.getItem('email');

    function cartesianProduct(a) { // a = array of array
        var i, j, l, m, a1, o = [];
        if (!a || a.length == 0) return a;
    
        a1 = a.splice(0, 1)[0]; // the first array of a
        a = cartesianProduct(a);
        for (i = 0, l = a1.length; i < l; i++) {
            if (a && a.length) for (j = 0, m = a.length; j < m; j++)
                o.push([a1[i]].concat(a[j]));
            else
                o.push([a1[i]]);
        }
        return o;
    }
    
    function choose(choices) {
      console.log("This:", choices);
      let index = Math.floor(Math.random() * choices.length);
      return choices[index];
    }
    
    function matchesDay(match, day) {
      return match.indexOf(day) > -1;
    }
    
    function matchesActivity(match, activity) {
      return match.indexOf(activity) > -1;
    }
    
    function matchesCriteria(match, day, activity) {
        return matchesDay(match, day) && matchesActivity(match, activity);
    }
    
    function getAMatch(allMatches, requiredActivities, requiredDays) {
      var response = null;
      while (response === null) {
    
        let match = choose(allMatches);
        let allCombinations = cartesianProduct([requiredActivities, requiredDays])
    
        for (pack of allCombinations) {
          let activity = pack[0]
          let day = pack[1]
    
          if (matchesCriteria(match, day, activity)) {
            response = match;
            break;
          }
        }
    
      }
    
      return response;
    }
    
    // let allMatches = localStorage.getItem("allMatches")
    //let allMatches = re('./out.json');
    
    let allMatches = [
        "Go running with Rashmi (rashmi@oregonstate.edu) this sunday!",
        "Go running with Rashmi (rashmi@oregonstate.edu) next sunday!",
        "Go running with Rashmi (rashmi@oregonstate.edu) this saturday!",
        "Go running with Rashmi (rashmi@oregonstate.edu) next saturday!",
        "Go running with Bhavya (bhavya@oregonstate.edu) this sunday!",
        "Go running with Bhavya (bhavya@oregonstate.edu) next sunday!",
        "Go running with Bhavya (bhavya@oregonstate.edu) this saturday!",
        "Go running with Bhavya (bhavya@oregonstate.edu) next saturday!",
        "Go running with Rahul (daminens@oregonstate.edu) this sunday!",
        "Go running with Rahul (daminens@oregonstate.edu) next sunday!",
        "Go running with Rahul (daminens@oregonstate.edu) this saturday!",
        "Go running with Rahul (daminens@oregonstate.edu) next saturday!",
        "Go running with Raghu (raghu@oregonstate.edu) this sunday!",
        "Go running with Raghu (raghu@oregonstate.edu) next sunday!",
        "Go running with Raghu (raghu@oregonstate.edu) this saturday!",
        "Go running with Raghu (raghu@oregonstate.edu) next saturday!",
        "Go running with Vijay (vijay@oregonstate.edu) this sunday!",
        "Go running with Vijay (vijay@oregonstate.edu) next sunday!",
        "Go running with Vijay (vijay@oregonstate.edu) this saturday!",
        "Go running with Vijay (vijay@oregonstate.edu) next saturday!",
        "Go running with Krithika (kk@oregonstate.edu) this sunday!",
        "Go running with Krithika (kk@oregonstate.edu) next sunday!",
        "Go running with Krithika (kk@oregonstate.edu) this saturday!",
        "Go running with Krithika (kk@oregonstate.edu) next saturday!",
        "Go running with Manish (manish@oregonstate.edu) this sunday!",
        "Go running with Manish (manish@oregonstate.edu) next sunday!",
        "Go running with Manish (manish@oregonstate.edu) this saturday!",
        "Go running with Manish (manish@oregonstate.edu) next saturday!",
        "Go running with sndkjfn (wefwekn@gmasi.com) this sunday!",
        "Go running with sndkjfn (wefwekn@gmasi.com) next sunday!",
        "Go running with sndkjfn (wefwekn@gmasi.com) this saturday!",
        "Go running with sndkjfn (wefwekn@gmasi.com) next saturday!",
        "Go hiking with Rashmi (rashmi@oregonstate.edu) this sunday!",
        "Go hiking with Rashmi (rashmi@oregonstate.edu) next sunday!",
        "Go hiking with Rashmi (rashmi@oregonstate.edu) this saturday!",
        "Go hiking with Rashmi (rashmi@oregonstate.edu) next saturday!",
        "Go hiking with Bhavya (bhavya@oregonstate.edu) this sunday!",
        "Go hiking with Bhavya (bhavya@oregonstate.edu) next sunday!",
        "Go hiking with Bhavya (bhavya@oregonstate.edu) this saturday!",
        "Go hiking with Bhavya (bhavya@oregonstate.edu) next saturday!",
        "Go hiking with Rahul (daminens@oregonstate.edu) this sunday!",
        "Go hiking with Rahul (daminens@oregonstate.edu) next sunday!",
        "Go hiking with Rahul (daminens@oregonstate.edu) this saturday!",
        "Go hiking with Rahul (daminens@oregonstate.edu) next saturday!",
        "Go hiking with Raghu (raghu@oregonstate.edu) this sunday!",
        "Go hiking with Raghu (raghu@oregonstate.edu) next sunday!",
        "Go hiking with Raghu (raghu@oregonstate.edu) this saturday!",
        "Go hiking with Raghu (raghu@oregonstate.edu) next saturday!",
        "Go hiking with Vijay (vijay@oregonstate.edu) this sunday!",
        "Go hiking with Vijay (vijay@oregonstate.edu) next sunday!",
        "Go hiking with Vijay (vijay@oregonstate.edu) this saturday!",
        "Go hiking with Vijay (vijay@oregonstate.edu) next saturday!",
        "Go hiking with Krithika (kk@oregonstate.edu) this sunday!",
        "Go hiking with Krithika (kk@oregonstate.edu) next sunday!",
        "Go hiking with Krithika (kk@oregonstate.edu) this saturday!",
        "Go hiking with Krithika (kk@oregonstate.edu) next saturday!",
        "Go hiking with Manish (manish@oregonstate.edu) this sunday!",
        "Go hiking with Manish (manish@oregonstate.edu) next sunday!",
        "Go hiking with Manish (manish@oregonstate.edu) this saturday!",
        "Go hiking with Manish (manish@oregonstate.edu) next saturday!",
        "Go hiking with sndkjfn (wefwekn@gmasi.com) this sunday!",
        "Go hiking with sndkjfn (wefwekn@gmasi.com) next sunday!",
        "Go hiking with sndkjfn (wefwekn@gmasi.com) this saturday!",
        "Go hiking with sndkjfn (wefwekn@gmasi.com) next saturday!",
        "Go drinking with Rashmi (rashmi@oregonstate.edu) this sunday!",
        "Go drinking with Rashmi (rashmi@oregonstate.edu) next sunday!",
        "Go drinking with Rashmi (rashmi@oregonstate.edu) this saturday!",
        "Go drinking with Rashmi (rashmi@oregonstate.edu) next saturday!",
        "Go drinking with Bhavya (bhavya@oregonstate.edu) this sunday!",
        "Go drinking with Bhavya (bhavya@oregonstate.edu) next sunday!",
        "Go drinking with Bhavya (bhavya@oregonstate.edu) this saturday!",
        "Go drinking with Bhavya (bhavya@oregonstate.edu) next saturday!",
        "Go drinking with Rahul (daminens@oregonstate.edu) this sunday!",
        "Go drinking with Rahul (daminens@oregonstate.edu) next sunday!",
        "Go drinking with Rahul (daminens@oregonstate.edu) this saturday!",
        "Go drinking with Rahul (daminens@oregonstate.edu) next saturday!",
        "Go drinking with Raghu (raghu@oregonstate.edu) this sunday!",
        "Go drinking with Raghu (raghu@oregonstate.edu) next sunday!",
        "Go drinking with Raghu (raghu@oregonstate.edu) this saturday!",
        "Go drinking with Raghu (raghu@oregonstate.edu) next saturday!",
        "Go drinking with Vijay (vijay@oregonstate.edu) this sunday!",
        "Go drinking with Vijay (vijay@oregonstate.edu) next sunday!",
        "Go drinking with Vijay (vijay@oregonstate.edu) this saturday!",
        "Go drinking with Vijay (vijay@oregonstate.edu) next saturday!",
        "Go drinking with Krithika (kk@oregonstate.edu) this sunday!",
        "Go drinking with Krithika (kk@oregonstate.edu) next sunday!",
        "Go drinking with Krithika (kk@oregonstate.edu) this saturday!",
        "Go drinking with Krithika (kk@oregonstate.edu) next saturday!",
        "Go drinking with Manish (manish@oregonstate.edu) this sunday!",
        "Go drinking with Manish (manish@oregonstate.edu) next sunday!",
        "Go drinking with Manish (manish@oregonstate.edu) this saturday!",
        "Go drinking with Manish (manish@oregonstate.edu) next saturday!",
        "Go drinking with sndkjfn (wefwekn@gmasi.com) this sunday!",
        "Go drinking with sndkjfn (wefwekn@gmasi.com) next sunday!",
        "Go drinking with sndkjfn (wefwekn@gmasi.com) this saturday!",
        "Go drinking with sndkjfn (wefwekn@gmasi.com) next saturday!",
        "Go biking with Rashmi (rashmi@oregonstate.edu) this sunday!",
        "Go biking with Rashmi (rashmi@oregonstate.edu) next sunday!",
        "Go biking with Rashmi (rashmi@oregonstate.edu) this saturday!",
        "Go biking with Rashmi (rashmi@oregonstate.edu) next saturday!",
        "Go biking with Bhavya (bhavya@oregonstate.edu) this sunday!",
        "Go biking with Bhavya (bhavya@oregonstate.edu) next sunday!",
        "Go biking with Bhavya (bhavya@oregonstate.edu) this saturday!",
        "Go biking with Bhavya (bhavya@oregonstate.edu) next saturday!",
        "Go biking with Rahul (daminens@oregonstate.edu) this sunday!",
        "Go biking with Rahul (daminens@oregonstate.edu) next sunday!",
        "Go biking with Rahul (daminens@oregonstate.edu) this saturday!",
        "Go biking with Rahul (daminens@oregonstate.edu) next saturday!",
        "Go biking with Raghu (raghu@oregonstate.edu) this sunday!",
        "Go biking with Raghu (raghu@oregonstate.edu) next sunday!",
        "Go biking with Raghu (raghu@oregonstate.edu) this saturday!",
        "Go biking with Raghu (raghu@oregonstate.edu) next saturday!",
        "Go biking with Vijay (vijay@oregonstate.edu) this sunday!",
        "Go biking with Vijay (vijay@oregonstate.edu) next sunday!",
        "Go biking with Vijay (vijay@oregonstate.edu) this saturday!",
        "Go biking with Vijay (vijay@oregonstate.edu) next saturday!",
        "Go biking with Krithika (kk@oregonstate.edu) this sunday!",
        "Go biking with Krithika (kk@oregonstate.edu) next sunday!",
        "Go biking with Krithika (kk@oregonstate.edu) this saturday!",
        "Go biking with Krithika (kk@oregonstate.edu) next saturday!",
        "Go biking with Manish (manish@oregonstate.edu) this sunday!",
        "Go biking with Manish (manish@oregonstate.edu) next sunday!",
        "Go biking with Manish (manish@oregonstate.edu) this saturday!",
        "Go biking with Manish (manish@oregonstate.edu) next saturday!",
        "Go biking with sndkjfn (wefwekn@gmasi.com) this sunday!",
        "Go biking with sndkjfn (wefwekn@gmasi.com) next sunday!",
        "Go biking with sndkjfn (wefwekn@gmasi.com) this saturday!",
        "Go biking with sndkjfn (wefwekn@gmasi.com) next saturday!"
      ];
      
    let userChosenActivities = ["biking","running"];
    let userChosenDays = ["this saturday"];

    console.log(getAMatch(allMatches, userChosenActivities, userChosenDays));
    $('#mat').html(getAMatch(allMatches, userChosenActivities, userChosenDays));
    
    /**----------------------------- Questionnaire Related Ends-----------------------------**/
    
    $('#show-template').click(function (e) {
        e.preventDefault();
        
        var queryParams = '?user_id=' + localStorage.getItem('user_id') + '&payload=' + JSON.stringify(questionnaireObject);
        queryParams = queryParams.split(' ').join('%20').split('"').join('%22');
        $.ajax({
            method: 'GET',
            contentType: "application/json",
            dataType: 'json',
           // beforeSend: function (xhr) {
            //    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
            //},
           // url: 'http://35.222.173.69/matches?user_id='+ localStorage.getItem('user_id') ,
            //data: JSON.stringify(questionnaireObject),
            success: function (result) {
                if (result) {
                
                }
            },
            error: function (result) {
                alert("Couldn't insert data!")
            }
        });
        window.location.href = 'select-template.html';
    });
    
    $('#generate-resume').click(function (e) {
        e.preventDefault();
        if(!$('.template-div img.selected').length) {
            alert("Please choose at least one template.");
        } else {
            var templateId = $('.template-div img.selected').attr('id');
            var queryParams = '?user_id=' + localStorage.getItem('user_id') + '&template_code=' + templateId;
            window.location.href = serverURL + 'download' + queryParams;
        }
    });
    
    $('.template-div img').click(function () {
        $('.template-div img').removeClass('selected');
        $(this).addClass('selected');
        //$(this).toggleClass('selected').siblings('img').removeClass('selected');
    });
});