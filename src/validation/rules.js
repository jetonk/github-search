import { required, minValue } from "@vuelidate/validators";

const requiredIfNoLanguages = (languages) => {
  return (value) => {
    return languages.value.length > 0 || required(value);
  };
};

export const Rules = (languages) => {
  return {
    language: { required: requiredIfNoLanguages(languages) },
    startDate: { required },
    endDate: { required },
    stars: { required, minValue: minValue(1) },
  };
};
