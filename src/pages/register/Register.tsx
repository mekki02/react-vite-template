import type { FC, JSX } from "react";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

export const Register: FC = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <Container style={{ textAlign: "center", padding: "2rem" }}>
            <Box mb={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {t("pages.register.registerTitle")}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    {t("pages.register.registerSubtitle")}
                </Typography>
            </Box>
            <Box mb={2}>
                <TextField label={t("common.usernameOrEmailLabel")} variant="outlined" fullWidth margin="normal" />
                <TextField label={t("common.passwordLabel")} type="password" variant="outlined" fullWidth margin="normal" />
                <Button variant="contained" color="primary" fullWidth>
                    {t("pages.register.registerButton")}
                </Button>
            </Box>
        </Container>
    );
};

export default Register;