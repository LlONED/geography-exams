<template>
  <v-loader position="absolute" :status="status">
    <img :class="imgClass" :src="src" :alt="alt" />
  </v-loader>
</template>

<script>
  import { loadingStatusType } from "@/types/loading";

  export default {
    name: "VImg",

    data() {
      return {
        status: loadingStatusType.Loading,
      };
    },

    props: {
      imgClass: {
        type: String,
        default: "",
      },

      src: {
        type: String,
        required: true,
      },

      alt: {
        type: String,
        required: true,
      },
    },

    emits: {
      error: null,
    },

    methods: {
      loadImage(src = "") {
        this.status = loadingStatusType.Loading;

        const img = new Image();
        img.src = src;

        img.onload = () => {
          this.status = loadingStatusType.Success;
        };

        img.onerror = () => {
          this.status = loadingStatusType.Error;
          this.$emit("error");
        };
      },
    },

    watch: {
      src(value) {
        this.loadImage(value);
      },
    },

    mounted() {
      this.loadImage(this.src);
    },
  };
</script>
