<template>
  <div>
    <div class="menuPrincipal">
      <div class="menuTitulo">
        <h2>OscArcos</h2>
        <p>Jobs Match</p>
      </div>
      <div class="menuOpciones">
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/about">About Me</NuxtLink></li>
        </ul>
      </div>
    </div>
    <Nuxt />
  </div>
</template>

<style>
.menuPrincipal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  background-color: rgba(0, 0, 0, 0.63);
  color: white;
}
.menuTitulo {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 200ms;
}
.menuTitulo h2, p {
  margin: 0 1rem;
}
.menuTitulo:hover {
  letter-spacing: 1px;
}
/* home route and active route will show in bold as it matches / and /about */
a.nuxt-link-active {
  font-weight: bold;
}
/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-exact-active {
  color: #00c58e;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  margin: 0;
}

main {
  margin: 0 auto;
  padding: 0 1rem;
  margin-top: 100px;
  max-width: 1280px;
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
li {
  margin: 0 0.5rem;
  padding: 0.25rem;
  font-size: 1.2rem;
}

a,
a:visited {
  text-decoration: none;
  color: inherit;
}

a:hover {
  color: #cddc39;
}
</style>
