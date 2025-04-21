export default {
    schema: './src/schema.ts',
    out: './drizzle',
    driver: 'libsql',
    dbCredentials: {
        url: 'file:data.db',
    },
    verbose: true,
    strict: true,
};
//# sourceMappingURL=drizzle.config.js.map