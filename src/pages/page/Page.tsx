import type { FC, JSX } from "react";
import { Container, Typography, Box, Button, Grid, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from './../../assets/logo.png';

export const Page: FC = (): JSX.Element => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleNavigateToLogin = () => {
        navigate("/login");
    };
    return (
        <Container
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                padding: "2rem",
                background: "linear-gradient(to bottom, #f0f4f8, #d9e2ec)",
                minHeight: "100vh",
            }}
        >
            <Box mb={4}>
                <img
                    src={Logo}
                    alt={t("common.logoAlt")}
                    style={{ marginBottom: "1rem", borderRadius: "8px", width: "400px" }}
                />
                <Typography variant="h2" component="h1" gutterBottom style={{ color: "#334e68" }}>
                    {t("pages.page.welcomeTitle")}
                </Typography>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                    {t("pages.page.welcomeSubtitle")}
                </Typography>
            </Box>

            <Grid container spacing={4} justifyContent="center">
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom style={{ color: "#102a43" }}>
                                {t("pages.page.feature1Title")}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {t("pages.page.feature1Description")}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom style={{ color: "#102a43" }}>
                                {t("pages.page.feature2Title")}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {t("pages.page.feature2Description")}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom style={{ color: "#102a43" }}>
                                {t("pages.page.feature3Title")}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {t("pages.page.feature3Description")}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Box mt={4}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    type='button'
                    style={{ marginRight: "1rem", backgroundColor: "#334e68", color: "#ffffff" }}
                    onClick={handleNavigateToLogin}
                >
                    {t("common.getStarted")}
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    style={{ borderColor: "#334e68", color: "#334e68" }}
                >
                    {t("common.contactUs")}
                </Button>
            </Box>
        </Container>
    );
};

export default Page;