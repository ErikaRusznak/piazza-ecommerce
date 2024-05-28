import { useParams } from "next/navigation";

export type RouteQuery = {
    alias: string;
};

export const useRouteAlias = () => {
    const params = useParams<RouteQuery>();
    if (params) {
        const { alias } = params;
        return decodeURIComponent(alias);
    }
    return null;
}