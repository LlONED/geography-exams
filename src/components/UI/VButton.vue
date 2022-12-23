<template>
  <button type="button" :class="className">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: "VButton",

    props: {
      type: {
        type: String,
        default: "default",
      },
    },

    computed: {
      className() {
        const colors = {
          default: {
            bg: "bg-zinc-700",
            hover: "hover:bg-zinc-600",
            disabled: "disabled:hover:bg-zinc-700",
          },
          danger: {
            bg: "bg-red-700",
            hover: "hover:bg-red-600",
            disabled: "disabled:hover:bg-red-700",
          },
          warning: {
            bg: "bg-orange-700",
            hover: "hover:bg-orange-600",
            disabled: "disabled:hover:bg-orange-700",
          },
          success: {
            bg: "bg-green-700",
            hover: "hover:bg-green-600",
            disabled: "disabled:hover:bg-green-700",
          },
        };

        return `${Object.values(colors[this.type]).join(
          " "
        )} border-none rounded`;
      },
    },
  };
</script>

<style scoped>
  button:disabled {
    @apply opacity-70 text-zinc-300;
  }
</style>
