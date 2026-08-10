import { useState, useEffect } from 'react';

export interface GitHubRepoData {
  stars: number;
  forks: number;
  language: string | null;
}

export function useGitHubStats(repoNames: string[]) {
  const [data, setData] = useState<Record<string, GitHubRepoData>>({});
  const [loading, setLoading] = useState(repoNames.length > 0);

  useEffect(() => {
    if (repoNames.length === 0) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-on-mount pattern, not a bug
    setLoading(true);

    const fetchRepos = async () => {
      const results: Record<string, GitHubRepoData> = {};
      
      await Promise.all(
        repoNames.map(async (repo) => {
          try {
            const res = await fetch(`https://api.github.com/repos/${repo}`);
            if (res.ok) {
              const json = await res.json();
              results[repo] = {
                stars: json.stargazers_count || 0,
                forks: json.forks_count || 0,
                language: json.language,
              };
            }
          } catch {
            // silently fail — fallback to no stats
          }
        })
      );
      
      setData(results);
      setLoading(false);
    };

    fetchRepos();
  }, [repoNames]);

  return { data, loading };
}
