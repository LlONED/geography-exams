<template>
  <div class="flex flex-col gap-3">
    <v-button v-if="isEnd" class="system-button" @click="emits('restart')">
      {{ localization.restart }}
    </v-button>

    <v-button-delay
      v-else-if="autoNextDelay !== 0"
      class="system-button"
      :delay="autoNextDelay"
      :disabled="props.isNextDisabled"
      @click="emits('next')"
    >
      {{ localization.next }}
    </v-button-delay>

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
  const { autoNextDelay } = mapGetters("settings");

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
