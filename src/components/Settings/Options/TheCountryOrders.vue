<template>
  <setting-input-select
    :description="localization.countryOrderDesc"
    :defaultOption="{
      view: localization[countryOrder],
      value: countryOrder,
    }"
    :options="validCountryOrders"
    @input="setCountryOrder"
  />
</template>

<script setup>
  import SettingInputSelect from "@/components/Settings/SettingInputSelect.vue";
  import { mapGetters, mapMutations } from "@/hooks/useMapsVuex";
  import { computed } from "vue";

  const { localization } = mapGetters("localization");

  const { countryOrder, countryOrders } = mapGetters("settings");
  const { setCountryOrder } = mapMutations("settings");

  const validCountryOrders = computed(() =>
    countryOrders.value.map((e) => ({ view: localization.value[e], value: e }))
  );
</script>
