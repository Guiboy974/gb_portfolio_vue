<template>
    <!--about-->
    <section class="md:pb-8 bg-orange-100 shadow-md shadow-white">
        <h3 id="about"
            class="text-xl font-semibold p-4 font-serif flex justify-center text-teal-300 hover:underline underline-offset-4 hover:font-bold hover:text-teal-500">
            A propos</h3>
        <div class="mx-2 px-4 lg:mx-8 z-10 text-black">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nihil distinctio autem quam amet
                ratione ipsam earum commodi dicta accusamus, assumenda sapiente? Aliquid atque natus enim similique
                nostrum ullam voluptates.
                Quasi quaerat quo eum at molestias reprehenderit omnis! Error cum voluptas animi necessitatibus
                corporis. Tenetur porro expedita, quibusdam nobis atque illo voluptatibus ut culpa ex, neque
                adipisci sit architecto. Dolore.
                Doloremque enim beatae, est ad quos nesciunt! Neque natus dolore quis voluptas quos cupiditate cum
                voluptate ducimus repellendus aliquam ex atque doloribus officia perspiciatis eius placeat minima,
                facilis quisquam dolor!
                Architecto repudiandae non odit blanditiis laboriosam explicabo quis nobis dolores nisi recusandae
                expedita iste at, ullam ducimus possimus praesentium sequi eius earum nulla! Nulla corporis magni
                aperiam ipsum cupiditate beatae!</p>
        </div>
    </section>

    <!--projects-->
    <section>
        <h3
            class="text-xl font-semibold m-2 p-4 font-serif flex justify-center text-teal-100 hover:underline underline-offset-4 hover:font-bold hover:text-teal-200">
            Mes projets web</h3>
        <article class="relative flex justify-center mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
            id="projects">

            <div v-for="(project, index) in projects" :key="index"
                 class="projectElement grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                <article class="group grid">
                    <img class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                        src="#" alt="{{project.title}}">
                    <h3 class="mt-4 text-center self-center text-lg font-medium text-gray-700">{{projets.title}}</h3>
                    <a class="mt-1 text-center text-lg text-gray-900 justify-self-center" href="{{projets.link}}">lien
                        GitHub</a>
                </article>
            </div>

            <!-- The Modal -->
            <div id="myModal" class="modal flex flex-col hidden absolute top-10 m-auto w-md-3/4 z-10">
                <span class="close text-4xl w-full text-right">&times;</span>
                <img class="modal-content w-full block" id="imgProj">
            </div>
        </article>

    </section>

    <!-- form contact -->
    <section class="mb-5 grid justify-center">
        <h3 id="contact"
            class="text-xl font-semibold m-2 font-serif flex justify-center text-teal-100 hover:underline underline-offset-4 hover:font-bold hover:text-teal-200">
            Contact</h3>
        <div class="grid justify-items-center sm:border sm:p-6 rounded-2xl">
            <form action="#" method="post" class="m-4">
                <div class="flex items-center justify-between space-x-4">
                    <label for="nomPrenom">Nom Prenom :</label>
                    <input type="text" name="name" id="nomPrenom">
                </div>
                <br>
                <div class="flex items-center justify-between space-x-4">
                    <label for="entreprise">Entreprise :</label>
                    <input type="text" name="enterprise" id="entreprise">
                </div>
                <br>
                <div class="flex items-center justify-between space-x-4">
                    <label for="email">Email :</label>
                    <input type="email" name="mail" id="email">
                </div>
                <br>
                <div class="flex items-center justify-between space-x-4">
                    <label for="telephone">Téléphone :</label>
                    <input type="number" name="phoneNumber" id="telephone">
                </div>
                <br>
                <div class="flex items-center justify-between space-x-4">
                    <label for="message">Message :</label>
                    <textarea name="messages" id="message"></textarea>
                </div>
            </form>
        </div>
    </section>

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

import ref from 'vue'

const response = await fetch("projects.json");
const projects = await response.json();

</script>