<template>
  <v-button class="relative overflow-hidden" :disabled="disabled">
    <div class="relative z-10">
      <slot></slot>
    </div>

    <div
      class="absolute h-full w-0 z-0 top-0 left-0 bg-zinc-500"
      :style="{
        transition: disabled ? '' : `width ${delay}s`,
        width: disabled ? '0%' : '100%',
      }"
    ></div>
  </v-button>
</template>

<script>
  let timeout = null;

  export default {
    name: "VButtonDelay",

    props: {
      delay: {
        type: Number,
        required: true,
      },

      disabled: {
        type: Boolean,
        required: true,
      },
    },

    watch: {
      disabled(v) {
        if (v === true) {
          if (timeout !== null) {
            clearTimeout(timeout);
            timeout = null;
          }
          return;
        }

        timeout = setTimeout(() => this.$emit("click"), this.delay * 1000);
      },
    },
  };
</script>
