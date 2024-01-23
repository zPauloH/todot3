import { api } from "src/utils/api";
import { useQueryClient } from "@tanstack/react-query";

export function deleteTeste() {
    const queryClient = useQueryClient();
    return api.todoItem.delete.useMutation(
        {
        onSuccess() {
                void queryClient.invalidateQueries(
                    api.todoItem.listAll.useQuery()
                ); 
            }
        }
    );
}