import {
    Box,
    Paper,
    Typography,
    Stack,
    Button,
    List,
    ListItem,
    ListItemText,
    Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import WarningIcon from "@mui/icons-material/Warning";
import type { FC, JSX } from "react";

const stats = [
    { label: "Total Invoices", value: 43, icon: <ReceiptIcon fontSize="large" color="primary" /> },
    { label: "Total Customers", value: 21, icon: <PeopleIcon fontSize="large" color="primary" /> },
    { label: "Total Revenue", value: "$5,450", icon: <AttachMoneyIcon fontSize="large" color="primary" /> },
    { label: "Overdue Invoices", value: 5, icon: <WarningIcon fontSize="large" color="error" /> },
];

// Sample data for chart
const revenueData = [
    { month: "Jan", revenue: 400 },
    { month: "Feb", revenue: 600 },
    { month: "Mar", revenue: 700 },
    { month: "Apr", revenue: 800 },
    { month: "May", revenue: 950 },
    { month: "Jun", revenue: 1100 },
    { month: "Jul", revenue: 1200 },
];

const recentInvoices = [
    { number: "INV-042", customer: "Alice", date: "2025-08-05", amount: 300, status: "Paid" },
    { number: "INV-041", customer: "Bob", date: "2025-08-04", amount: 450, status: "Overdue" },
    { number: "INV-040", customer: "Charlie", date: "2025-08-02", amount: 700, status: "Unpaid" },
];

const getStatusChip = (status: string) => {
    switch (status) {
        case "Paid":
            return <Chip label="Paid" color="success" size="small" />;
        case "Unpaid":
            return <Chip label="Unpaid" color="warning" size="small" />;
        case "Overdue":
            return <Chip label="Overdue" color="error" size="small" />;
        default:
            return <Chip label={status} size="small" />;
    }
};

export const Overview: FC = (): JSX.Element => {
    return (
        <Box p={3} sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {/* Stats Cards */}
            <Stack direction="row" spacing={3}>
                {stats.map(({ label, value, icon }) => (
                    <Paper
                        key={label}
                        elevation={3}
                        sx={{
                            flex: 1,
                            p: 3,
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            borderRadius: 2,
                            bgcolor: label === "Overdue Invoices" ? "error.light" : "background.paper",
                        }}
                    >
                        <Box>{icon}</Box>
                        <Box>
                            <Typography variant="h6" fontWeight="bold">
                                {value}
                            </Typography>
                            <Typography color={label === "Overdue Invoices" ? "error.main" : "text.secondary"}>
                                {label}
                            </Typography>
                        </Box>
                    </Paper>
                ))}
            </Stack>

            {/* Quick Actions */}
            <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Quick Actions
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" startIcon={<AddIcon />}>
                        Create Invoice
                    </Button>
                    <Button variant="outlined" startIcon={<AddIcon />}>
                        Add Product
                    </Button>
                </Stack>
            </Box>

            {/* Charts & Lists */}
            <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {/* Revenue Chart */}
                <Paper
                    elevation={3}
                    sx={{ flex: 1, minWidth: 300, p: 3, borderRadius: 2, height: 320 }}
                >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Revenue Over Time
                    </Typography>
                    {/* <ResponsiveContainer width="100%" height="85%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#1976d2" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer> */}
                </Paper>

                {/* Recent Invoices */}
                <Paper
                    elevation={3}
                    sx={{ flex: 1, minWidth: 300, p: 3, borderRadius: 2, height: 320, overflowY: "auto" }}
                >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Recent Invoices
                    </Typography>
                    <List dense>
                        {recentInvoices.map(({ number, customer, date, amount, status }) => (
                            <ListItem
                                key={number}
                                secondaryAction={getStatusChip(status)}
                                sx={{ borderBottom: "1px solid", borderColor: "divider" }}
                            >
                                <ListItemText
                                    primary={`${number} - ${customer}`}
                                    secondary={`${date} — $${amount.toFixed(2)}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
                {/* Revenue Chart */}
                <Paper
                    elevation={3}
                    sx={{ flex: 1, minWidth: 300, p: 3, borderRadius: 2, height: 320 }}
                >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Revenue Over Time
                    </Typography>
                    {/* <ResponsiveContainer width="100%" height="85%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#1976d2" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer> */}
                </Paper>

                {/* Recent Invoices */}
                <Paper
                    elevation={3}
                    sx={{ flex: 1, minWidth: 300, p: 3, borderRadius: 2, height: 320, overflowY: "auto" }}
                >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Recent Invoices
                    </Typography>
                    <List dense>
                        {recentInvoices.map(({ number, customer, date, amount, status }) => (
                            <ListItem
                                key={number}
                                secondaryAction={getStatusChip(status)}
                                sx={{ borderBottom: "1px solid", borderColor: "divider" }}
                            >
                                <ListItemText
                                    primary={`${number} - ${customer}`}
                                    secondary={`${date} — $${amount.toFixed(2)}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Box>
        </Box>
    );
}

export default Overview;
