<template>
  <div :class="className" v-if="status === loadingStatusType.Loading">
    <span> loading... </span>
  </div>

  <slot v-else-if="status === loadingStatusType.Success"></slot>

  <div :class="className" v-else>
    <span> something went wrong :( </span>
  </div>
</template>

<script>
  import { loadingStatusType } from "@/types/loading";

  export default {
    name: "VLoader",

    props: {
      status: {
        type: String,
        required: true,
      },

      position: {
        type: String,
        default: "fixed",
      },
    },

    computed: {
      loadingStatusType() {
        return loadingStatusType;
      },

      className() {
        return `${this.position} w-full h-full top-0 left-0 bg-zinc-900 flex justify-center items-center`;
      },
    },
  };
</script>
