<template>
  <div class="cnt h-[85%] flex flex-col gap-5">
    <v-button class="system-button" @click="$router.push('/')">
      {{ localization.back }}
    </v-button>

    <v-input-text
      class="system-button"
      :placeholder="localization.search"
      :value="search"
      @input="searchInput"
    />

    <div
      class="overflow-scroll md:overflow-auto scrollbar max-w-full h-[590px]"
    >
      <the-table
        class="w-full"
        :countries="currentCountries"
        :fields="fields"
      />
    </div>

    <pagination
      :current="currentPage"
      :total="totalPages"
      @update="currentPage = $event"
    />
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";

  import TheTable from "@/components/CountriesTable/TheTable.vue";

  import { mapGetters } from "@/hooks/useMapsVuex";

  import { isSearchIncludes } from "@/utils/tools";

  const { localization } = mapGetters("localization");
  const { countries, fields } = mapGetters("settings");

  const countriesLimit = 7;
  const currentPage = ref(0);
  const search = ref("");

  const accessCountries = ref(countries.value.filter((c) => isCountryValid(c)));

  const totalPages = ref(
    Math.ceil(accessCountries.value.length / countriesLimit)
  );

  function searchInput(value = "") {
    search.value = value;
    currentPage.value = 0;

    accessCountries.value = countries.value.filter((c) => isCountryValid(c));
    totalPages.value = Math.ceil(accessCountries.value.length / countriesLimit);
  }

  const currentCountries = computed(() =>
    accessCountries.value.slice(
      currentPage.value * countriesLimit,
      currentPage.value * countriesLimit + countriesLimit
    )
  );

  function isCountryValid(c = {}) {
    return isSearchIncludes(
      [
        localization.value[c.name],
        localization.value[c.capital],
        localization.value[c.location],
        c.domain,
        Object.values(c.code).join(" "),
      ],
      search.value
    );
  }
</script>
