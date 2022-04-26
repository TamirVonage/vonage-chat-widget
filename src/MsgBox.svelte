<svelte:options tag="msg-box" />
<script>
let currentDateTime = new Date();
export let text;
export let userr;

function getHour(c) {
    return c.getHours() % 12 || 12;
}

function getMinute(c) {
    return c.getMinutes() < 10 ? "0" + c.getMinutes() : c.getMinutes();
}

function getMeridiem(c) {
    return c.getHours() < 12 ? "AM" : "PM";
}

function openMetting(c) {
    window.open("https://meetings.vonage.com/234299", "_blank")
}
</script>

<style>
.msg-header {
    align-items: baseline;
    display: flex;
    margin-bottom: 0.3rem;
}

.open-meeting-btn {
    margin-top: 10px;
    margin-bottom: 10px;
}

.msg-title {
    color: #7614ff;
    font-weight: 600;
    margin-right: 9px;

}

.user-msg-title {
    color: black;
    font-weight: 600;
    margin-right: 9px;
}

.msg-time {
    font-size: 13px;
    color: #5f5c5c;
}

.msg-box {
    background: #f2f2f8;
    overflow-wrap: break-word;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
    border-radius: 8px;
    padding: 1rem 1.5rem;
    min-width: 200px;
    max-width: 265px;
    border: 1px solid #E6E6E6;
    margin-bottom: 2rem;
}

.user-msg-box-container {
    display: flex;
    justify-content: end;

}

.user-msg-box {
    background: white;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
    border-radius: 8px;
    padding: 1rem 1.5rem;
    min-width: 200px;
    max-width: 265px;
    border: 1px solid #E6E6E6;
    margin-bottom: 2rem;
    overflow-wrap: break-word;
}
</style>

{#if 	!userr}

<div class="msg-box">
    <div class="msg-header">
        <div class="msg-title"> Agent</div>
        <div class="msg-time"> • {getHour(currentDateTime)}:{getMinute(currentDateTime)} {getMeridiem(currentDateTime)}  </div>
    </div>
        {#if text && text.startsWith('https://meetings.vonage.com/')}
            <vwc-button connotation="cta" icon="open-line" class="open-meeting-btn" on:click={openMetting} label="Open meeting" layout="filled" type="submit" unelevated="">
                <button type="submit" style="display: none;"></button>
              </vwc-button>
        {/if}
        {#if text && !text.startsWith('https://meetings.vonage.com/')}
        {@html text}
        {/if}
   
</div> 

    
   
{/if}

{#if 	userr}
<div class="user-msg-box-container"> <div class="user-msg-box">     <div class="msg-header">
    <div class="user-msg-title"> User</div>
    <div class="msg-time"> • {getHour(currentDateTime)}:{getMinute(currentDateTime)} {getMeridiem(currentDateTime)}  </div>
</div>

{text}
  </div>
</div>
{/if}
