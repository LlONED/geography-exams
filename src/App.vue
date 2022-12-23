<template>
  <v-loader :status="loadingStatus">
    <the-header />
    <router-view />
  </v-loader>
</template>

<script setup>
  import { ref } from "vue";
  import TheHeader from "@/components/Header/TheHeader.vue";

  import { loadingStatusType } from "@/types/loading";

  import { validateLocations } from "@/utils/location";

  import useFetchLocalization from "@/hooks/fetch/useFetchLocalization";
  import useFetchCached from "@/hooks/fetch/useFetchCached";
  import { mapMutations } from "@/hooks/useMapsVuex";

  import config from "@/config";

  const { setLocation, setCountries } = mapMutations("settings");
  const { setLocalization } = mapMutations("localization");

  const loadingStatus = ref(loadingStatusType.Loading);

  const promises = [
    useFetchCached(config.countries.all.url, config.countries.all.cacheKey),
    useFetchLocalization(
      config.localization.url,
      config.localization.langs,
      config.localization.cacheKey
    ),
  ];

  Promise.all(promises)
    .then((data) => {
      const [countries, localization] = data;

      setCountries(countries);
      setLocation(validateLocations(countries));
      setLocalization(localization);

      loadingStatus.value = loadingStatusType.Success;
    })
    .catch((e) => {
      console.log(e);
      loadingStatus.value = loadingStatusType.Error;
    });
</script>
