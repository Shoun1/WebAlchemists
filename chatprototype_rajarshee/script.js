document.getElementById("sendButton").addEventListener("click", function() {
    const input = document.getElementById("messageInput");
    const messageText = input.value.trim();

    if (messageText) {
        appendMessage(messageText, 'sent');
        input.value = '';
        
        // Simulate a response after a short delay (e.g., 1 second)
        setTimeout(() => {
            appendMessage("This is a response.", 'received');
        }, 1000);
    }
});

function appendMessage(text, type) {
    const messagesDiv = document.getElementById("messages");
    
    const messageDiv = document.createElement("div");
    messageDiv.textContent = text;
    messageDiv.classList.add("message");
    messageDiv.classList.add(type);
    
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
}
