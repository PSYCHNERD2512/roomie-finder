export const getLabelForValue = (
  value: string,
  options: { label: string; value: string }[]
): string => {
  const option = options.find((item) => item.value === value);
  return option ? option.label : value;
};
