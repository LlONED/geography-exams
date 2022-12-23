<template>
  <div class="cnt h-[85%] flex flex-col gap-5">
    <TheOptionLocations />

    <TheOptionQuestionField />

    <TheOptionAnswerField />

    <v-button class="system-button" @click="swapFields">
      {{ localization.swapFields }}
    </v-button>

    <TheOptionCountryOrders />

    <setting-item :description="localization.hintsCountDesc">
      <v-input-number
        class="bg-zinc-800 w-[165px]"
        min="-1"
        :placeholder="localization.hintsCountDesc"
        :value="hintsCount"
        @input="setHintsCount"
      />
    </setting-item>

    <setting-item :description="localization.answersCount">
      <v-input-number
        class="bg-zinc-800 w-[165px]"
        min="2"
        :placeholder="localization.answersCount"
        :value="answersCount"
        @input="setAnswersCount"
      />
    </setting-item>

    <v-button type="danger" class="system-button" @click="clearLocalStorage">
      {{ localization.clearLocalStorage }}
    </v-button>

    <v-button class="system-button" @click="$router.push('/')">
      {{ localization.back }}
    </v-button>
  </div>
</template>

<script setup>
  import SettingItem from "@/components/Settings/SettingItem.vue";

  import TheOptionLocations from "@/components/Settings/Options/TheLocations.vue";
  import TheOptionAnswerField from "@/components/Settings/Options/TheAnswer.vue";
  import TheOptionQuestionField from "@/components/Settings/Options/TheQuestion.vue";
  import TheOptionCountryOrders from "@/components/Settings/Options/TheCountryOrders.vue";

  import { mapGetters, mapMutations } from "@/hooks/useMapsVuex";

  const { localization } = mapGetters("localization");
  const { hintsCount, answersCount } = mapGetters("settings");
  const { swapFields, setHintsCount, setAnswersCount } =
    mapMutations("settings");

  function clearLocalStorage() {
    if (confirm(localization.value.clearLocalStorageConfirmMessage)) {
      localStorage.clear();
      window.location.href = window.location.href;
    }
  }
</script>
