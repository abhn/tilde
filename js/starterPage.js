;
(function() {

    var d = new Date();
    var day = d.getDay();
    var month = d.getMonth();
    var year = d.getFullYear();

    //Changes the backgroud to a random color
    //hex codes obtained from https://www.materialui.co/colors
    var allColors = ['#212121', '#263238', '#455A64', '#5D4037', '#607D8B', '#424242', '#3E2723', '#424242', '#616161', '#34495e', '#4B0082', '#483D8B', '#008B8B', '#191970', '#696969', '#808000', '#008B8B'];

    var randColor = allColors[Math.floor(Math.random() * allColors.length)];

    document.body.style.backgroundColor = randColor;

    var Clock = {
        el: document.getElementById('js-time'),

        init: function() {
            Clock.setTime();
            setInterval(Clock.setTime, 1000);
        },

        zeros: function(num) {
            return ('0' + num.toString()).slice(-2);
        },

        setTime: function() {
            var date = new Date();
            var hours = Clock.zeros(date.getHours());
            var minutes = Clock.zeros(date.getMinutes());
            var time = hours + ' ' + minutes;
            Clock.el.innerHTML = time;
        }
    };

    var Cmdr = {
        searchForm: document.getElementById('js-search'),
        searchText: document.getElementById('js-search-text'),
        searchHelp: document.getElementById('js-help'),

        init: function(opts) {
            Cmdr.default = opts.default;
            Cmdr.commands = opts.commands;
            Cmdr.searchForm.addEventListener('submit', Cmdr.search, false);
        },

        search: function(e) {
            var q = Cmdr.searchText.value;
            if (q){
                q = q.toLowerCase();
            }

            if (q === '?') {
                Cmdr.commands.forEach(function(command) {
                    Cmdr.searchHelp.innerHTML += command.key + ': ' + command.name + '\n';
                });

                Cmdr.searchHelp.style.height = 150 + 'px';
                Cmdr.searchText.value = '';
            } else {
                q = q.split(':');
                Cmdr.location = Cmdr.default+encodeURIComponent(q);

                Cmdr.commands.forEach(function(command) {
                    if (q[0] === command.key) {
                        Cmdr.location = command.url;

                        if (q[1] && command.search) {
                            q.shift();
                            var searchText = encodeURIComponent(q.join(':').trim());
                            Cmdr.location = command.url + command.search + searchText;
                        }
                    }
                });

                //open the command in a new tab
                window.open(Cmdr.location, '_blank');
            }

            e.preventDefault();
        }
    };


    // dodo mods

    //array shuffler 
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }


    // Fuck callbacks



    // //quote parser
    // var quoteParser = function(currQuote){
    //     var quote_arr = currQuote.split('-')
    //     var return_quote = '';
    //     var author = 'Anon';

    //     if (quote_arr.length > 1){
    //         author = quote_arr.pop()
    //         console.log(author);    
    //     }

    //     var first_elem = quote_arr[0];
    //     first_elem = '<i>"' + first_elem;
    //     quote_arr[0] = first_elem;

    //     if (quote_arr.length > 1){
    //         var last_elem = quote_arr[-1];
    //         last_elem = last_elem + '</i>" - ';
    //         quote_arr[-1] = last_elem;
    //         return_quote = quotes_arr.join(' ');
    //     }
    //     else{
    //         return_quote = quote_arr.join(' ') + '"</i>" - '
    //     }

    //     return_quote += author;
    //     console.log(return_quote);
    //     return return_quote;
    // };

    //greeting message based on local time
    var greetingMessage = function() {
        var curr_date = new Date();
        var hours = curr_date.getHours();
        var curr_hour = parseInt(hours);

        if (12 > curr_hour && curr_hour >= 5) {
            var morningMessages = ["Rise and Shine", "Early bird catches the.."];
            selectedPeriod = morningMessages;
        } else if (16 > curr_hour && curr_hour >= 12) {
            var afternoonMessages = ['Time for a siesta!', 'Power Nap!'];
            selectedPeriod = afternoonMessages;
        } else if (22 > curr_hour && curr_hour >= 16) {
            var eveningMessages = ['Good evening.', 'What\'s cookin\' for dinner?'];
            selectedPeriod = eveningMessages;
        } else if (22 >= curr_hour || (curr_hour > 0 && curr_hour <= 5)) {
            var sleepMessages = ['You should probably go to bed...', 'Staying up late is not a healthy habit'];
            selectedPeriod = sleepMessages;
        }

        var randGreet = selectedPeriod[Math.floor(Math.random() * selectedPeriod.length)];
        document.getElementById("displayGreeting").innerHTML = randGreet;
    };



    //logic to generate quotes
    var populateQuote = function() {

        //read quotes from quotes.txt into an array
        var allQuotes = [];
        var filename = 'data/quotes.txt';

        $.get(filename, function(data) {

            allQuotes = data.split('\n');
            var quote_start = '<i>“';
            var quote_end = '”</i> ~ ';

            for (var i = allQuotes.length - 1; i >= 0; i--) {

                var quote_arr = allQuotes[i].split('-')
                var return_quote = '';
                var author = 'Anon';

                if (quote_arr.length > 1) {
                    author = quote_arr.pop()
                }

                var first_elem = quote_arr[0];
                first_elem = quote_start + first_elem;
                quote_arr[0] = first_elem;

                if (quote_arr.length > 1) {
                    var last_elem = quote_arr[-1];
                    last_elem = last_elem + quote_end;
                    quote_arr[-1] = last_elem;
                    return_quote = quote_arr.join(' ');
                } else {
                    return_quote = quote_arr.join(' ') + quote_end;
                }

                return_quote += author;
                allQuotes[i] = return_quote;
            }

            var shuffledQuotes = shuffle(allQuotes);

            $(".displayQuote").typed({
                strings: shuffledQuotes,
                typeSpeed: 0,
                backSpeed: 0,
                backDelay: 5000,
                loop: true,
                showCursor: true,
                // character for cursor
                cursorChar: "|",

            }); //typed.js

        }); //get
    };

    greetingMessage();
    populateQuote();
    Clock.init();
    Cmdr.init({
        default: 'https://www.google.com/search?q=',
        commands: [{
            key: 'amazon',
            name: 'Amazon',
            url: 'https://www.amazon.in',
            search: '/s/?field-keywords='
        }, {
            key: 'g',
            name: 'GitHub',
            url: 'https://github.com',
            search: '/search?q='
        }, {
            key: 'gt',
            name: 'GitHub Trending',
            url: 'https://github.com/trending',
            search: '/search?q='
        }, {
            key: 'gmail',
            name: 'Gmail',
            url: 'https://mail.google.com/mail/u/1',
            search: '/#search/'
        }, {
            key: 'r',
            name: 'Reddit',
            url: 'https://www.reddit.com',
            search: '/r/'
        }, {
            key: 'scloud',
            name: 'Soundcloud',
            url: 'https://soundcloud.com',
            search: '/search?q='
        }, {
            key: 'yt',
            name: 'YouTube',
            url: 'https://www.youtube.com',
            search: '/results?search_query='
        }, {
            key: 'p',
            name: 'Product Hunt',
            url: 'https://www.producthunt.com',
            search: '/search?q='
        }, {
            key: 'dd',
            name: 'DuckDuckGo',
            url: 'https://www.duckduckgo.com',
            search: '/search?q='
        },  {
            key: '3',
            name: 'localhost:3000',
            url: 'http://http://localhost:3000/'
        }, {
            key: '8',
            name: 'localhost:8000',
            url: 'http://localhost:8000/'
        },]
    });
}());