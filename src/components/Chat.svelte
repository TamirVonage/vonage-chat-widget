<svelte:options tag="chat-widget"/>

<script lang="ts">

    export let messages = [];

</script>

<div bind:this={container} class="chat-container" transition:fade="{{duration: 200}}">
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
            <msg-box id="msg_{index}" text="{message.text}" user="{message.isUser}"></msg-box>
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
