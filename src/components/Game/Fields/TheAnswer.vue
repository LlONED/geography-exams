<template>
  <div
    class="w-full rounded overflow-hidden flex gap-3 justify-center items-center flex-wrap md:h-[300px]"
    v-if="props.type === fieldType.Image"
  >
    <v-button
      v-for="(answer, i) in props.answers"
      class="p-2 w-1/2 md:w-1/3 md:flex-1 relative flex justify-center items-center min-h-[100px]"
      :key="i"
      :type="validateAnswerType(answer)"
      :disabled="selectedAnswer !== ''"
      @click="emit('select', answer)"
    >
      <v-img :src="answer" :alt="answer" />
    </v-button>
  </div>

  <div class="w-full flex flex-col gap-3" v-else>
    <v-button
      v-for="(answer, i) in props.answers"
      class="system-button"
      :key="i"
      :type="validateAnswerType(answer)"
      :disabled="selectedAnswer !== ''"
      @click="emit('select', answer)"
    >
      {{ props.type === fieldType.TextSourse ? answer : localization[answer] }}
    </v-button>
  </div>
</template>

<script setup>
  import { mapGetters } from "@/hooks/useMapsVuex";
  import { fieldType } from "@/types/fields";

  const { localization } = mapGetters("localization");

  const props = defineProps({
    type: {
      type: String,
      required: true,
    },

    showAnswer: {
      type: Boolean,
      required: true,
    },

    selectedAnswer: {
      type: String,
      required: true,
    },

    answer: {
      type: String,
      required: true,
    },

    answers: {
      type: Array,
      required: true,
    },
  });

  const emit = defineEmits({
    select: null,
  });

  function validateAnswerType(answer) {
    if (props.selectedAnswer !== "" && props.answer === answer)
      return "success";

    if (props.selectedAnswer === answer) return "danger";

    if (
      props.selectedAnswer === "" &&
      props.showAnswer &&
      props.answer === answer
    )
      return "warning";

    return "default";
  }
</script>
