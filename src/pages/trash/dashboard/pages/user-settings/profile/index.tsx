import { Box, List, ListItem, ListItemText, Paper, Typography, Grid, Avatar, Divider, Stack } from "@mui/material";
import { type FC } from "react";

const activities = Array.from({ length: 3 }).map((_, i) => ({
    id: i,
    title: "User updated information",
    description: "Can be used as a tracker for the future",
    date: "15.12.2025 – 10:45 AM",
}));

const Profile: FC = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" fontWeight={600} gutterBottom>
                My Name is John Doe
            </Typography>

            <Grid container spacing={4} alignItems="flex-start">

                {/* Sidebar */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <Stack spacing={4} alignItems="center">
                        {/* Avatar */}
                        <Paper
                            elevation={3}
                            sx={{
                                borderRadius: "50%",
                                border: "6px solid",
                                borderColor: "primary.light",
                            }}
                        >
                            <Avatar sx={{ width: 140, height: 140, fontSize: 40 }}>
                                JD
                            </Avatar>
                        </Paper>

                        {/* Contact */}
                        <Paper elevation={2} sx={{ width: "100%", p: 3, borderRadius: 3 }}>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                User contact data
                            </Typography>

                            <Stack spacing={1}>
                                <Typography variant="body2">Email: john.doe@email.com</Typography>
                                <Typography variant="body2">Phone: +1 234 567 890</Typography>
                                <Typography variant="body2">Location: New York, USA</Typography>
                            </Stack>
                        </Paper>
                    </Stack>
                </Grid>

                {/* Activity */}
                <Grid size={{ xs: 12, md: 9 }}>
                    <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                        <Stack spacing={1.5}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Typography variant="body1" fontWeight={600}>
                                    Name:
                                </Typography>
                                <Typography variant="body1" color="text.primary">
                                    Johnathan A. Doe
                                </Typography>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Typography variant="body1" fontWeight={600}>
                                    Role:
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Admin
                                </Typography>
                            </Box>
                        </Stack>
                    </Paper>
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Other Activities || information
                        </Typography>

                        <List disablePadding>
                            {activities.map((a, index) => (
                                <Box key={a.id}>
                                    <ListItem alignItems="flex-start" disableGutters>
                                        <ListItemText
                                            primary={a.title}
                                            secondary={
                                                <>
                                                    {/* <Typography variant="body2" color="text.secondary"> */}
                                                        {a.description}
                                                    {/* </Typography> */}
                                                    {/* <Typography variant="caption" color="text.disabled">
                                                        {a.date}
                                                    </Typography> */}
                                                </>
                                            }
                                        />
                                    </ListItem>
                                    {index !== activities.length - 1 && <Divider />}
                                </Box>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;