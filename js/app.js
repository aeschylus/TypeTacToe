(function() {
    'use strict'
    var Utils = {
        store : function( name, record ) {
            if ( arguments.length > 1) {
                return localStorage.setItem( name, JSON.stringify( record ) );
            }
            else {
                var store = localStorage.getItem( name );
                return ( store && JSON.parse( store ) ) || [];
            }
        }

    }; 
    var App = {
        init : function() {
            this.player = 2;
            this.playerSymbol = this.player === 1 ? 'X' : 'O';
            this.gameState = Utils.store('gameState');
            this.defineElements();
            this.bindEvents();
            console.log(App.gameState);
            this.render();
        },
        defineElements : function() {
            this.$square = $('td');
            this.$gameOver = $('#gameOver');
            this.$gameOverText = this.$gameOver.find('p');
        },
        bindEvents : function() {
            this.$square.on('click', App.move);
        },
        togglePlayer : function() {
            if (App.player === 1 ) {
                App.player = 2;
                App.playerSymbol = App.player === 1 ? 'X' : 'O';
            } else {
                App.player = 1;
                App.playerSymbol = App.player === 1 ? 'X' : 'O';
            }
        },
        render : function () {
            this.$square.each(function(i){
                var ownerMap = ["", "X", "O"];
                var squareOwner = ownerMap[App.gameState[i]];

                $(this).text(squareOwner);
            });
            App.gameOverTest()
        },
        move : function() {
            var squareChosen = App.$square.index($(this));
            App.gameState[squareChosen] = App.player;
            Utils.store('gameState', App.gameState);
            App.render();
            App.togglePlayer();
        },
        gameOverTest : function() {
            var gameOverStates = [
                [0, 4, 8],
                [2, 4, 6],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8]
            ];

            for ( var i = 0; i < gameOverStates.length; i++ ) {

                var a = gameOverStates[i][0],
                b = gameOverStates[i][1],
                c = gameOverStates[i][2];

                console.log("state:"+"["+a +", "+b+", "+ c+"]");

                console.log("owners"+ App.gameState[a] +", "+ App.gameState[b] +", "+App.gameState[c] );
                console.log(App.gameState[a] === App.gameState[b] &&  App.gameState[b] === App.gameState[c] );
                if ( App.gameState[a] === App.gameState[b] &&  App.gameState[b] === App.gameState[c] && App.gameState[a] !== 0 ) {
                    console.log('someone got 3 in a row');
                    if ( App.gameState[a] === App.player ) {
                        return App.win();
                    } else if ( App.gameState[a] !== App.player ) {
                        return App.lose();
                    };
                };
            };
            console.log(App.drawTest());
            if ( App.drawTest() ) {
                return App.draw();
            }
        },
        drawTest : function() {
            var draw;
            for ( var j = 0; j < App.gameState.length; j++ ) {
                if ( App.gameState[j] === 0 ) { 
                    return false; 
                    break;
                } else {
                    draw = true;
                };
            };
            return draw
        },
        lose : function() {
            App.$gameOver.addClass('lose');
            App.$gameOverText.text( App.playerSymbol + ' Lost' );
            App.$gameOver.show();
        },
        win : function() {
            App.$gameOver.addClass('win');
            App.$gameOverText.text( App.playerSymbol + ' Wins' );
            App.$gameOver.show();
        },
        draw : function() {
            App.$gameOver.addClass('draw');
            App.$gameOverText.text( 'Draw!' );
            App.$gameOver.show();
        }
    };
    Utils.store('gameState', [0,0,0, 0,0,0, 0,0,0]);

    $(function(){
        App.init();
    })
})();
