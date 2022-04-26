<svelte:options tag="chat-widget" />

<script>
import MsgBox from './MsgBox.svelte';
let showChat = true;

function toggleChat() {
    showChat = !showChat
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
	<div  class="chat-container">

<div class="title"> <span> Chat </span> <vwc-icon on:click={toggleChat} type="minus-line" class="close-icon"> </vwc-icon></div>

<div class="content"> 		
            <!-- <MsgBox/>
            <MsgBox isUserMsg={true}/>
            <MsgBox/> -->

        </div> 
    <div class="user-input-container">
       <textarea rows="1" id="wcw-user-input-field" tabindex="0" placeholder="Enter your message..." class="input-textarea" spellcheck="false"></textarea>
    <vwc-icon-button icon="message-sent-line"></vwc-icon-button>

    
    </div>

</div>

 {/if} 

 {#if 	!showChat} 
<vwc-fab on:click={toggleChat} icon="chat-2-line"></vwc-fab>
 {/if}
