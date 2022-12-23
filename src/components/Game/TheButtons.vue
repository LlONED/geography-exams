<template>
  <div class="flex flex-col gap-3">
    <v-button v-if="isEnd" class="system-button" @click="emits('restart')">
      {{ localization.restart }}
    </v-button>

    <v-button
      v-else
      class="system-button"
      :disabled="props.isNextDisabled"
      @click="emits('next')"
    >
      {{ localization.next }}
    </v-button>

    <v-button class="system-button" type="danger" @click="emits('exit')">
      {{ localization.exitMessage }}
    </v-button>
  </div>
</template>

<script setup>
  import { mapGetters } from "@/hooks/useMapsVuex";

  const { localization } = mapGetters("localization");

  const props = defineProps({
    isEnd: {
      type: Boolean,
      required: true,
    },

    isNextDisabled: {
      type: Boolean,
      required: true,
    },
  });

  const emits = defineEmits({
    next: null,
    restart: null,
    exit: null,
  });
</script>
