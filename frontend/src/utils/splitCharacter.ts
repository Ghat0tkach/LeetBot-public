export default function getQuestionSlug(url: string) {
  const parts = url.split("/");
  return parts[4];
}
