document.getElementById('send-button').onclick = function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput) {
        const userMessage = `<div class="message user-message"><div class="bubble">You: ${userInput}</div></div>`;
        document.getElementById('messages').innerHTML += userMessage;
        
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        })
        .then(response => response.json())
        .then(data => {
            const botMessage = `<div class="message bot-message"><div class="bubble">Chatbot: ${data.response}</div></div>`;
            document.getElementById('messages').innerHTML += botMessage;
            document.getElementById('user-input').value = ''; 
            document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight; 
        });
    }
};

document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('send-button').click();
    }
});
