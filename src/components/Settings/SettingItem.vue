<template>
  <div
    class="bg-zinc-700 p-2 rounded flex justify-between items-center flex-wrap gap-2"
  >
    <div>
      <span>
        {{ props.description }}
      </span>
    </div>

    <slot></slot>
  </div>
</template>

<script setup>
  const props = defineProps({
    description: {
      type: String,
      required: true,
    },
  });
</script>
