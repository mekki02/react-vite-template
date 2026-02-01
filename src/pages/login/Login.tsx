import { type FC, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, TextField, Button, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";

export const Login: FC = (): JSX.Element => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleNavigateToRegister = () => {
        navigate("/register");
    };

    return (
        <Container style={{ textAlign: "center", padding: "2rem" }}>
            <Box mb={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {t("pages.login.loginTitle")}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    {t("pages.login.loginSubtitle")}
                </Typography>
            </Box>
            <Box mb={2}>
                <TextField label={t("common.usernameOrEmailLabel")} variant="outlined" fullWidth margin="normal" />
                <TextField label={t("common.passwordLabel")} type="password" variant="outlined" fullWidth margin="normal" />
                <Button variant="contained" color="primary" fullWidth>
                    {t("pages.login.loginButton")}
                </Button>
            </Box>
            <Divider>{t("common.orDivider")}</Divider>
            <Box mt={2}>
                <Button variant="outlined" color="primary" fullWidth>
                    {t("pages.login.ssoButton")}
                </Button>
            </Box>
            <Box mt={2}>
                <Button variant="text" color="secondary" onClick={handleNavigateToRegister}>
                    {t("pages.login.registerPrompt")}
                </Button>
            </Box>
        </Container>
    );
};

export default Login;