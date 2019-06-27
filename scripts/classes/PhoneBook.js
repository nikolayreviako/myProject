class PhoneBook{
	constructor(startingData){
	//	localStorage.clear(); //очистка хранилища перед началом работы скрипта;
	//	delete localStorage.beginningContactsAdded; //если true, значит начальные 
	//	данные уже добавлены из скрипта в хранилище;			 	
		this.photoFolder = 'usersInfo';
		this.photoFormat = 'jpg';
		this.addContactButton = document.querySelectorAll('.phoneBook thead .addNewContact')[0];
		this.nameInput = document.querySelectorAll('.phoneBook thead input[type = \'text\'][name = \'name\']')[0];
		this.phoneInput = document.querySelectorAll('.phoneBook thead input[type = \'text\'][name = \'phone\']')[0];
		this.contactsContainer = document.querySelectorAll('.phoneBook tbody')[0];
		this.addContactButton.phoneBook = this;	
		this.addContactButton.onclick = this.addNewContact;
		if (!localStorage.currentContactsId){
			localStorage.currentContactsId = 1;
		}
		if (!localStorage.contacts){		
			localStorage.contacts = JSON.stringify({});
		}	
		this.contacts = localStorage.contacts;
		this.addBeginningDataToLocalStorage(startingData);
		this.showContactsFromStorage();
	//	console.log(this.findContactWithName(122));
	}	
	//отображаем контакты из хранилища;
	showContactsFromStorage(){
		var contacts = JSON.parse(localStorage.contacts);
		for (var propName in contacts){
			this.addNewContactElement([
				propName,
				contacts[propName][0],
				contacts[propName][1],
				contacts[propName][2],
			]);
		}
	}
	//добавляем новый контакт;
	//обработчик кнопки;
	addNewContact(){
		//очистить поля от индикатора ошибок;
		var contactInfo = this.phoneBook.getContactInfoFromForm();
		if (contactInfo){
			this.phoneBook.addNewContactToStorage(contactInfo);
			this.phoneBook.addNewContactElement(contactInfo);
			this.phoneBook.clearinputs();	
		}else{
			//отобразить ошибку;	
		}
	}
	//удаляем контакт;
	//обработчик кнопки;
	deleteContact(){
		this.phoneBook.deleteContactFromStorage(this);
		this.phoneBook.deleteContactElement(this);
	}
	//редактируем контакт;
	//обработчик кнопки;
	editContact(){
		var tr = jQuery(this).closest('tr')[0],
		mainActions = tr.querySelectorAll('ul.mainActions')[0],
		editActions = tr.querySelectorAll('ul.editActions')[0],
		br = tr.querySelectorAll('.actionButtons br')[0];
		mainActions.style.display = 'none';
		editActions.style.display = 'inline-block';		
		br.style.display = 'none';
		this.phoneBook.transformContactParagraphsToInputs(tr);
	}	
	//скрываем и отображаем необходимые кнопки при подтверждении/отмене редактирования;
	displayAndHideNecessaryButtonsLists(button){
		var tr = jQuery(button).closest('tr')[0],
		mainActions = tr.querySelectorAll('ul.mainActions')[0],
		editActions = tr.querySelectorAll('ul.editActions')[0],
		br = tr.querySelectorAll('.actionButtons br')[0];
		mainActions.style.display = '';
		editActions.style.display = '';		
		br.style.display = '';		
	}
	//преобразуем параграфы информации контакта в поля;
	transformContactParagraphsToInputs(tr){
		var namePar = tr.querySelectorAll('p.name')[0],
		phonePar = tr.querySelectorAll('p.phone')[0],
		nameParVal = namePar.firstChild.nodeValue,
		phoneParVal = phonePar.firstChild.nodeValue;	
		var nameInput = document.createElement('INPUT'),
		phoneInput = document.createElement('INPUT');
		nameInput.setAttribute('data-originalInfo',namePar.firstChild.nodeValue);
		phoneInput.setAttribute('data-originalInfo',phonePar.firstChild.nodeValue);
		namePar.parentNode.removeChild(namePar);
		phonePar.parentNode.removeChild(phonePar);			
		var dataTd = tr.querySelectorAll('td.data')[0];		
		dataTd.appendChild(document.createElement('P'));
		dataTd.appendChild(document.createElement('P'));
		dataTd.querySelectorAll('p:first-of-type')[0].appendChild(nameInput);
		dataTd.querySelectorAll('p:nth-of-type(2)')[0].appendChild(phoneInput);
		nameInput.setAttribute('value',nameParVal);
		phoneInput.setAttribute('value',phoneParVal);
	}
	//преобразуем поля информации контакта в параграфы;
	transfromContactInputsToParagraphs(tr,originalData){
		var contactParagraphs = tr.querySelectorAll('td.data p'),
		nameInput = contactParagraphs[0].querySelectorAll('input')[0],
		phoneInput = contactParagraphs[1].querySelectorAll('input')[0],
		nameInputVal = nameInput.value,
		phoneInputVal = phoneInput.value;
		nameInput.parentNode.removeChild(nameInput);
		phoneInput.parentNode.removeChild(phoneInput);
		var dataTd = tr.querySelectorAll('td.data')[0];
		dataTd.appendChild(document.createElement('P'));
		dataTd.appendChild(document.createElement('P'));	
	//	dataTd.querySelectorAll('p:first-of-type')[0].appendChild(document.createTextNode(nameInputVal));
	//	dataTd.querySelectorAll('p:nth-of-type(2)')[0].appendChild(document.createTextNode(phoneInputVal));		
		dataTd.querySelectorAll('p:first-of-type')[0].appendChild(document.createTextNode(originalData ? nameInput.getAttribute('data-originalInfo') : nameInputVal));
		dataTd.querySelectorAll('p:nth-of-type(2)')[0].appendChild(document.createTextNode(originalData ? phoneInput.getAttribute('data-originalInfo') : phoneInputVal));		
		dataTd.querySelectorAll('p:first-of-type')[0].classList.add('name');
		dataTd.querySelectorAll('p:nth-of-type(2)')[0].classList.add('phone');
	}
	//редактируем данные о контакте в локальном хранилище;
	editLoalStorageData(tr){
		var newName = tr.querySelectorAll('td.data p:first-of-type > input')[0].value,
		newPhone = tr.querySelectorAll('td.data p:nth-of-type(2) > input')[0].value,
		id = tr.querySelectorAll('input[name = \'id\']')[0].getAttribute('value');
		var contacts = JSON.parse(localStorage.contacts);
		if (contacts[id]){
			contacts[id][0] = newName;
			contacts[id][1] = newPhone;
		}
		localStorage.contacts = JSON.stringify(contacts);
	}	
	//подтверждение редактирования;
	//обработчик кнопки;
	editConfirm(){
		var tr = jQuery(this).closest('tr')[0];
		this.phoneBook.displayAndHideNecessaryButtonsLists(this);
		this.phoneBook.editLoalStorageData(tr);
		this.phoneBook.transfromContactInputsToParagraphs(tr,false);
	}
	//отмена редактирования;
	//обработчик кнопки;
	editCancel(){
		var tr = jQuery(this).closest('tr')[0];
		this.phoneBook.displayAndHideNecessaryButtonsLists(this);
		this.phoneBook.transfromContactInputsToParagraphs(tr,true);
	}
	//удаляем контакт их кранилища;
	deleteContactFromStorage(button){
		var contacts = JSON.parse(localStorage.contacts);
		delete contacts[button.getAttribute('data-id')];
		localStorage.contacts = JSON.stringify(contacts);	
	}
	//удаляем элемент контакта;
	deleteContactElement(button){
		var contactTr = jQuery(button).closest('tr')[0];
		contactTr.parentNode.removeChild(contactTr);
	}
	//получаем информацию о добовляемом контакте из полей;
	getContactInfoFromForm(){
		var name = this.nameInput.value,
		phone = this.phoneInput.value;
		if (name && phone){
			return [localStorage.currentContactsId++,name,phone];
		}		
		return false;
	}
	//добавляем новый контакт в хранилище;
	addNewContactToStorage(contactInfo){
		var contacts = JSON.parse(localStorage.contacts);
		contacts[contactInfo[0]] = [contactInfo[1],contactInfo[2]];
		if (contactInfo[3]){
			contacts[contactInfo[0]].push(contactInfo[3]);
		}
		contacts = JSON.stringify(contacts);
		localStorage.contacts = contacts;
	}
	//определяем id контакта для добавления его кнопке в качестве свойства;
	getContactIdForButton(parentTd){
		var tr = jQuery(parentTd).closest('tr')[0],
		idInput = tr.querySelectorAll('input[name = \'id\']')[0],
		id = idInput.value;
		return id;
	}
	//добавляем список кнопок;
	addButtonsList(listClssName,parentEl,buttonsClasses){
		var list = document.createElement('UL');
		if (listClssName){
			list.classList.add(listClssName);
		}
		parentEl.appendChild(list);
		for (var i = 0; i < buttonsClasses.length; i++){
			var item = document.createElement('LI');
			list.appendChild(item);
			var link = document.createElement('A');
			link.phoneBook = this;
			link.setAttribute('data-id',this.getContactIdForButton(parentEl));
			item.appendChild(link);
			link.classList.add(buttonsClasses[i]);
		}
	}
	//добавляем элемент нового контакта;
	addNewContactElement(contactInfo){
		var tr = document.createElement('TR'),
		idInput = document.createElement('INPUT');
		idInput.setAttribute('name','id');
		idInput.setAttribute('type','hidden');
		idInput.setAttribute('value',contactInfo[0]);
		tr.appendChild(idInput);
		this.contactsContainer.appendChild(tr);	
		tr.classList.add('contact');	
		var photoTd = document.createElement('TD');
		photoTd.classList.add('photo');
		tr.appendChild(photoTd);
		photoTd.appendChild(document.createElement('DIV'));
		var dataTd = document.createElement('TD');
		dataTd.classList.add('data');
		tr.appendChild(dataTd);
		var namePar = document.createElement('P'),
		phonePar = document.createElement('P');
		namePar.classList.add('name');
		phonePar.classList.add('phone');
		namePar.classList.add('name');
		phonePar.classList.add('phone');
		namePar.appendChild(document.createTextNode(contactInfo[1]));
		phonePar.appendChild(document.createTextNode(contactInfo[2]));
		dataTd.appendChild(namePar);
		dataTd.appendChild(phonePar);
		var buttonsTd = document.createElement('TD');
		buttonsTd.classList.add('actionButtons');
		tr.appendChild(buttonsTd);
		this.addButtonsList('mainActions',buttonsTd,['edit','delete']);
		buttonsTd.appendChild(document.createElement('BR'));
		this.addButtonsList('editActions',buttonsTd,['ok','cancel']);
		tr.querySelectorAll('.actionButtons .delete')[0].onclick = this.deleteContact;
		tr.querySelectorAll('.actionButtons .edit')[0].onclick = this.editContact;
		tr.querySelectorAll('.actionButtons .ok')[0].onclick = this.editConfirm;
		tr.querySelectorAll('.actionButtons .cancel')[0].onclick = this.editCancel;
		this.addPhotoToContactElement(contactInfo,photoTd);
	}	
	//добавляем фотографию в элемент контакта;
	addPhotoToContactElement(contactInfo,photoTd){
		var photoElement = photoTd.querySelectorAll('DIV')[0];
		if (contactInfo[3]){
			var photoPath = this.photoFolder + '/' + contactInfo[3] + '.' + this.photoFormat;
			photoElement.style.backgroundImage = 'url(\'' + photoPath + '\')';
			photoElement.classList.add('withPhoto');
			photoElement.style.backgroundPosition = 'center center';
			photoElement.style.backgroundSize = 'cover';
			photoElement.style.backgroundRepeat = 'no-repeat';
		}
	};
	//очищаем поля;
	clearinputs(){
		this.nameInput.value = '';
		this.phoneInput	.value = '';
	}	
	//ищем контакты с переданным именем;
	findContactWithName(name){
		var contacts = JSON.parse(localStorage.contacts),
		result = new Array();
		for (var propName in contacts){
			if (contacts[propName][0] == name){
				result.push(contacts[propName]);
			}
		}
		return result;
	}
	//добавляем начальные данные в хранилище;
	addBeginningDataToLocalStorage(startingData){
		if (!localStorage.beginningContactsAdded){
			for (var i = 0; i < startingData.length; i++){
				if (!this.findContactWithName(startingData[i][0]).length){
					var contactInfo = startingData[i];
					contactInfo.unshift(localStorage.currentContactsId++);
					this.addNewContactToStorage(contactInfo);
				}
			}
			localStorage.beginningContactsAdded = true;	
		}
	}
}







