<template>
  <setting-input-select
    :description="localization.settingDescQuestionField"
    :defaultOption="{
      view: localization[fieldConvertLocalization(questionField)],
      value: questionField,
    }"
    :options="accessFields"
    @input="setQuestionField"
  />
</template>

<script setup>
  import { computed } from "vue";

  import SettingInputSelect from "@/components/Settings/SettingInputSelect.vue";

  import { mapGetters, mapMutations } from "@/hooks/useMapsVuex";

  import { fieldConvertLocalization } from "@/utils/field";

  const { localization } = mapGetters("localization");

  const { answerField, questionField, fields } = mapGetters("settings");
  const { setQuestionField } = mapMutations("settings");

  const accessFields = computed(() =>
    Object.keys(fields.value)
      .filter((e) => e !== answerField.value)
      .map((e) => ({
        view: localization.value[fieldConvertLocalization(e)],
        value: e,
      }))
  );
</script>
