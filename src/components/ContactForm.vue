<template>
     <!-- form contact -->
     <section class="mb-5 grid justify-center">
        <h3 id="contact"
            class="text-xl font-semibold m-2 font-serif flex justify-center text-teal-100 hover:underline underline-offset-4 hover:font-bold hover:text-teal-200">
            Contact</h3>
        <div class="grid justify-items-center sm:border sm:p-6 rounded-2xl">
            <!-- Message de succès -->
            <div v-if="showSuccessMessage" class="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                ✓ Votre message a été envoyé avec succès !
            </div>
            <!-- Message d'erreur -->
            <div v-if="showErrorMessage" class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                ✗ Une erreur est survenue. Veuillez réessayer.
            </div>
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
                    <button class="rounded-xl bg-teal-800 p-2 hover:bg-cyan-900 disabled:opacity-50 disabled:cursor-not-allowed"
                            type="submit"
                            :disabled="isSending">
                        {{ isSending ? 'Envoi en cours...' : 'Envoyer' }}
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>

//TODO sur emailjs.com creer service, template et public key
import emailjs from '@emailjs/browser';

export default {
  data() {
    return {
      isSending: false,
      showSuccessMessage: false,
      showErrorMessage: false,
    };
  },
  methods: {
    sendEmail() {
      this.isSending = true;
      this.showSuccessMessage = false;
      this.showErrorMessage = false;

      emailjs
        .sendForm('service_bitkhsi', 'template_jrfsgui', this.$refs.form, {
          publicKey: 'QvF3nRJBVwARHah4s',
        })
        .then(
          () => {
            console.log('SUCCESS!');
            this.showSuccessMessage = true;
            this.$refs.form.reset(); // Vider le formulaire

            // Masquer le message après 5 secondes
            setTimeout(() => {
              this.showSuccessMessage = false;
            }, 5000);
          },
          (error) => {
            console.log('FAILED...', error.text);
            this.showErrorMessage = true;

            // Masquer le message d'erreur après 5 secondes
            setTimeout(() => {
              this.showErrorMessage = false;
            }, 5000);
          },
        )
        .finally(() => {
          this.isSending = false;
        });
    },
  },
};
</script>