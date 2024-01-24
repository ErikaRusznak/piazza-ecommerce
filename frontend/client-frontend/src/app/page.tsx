import MainLayout from "@/components/templates/MainLayout";
import type {AppProps} from "next/app";
import AuthProvider from "../../../api/auth/AuthContext";

export default ({Component, pageProps}: AppProps) => (
    <AuthProvider>
        <MainLayout>
            Popsicle
        </MainLayout>
    </AuthProvider>
);
