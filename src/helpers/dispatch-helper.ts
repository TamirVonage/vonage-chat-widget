import { createEventDispatcher } from 'svelte';
import { get_current_component } from 'svelte/internal';

export class DispatchHelper {
    originalDispatch = createEventDispatcher();

    dispatch = (name, detail) => {
        const component = get_current_component();
        this.originalDispatch(name, detail);
        if (component != undefined) {
            component.dispatchEvent(new CustomEvent(name, { ...detail, composed: true }));
        }
    }
}
