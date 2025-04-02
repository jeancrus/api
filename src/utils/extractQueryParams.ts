export const extractQueryParam = (query: string): Record<string, string> => {
  return query
    .slice(1)
    .split("&")
    .reduce((queryParams: Record<string, string>, param: string) => {
      const [key, value] = param.split("=");
      queryParams[key] = value;
      return queryParams;
    }, {});
};
