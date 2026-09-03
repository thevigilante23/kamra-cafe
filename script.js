    const button = document.getElementById("chatbutton");
    
    

   


    const message = document.getElementById("userInput");
    const sendbutton = document.getElementById("sendButton");
    const usermsg = document.getElementById("chat-box")
    if (message) {
    message.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            sendbutton.click();
        }

    });
}
    if (sendbutton) {

    sendbutton.addEventListener("click", function () {

        if (message.value.trim() === "") {
            return;
        }


        // USER MESSAGE
        const newMessage = document.createElement("div");

        newMessage.textContent = message.value;

        usermsg.appendChild(newMessage);

        newMessage.classList.add("messag");


        
        const userText = message.value;

        // CLEAR INPUT
        message.value = "";


        // SEND TO FLASK
        fetch("https://kamra-cafe-production.up.railway.app/chats", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: userText
            })

        })

        .then(response => response.text())

        .then(reply => {

            // KAMRA MESSAGE
            const botMessage = document.createElement("div");

            botMessage.textContent = reply;

            botMessage.classList.add("bot");

            usermsg.appendChild(botMessage);

        })

        .catch(error => {

            console.error("Error:", error);

        });

    });

}
            
                

                   
    