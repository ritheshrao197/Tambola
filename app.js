    (function($){
        $.fn.extend({
            numAnim: function(options) {
                if (!this.length)
                    return false;

                this.defaults = {
                    endAt: 90,
                    numClass: 'autogen-num',
                    duration: 0.1,   // seconds
                    interval: 25  // ms
                };
                var settings = $.extend({}, this.defaults, options);

                var $num = $('<span/>', {
                    'class': settings.numClass 
                });

                return this.each(function() {
                    var $this = $(this);

                    // Wrap each number in a tag.
                    var frag = document.createDocumentFragment(),
                        numLen = settings.endAt.toString().length;
                    for (x = 0; x < numLen; x++) {
                        var rand_num = Math.floor(Math.random() * 10);
                        frag.appendChild($num.clone().text(rand_num)[0]);
                    }
                    $this.empty().append(frag);

                    var get_next_num = function(num) {
                        ++num;
                        if (num > 9) return 0;
                        return num;
                    };

                    // Iterate each number.
                    $this.find('.' + settings.numClass).each(function() {
                        var $num = $(this),
                            num = parseInt($num.text());

                        var interval = setInterval(function() {
                            num = get_next_num(num);
                            $num.text(num);
                        }, settings.interval);

                        setTimeout(function() {
                            clearInterval(interval);
                        }, settings.duration * 1000 - settings.interval);
                    });

                    setTimeout(function() {
                        $this.text(settings.endAt.toString());
                        $("#num-" + settings.endAt).addClass("generated");
                        generated_numbers.push(settings.endAt);
                    }, settings.duration * 1000);
                });
            }
        });
    })(jQuery);

    var generated_numbers = [];

    $(function(){
        for (i = 1; i <= 90; i++) {
            $("<div />").addClass("num").html(i).attr("id", "num-" + i).appendTo("#grid-container");
        }

        var cw = $('.num').width();
        $('.num').css({'height':cw+'px','line-height':cw+'px'});
    });

    function generateNum() {
        if (generated_numbers.length == 90) {
            alert("Full House!");
            return;
        }

        var enteredNumber = parseInt(document.getElementById("manualNumber").value);

        if (isNaN(enteredNumber) || enteredNumber < 1 || enteredNumber > 90) {
            alert("Please enter a valid number between 1 and 90.");
            return;
        }

        if ($.inArray(enteredNumber, generated_numbers) == -1) {
            $("#number").numAnim({
                endAt: enteredNumber
            });

            generated_numbers.push(enteredNumber);
        } else {
            alert("Number " + enteredNumber + " is already generated!");
        }
    }
    $(document).ready(function () {
        // Initial theme setting based on user preference
        if (localStorage.getItem('theme') === 'dark') {
            $('#stylesheet').attr('href', 'dark.css');
            $('#themeCheckbox').prop('checked', true);
        }
    
        // Toggle theme on checkbox change
        $('#themeCheckbox').change(function () {
            if (this.checked) {
                $('#stylesheet').attr('href', 'dark.css');
                localStorage.setItem('theme', 'dark');
            } else {
                $('#stylesheet').attr('href', 'style.css');
                localStorage.setItem('theme', 'light');
            }
        });
    });
    