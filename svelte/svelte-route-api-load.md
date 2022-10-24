# Routing & API GET on load

## File structure

```
routes
┣ my_route
┃ ┣ +page.server.ts
┃ ┗ +page.svelte
┗ +page.svelte
```

## `routes/my_route/+page.svelte`

```svelte
<script type="ts">
  export let data: any;
</script>

{#if data}
  <h1>{data.title}</h1>
  <p>
    {@html data.content}
  </p>
  {#if data.slug}
    <p>{data.slug}</p>
  {/if}
{/if}
```

## `routes/my_route/+page.server.ts`

```typescript
import { error, type RequestEvent } from '@sveltejs/kit';

export async function load({ url }: RequestEvent) {
  // const post = await getPostFromDatabase(url.searchParams.get('slug'));
  const post = {
    title: 'My title',
    content: 'My content',
    slug: url.searchParams.get('slug') || null
  };

  return post;

  throw error(404, 'not found');
}
```

## References

- <https://kit.svelte.dev/docs/routing>
