# Svelte Nav With Resize & Lock Handlers

`src/lib/Nav/nav.ts`

```typescript
interface NavProps {
  name: string
  type: 'link' | 'heading'
}

const nav: NavProps[] = [
  {
    name: 'Home',
    type: 'link'
  },
  {
    name: 'JavaScript',
    type: 'heading'
  },
  {
    name: 'ES6 Maps',
    type: 'link'
  },
  {
    name: 'ES6 Sets',
    type: 'link'
  },

  {
    name: 'Gulp Nunjucks',
    type: 'link'
  }
]

export default nav
```

`src/lib/Nav/index.svelte`

```svelte
<script type="ts">
  import { base } from '$app/paths'
  import { menu } from '../../stores'
  import { browser } from '$app/env'
  import Nav from './nav'
  import slugify from 'slugify'

  // https://stackoverflow.com/questions/70221671/enable-and-disable-scroll-based-on-boolean-in-sveltekit
  let scrollTop = null
  let scrollLeft = null

  function disableScroll() {
    if (browser) {
      scrollTop = window.pageYOffset || window.document.documentElement.scrollTop
      ;(scrollLeft = window.pageYOffset || window.document.documentElement.scrollLeft),
        (window.onscroll = function () {
          window.scrollTo(scrollLeft, scrollTop)
        })
    }
  }

  function enableScroll() {
    if (browser) {
      window.onscroll = function () {}
    }
  }

  function handleResize() {
    enableScroll()
  }

  $: if (browser && window.innerWidth >= 850) {
    enableScroll()
  } else if ($menu === 'visible') {
    disableScroll()
  } else {
    enableScroll()
  }
</script>

<svelte:window on:resize={handleResize} />

<nav class={$menu} hidden={$menu === 'hidden'}>
  <ul>
    {#each Nav as item}
      {#if item.type === 'heading'}
        <li class="topic">{item.name}</li>
      {:else}
        <li>
          {#if item.name === 'Home'}
            <a href={base + '/'}>{item.name}</a>
          {:else}
            <a href={base + '/' + slugify(item.name.toLowerCase())}>{item.name}</a>
          {/if}
        </li>
      {/if}
    {/each}
  </ul>
</nav>

<style lang="scss">
  nav {
    background-color: var(--color-nav-bg);
    color: var(--color-bright);
    padding: 3.2rem 0 6.4rem 3.2rem;
    position: fixed;
    height: 100vh;
    top: var(--nav-h);
    width: 100%;
    z-index: 1000;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        margin-top: 0.75rem;
        padding: 0;

        &.topic {
          font-size: 110%;
          font-weight: bold;
          margin-top: 1.5rem;
          text-transform: uppercase;
        }

        &:first-child {
          margin-top: 0;
        }

        a {
          color: var(--color-bright);
          text-decoration: none;
        }

        a:focus,
        a:hover {
          text-decoration: underline;
        }
      }
    }

    @media screen and (min-width: 850px) {
      padding-top: calc(var(--nav-h) * 2);
      top: 0;
      width: var(--nav-w);
    }
  }
</style>
```
