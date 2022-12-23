<template>
  <div class="flex gap-4 justify-center items-center flex-wrap">
    <div class="cnt__button">
      <v-button
        class="button"
        :disabled="this.current === 0"
        @click="prev(this.skip)"
      >
        &#10094;&#10094;
      </v-button>

      <v-button class="button" :disabled="this.current === 0" @click="prev(1)">
        &#10094;
      </v-button>
    </div>

    <div class="flex gap-1 flex-wrap">
      <v-button
        class="button"
        v-for="(num, i) in numbers"
        :key="i"
        :type="num === this.current ? 'success' : 'default'"
        :disabled="num === this.current"
        @click="update(num)"
      >
        {{ num + 1 }}
      </v-button>
    </div>

    <div class="cnt__button">
      <v-button
        class="button"
        :disabled="this.current === this.total - 1"
        @click="next(1)"
      >
        &#10095;
      </v-button>

      <v-button
        class="button"
        :disabled="this.current === this.total - 1"
        @click="next(this.skip)"
      >
        &#10095;&#10095;
      </v-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Pagination",

    emits: {
      update: null,
    },

    data() {
      return {
        offset: 0,
        limit: this.total < 10 ? this.total || 1 : 10,
        skip: 5,
      };
    },

    props: {
      current: {
        type: Number,
        required: true,
      },

      total: {
        type: Number,
        required: true,
      },
    },

    computed: {
      numbers() {
        return [...Array(this.limit)].map((_, i) => this.offset + i);
      },
    },

    methods: {
      update(num = 0) {
        if (num >= this.total - 1) num = this.total - 1;
        else if (num <= 0) num = 0;

        const offsetUp = num + 2 - this.offset - this.limit;
        const offsetDown = this.offset + 1 - num;

        if (offsetUp > 0 || offsetDown > 0) {
          if (num === this.total - 1) this.offset = this.total - this.limit;
          else if (num === 0) this.offset = 0;
          else if (offsetUp > 0) this.offset += offsetUp;
          else if (offsetDown > 0) this.offset -= offsetDown;
        }

        this.$emit("update", num);
      },

      prev(num) {
        this.update(this.current - num);
      },

      next(num) {
        this.update(this.current + num);
      },
    },

    watch: {
      total(v) {
        this.offset = 0;
        this.limit = v < 10 ? v || 1 : 10;
      },
    },
  };
</script>

<style scoped>
  .cnt__button {
    @apply flex gap-2;
  }
  .button {
    @apply w-10 h-8 flex justify-center items-center;
  }
</style>
