import {
  FormatDistanceFnOptions,
  FormatDistanceToken,
  formatDistanceToNow,
} from "date-fns";
import { id } from "date-fns/locale";

const customIdLocale = {
  ...id,
  formatDistance: (
    token: FormatDistanceToken,
    count: number,
    options: FormatDistanceFnOptions | undefined,
  ) => {
    const result = id.formatDistance(token, count, options);

    return result.replace(/sekitar /, "").replace(/ yang/, "");
  },
};
export function formatDateAgo(date: Date | string): string {
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  return formatDistanceToNow(parsedDate, {
    addSuffix: true,
    locale: customIdLocale,
  });
}
