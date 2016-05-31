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
    console.log(randColor);

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
            var time = hours + ':' + minutes;
            console.log(hours);
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

    var greetingMessage = function() {
        var curr_date = new Date();
        var hours = curr_date.getHours();
        console.log("Greeting Message");
        console.log(hours);
        var curr_hour = parseInt(hours);

        if (12 > curr_hour && curr_hour >= 5) {
            var morningMessages = ["Rise and Shine"];
            console.log("Morning");
            selectedPeriod = morningMessages;
        } else if (16 > curr_hour && curr_hour >= 12) {
            var afternoonMessages = ['Time for a siesta!'];
            console.log("Aftnoon");
            selectedPeriod = afternoonMessages;
        } else if (22 > curr_hour && curr_hour >= 16) {
            var eveningMessages = ['Good evening.'];
            console.log("evening");
            selectedPeriod = eveningMessages;
        } else if (22 >= curr_hour || (curr_hour > 0 && curr_hour <= 5)) {
            var sleepMessages = ['You should probably go to bed...'];
            console.log("You should sleep!")
            selectedPeriod = sleepMessages;
        }

        var randGreet = selectedPeriod[Math.floor(Math.random() * selectedPeriod.length)];
        document.getElementById("displayGreeting").innerHTML = randGreet;
    };

    var populateQuote = function() {
        var allQuotes = [
            'Life is chess, not checkers. - Pvk',
            'A man cannot build a reputation on what he is going to do. - Henry Ford'
        ];
        var allQuotes = ['<i>"Your life is ending one minute at a time. If you were to die tomorrow, what would you do today?"</i> - Chuck Palahnuik',
            '<i>"It is never to late to become what you never were."</i> - Anon',
            '<i>"The future will only contain what we put into it now."</i> - Anon'
        ]
        var shuffledQuotes = shuffle(allQuotes);
        $(".displayQuote").typed({
            strings: shuffledQuotes,
            typeSpeed: 0,
            backSpeed: 1,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            // character for cursor
            cursorChar: "|",
        });

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
            key: 'twitter',
            name: 'Twitter',
            url: 'https://twitter.com',
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
        }, ]
    });
}());
