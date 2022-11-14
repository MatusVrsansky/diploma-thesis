module.exports = {
    checkNotifications: {
        frequency: "*/5 * * * *",
        handler: "handlers/checkNotifications"
    },
    resetSentNotifications: {
        frequency: "0 0 * * *",
        handler: "handlers/resetSentNotifications"
    }
}