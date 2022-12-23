<template>
  <label class="relative">
    <input
      type="checkbox"
      class="input__checkbox appearance-none absolute z-0 top-0 left-0 right-0 bottom-0 focus-visible:outline-offset-1 cursor-pointer"
      :disabled="disabled"
      :checked="checked"
      @change="onChange"
    />
    <span class="w-full h-full bg-red-700 hover:bg-red-600 rounded p-1.5">
      <slot></slot>
    </span>
  </label>
</template>

<script>
  export default {
    name: "VInputCheckbox",

    emits: {
      change: null,
    },

    props: {
      checked: {
        type: Boolean,
        default: true,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },

    methods: {
      onChange(event) {
        this.$emit("change", event.target.checked);
      },
    },
  };
</script>

<style scoped>
  .input__checkbox:checked + span {
    @apply bg-green-700;
  }

  .input__checkbox:hover + span {
    @apply bg-red-600;
  }

  .input__checkbox:checked:hover + span {
    @apply bg-green-600;
  }

  .input__checkbox:disabled + span {
    @apply hidden;
  }
</style>
