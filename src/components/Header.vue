<template>
    <!-- navbar -->
    <Disclosure as="nav" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <!-- Mobile menu button-->
                    <DisclosureButton
                        class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-800 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                        <span class="absolute -inset-0.5" />
                        <span class="sr-only">Open main menu</span>
                        <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
                        <XMarkIcon v-else class="block size-6" aria-hidden="true" />
                    </DisclosureButton>
                </div>
                <div class="flex flex-1 items-center justify-center sm:items-stretch">
                    <div class="flex shrink-0 items-center">
                        <img class="h-8 w-auto" src="./icons/LogoGB.png" alt="Logo Guillaume Boyer" />
                    </div>
                    <div class="hidden sm:ml-6 sm:block">
                        <div class="flex space-x-4">
                            <a v-for="item in navigation" :key="item.name" :href="item.href"
                                :class="[item.current ? 'bg-gray-800 text-white' : 'text-gray-800 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']"
                                :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <DisclosurePanel class="sm:hidden">
            <div class="space-y-1 px-2 pt-2 pb-3">
                <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href"
                    :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-800 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
                    :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
            </div>
        </DisclosurePanel>
    </Disclosure>

    <!-- baniere -->
    <div class="baniere img-fluid grid w-full h-96 content-center bg-cover bg-no-repeat">
        <div>
            <h1 class="text-4xl font-extrabold m-4 p-4 font-serif md:my-12 md:mx-4"><span
                    class="bg-clip-text text-transparent bg-orange-500">Guillaume Boyer</span>
            </h1>
        </div>
        <div class="justify-self-end">
            <h3 class="text-4xl font-bold m-4 p-4 font-serif md:my-12 md:mx-4"><span
                    class="bg-clip-text text-transparent bg-orange-500">Développeur Web</span></h3>
        </div>
    </div>

   <!-- experience et technos --> 
    <section class="bg-black flex flex-col md:flex-row justify-center items-center m-3 rounded-lg">
        <div class="w-1/4 flex flex-col text-center justify-center md:align-center">
            <h2 class="font-bold text-xl">EXP</h2>
            <p>{{experience}}</p>
        </div>
        <div class="w-1/4 flex flex-col text-center justify-center">
            <h2 class="font-bold text-xl">Techno : <span id="projects"></span></h2>
        </div>
        <div class="scroll flex">
            <!-- TODO ajoute/suppression technos-->
            <div class="flex flex-wrap lg:flex-nowrap lg:justify-end py-6 items-center gap-x-4 md:gap-x-8 z-0">
                <img class="max-h-12 w-auto mx-1 p-1 object-contain" src="./icons/techno/html-1.svg" alt="logo html">
                <img class="max-h-12 w-auto mx-1 p-1 object-contain" src="./icons/techno/css-3.svg" alt="logo css">
                <img class="max-h-12 w-auto mx-1 p-1 object-contain" src="./icons/techno/javascript-1.svg" alt="lago javascript">
                <img class="max-h-12 w-auto mx-1 p-1 object-contain" src="./icons/techno/PHP-logo.svg" alt="logo php">
                <img class="max-h-12 w-auto mx-1 p-1 object-contain" src="./icons/techno/tailwindcss.png" alt="logo tailwindcss">
                <img class="max-h-12 w-auto mx-1 p-1 object-contain" src="./icons/techno/vue-9.svg" alt="logo vue js">
                <img class="max-h-12 w-auto mx-1 object-contain" src="./icons/techno/laravel.svg" alt="logo Laravel">
                <img class="max-h-12 w-auto mx-1 p-1 object-contain" src="./icons/techno/git-icon.svg" alt="logo git">
                <img class="max-h-16 w-auto mx-1 object-contain" src="./icons/techno/docker-4.svg" alt="logo docker">
            </div>
        </div>
    </section>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const navigation = [
    { name: 'A Propos', href: '#about', current: true },
    { name: 'Projets', href: '#projects', current: false },
    { name: 'Contact', href: '#contact', current: false },
]

const experience = calculateExperience();

function calculateExperience(startDate = new Date()) {
    const now = new Date();
    const years = Math.floor((now - startDate) / (1000 * 60 * 60 * 24 * 365.25));
    
    let niveau;
    if (years < 3) {
        niveau = "Junior";
    } else if (years < 5) {
        niveau = "Confirmé";
    } else {
        niveau = "Senior";
    }
    
    return niveau
}
</script>

<style scoped>
.baniere {
    background-image: url('./icons/baniere.jpg');
}
</style>