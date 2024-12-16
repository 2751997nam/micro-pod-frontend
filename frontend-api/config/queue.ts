interface QueueConfig {
    queue: string;
    host: string;
    port: string;
    user: string;
    password: string;
    vhost: string;
}

export default (): QueueConfig => ({
    queue: `${process.env.RABBITMQ_QUEUE}`,
    host: `${process.env.RABBITMQ_HOST}`,
    port: `${process.env.RABBITMQ_PORT}`,
    user: `${process.env.RABBITMQ_USER}`,
    password: `${process.env.RABBITMQ_PASSWORD}`,
    vhost: `${process.env.RABBITMQ_VHOST}`
});
