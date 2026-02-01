import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import type { FC } from "react";
// import { generateField, getSchema, IFieldSchema } from "../../../../utils";
// import { useForm } from "react-hook-form";
// import { useMutation } from "@tanstack/react-query";
// import { updateUser } from "../../../../services/user";
import {
    Save as SaveIcon
} from "@mui/icons-material";

const Profile: FC = () => {
    // const { control, formState: { errors, isDirty }, watch } = useForm();
    // const userProfileSchema = getSchema('user-profile', control, errors) as IFieldSchema[];;
    // const userProfileFields = userProfileSchema.map(generateField);
    // const updateUserMutation = useMutation({
    //     mutationKey: ['update-user'],
    //     mutationFn: updateUser,
    //     onSuccess: () => {
    //         // Invalidate and refetch
    //         // queryClient.invalidateQueries({ queryKey: ['users'] });
    //     },
    // });
    const handleUpdateInformation = () => {
        // updateUserMutation.mutate(watch());
    }
    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
                <Button variant="contained">Account</Button>
                <Button variant="text">Billing & Plans</Button>
            </Box>
            <Paper sx={{ mt: 3 }}>
                <Box sx={{ p: 2 }}>
                    <Typography variant="body1" fontWeight={600}>
                        User account information
                    </Typography>
                </Box>
                {/* <Grid container spacing={2} sx={{ p: 3, pt: 0 }}>
                    {userProfileFields.map((field, index) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={index}>
                            {field}
                        </Grid>
                    ))}
                    <Button
                        loading={updateUserMutation.isPending}
                        variant="outlined"
                        loadingPosition="end"
                        disabled={!isDirty}
                        onClick={handleUpdateInformation}
                        startIcon={<SaveIcon />}
                    >
                        Save
                    </Button>
                </Grid> */}
            </Paper>
        </Box>
    );
};

export default Profile;