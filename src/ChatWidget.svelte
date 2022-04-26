<svelte:options tag="chat-widget" />

<script>
import {
    onMount
} from 'svelte';
import {
    SessionService
} from "./services/session-service.js";

let showChat = false;
let userInput;
let sessionId;
let sessionToken;
let sessionService = new SessionService();
let messages = [];
let loadingResponse = false;
let isSessionActive = false;
let isInitialized = false;

onMount(async () => {
    initSession();
});

function initSession() {
    sessionService.init("626665f588ae9f8b9cee4d46", "jbcokfMGPc0282y7nX0Xiq4nDhMqMp")
        .then((res) => {
            sessionId = res.id;
            sessionToken = res.token;
            isInitialized = true;
            isSessionActive = true;
        })
        .catch((err) => {
            console.log(err);
        });
}

function toggleChat() {
    showChat = !showChat
}

function addMessage() {
    messages = [...messages, {
        isUser: true,
        text: userInput
    }];

    if (!isSessionActive){
        initSession();
    }
    loadingResponse = true;
    setTimeout(() => {
    sessionService.step(sessionId, sessionToken, userInput)
        .then((res) => {
            loadingResponse = false;
            console.log(res);
            res.messages.forEach(message => {
                messages = [...messages, {
                    isUser: false,
                    text: message.text
                }];
            });
            userInput = "";
            isSessionActive = (res.status === "ENDED");
        }).catch((err) => {
            loadingResponse = false;
            console.log("step request failed");
            console.log(err);
        });
    }, 500);
   

}

function handleKeydown(event) {
    if (event.code === 'Enter') {
        event.preventDefault();
        addMessage();
    }
}
</script>

<style>
.chat-container {
    box-shadow: 0 0 20px 0 rgb(0 0 0 / 20%);
    width: 449px;
    border-radius: 18px;
    background: white;

}

.title {
    background: rgb(118 20 255);
    color: white;
    padding: 18px;
    border-top-right-radius: 18px;
    border-top-left-radius: 18px;
    font-weight: 300;
    font-size: 1.4em;
    line-height: 1.4;
    letter-spacing: normal;
    display: flex;
    justify-content: space-between;
    align-items: center;

}

* {
    font-family: Helvetica, "Trebuchet MS", Verdana, sans-serif;
}

.content {
    padding: 22px;
    height: 450px;
    max-height: 450px;
    overflow-y: auto;
}

.close-icon {
    cursor: pointer;
}

.input-textarea {
    resize: none;
    border: none;
    outline: none;
    box-sizing: border-box;
    margin: 10px 10px 10px 10px;
    padding: 11px 0 11px 0;
    font-size: .98em;
    font-weight: 400;
    line-height: 1.4;
    white-space: pre-wrap;
    word-wrap: break-word;
    color: var(--user-input-fg-color);
    background-color: transparent;
    -webkit-font-smoothing: antialiased;
    max-height: 44px;
    min-height: 44px;
    overflow: scroll;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    font-family: inherit;
    letter-spacing: normal;
    -ms-overflow-style: none;
    scrollbar-width: none;
    flex-grow: 1;
    width: 100%;
}

.dotsContainer {
    display: flex;
    align-items: center;
    width: 3.5rem;
    margin-left: 42px;
    background: #e7e8e8;
    border-radius: 8px;
    padding: 0.8rem 1rem;
}

.dot {
    width: 8px;
    height: 8px;
    background: #cacaca;
    border-radius: 50%;
    margin: 2px;
    transition: all 0.5s ease-in-out;
    animation: typing 1s infinite;
}

@keyframes typing {
    0% {
        transform: translateY(0);
        transition: all 0.5s ease-in-out;
    }

    50% {
        transform: translateY(-3px);
        transition: all 0.5s ease-in-out;
    }

    100% {
        transform: translateY(0);
        transition: all 0.5s ease-in-out;
    }
}

#dot1 {
    animation-delay: 0.2s;
}

#dot2 {
    animation-delay: 0.5s;
}

#dot3 {
    animation-delay: 0.7s;
}

.user-input-container {
    border-top: 1px solid #ebe9e9;
    padding: 0 10px 0 10px;
    display: flex;
    align-items: center;
}
</style>

 {#if 	isInitialized}
 {#if 	showChat}
    <div class="chat-container">

    <div class="title"> <span> Chat </span> <vwc-icon on:click={toggleChat} type="minus-line" class="close-icon"> </vwc-icon></div>

<div id="content_container" class="content">
{#each messages as message}
       <msg-box text="{message.text}" userr="{message.isUser}"></msg-box>
       {/each}
       {#if 	loadingResponse}
       <div class="dotsContainer">
           <span id="dot1" class="dot"></span>
           <span id="dot2" class="dot"></span>
           <span id="dot3" class="dot"></span>
         </div>
        {/if}
    </div>
<div class="user-input-container">
   <textarea on:keydown={handleKeydown} bind:value={userInput} rows="1" id="wcw-user-input-field" tabindex="0" placeholder="Enter your message..." class="input-textarea" spellcheck="false"></textarea>
<vwc-icon-button on:click={addMessage} icon="message-sent-line"></vwc-icon-button>

        </div>

    </div>

 {/if}

 {#if 	!showChat}
    <vwc-fab on:click={toggleChat} icon="chat-2-line"></vwc-fab>
 {/if}
 {/if}
