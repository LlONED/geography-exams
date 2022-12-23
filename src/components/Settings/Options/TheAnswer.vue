<template>
  <setting-input-select
    :description="localization.settingDescAnswerField"
    :defaultOption="{
      view: localization[fieldConvertLocalization(answerField)],
      value: answerField,
    }"
    :options="accessFields"
    @input="setAnswerField"
  />
</template>

<script setup>
  import { computed } from "vue";

  import SettingInputSelect from "@/components/Settings/SettingInputSelect.vue";

  import { mapGetters, mapMutations } from "@/hooks/useMapsVuex";

  import { fieldConvertLocalization } from "@/utils/field";

  const { localization } = mapGetters("localization");

  const { answerField, questionField, fields } = mapGetters("settings");
  const { setAnswerField } = mapMutations("settings");

  const accessFields = computed(() =>
    Object.keys(fields.value)
      .filter((e) => e !== questionField.value)
      .map((e) => ({
        view: localization.value[fieldConvertLocalization(e)],
        value: e,
      }))
  );
</script>
