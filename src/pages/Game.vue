<template>
  <div class="cnt h-[85%] flex flex-col gap-5">
    <TheGameFields
      :questionType="fields[questionField].type"
      :answerType="fields[answerField].type"
      :successCount="successCount"
      :hintsUsedCount="hintsUsedCount"
      :errorsCount="errorsCount"
      :hintsCount="hintsCount"
      :countriesProgress="countriesProgress"
      :showAnswer="showAnswer"
      :question="question"
      :wiki="wiki"
      :selectedAnswer="selectedAnswer"
      :answer="answer"
      :answers="answers"
      :isEnd="isEnd"
      @hintUsed="hintUsed"
      @select="select"
      @questionError="next"
    />

    <TheGameButtons
      :isEnd="isEnd"
      :isNextDisabled="selectedAnswer === ''"
      @next="next"
      @restart="init"
      @exit="exit($router)"
    />
  </div>
</template>

<script setup>
  import { ref } from "vue";

  import useCountriesGenerator from "@/hooks/countries/useCountriesGenerator";
  import { mapGetters, mapMutations } from "@/hooks/useMapsVuex";

  import TheGameFields from "@/components/Game/TheFields.vue";
  import TheGameButtons from "@/components/Game/TheButtons.vue";

  const { localization } = mapGetters("localization");
  const {
    countriesActive,
    hintsCount,
    questionField,
    answerField,
    countryOrder,
    answersCount,
    fields,
  } = mapGetters("settings");

  const { setHintsCount } = mapMutations("settings");

  let countriesGenerator = null;

  const isEnd = ref(false);
  const errorsCount = ref(0);
  const successCount = ref(0);
  const hintsUsedCount = ref(0);
  const countriesProgress = ref("");
  const wiki = ref("");
  const question = ref("");
  const selectedAnswer = ref("");
  const answer = ref("");
  const answers = ref([]);
  const showAnswer = ref(false);

  function exit($router) {
    if (
      isEnd.value === true ||
      confirm(localization.value.exitConfirmMessage) === true
    )
      $router.push("/");
  }

  function hintUsed() {
    showAnswer.value = true;
    if (hintsCount.value > 0) setHintsCount(hintsCount.value - 1);
  }

  function select(value = "") {
    if (answer.value !== value) errorsCount.value++;
    else if (showAnswer.value === true) hintsUsedCount.value++;
    else successCount.value++;

    selectedAnswer.value = value;
  }

  function init() {
    countriesGenerator = useCountriesGenerator({
      sourceCountries: countriesActive.value,
      questionField: questionField.value,
      answerField: answerField.value,
      countryOrder: countryOrder.value,
      answersCount: answersCount.value,
    });

    if (hintsUsedCount.value > 0 && hintsCount.value > -1)
      setHintsCount(hintsCount.value + hintsUsedCount.value);

    isEnd.value = false;
    errorsCount.value = 0;
    successCount.value = 0;
    hintsUsedCount.value = 0;

    next();
  }

  function next() {
    const itr = countriesGenerator.next();

    if (itr.done === true) {
      isEnd.value = true;
      return;
    }

    const gameValues = itr.value;

    answer.value = gameValues.answer;
    answers.value = gameValues.answers;
    question.value = gameValues.question;
    wiki.value = gameValues.wiki;
    countriesProgress.value = gameValues.countriesProgress;
    showAnswer.value = false;
    selectedAnswer.value = "";
  }

  init();
</script>
