export default function formatDate(
  date: Date | string,
  formatString: string = "dd MMM yyyy HH:mm:ss"
): string {
  const dateObj = new Date(date);

  
  let options: Record<string, any> = {};

  switch (formatString) {
    case "date": 
      options = {
        year: "numeric",
        month: "short",
        day: "2-digit",
      };
      break;

    case "time": 
      options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      break;

    case "yyyy-MM-dd": 
      options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };
      break;

    case "HH:mm:ss": 
      options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      break;

    default:
      
      options = {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      break;
  }

   let formattedDate = new Intl.DateTimeFormat("en-GB", options).format(dateObj);
   formattedDate = formattedDate.replace(/\//g, " ");
  return formattedDate;
}
