<template>
  <input
    class="min-h-[25px] text-center rounded"
    type="number"
    :value="value"
    :placeholder="placeholder"
    :min="min"
    :max="max"
    @input="input"
  />
</template>

<script>
  export default {
    name: "VInputNumber",

    emits: {
      input: null,
    },

    props: {
      value: {
        type: Number,
        default: "",
      },

      placeholder: {
        type: String,
        default: "",
      },

      min: {
        type: [Number, String],
        require: false,
      },

      max: {
        type: [Number, String],
        require: false,
      },
    },

    methods: {
      input(event) {
        const value = +event.target.value;

        if (this.min && value < this.min) {
          event.target.value = this.min;
          return;
        }

        if (this.max && value > this.max) {
          event.target.value = this.max;
          return;
        }

        this.$emit("input", value);
      },
    },
  };
</script>

<style scoped>
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    @apply opacity-100;
  }
</style>
