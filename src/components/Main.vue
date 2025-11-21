<template>
    <!--about-->
    <section class="md:pb-8 bg-orange-100 shadow-md shadow-white">
        <h3 id="about"
            class="text-xl font-semibold p-4 font-serif flex justify-center text-teal-300 hover:underline underline-offset-4 hover:font-bold hover:text-teal-500">
            A propos</h3>
        <div class="mx-2 px-4 lg:mx-8 z-10 text-black">
            <p class="text-lg font-medium text-center"> Après plusieurs années dans l’armée de terre, j’ai choisi de suivre ma passion pour les nouvelles technologies et de me reconvertir dans le développement web. Curieux et motivé, j’ai retrouvé dans ce métier le goût du challenge et la satisfaction de résoudre des problèmes concrets.
<br>
Aujourd’hui, j’accompagne entreprises et particuliers dans la création de leurs outils numériques. Sérieux et impliqué, je mets mon expérience et ma rigueur au service de vos projets.
<br>
À la recherche d’un développeur motivé et investi ? Contactez-moi et concrétisons ensemble vos idées. </p>


        </div>
    </section>

    <!--projects-->
    <section>
        <h3
            class="text-xl font-semibold m-2 p-4 font-serif flex justify-center text-teal-100 hover:underline underline-offset-4 hover:font-bold hover:text-teal-200">
            Mes projets web</h3>
        <article class="relative flex justify-center mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
            id="projects">

            <div v-for="(projets, index) in projects" :key="index"
                 class="projectElement grid grid-cols-1 gap-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 xl:gap-x-8">
                <article class="group grid m-3">
                    <img class="aspect-square w-xl rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                        :src="projets.img" :alt="projets.title" @click="openModal(projets.img)" style="cursor:pointer">
                    <h3 class="mt-4 text-center self-center text-lg font-medium text-gray-700">{{ projets.title }}</h3>
                    <a class="mt-1 text-center text-lg text-gray-900 justify-self-center" :href="projets.link">lien
                        GitHub</a>
                    <p class="mt-1 text-center text-sm text-gray-500">{{ projets.techno }}</p>
                </article>
                
            </div>

            <!-- The Modal -->
           <div v-if="showModal" class="modal flex flex-col absolute top-10 m-auto w-md-3/4 z-10 bg-white rounded shadow-lg">
    <span
      class="close absolute top-2 right-4 text-4xl text-gray-700 cursor-pointer z-20"
      @click="closeModal"
      aria-label="Fermer la fenêtre"
    >&times;</span>
    <img class="modal-content w-full block" :src="modalImg" alt="Aperçu projet">
</div>
        </article>

    </section>

    <!-- form contact -->
   <ContactForm></ContactForm>

    <div class="flex justify-center m-2">
        <a href="#haut">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6 w-10 h-10 animate-bounce">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </a>
    </div>
</template>

<script setup>
import ContactForm from './ContactForm.vue'
import { ref, onMounted } from 'vue'

const projects = ref([]);

onMounted(async () => {
  try {
    // Récupération des données depuis l'API Notion
    const response = await fetch('https://gb-portfolio.fly.dev/api/notion');
    const data = await response.json();


   // Adaptation de la structure Notion aux propriétés Vue
    projects.value = data.results.map(page => ({
        
      title:
        page.properties.Projets?.title &&
        page.properties.Projets.title.length > 0
          ? page.properties.Projets.title[0].plain_text
          : "Sans titre",
   
      img:
        page.properties.Images?.rich_text &&
        page.properties.Images.rich_text.length > 0
          ? page.properties.Images.rich_text[0].plain_text.trim()
          : "",
      link: page.properties.GitHub?.url || "#",
      techno:
        page.properties.Techno?.rich_text &&
        page.properties.Techno.rich_text.length > 0
          ? page.properties.Techno.rich_text.map(r => r.plain_text).join(' ')
          : "",
    }));

  } catch (error) {
    console.error(error);
  }
});

const showModal = ref(false);
const modalImg = ref("");
function openModal(img) {
  modalImg.value = img;
  showModal.value = true;
}
function closeModal() {
  showModal.value = false;
  modalImg.value = "";
}

</script>