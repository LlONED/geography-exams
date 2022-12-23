<template>
  <TheResultField
    v-if="props.isEnd"
    :successCount="props.successCount"
    :hintsUsedCount="props.hintsUsedCount"
    :errorsCount="props.errorsCount"
  />

  <div v-else class="flex flex-col justify-center gap-5">
    <TheQuestionField
      :type="props.questionType"
      :successCount="props.successCount"
      :hintsUsedCount="props.hintsUsedCount"
      :errorsCount="props.errorsCount"
      :hintsCount="props.hintsCount"
      :countriesProgress="props.countriesProgress"
      :showAnswer="props.showAnswer"
      :question="props.question"
      :wiki="props.wiki"
      @hintUsed="emit('hintUsed')"
    />

    <TheAnswerField
      :type="props.answerType"
      :showAnswer="props.showAnswer"
      :selectedAnswer="props.selectedAnswer"
      :answer="props.answer"
      :answers="props.answers"
      @select="emit('select', $event)"
    />
  </div>
</template>

<script setup>
  import TheResultField from "@/components/Game/Fields/TheResult.vue";
  import TheAnswerField from "@/components/Game/Fields/TheAnswer.vue";
  import TheQuestionField from "@/components/Game/Fields/TheQuestion.vue";

  const props = defineProps({
    isEnd: {
      type: Boolean,
      required: true,
    },

    showAnswer: {
      type: Boolean,
      required: true,
    },

    questionType: {
      type: String,
      required: true,
    },

    answerType: {
      type: String,
      required: true,
    },

    wiki: {
      type: String,
      required: true,
    },

    question: {
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

    selectedAnswer: {
      type: String,
      required: true,
    },

    countriesProgress: {
      type: String,
      required: true,
    },

    successCount: {
      type: Number,
      required: true,
    },

    hintsUsedCount: {
      type: Number,
      required: true,
    },

    errorsCount: {
      type: Number,
      required: true,
    },

    hintsCount: {
      type: Number,
      required: true,
    },
  });

  const emit = defineEmits({
    select: null,
    hintUsed: null,
  });
</script>
