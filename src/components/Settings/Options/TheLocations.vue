<template>
  <setting-item :description="localization.settingDescLocation">
    <div class="flex gap-2 flex-wrap">
      <v-input-checkbox
        class="flex"
        v-for="(location, i) in Object.keys(locations)"
        :key="i"
        :checked="locations[location].isEnabled"
        @change="
          setLocationIsEnabled({ locationName: location, isEnabled: $event })
        "
      >
        {{ localization[location] }}
      </v-input-checkbox>
    </div>
  </setting-item>
</template>

<script setup>
  import SettingItem from "@/components/Settings/SettingItem.vue";
  import { mapGetters, mapMutations } from "@/hooks/useMapsVuex";

  const { locations } = mapGetters("settings");
  const { localization } = mapGetters("localization");
  const { setLocationIsEnabled } = mapMutations("settings");
</script>
