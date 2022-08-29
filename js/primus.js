const base_url = "http://localhost:3000";

// FRONTEND


// PRIMUS LIVE
primus = Primus.connect(base_url, {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
            ,
        min: 500 // Number: The minimum delay before we try reconnect.
            ,
        retries: 10 // Number: How many times we should try to reconnect.
    }
});

primus.on('open', () => {
    console.log('primus open')
    primus.write({reason: 'syncChatRequest'})
  })

  function requestSyncHistory(chatID) {
    primus.write({ reason: "syncChatRequest", data: { chatID: chatID } });
  }

  function writeMessage(user) {
    const message = document.getElementById('message').value
    if (message.length < 1) return
    const data = {message: message, username: user.username, timestamp: new Date(), chatID: user.birthday}
    primus.write({
      data: data,
      reason: 'sendMessage'
    })
  }

primus.on('data', function (data) {
    switch (data.reason) {
        case 'syncChatResponse':
            syncChatHistory(data.data)
            break;
        case 'sendMessageResponse':
            updateChatHistory(data.data)
            break;
        default:
            console.log('unknown reason', reason)
            break;
    }
})





