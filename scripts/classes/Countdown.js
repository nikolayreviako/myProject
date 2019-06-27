class Countdown{
	constructor(encodedBlockedUserInfo){	
		this.blockedUserInfo = encodedBlockedUserInfo;
		this.countdownElement = this.getCountdownElement();
	}
	//получаем элемент отсчёта в дереве;
	getCountdownElement(){
		return document.querySelectorAll('span.countdownElement')[0];
	}
	//заменяем содержимое элемента отсчёта;
	chaneCountdownElementContent(elContent){
		var elTextNode = this.countdownElement.firstChild,
		addTextNode = false;
		if (!elTextNode){
			addTextNode = true;
		}else if (elTextNode && elTextNode.nodeType != 3){
			addTextNode = true;
		}
		if (addTextNode){
			this.countdownElement.appendChild(document.createTextNode(''));
		}
		this.countdownElement.firstChild.nodeValue = elContent;	
	}
	//общий метод обновления элемента отсчёта;
	updateCountdownElement(){
		var self = this;	
		jQuery.post(
			'serverPart/serverCountdown.php',
			{blockedUserInfo: JSON.stringify(this.blockedUserInfo)},
			function(answer){				
				var waitingTimeStr = JSON.parse(answer);
				if (self.checkOnNullOrLessThanZero(waitingTimeStr)){
					self.chaneCountdownElementContent('Дождались! перезагружаемся.');
					window.setTimeout(function(){
						location.href = 'testA.php';
					},1000);
					
				}else{
					self.chaneCountdownElementContent(waitingTimeStr);				
					window.setTimeout(function(){
						self.updateCountdownElement();
					},1000);					
				}

			}
		);
	}
	//проверяем строку времени на предмет значения, которое меньше, или равно нулю;
	checkOnNullOrLessThanZero(numStr){
		var regularExpression = /[0-9\-]{1,1}/img,
		result = numStr.match(regularExpression),
		num = '';
		for (var i = 0; i < result.length; i++){
			num += result[i];
		}
		num = Number(num);
		if (num <= 0){
			return true;
		}
	}
}







