import {
  queryOptions,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export interface Domain {
  id: string;
  name: string;
  userId: string;
  ipv4: string | null;
  ipv6: string | null;
  cloudflareRecordIdA: string | null;
  cloudflareRecordIdAAAA: string | null;
  createdAt: string;
  updatedAt: string;
}

export const domainsQueryOptions = () =>
  queryOptions<Domain[]>({
    queryKey: ["domains"],
    queryFn: async () => {
      const res = await fetch("/api/domains");
      if (!res.ok) throw new Error("Failed to fetch domains");
      return res.json();
    },
  });

export function useDomainsQuery() {
  return useQuery(domainsQueryOptions());
}

export function useAddDomainMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      const res = await fetch("/api/domains", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add domain");
      }
      return res.json() as Promise<Domain>;
    },
    onMutate: async (name) => {
      await queryClient.cancelQueries({ queryKey: ["domains"] });
      const previous = queryClient.getQueryData<Domain[]>(["domains"]);

      queryClient.setQueryData<Domain[]>(["domains"], (old = []) => [
        ...old,
        {
          id: `temp-${Date.now()}`,
          name,
          userId: "",
          ipv4: null,
          ipv6: null,
          cloudflareRecordIdA: null,
          cloudflareRecordIdAAAA: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);

      return { previous };
    },
    onError: (_err, _name, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["domains"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["domains"] });
    },
  });
}

export function useDeleteDomainMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/domains/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete domain");
      }
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["domains"] });
      const previous = queryClient.getQueryData<Domain[]>(["domains"]);

      queryClient.setQueryData<Domain[]>(["domains"], (old = []) =>
        old.filter((d) => d.id !== id)
      );

      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["domains"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["domains"] });
    },
  });
}
