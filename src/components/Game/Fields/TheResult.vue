<template>
  <div class="flex flex-col items-center">
    <h1 class="w-full flex justify-center items-center">
      {{ localization.result }}
    </h1>

    <p class="result__item">
      <span>{{ localization.success }}:</span> <span>{{ successCount }}</span>
    </p>

    <p class="result__item">
      <span>{{ localization.withHint }}:</span>
      <span>{{ hintsUsedCount }}</span>
    </p>

    <p class="result__item">
      <span>{{ localization.errors }}:</span> <span>{{ errorsCount }}</span>
    </p>
  </div>
</template>

<script setup>
  import { mapGetters } from "@/hooks/useMapsVuex";

  const { localization } = mapGetters("localization");

  const props = defineProps({
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
  });
</script>

<style scoped>
  .result__item {
    @apply w-full md:w-2/3 flex justify-between;
  }
</style>
