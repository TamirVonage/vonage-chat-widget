<svelte:options tag="vg-chat-widget"/>

<script>
    import {
        onMount
    } from 'svelte';
    import {
        SessionService
    } from "../services/session-service.js";
    import "./MsgBox.svelte";

    let showChat = false;
    let userInput;
    let sessionId;
    let sessionToken;
    let sessionService = new SessionService();
    let messages = [];
    let loadingResponse = false;
    let isSessionActive = false;
    let isInitialized = false;
    let container;

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


        loadingResponse = true;
        setTimeout(() => {
            container.querySelector(`#dots_container`).scrollIntoView()

        }, 100);
        let tempUserInput = userInput;
        userInput = "";

        setTimeout(() => {
            sessionService.step(sessionId, sessionToken, tempUserInput)
                .then((res) => {

                    res.messages.forEach(message => {
                        messages = [...messages, {
                            isUser: false,
                            text: message.text
                        }];
                    });

                    setTimeout(() => {
                        container.querySelector(`#msg_${messages.length - 1}`).scrollIntoView()
                    }, 0);
                    loadingResponse = false;

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

<div class="vg-chat-widget-main-container">
    {#if isInitialized}
        {#if showChat}
            <div bind:this={container} class="chat-container">
                <div class="title">
                    <div class="title-with-icon">
                        <vwc-icon class="bot-icon" type="bot-line"></vwc-icon>
                        <span> Chat </span>
                    </div>
                    <vwc-icon on:click={toggleChat} type="chevron-down-line" class="close-icon">
                    </vwc-icon>
                </div>

                <div id="content_container" class="content">
                    {#each messages as message, index}
                        <msg-box id="msg_{index}" text="{message.text}" userr="{message.isUser}"></msg-box>
                    {/each}
                    {#if loadingResponse}
                        <div id="dots_container" class="dotsContainer">
                            <span id="dot1" class="dot"></span>
                            <span id="dot2" class="dot"></span>
                            <span id="dot3" class="dot"></span>
                        </div>
                    {/if}
                </div>

                <div class="user-input-container">
                    <textarea on:keydown={handleKeydown} bind:value={userInput} rows="1" id="wcw-user-input-field"
                              tabindex="0" placeholder="Enter your message..." class="input-textarea"
                              spellcheck="false"></textarea>
                    <vwc-icon-button on:click={addMessage} icon="message-sent-line"></vwc-icon-button>
                </div>
            </div>

        {/if}

        <!--{#if !showChat}-->
            <vwc-fab class="fab" connotation="cta" on:click={toggleChat} icon="chat-2-line"></vwc-fab>
        <!--{/if}-->
    {/if}
</div>

<style>

    .vg-chat-widget-main-container {
        position: fixed;
        right: 0;
        bottom: 0;
        margin: 10px;
        text-align: right;
    }

    .chat-container {
        box-shadow: 0 0 20px 0 rgb(0 0 0 / 20%);
        width: 449px;
        border-radius: 18px;
        background: white;
        margin: 10px;
    }

    .fab {
        margin: 10px;
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

    .title-with-icon {
        display: flex;
        align-items: center;
    }

    .bot-icon {
        margin-right: 10px;
    }

    .user-input-container {
        border-top: 1px solid #ebe9e9;
        padding: 0 10px 0 10px;
        display: flex;
        align-items: center;
    }
</style>
