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

let userObject = {username: 'guest'}
    async function onStart () {
        console.log('start')
        userObject = await getUserFromCookie()
        document.getElementById('user').innerText = userObject.username
        requestSyncHistory(userObject.birthday)
    }

    onStart()

    setInterval(
        () => {
            var currentTime = new Date().toLocaleTimeString();
            document.getElementById('time').innerText = currentTime
        }, 1000
    )

    async function createMessageElement(data) {
        console.log("userObject", userObject)
        const userName = userObject.username.toUpperCase()
        const chatBubble = document.createElement('div')
        chatBubble.className = `chatbox__body__chatBubble ${data.username.toUpperCase() === userName ? 'chatbox__body__chatBubble--right' : 'chatbox__body__chatBubble--left'}`

        const chatHeader = document.createElement('div')
        chatHeader.className = 'chatbox__body__chatBubble__header'
        const chatBody = document.createElement('div')
        chatBody.className = 'chatbox__body__chatBubble__body'

        const user = document.createElement('p')
        user.className = 'chatbox__body__chatBubble__header__title capitalize'
        const time = document.createElement('p')
        time.className = 'chatbox__body__chatBubble__header__title--aside'
        const message = document.createElement('p')
        message.className = 'chatbox__body__chatBubble__body__message'

        user.innerText = data.username
        time.innerText = new Date(data.timestamp).toLocaleTimeString()
        message.innerText = data.message

        chatHeader.appendChild(user)
        chatHeader.appendChild(time)
        chatBody.appendChild(message)

        chatBubble.appendChild(chatHeader)
        chatBubble.appendChild(chatBody)

        return chatBubble
    }

    primus.on('open', () => {
        console.log('primus open')
        primus.write({reason: 'syncChatRequest'})
      })
  
      const sendInput = document.getElementById('message')
      sendInput.addEventListener("keydown", function (e) {
          if (e.code === "Enter") { 
              writeMessage(userObject)
          }
      });

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
  
      function syncChatHistory(chatHistory = []) {
          const historyEl = document.getElementById('chatHistory')
          historyEl.innerHtml = ''
          chatHistory.forEach(async function (message) {
              historyEl.appendChild( await createMessageElement(message))
          })
          setTimeout(function () {
              historyEl.scrollTop = historyEl.scrollHeight
          } , 100)
      }
  
      async function updateChatHistory(lastMessage = {message: 'message not found'}) {
          const historyEl = document.getElementById('chatHistory')
          const messageEl = await createMessageElement(lastMessage)
          console.log('messageEl', messageEl)
          historyEl.appendChild(messageEl);
          historyEl.scrollTop = historyEl.scrollHeight;
      }




