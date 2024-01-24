
const sendButton = document.getElementById("sendButton");
const valueInput = document.getElementById("valueInput");
const statusMessage = document.getElementById("statusMessage");
const timer= document.getElementById("timer");

// ไม่ให้กรอก \\ backslash
valueInput.addEventListener("keyup",(e)=>{
    const regex = /[^a-z0-9]/i; // regex /i =case sensitive
    if (e.target.value == "\\"){
        alert(`ไม่ต้องใส่ '\\' backslash`)
        e.target.value= ""
    // เช็คว่ามีภาษาอื่นนอกจาก engกับตัวเลขไหมโดยใช้ .test return =boolean
    }if(regex.test(e.target.value)){
        alert("กรุณกรอกแต่ภาษาอังกฤษและตัวเลขลอง ใหม่อีกครั้ง!!")
        e.target.value= ""
    }
})

sendButton.addEventListener("click", async () => {
    // const imagelogo= document.getElementsByClassName("image-logo")
    const value = valueInput.value;
    // Check if the input value is not null or empty
    if (value.trim() === "") {
        alert("Please enter a Computername.");
        return;
    }
    sendButton.disabled = true;
    try {
        startTimer()
        // imagelogo.src ="{{ url_for('static',filename='/img/ignite.jpg')}}"
        sendButton.style.cursor = "wait"
        sendButton.innerText = `กำลังเผาขยะ... 🔥`
        // sendButton.innerHTML = `กำลังเผาขยะ... <img class="fire-icon" src="/static/img/fire-iris.gif " alt="Fire GIF" width="20px" height="20px">`;
        statusMessage.innerText = "Waiting for Process to finish..."
        statusMessage.style.color = "red"; // Set initial color to red

        const response = await fetch("/send-value", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ value })
        });

        if (response.ok) {
            const data = await response.text();
            sendButton.style.cursor = "pointer"
            stopTimer()
            statusMessage.innerText = `${data} \u2705`;
            if (data === "Complete") {
                statusMessage.style.color = "green"; // Change color to green if response is "Complete"
            }
        } else {
            throw new Error("Error executing batch file.");
        }
    } catch (error) {
        console.error("Error:", error);
        statusMessage.innerText = "An error occurred.";
    } finally {
        stopTimer()
        sendButton.innerText = "กดเพื่อเผาขยะ";
        sendButton.disabled = false; // Re-enable the button after the process is complete or an error occurs
    }
});

//---------- Digital Clock ----------

const mytime = document.querySelector(".time");
function gettime() {
    const currenttime = new Date();
    const hour = currenttime.getHours();
    const minutes = currenttime.getMinutes();
    const second = currenttime.getSeconds();
    mytime.innerText = `\u23F0${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}:${second < 10 ? `0${second}` : second}`
}
gettime();

setInterval(() => {
    gettime()
}, 1000);

//---------- Digital Clock ----------


//---------- Calc duration process ----------
let startTime;
let timeoutId;

function startTimer() {
    startTime = new Date().getTime();
    updateTimer();
}

function stopTimer() {
    clearTimeout(timeoutId);
}

function updateTimer() {
    const currentTime = new Date().getTime();
            const elapsedTime = (currentTime - startTime) / 1000; // Convert milliseconds to seconds
            const minutes = Math.floor(elapsedTime / 60);
            const seconds = Math.floor(elapsedTime % 60);
            const minutesDisplay = (minutes < 10) ? '0' + minutes : minutes;
            const secondsDisplay = (seconds < 10) ? '0' + seconds : seconds;
            timer.innerText = ` เวลาที่ใช้ในการเผา ${minutesDisplay}:${secondsDisplay}`;
    timeoutId = setTimeout(updateTimer, 1000); // Update every second
}   
//---------- Calc duration process ----------