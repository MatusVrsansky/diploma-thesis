module.exports = {
    hello: {
        frequency: "* * * * *",
        handler: "handlers/sayhello"
    },
    goodbye: {
        frequency: "*/10 * * * * *",
        handler: "handlers/saygoodbye"
    },
    tacos: {
        frequency: "* * * * *",
        handler: "handlers/tacos"
    }
}