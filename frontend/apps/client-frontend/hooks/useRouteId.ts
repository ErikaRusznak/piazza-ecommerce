import { useParams } from "next/navigation";

export type RouteQuery = {
    id: string;
};

export const useRouteId = () => {
    const params = useParams<RouteQuery>();
    if (params) {
        const { id } = params;
        return decodeURIComponent(id);
    }
    return null;
}