<template>
  <button
    :class="className.cnt"
    @blur="open = false"
    @click="clickHandler()"
    @keydown="toggleAciveSelect($event)"
  >
    <div :class="className.btn">
      <span>{{ defaultOption.view || defaultOption.value }}</span>
      <span class="scale-75">&#9660;</span>
    </div>

    <div :class="className.popup" v-show="open">
      <div
        v-for="(option, i) in options"
        :key="i"
        :class="{
          button__select: true,
          [hoverClass]: option.value === selectedOption ? false : true,
          active: option.value === selectedOption,
        }"
        @click.stop="select(option.value)"
      >
        {{ option.view || option.value }}
      </div>
    </div>
  </button>
</template>

<script>
  export default {
    name: "VInputSelect",

    data() {
      return {
        open: false,
        selectedOption: this.defaultOption.value,
      };
    },

    props: {
      options: {
        type: Array,
        required: true,
      },
      defaultOption: {
        type: Object,
        required: true,
      },
      bgColor: {
        type: String,
        default: "bg-zinc-700",
      },
      hoverClass: {
        type: String,
        default: "hover:bg-zinc-600",
      },
    },

    computed: {
      className() {
        return {
          cnt: `relative rounded input__select ${this.bgColor}`,
          btn: `button__select ${this.hoverClass}`,
          popup: "absolute z-10 w-full flex flex-col rounded-b " + this.bgColor,
        };
      },
    },

    methods: {
      clickHandler() {
        this.open = !this.open;
        if (this.selectedOption !== this.defaultOption.value) {
          this.select(this.selectedOption);
        }
      },
      toggleAciveSelect(e) {
        if (this.open === false) return;

        switch (e.code) {
          case "KeyW":
          case "ArrowUp": {
            e.preventDefault();
            let index = this.options.findIndex(
              (el) => el.value === this.selectedOption
            );
            if (index === 0) {
              this.selectedOption = this.options.at(-1).value;
              return;
            }
            this.selectedOption = this.options[index - 1].value;
            return;
          }
          case "KeyS":
          case "ArrowDown": {
            e.preventDefault();
            let index = this.options.findIndex(
              (el) => el.value === this.selectedOption
            );
            if (index === this.options.length - 1) {
              this.selectedOption = this.options[0].value;
              return;
            }
            this.selectedOption = this.options[index + 1].value;
            return;
          }
        }
      },
      select(name) {
        if (name === this.defaultOption.value) {
          this.open = false;
          return;
        }
        this.selectedOption = name;
        this.$emit("input", name);
        this.open = false;
      },
    },

    watch: {
      defaultOption() {
        if (this.selectedOption !== this.defaultOption.value) {
          this.selectedOption = this.defaultOption.value;
        }
      },
      open(value) {
        if (value === false) {
          this.selectedOption = this.defaultOption.value;
        }
      },
    },
  };
</script>

<style scoped>
  .input__select:focus-within,
  .input__select:focus-within > :nth-child(2) {
    outline: -webkit-focus-ring-color auto 1px;
  }
  .button__select {
    @apply w-full h-full py-1 px-2 rounded flex justify-between items-center gap-2;
  }

  .button__select.active {
    @apply bg-green-700 cursor-default;
  }
</style>
