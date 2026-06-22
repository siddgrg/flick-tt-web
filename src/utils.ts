export const hasPaddingClass = (classString: string) =>
  /(?:^|\s)p-[^\s]+(?:\s|$)/.test(classString);
