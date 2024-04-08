import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { GithubCommit } from "../../types/commit.type";
import React from "react";

export const useCommits = (owner: string, repo: string, per_page: number) => {
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(1);
  const fetchCommits = (_page: number): Promise<GithubCommit[]> =>
    axios
      .get(
        `https://api.github.com/repos/${owner}/${repo}/commits?page=${_page}&per_page=${per_page}`
      )
      .then((response) => response.data);

  const { status, data, error, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["commits", page],
    queryFn: () => fetchCommits(page),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });
  // Prefetch the next page!
  React.useEffect(() => {
    if (!isPlaceholderData && data?.length === per_page) {
      queryClient.prefetchQuery({
        queryKey: ["commits", page + 1],
        queryFn: () => fetchCommits(page + 1),
      });
    }
  }, [data, isPlaceholderData, page, queryClient]);

  const loadNextPage = () => {
    setPage((old) => (data?.length === per_page ? old + 1 : old));
  };
  const loadPrevPage = () => {
    setPage((old) => Math.max(old - 1, 0));
  };

  return {
    data,
    status,
    error,
    isFetching,
    page,
    hasMore: data?.length === per_page,
    loadNextPage,
    loadPrevPage,
  };
};
