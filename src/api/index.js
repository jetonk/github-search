import { formatDateString } from "../utils/date";

const API_URL = import.meta.env.VITE_API_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_PAT;

export async function getRepositories(language, payload, page) {
  const { startDate, endDate, stars, resultsPerPage } = payload;

  const startDateFormatted = formatDateString(startDate);
  const endDateFormatted = formatDateString(endDate);

  const url = `${API_URL}/search/repositories?q=language:${language}+stars:>=${stars}+created:${startDateFormatted}..${endDateFormatted}&sort=stars&order=desc&page=${page}&per_page=${resultsPerPage}`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  data.language = language;
  return data;
}
