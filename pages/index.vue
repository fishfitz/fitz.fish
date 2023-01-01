<template>
  <HomepageBackground
    :class="backgroundLoaded ? 'opacity-100' : 'opacity-0'"
    class="transition-opacity duration-3000 ease-in"
    @loaded="backgroundLoaded = true"
  />
  <HomepageCursor />
  <div class="grid h-screen place-items-center text-center text-white">
    <div class="fixed green-shadow p-64 text-focus-in delay-250" />
    <section>
      <h1 class="m-0 text-7xl small-caps font-bold text-focus-in delay-250">
        Fitz.Fish
      </h1>
      <p class="m-0 text-2xl text-focus-in delay-1000">
        A small fish in a big pond
      </p>
      <div class="mt-4 text-focus-in delay-2000">
        <a
          v-for="(link, social) in socials"
          :href="link"
          class="inline-block"
        >
          <img
            :src="`/images/icons/${social}.svg`"
            :alt="social"
            class="w-12 transition-all ease-in-out mx-1"
          >
        </a>
      </div>
    </section>
  </div>
  <div class="focus" />
  <div class="noise" />
</template>

<script setup>
const socials = {
  instagram: 'https://www.instagram.com/fitzfishart/',
  twitter: 'https://twitter.com/fitzfishart',
  email: 'mailto:hello@fitz.fish'
}

const backgroundLoaded = $ref(false)
</script>

<style lang="scss" scoped>
  section {
    text-shadow: var(--background) 1px 0 10px;

    img {
      filter: drop-shadow(0 0 5px var(--background));
    }
  }

  .green-shadow {
    background: radial-gradient(var(--background) 0%, transparent 70%);
  }

  a:hover img {
    filter: drop-shadow(0 0 5px white);
  }
</style>
