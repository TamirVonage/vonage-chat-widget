<svelte:options tag="my-counter"/>

<script>
    import { createEventDispatcher } from 'svelte';
    import { get_current_component } from 'svelte/internal';

    export let count = 0;

    const component = get_current_component();
    const originalDispatch = createEventDispatcher();

    const dispatch = (name, detail) => {
        console.log('dispatching');
        originalDispatch(name, detail);
        if (component !== undefined) {
            console.log('component != undefined');
            component.dispatchEvent(new CustomEvent(name, { ...detail, composed: true }));
        }
    }


    function inc() {
        count++;
        console.log('increasing');
        dispatch('inc', {
            count: count
        });
    }

    function dec() {
        count--;
        dispatch('dec', {
            count: count
        });
    }
</script>

<style>

    .main-container {
        display: flex;
        align-items: center;
    }

    span {
        width: 4rem;
        display: inline-block;
        text-align: center;
        font-size: 200%;
    }

</style>
<div class="main-container">
    <vwc-icon-button
            icon="minus-solid"
            shape="circled"
            layout="filled"
            connotation="cta"
            on:click={dec}
    ></vwc-icon-button>

    <span>{count}</span>

    <vwc-icon-button
            icon="plus-solid"
            shape="circled"
            layout="filled"
            connotation="cta"
            on:click={inc}
    ></vwc-icon-button>

</div>
