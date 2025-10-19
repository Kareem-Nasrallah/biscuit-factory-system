import { useTranslation } from "react-i18next";
import i18next from "i18next";

interface ValidationMessagesParams {
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  x?: string;
  y?: string;
}

const validationMessages = ({
  min,
  max,
  minLength,
  maxLength,
  x,
  y,
}: ValidationMessagesParams) => {
  const { t } = i18next;

  const messages = {
    required: t("validation.required"),
    email: t("validation.email"),
    min: t("validation.min", { min }),
    max: t("validation.max", { max }),
    minLength: t("validation.minLength", { min: minLength }),
    maxLength: t("validation.maxLength", { max: maxLength }),
    password_match: t("validation.password_match"),
    invalid: t("validation.invalid"),
    number: t("validation.number"),
    positive: t("validation.positive"),
    integer: t("validation.integer"),
    too_short: t("validation.too_short"),
    too_long: t("validation.too_long"),
    less_than: t("validation.less_than", { x, y }),
    greater_than: t("validation.greater_than", { x, y }),
  };

  return messages;
};
export default validationMessages;
