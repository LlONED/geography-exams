<template>
  <table class="select-text">
    <thead>
      <tr>
        <td v-for="(field, i) in fieldsKeys" :key="i">
          {{ localization[fieldConvertLocalization(field)] }}
        </td>

        <td>{{ localization.location }}</td>
        <td>iso</td>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(country, i) in props.countries" :key="i" class="h-[70px]">
        <td v-for="(field, j) in fieldsKeys" :key="j">
          <img
            v-if="props.fields[field].type === fieldType.Image"
            height="40"
            alt=""
            class="text-xs m-auto"
            :src="country[field]?.replace(/(\d+)px/, () => '40px') || ''"
          />

          <span v-else-if="field === 'name'">
            <a
              class="text-blue-600 hover:text-blue-500 underline"
              target="_blank"
              :href="country.wiki"
            >
              {{ localization[country[field]] }}
            </a>
          </span>

          <span v-else>
            {{
              props.fields[field].type === fieldType.TextSourse
                ? country[field] || "-"
                : localization[country[field]] || "-"
            }}
          </span>
        </td>

        <td>
          {{ localization[country.location] || "-" }}
        </td>

        <td class="text-xs">
          <span>{{ country.code.number || "-" }}</span>
          <br />
          <span>{{ country.code.iso2 || "-" }}</span>
          <br />
          <span>{{ country.code.iso3 || "-" }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
  import { computed } from "vue";

  import { mapGetters } from "@/hooks/useMapsVuex";

  import { fieldConvertLocalization } from "@/utils/field";

  import { fieldType } from "@/types/fields";

  const { localization } = mapGetters("localization");

  const props = defineProps({
    countries: {
      type: Array,
      required: true,
    },

    fields: {
      type: Object,
      required: true,
    },
  });

  const fieldsKeys = computed(() => Object.keys(props.fields));
</script>

<style scoped>
  td:nth-child(1) {
    @apply w-[200px];
  }

  td:nth-child(2) {
    @apply w-[140px];
  }

  td {
    @apply relative h-[70px] w-14 border text-center p-1;
  }
</style>
