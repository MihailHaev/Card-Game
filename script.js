'use strict'


function refresh(cradsWhatFlipped, whatRemove) {
	for(let i = 0; cradsWhatFlipped.length > i; i++) {

		cradsWhatFlipped[i].classList.remove(whatRemove.flip);
		cradsWhatFlipped[i].classList.remove(whatRemove.cardBad);
		cradsWhatFlipped[i].classList.remove(whatRemove.cardGood);
	}
	document.getElementById('retry').innerHTML = '';
	document.getElementById('result').innerHTML = '';
	document.getElementById('modal').style.display = 'none';
}

function gameStart(settings, time) {
	let allCards = document.getElementById(settings.cardsId),
	arrayOfCards = document.getElementsByClassName(settings.card),
	arrayOfEmoji = generateEmojiList(arrayOfCards.length),
	twoFlip = [],
	lastElemnt = 0,
	timesId,
	gameStarted = false,
	timerName = document.getElementById('timer');
	function listener(event)  {
		console.log('Клик')
		if(event.target.classList.contains(settings.card) && !event.target.classList.contains(settings.cardGood) &&
		 !event.target.classList.contains(settings.cardBad)) {
		 	console.log('Клик через барьер')
		 	if(!gameStarted) {
		 	 timesId = timer();
		 	 gameStarted = true;
		 	}
		 	
			event.target.classList.toggle(settings.flip);
			console.log(settings.flip);
			if(document.getElementsByClassName(settings.cardBad).length == 2) {
				twoFlip[0].classList.remove(settings.flip);
				twoFlip[0].classList.remove(settings.cardBad);
				twoFlip[1].classList.remove(settings.flip);
				twoFlip[1].classList.remove(settings.cardBad);
			}
			else if( (document.getElementsByClassName(settings.flip).length - document.getElementsByClassName(settings.cardGood).length)
			 == 2) {
				twoFlip = [event.target, lastElemnt];
				if(twoFlip[1].dataset.emoji == twoFlip[0].dataset.emoji && twoFlip[0] != twoFlip[1]) {
					twoFlip[0].classList.add(settings.cardGood);
					twoFlip[1].classList.add(settings.cardGood);
					console.log(arrayOfCards.length);
					console.log(document.getElementsByClassName(settings.cardGood).length);
					if (document.getElementsByClassName(settings.cardGood).length == arrayOfCards.length) {
						
						endgameWin(timesId);
					}
				}
				else if(twoFlip[0] != twoFlip[1]){
					twoFlip[0].classList.add(settings.cardBad);
					twoFlip[1].classList.add(settings.cardBad);
					
				}
				
			}
		
			lastElemnt = event.target;

		}
	}
	refresh(arrayOfCards, settings);

	arrayOfEmoji.forEach((element, index) => {
		arrayOfCards[index].dataset.emoji = element;
	});


	timerName.innerHTML = changetime();
	function timer() {
	var timeMs=time*1000;

	var timeIntervalId = setInterval(function() {
		
			time = time - 1;
			
		timerName.innerHTML = changetime();
	}, 1000);
	var timeOutId = setTimeout(function() {

		 clearInterval(timeIntervalId);
		endgame();
	}, timeMs);
	return [timeIntervalId, timeOutId]
}


function changetime() {
		let minutes = Math.floor(time/60);
		if(minutes < 10) minutes = '0' + minutes;
		let seconds = time%60;
		if (seconds < 10) seconds = '0' + seconds;
		return minutes + ':' + seconds;
	
}

	allCards.addEventListener('click', listener, true);
	return [settings, timer];

	function endgame() {
		allCards.removeEventListener('click', listener, true);
	NameOfWord('Lose');
	document.getElementById('retry').innerHTML = 'Try again';
	document.getElementById('modal').style.display = 'block';

}


function endgameWin(timesIds) {
	allCards.removeEventListener('click', listener, true);
	clearInterval(timesIds[0]);
	clearTimeout(timesIds[1]);
	NameOfWord('Win');
	document.getElementById('retry').innerHTML = 'Play again';
	document.getElementById('modal').style.display = 'block';
}

}


function generateEmojiList(length) {
	let PosebleEmojes = [
'🐶',
 '🐱',
  '🐭',
   '🐹',
    '🐰',
     '🐻',
      '🐼',
       '🐨',
        '🐯',
         '🦁',
          '🐮',
           '🐷',
            '🐸',
             '🐙',
              '🐵',
               '🦄',
                '🐞',
                 '🦀',
                  '🐟',
                   '🐊',
                    '🐓',
                     '🦃'
];
	let emojes;


PosebleEmojes.sort(function () {
  return Math.random() - 0.5;
}).length = length/2;
emojes = PosebleEmojes.concat(PosebleEmojes);
emojes.sort(function () {
  return Math.random() - 0.5;
});
	return emojes;
}





function NameOfWord(word) {
	for(var i = 0; i < word.length; i++) {
		 var newSpan = document.createElement('span');
  newSpan.innerHTML = word[i];
  result.appendChild(newSpan);
	}
}



