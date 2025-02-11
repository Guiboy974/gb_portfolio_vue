<template>
     <!-- form contact -->
     <section class="mb-5 grid justify-center">
        <h3 id="contact"
            class="text-xl font-semibold m-2 font-serif flex justify-center text-teal-100 hover:underline underline-offset-4 hover:font-bold hover:text-teal-200">
            Contact</h3>
        <div class="grid justify-items-center sm:border sm:p-6 rounded-2xl">
            <form ref="form" @submit.prevent="sendEmail" class="m-4">
                <div class="flex items-center justify-between space-x-4">
                    <label for="nomPrenom">Nom Prenom :</label>
                    <input class="rounded bg-white grow text-black" type="text" name="name" id="nomPrenom" required>
                </div>
                <br>
                <div class="flex items-center justify-between space-x-4">
                    <label for="entreprise">Entreprise :</label>
                    <input class="rounded bg-white grow text-black" type="text" name="enterprise" id="entreprise">
                </div>
                <br>
                <div class="flex items-center justify-between space-x-4">
                    <label for="email">Email :</label>
                    <input class="rounded bg-white grow text-black" type="email" name="mail" id="email" required>
                </div>
                <br>
                <div class="flex items-center justify-between space-x-4">
                    <label for="message">Message :</label>
                    <textarea class="rounded bg-white grow text-black" name="messages" id="message" required></textarea>
                </div>
                <div class="flex items-center justify-center m-4">
                    <button class="rounded-xl bg-teal-800 p-2 hover:bg-cyan-900" type="submit">Envoyer</button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>

//TODO sur emailjs.com creer service, template et public key
import emailjs from '@emailjs/browser';

export default {
  methods: {
    sendEmail() {
      emailjs
        .sendForm('service_kqgv12e', 'template_nvvlryp', this.$refs.form, {
          publicKey: '76OjK4gabUbckqQuL',
        })
        .then(
          () => {
            console.log('SUCCESS!');
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
    },
  },
};
</script>