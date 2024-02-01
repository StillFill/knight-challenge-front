<template>
  <div class="remove-knight-confirmation">
    <h1>Tornar cavalheiro um heroi (Remover)</h1>

    <h2>Tem certeza que deseja tornar este cavalheir um heroi?</h2>

    <div class="answer-buttons-container">
      <button
        data-testid="cancel-button"
        class="cancel-button"
        @click="answerConfirmation(false)"
      >
        Cancelar
      </button>
      <button
        data-testid="confirm-button"
        class="confirm-button"
        @click="answerConfirmation(true)"
      >
        Confirmar
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, prop } from "vue-class-component";

class Props {
  answerConfirmation = prop<(answer: boolean) => void>({ required: true });
}

@Options({})
export default class RemoveKnightConfirmation extends Vue.with(Props) {}
</script>

<style src="./RemoveKnightConfirmation.css" />
