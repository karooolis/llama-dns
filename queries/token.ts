import {
  queryOptions,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export interface ApiToken {
  token: string;
  userId: string;
  createdAt: string;
}

export const tokenQueryOptions = () =>
  queryOptions<ApiToken>({
    queryKey: ["token"],
    queryFn: async () => {
      const res = await fetch("/api/token");
      if (!res.ok) throw new Error("Failed to fetch token");
      return res.json();
    },
  });

export function useTokenQuery() {
  return useQuery(tokenQueryOptions());
}

export function useRegenerateTokenMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/token", { method: "POST" });
      if (!res.ok) throw new Error("Failed to regenerate token");
      return res.json() as Promise<ApiToken>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["token"] });
    },
  });
}
