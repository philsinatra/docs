## Route

```typescript
import { onMount } from 'svelte';

let title: string;

onMount(() => {
  try {
    fetch('/api/post', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Svelte API POST' })
    })
      .then((response) => response.json())
      .then((data) => {
        title = data.body.title;
      })
      .catch((error) => {
        console.error('error', error);
      });
  } catch (error) {
    console.error('error', error);
  }
});
```
  
## Endpoint
  
An example filename: `src/routes/api/endpoint.ts`
  
💡 <https://bit.ly/3yEls4L> Rich Harris explains parsing the body before identifying the endpoints.
  
```typescript
export async function POST({ request }: { request: Request }) {
  const body = await request.json();

  try {
    return new Response(JSON.stringify({ body }), {
      status: 200
    });
  } catch (error) {
    console.error('error', error);
  }
}
```
