<template>
  <div class="cnt h-[85%] flex flex-col justify-center gap-3">
    <v-button class="system-button" @click="$router.push('/game')">
      {{ localization.start }}
    </v-button>

    <v-button class="system-button" @click="$router.push('/countries-table')">
      {{ localization.countriesTable }}
    </v-button>

    <v-button class="system-button" @click="$router.push('/settings')">
      {{ localization.settings }}
    </v-button>
  </div>
</template>

<script setup>
  import { mapGetters } from "@/hooks/useMapsVuex";

  const { localization } = mapGetters("localization");
</script>

<style scoped></style>
