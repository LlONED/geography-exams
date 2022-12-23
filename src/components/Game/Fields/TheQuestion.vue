<template>
  <div class="w-full flex flex-col items-center flex-wrap gap-3">
    <div class="flex gap-4">
      <div class="aside-item bg-zinc-700">
        {{ props.countriesProgress }}
      </div>

      <div class="flex rounded overflow-hidden">
        <div class="bg-green-700 flex items-center px-2">
          {{ successCount }}
        </div>
        <div class="bg-orange-700 flex items-center px-2">
          {{ hintsUsedCount }}
        </div>
        <div class="bg-red-700 flex items-center px-2">
          {{ props.errorsCount }}
        </div>
      </div>

      <v-button
        class="aside-item"
        type="warning"
        :disabled="props.hintsCount === 0 || showAnswer === true"
        @click="emit('hintUsed')"
      >
        {{ props.hintsCount < 0 ? "*" : props.hintsCount }}
      </v-button>

      <a
        class="aside-item text-blue-700 bg-white hover:opacity-90 cursor-pointer"
        target="_blank"
        :href="props.wiki"
      >
        w
      </a>
    </div>

    <div
      v-if="props.type === fieldType.Image"
      class="md:w-[700px] h-[440px] flex justify-center items-center relative"
    >
      <v-img
        :imgClass="'rounded max-w-full max-h-full'"
        :alt="props.question"
        :src="props.question"
      />
    </div>
    <div
      v-else
      class="w-full h-[200px] flex justify-center items-center text-lg"
    >
      <h1 class="p-2 bg-zinc-700 rounded flex justify-center">
        {{
          props.type === fieldType.TextSourse
            ? props.question
            : localization[props.question]
        }}
      </h1>
    </div>
  </div>
</template>

<script setup>
  import { fieldType } from "@/types/fields";
  import { mapGetters } from "@/hooks/useMapsVuex";

  const { localization } = mapGetters("localization");

  const props = defineProps({
    type: {
      type: String,
      required: true,
    },

    hintsCount: {
      type: Number,
      required: true,
    },

    showAnswer: {
      type: Boolean,
      required: true,
    },

    errorsCount: {
      type: Number,
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

    countriesProgress: {
      type: String,
      required: true,
    },

    question: {
      type: String,
      required: true,
    },

    wiki: {
      type: String,
      required: true,
    },
  });

  const emit = defineEmits({
    hintUsed: null,
  });
</script>

<style scoped>
  .aside-item {
    @apply p-1 rounded flex justify-center items-center min-w-[40px];
  }
</style>
