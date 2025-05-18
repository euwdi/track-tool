// TO ИВАНОВ И. И.
export function formatFullName({
  lastName,
  firstName,
  middleName,
}: {
  lastName: string;
  firstName?: string;
  middleName?: string;
}): string {
  // Проверяем обязательную фамилию
  if (!lastName || typeof lastName !== "string") {
    return "";
  }
  // Обрабатываем инициалы
  const initials = [];

  if (firstName && typeof firstName === "string") {
    initials.push(`${firstName.charAt(0).toUpperCase()}.`);
  }

  if (middleName && typeof middleName === "string") {
    initials.push(`${middleName.charAt(0).toUpperCase()}.`);
  }

  return `${lastName} ${initials.join(" ")}`.trim();
}
