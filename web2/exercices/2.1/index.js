const DEFAULT_MESSAGE = 'This is the best moment to have a look at this website !'
fullmessage = addDateTime(DEFAULT_MESSAGE)
alert(fullmessage);

function addDateTime(message) {
  const dateTimeNow = new Date();
  const date = dateTimeNow.toLocaleDateString(); // 17/08/2020
  const hour = dateTimeNow.toLocaleTimeString([], { timeStyle: 'short' }); // 13:26:15
  return date + ' ' + hour + ' : '+message;
}