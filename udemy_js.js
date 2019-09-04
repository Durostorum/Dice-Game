/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var scores, roundScore, activePlayer, isPlaying, lastDice, goalScore;

restartGame()
function restartGame() {
document.querySelector('.dice').style.display = 'none'
document.getElementById('score-0').textContent = 0;
document.getElementById('score-1').textContent = 0;
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';
document.querySelector('.btn-roll').style.display = 'block';
document.querySelector('.btn-hold').style.display = 'block';
activePlayer = 0;
document.querySelector('.player-'+activePlayer+'-panel').classList.add('active')
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
roundScore = 0
isPlaying = true;
goalScore = 20;

}
document.querySelector('.btn-roll').addEventListener('click', function (){
    if(isPlaying){
        dice = Math.floor(Math.random() * 6) +1;
        round = document.querySelector('#current-' + activePlayer);
        round.textContent = parseFloat(dice)
        document.querySelector('.dice').style.display = 'block';
        var dicePic = document.querySelector('.dice');
        dicePic.src = 'dice-' + dice + '.png';

        if (lastDice == 6 && dice == 6){
            document.getElementById('score-' + activePlayer).textContent = 0;
            console.log("two sixes")
            nextPlayer()

        }else if (dice > 1){
            roundScore += dice
            round.textContent = roundScore;
            
            
        } else {
            console.log("draw 1")
           nextPlayer()
        }
        lastDice=dice;
    }
        
       
})

var hold = document.querySelector('.btn-hold');
function nextPlayer () {
    roundScore = 0;
    round.textContent = 0;
    activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active')
    document.querySelector('.dice').style.display = 'none'
}
hold.addEventListener('click', function() {
    if(isPlaying){
        var total = document.getElementById('score-'+activePlayer);
        totalNow= document.querySelector('#current-' + activePlayer).textContent;
        total.textContent = parseFloat(totalNow) + parseFloat(total.textContent)

        document.getElementById('submit-score').addEventListener('click', function(e) {
            e.preventDefault();
            
            goalScore = document.getElementById('goalScore').value
            console.log(goalScore)
          
          
        })
        if (total.textContent >= goalScore){
            document.querySelector('#name-'+activePlayer).textContent = "Winner!"
            document.querySelector('.dice').style.display = 'none';
           
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            isPlaying = false;
            console.log(winner)   
        
            //restartGame()
        }
        nextPlayer()
    }
})
var restartBtn = document.querySelector('.btn-new');
restartBtn.addEventListener('click', restartGame)


document.getElementById('submit-score').addEventListener('click', function(e) {
    e.preventDefault();
    round = document.querySelector('#current-' + activePlayer)
    
    goalScore = document.getElementById('goalScore').value
    console.log(goalScore)
  
  
})