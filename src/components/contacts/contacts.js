var contactsButtonNode = document.querySelector('.contactsButton');
var contactsButtonNodeInitContent = contactsButtonNode.innerHTML;
var messageNode = document.querySelector('.subject');
var pseudoSubjectNode = document.querySelector('.pseudoSubject');

var contacts = {
  init() {
    contacts.setListeners();
  },

  setListeners() {
    contactsButtonNode.addEventListener('click', (e) => {
      contacts.sendData(e);
    });

    messageNode.addEventListener('input', () => {
      pseudoSubjectNode.value = messageNode.innerHTML;
    });

    document.addEventListener('click', () => {
      console.log(pseudoSubjectNode.value)
    });
  },

	sendData(e) {
		var nameValue = document.querySelector('.name').value;
		var emailValue = document.querySelector('.mail').value;
		var messageValue = document.querySelector('.subject').innerHTML;

		if(messageValue == '' || emailValue == '' || messageValue == '') {
			return;
		}

		var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	  var message = 'Name: ' + nameValue + '\n\n' + 
	  							'Contacts: ' + emailValue + '\n\n' +
	  							'Message: ' + messageValue;
	  var the_data = 'message=' + message;

	  request.open("POST", 'http://mighty.vision/mailer.php', true);
	  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		request.send(the_data);

		contactsButtonNode.innerHTML = contactsButtonNode.dataset.successMesage;
		contactsButtonNode.disabled = true;

		setTimeout(() => {
			contactsButtonNode.innerHTML = contactsButtonNodeInitContent;
			contactsButtonNode.disabled = false;
		}, 2000);

	  e.preventDefault();

	  document.querySelector('.name').value = '';
	  document.querySelector('.mail').value = '';
    document.querySelector('.subject').innerHTML = '';
    pseudoSubjectNode.value = '';
	}
}

export default contacts;