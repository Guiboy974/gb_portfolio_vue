<script setup>
import Header from './components/Header.vue'
import MainPage from './components/Main.vue'
import Footer from './components/Footer.vue';

</script>

<template>
  <header class="grid content-center rounded-2xl w-full" id="haut">
    <Header></Header>
  </header>

  <main>
    <MainPage></MainPage>
 </main>

  <footer>
    <Footer></Footer>
  </footer>
</template>

<style scoped>

</style>
