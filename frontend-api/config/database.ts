interface DBConfig {
    name: string;
    host: string;
    port: string;
    user: string;
    password: string;
}

export default (): DBConfig => ({
    name: `${process.env.DATABASE_NAME}`,
    host: `${process.env.DATABASE_HOST}`,
    port: `${process.env.DATABASE_PORT}`,
    user: `${process.env.DATABASE_USER}`,
    password: `${process.env.DATABASE_PASSWORD}`,
});