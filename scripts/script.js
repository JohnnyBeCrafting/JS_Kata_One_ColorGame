(function(){
    // Aghghgh what do I do with all these global variables? I heard that globals are bad.
    //Why did I wrap this up in an IIFE? I've seen IIFE's in other codebases like libraries...

    // Some global variables
    var easyMode = 3;
    var hardMode = 6;
    var squares = document.querySelectorAll('.square');
    var reloadBtn = document.getElementById('reload');
    var bgText = document.getElementById('backgroundColor');
    var responseText = document.getElementById('response-text');
    var banner = document.querySelector('.banner');
    var modeButtons = document.querySelectorAll('.mode');
    var colorArr;
    var easy = 'easy';
    var defaultMode = 'hard';
    var pickedColor;

    init();

    function init(){
        playGame(defaultMode);
    }

    reloadBtn.addEventListener('click', function(){
        reset();
        init();
    });


    function resetBGColor(bgColor){
        banner.style.backgroundColor = bgColor;
    }

    //Include event listener for the "easy" and "hard" buttons
    for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener('click', function(){
            if(this.value === 'easy_mode'){
                reset();
                playGame(easy);
            }else{
                reset();
                playGame(defaultMode);
            }
        });
    }

    function playGame(mode){
        if(mode === 'easy'){
            colorArr = createColorArr(easyMode);
            pickedColor = selectColor();
            for(var i = 0; i < squares.length; i++){
                if(colorArr[i]){
                    squares[i].style.display = "block";
                    squares[i].style.background = colorArr[i];
                } else {
                    squares[i].style.display = "none";
                }
            }
            paintSquares();
            gameLogic();
            displayColor(pickedColor);
        }else{
            colorArr = createColorArr(hardMode);
            pickedColor = selectColor();
            console.log('hard mode color arr', colorArr);
            console.log('hard mode picked color', pickedColor);
            //paint the square (fn call)
            for(var i = 0; i < squares.length; i++){
                squares[i].style.display = 'block';
                squares[i].style.background = colorArr[i];
            }
            paintSquares();
            gameLogic();
            displayColor(pickedColor);
        }

        function generateColor(){
            var rgb = '';
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            rgb += "rgb(" + r + ", " + g + ", " + b +")";
            return rgb;
        }
        
        function createColorArr(amt){
            var colorsArr = [];
            for(var i = 0; i < amt; i++){
                colorsArr.push(generateColor());
            }
            return colorsArr;
        }
        
        function selectColor(){
            var randomIndex = Math.floor(Math.random() * colorArr.length);
            console.log(randomIndex);
            return colorArr[randomIndex];
        }
    
        function paintSquares(){
            for(let i = 0; i < squares.length; i++){
                squares[i].style.backgroundColor = colorArr[i];
            }
        }
        function gameLogic(){
            for(let i = 0; i < squares.length; i++){
                squares[i].addEventListener('click', function(){
                    var clickedColor = this.style.backgroundColor;
                    if(clickedColor === pickedColor){
                        victory();
                    }else{
                        defeat(this);
                    }
                });
            }
        }

        function displayColor(color){
            bgText.innerHTML = color;
        }

        function victory(){
            displayWinningColor(pickedColor);
            displayWinningBannerColor(pickedColor);
            responseText.innerHTML = 'Correct!';
        }
        function defeat(square){
            responseText.innerHTML = "Try again";
            square.style.opacity = '0';
        }

        function displayWinningBannerColor(color){
            banner.style.backgroundColor = color;
        }
        function displayWinningColor(color){
            for(var i = 0; i < squares.length; i++){
                squares[i].style.backgroundColor = color;
                squares[i].style.opacity = '1';
            }
        }
    
    }
    function reset(){
        resetBGColor('#ff0066');
        responseText.innerHTML = '';
        for(var i = 0; i < squares.length; i++){
            squares[i].style.opacity = '1';
        }
        // playGame(defaultMode);
    }
})();
