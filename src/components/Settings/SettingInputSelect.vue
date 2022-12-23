<template>
  <setting-item :description="props.description">
    <v-input-select
      class="min-w-[165px]"
      bgColor="bg-zinc-800"
      hoverClass="hover:bg-zinc-900"
      :defaultOption="props.defaultOption"
      :options="props.options"
      @input="emit('input', $event)"
    />
  </setting-item>
</template>

<script setup>
  import SettingItem from "@/components/Settings/SettingItem.vue";

  const props = defineProps({
    description: {
      type: String,
      required: true,
    },

    defaultOption: {
      type: Object,
      required: true,
    },

    options: {
      type: Array,
      required: true,
    },
  });

  const emit = defineEmits({
    input: null,
  });
</script>
