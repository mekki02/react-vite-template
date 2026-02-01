import { Stack } from "@mui/material";
import type { FC, JSX } from "react";
import Header from "./components/Header";
import MainGrid from "./components/MainGrid";

export const Home: FC = (): JSX.Element => {
    return (
        <Stack
            spacing={2}
            sx={{
                alignItems: 'center',
                mx: 3,
                pb: 5,
                mt: { xs: 8, md: 0 },
            }}
        >
            <Header />
            <MainGrid />
        </Stack>
    )
};

export default Home;