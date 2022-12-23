<template>
  <div class="flex-1 flex justify-end">
    <v-input-select
      class="w-14"
      :defaultOption="{ value: currentLang }"
      :options="accessLangs.map((e) => ({ value: e }))"
      @input="setCurrentLang"
    />
  </div>
</template>

<script setup>
  import { mapGetters, mapMutations } from "@/hooks/useMapsVuex";

  const { currentLang, accessLangs } = mapGetters("localization");
  const { setCurrentLang } = mapMutations("localization");
</script>
