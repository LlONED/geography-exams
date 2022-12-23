<template>
  <input
    class="min-h-[25px] text-center rounded bg-zinc-700"
    type="text"
    :value="value"
    :placeholder="placeholder"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
  export default {
    name: "VInputText",

    emits: {
      input: null,
    },

    props: {
      value: {
        type: String,
        default: "",
      },

      placeholder: {
        type: String,
        default: "",
      },
    },
  };
</script>
