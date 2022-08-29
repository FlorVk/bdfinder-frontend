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

      const sendInput = document.getElementById('message')
      sendInput.addEventListener("keydown", function (e) {
          if (e.code === "Enter") { 
              writeMessage(userObject)
          }
      });
  
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
          historyEl.appendChild(messageEl);
          historyEl.scrollTop = historyEl.scrollHeight;
      }




