<svelte:options tag="chat-widget" />

<script>
import { onMount } from 'svelte';
import {SessionService} from "./services/session-service.js";

let showChat = true;
let userInput;
let messages = []

onMount(async () => {
    // sessionService.init("626665f588ae9f8b9cee4d46","jbcokfMGPc0282y7nX0Xiq4nDhMqMp")
    //     .then((id, token) => {
    //         console.log("id: " + id);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
});

function toggleChat() {
    showChat = !showChat
}

function addMessage() {
    messages = [...messages, {isUser: true, text: userInput}]
    userInput = "";
    const sessionService = new SessionService();
    const sessionId = "12620dde-6f73-4660-ba6a-df759eefbaba";
    const sessionToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uX2lkIjoiMTI2MjBkZGUtNmY3My00NjYwLWJhNmEtZGY3NTllZWZiYWJhIiwiaWF0IjoxNjUwOTY2ODUwfQ.eoqRi_LsnTB1XeY5H9r5MdgCieKc7ZEcBuF29jCMHqM";
    sessionService.step(sessionId, sessionToken, userInput)
        .then( (res) => {
            console.log(res);
            res.messages.forEach( message => {
                messages = [...messages, {isUser: false, text: message.text}];
            })
        }).catch( (err) => {
            console.log("step request failed");
            console.log(err);
    });
}

function handleKeydown(event) {
   if(event.code === 'Enter') {
    event.preventDefault();
    addMessage();
   }
}


</script>

<style>
.chat-container {
    box-shadow: 0 0 20px 0 rgb(0 0 0 / 20%);
    width: 500px;
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

.user-input-container {
    border-top: 1px solid #ebe9e9;
    padding: 0 10px 0 10px;
    display: flex;
    align-items: center;
}
</style>
 {#if 	showChat}
	<div class="chat-container">

<div class="title"> <span> Chat </span> <vwc-icon on:click={toggleChat} type="minus-line" class="close-icon"> </vwc-icon></div>

<div class="content">
    {#each messages as message}
           <msg-box text="{message.text}" userr="{message.isUser}"></msg-box>
           {/each}
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
