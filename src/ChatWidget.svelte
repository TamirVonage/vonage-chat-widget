<svelte:options tag="chat-widget" />

<script>
		let showChat = false;
		function handleClick() {
		showChat = !showChat
		}


</script>

<style>


  .chat-container {
        box-shadow: 0 0 20px 0 rgb(0 0 0 / 20%);
        width: 500px;
        border-radius: 18px;

  }

	.title {
	background: rgb(42, 129, 234);
	color: white;
	padding: 18px;
    border-top-right-radius: 18px;
    border-top-left-radius: 18px;
    font-weight: 300;
    font-size: 1.4em;
    line-height: 1.4;
    letter-spacing: normal;

	}

	.content {
		padding: 10px;
	}

	.message-bubble {
	background: #f2f2f8;;
	border-radius: 15px;
	padding: 12px;
    margin-bottom: 22px;
    display: flex;
	}

    .agent-message-bubble {
        background: gray;;
	    border-radius: 15px;
	    padding: 12px;
        margin-bottom: 22px;
        display: flex;
    }

    .agent-message-bubble-parent {
               justify-content: flex-end;
               display:flex
    }

        .message-bubble-parent {
              display: inline-flex;
    }
</style>

<vwc-fab on:click={handleClick} icon="chat-2-line"></vwc-fab>


<!-- {#if 	showChat} -->
	<div class="chat-container">
		<div class="title"> Chat </div>
		<div class="content"> 	
			<div class="message-bubble-parent"> 	<div class="message-bubble"> bla bla </div>  </div>
            <div class="agent-message-bubble-parent"> <div class="agent-message-bubble"> bla bla </div> </div>
            <div class="message-bubble-parent"> <div class="message-bubble"> bla bla bla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla bla</div> </div>

		
        
        </div> 
	
		</div>



<!-- {/if} -->

