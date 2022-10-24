# Enhanced POST API form

## File structure

```
routes
┣ counter
┃ ┣ +page.server.ts
┃ ┗ +page.svelte
┗ +page.svelte
```

## `+page.svelte`

```html
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<a href="counter">Counter</a>
```

## `counter/+page.svelte`

```html
<script type="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<p>Count is {data.count}</p>

<form use:enhance action="?/increment" method="post">
  <button>Increment</button>
</form>
```

## `counter/+page.sever.ts`

```typescript
import type { Actions } from '@sveltejs/kit';
import { browser } from '$app/environment';

let count = 123;

export function load() {
  console.log(`Running load() on the ${browser ? 'browser' : 'server'}`);
  return { count };
}

export const actions: Actions = {
  increment: () => {
    count++;
  }
};
```

## References

- NDC Conferences. (2022, October 13). Keynote: Why web tech is like this - Steve Sanderson [Video]. YouTube. <https://www.youtube.com/watch?v=3QEoJRjxnxQ>
