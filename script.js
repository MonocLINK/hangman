$(function() {
    $("#startGameButton").click(startGame);

    function startGame() {

        // vars
        var wordOutput = [] // underscores and letters
        var runs; // handles not subtracting a bunch of lives

        // handle generating a random word
        var MAX_LENGTH = 12;
        var MIN_LENGTH = 8;
        var wordLengthRestriction = Math.floor(Math.random() * (MAX_LENGTH - MIN_LENGTH + 1)) + MIN_LENGTH;
        var word = Word_List.getRandomWord(wordLengthRestriction); // actually generates word
        var uniq = String.prototype.concat(...new Set(word)); // unique string, used to handle num of guesses

        // TO CHEAT AND TEST IF THIS WORKS UNCOMMENT THIS LINE //
        //console.log(word);

        // handle guesses
        var guesses = uniq.length + 6; // only length of unique values as guessing fills in all instances of that char, 6 incorrect guesses

        // have all underscores for the word output
        for (var i = 0; i < word.length; i++) {
            wordOutput.push(" _");
        }

        // display info
        $("#guessesNumber").text(guesses); // guesses
        $("#wordOutput").text(wordOutput.join("")); // word

        // check if letter is correct and check for win
        $("#letterInput").keyup(guessLetter);
        $("#letterInput").keydown(checkIfWin);

        // show appropriate screen
        $("#playScreen").show();
        $("#startGameScreen").hide();

        // check if letter is in array
        function guessLetter(event) {
            var letter = $("#letterInput").val();
            if ($("#letterInput").is(":focus") && event.key == "Enter") { // on enter press
                $("#letterInput").val("");
                runs = false; // handles not subtracting a bunch of lives
                if (letter.length === 1) { // input has to be 1 length
                    for (var i = 0; i < word.length; i++) {
                        if (word[i] === letter) { // correct guess
                            wordOutput[i] = letter;
                            $("#wordOutput").text(wordOutput.join("")); // word
                        } else if (!runs) { // correct guess
                            guesses--;
                            $("#guessesNumber").text(guesses);
                            runs = true;
                        }
                    }
                } else { // not single input
                    $("#errorText").show().html("You must enter a single letter").delay(1000).fadeOut("slow");
                }
            }
        }

        // check if user wins
        function checkIfWin() {
            if (wordOutput.join("").includes(word)) { // if word in array wordoutput, win
                winGame();
            }
            if (guesses <= 0) { // if you run out of guesses, lose
                loseGame();
            }
        }

        function winGame() { // show screen and output
            $("#playScreen").hide();
            $("#winLoseScreen").show();
            $("#winLoseOutput").text(`Congrats! You Win! Your word was "${word}"`);
        }

        function loseGame() { // show screen and output
            $("#playScreen").hide();
            $("#winLoseScreen").show();
            $("#winLoseOutput").text(`Unfortunate. You couldn't spell "${word}"`);
        }
    }



});