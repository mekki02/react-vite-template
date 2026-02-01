// timezones.ts

export interface TimezoneOption {
    label: string;
    value: string;
}

export const timezones: TimezoneOption[] = [
    { label: "UTC", value: "UTC" },

    // Americas
    { label: "Pacific Time (US & Canada)", value: "America/Los_Angeles" },
    { label: "Mountain Time (US & Canada)", value: "America/Denver" },
    { label: "Central Time (US & Canada)", value: "America/Chicago" },
    { label: "Eastern Time (US & Canada)", value: "America/New_York" },
    { label: "Alaska", value: "America/Anchorage" },
    { label: "Hawaii", value: "Pacific/Honolulu" },
    { label: "Brazil (São Paulo)", value: "America/Sao_Paulo" },

    // Europe
    { label: "London (GMT)", value: "Europe/London" },
    { label: "Central European Time (Paris)", value: "Europe/Paris" },
    { label: "Central European Time (Berlin)", value: "Europe/Berlin" },
    { label: "Eastern European Time (Athens)", value: "Europe/Athens" },
    { label: "Moscow", value: "Europe/Moscow" },

    // Africa
    { label: "West Africa Time (Lagos)", value: "Africa/Lagos" },
    { label: "South Africa (Johannesburg)", value: "Africa/Johannesburg" },

    // Asia
    { label: "India Standard Time", value: "Asia/Kolkata" },
    { label: "China Standard Time", value: "Asia/Shanghai" },
    { label: "Japan Standard Time", value: "Asia/Tokyo" },
    { label: "Korea Standard Time", value: "Asia/Seoul" },
    { label: "Singapore", value: "Asia/Singapore" },
    { label: "Bangkok", value: "Asia/Bangkok" },

    // Australia & Pacific
    { label: "Australian Eastern Time (Sydney)", value: "Australia/Sydney" },
    { label: "Australian Central Time (Adelaide)", value: "Australia/Adelaide" },
    { label: "Australian Western Time (Perth)", value: "Australia/Perth" },
    { label: "New Zealand (Auckland)", value: "Pacific/Auckland" },
];
