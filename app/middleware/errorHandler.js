module.exports = () => {
    return async function errorHandler(ctx, next) {
        try {
            await next();
        } catch(err) {
            ctx.app.emit("error", err, ctx);
            const status = err.status || 500;
            const error = (status === 500 && ctx.app.config.env === "prod") ? "Internal Server Error" : `${err.message}---${JSON.stringify(err.errors)}`;
            ctx.body = { status: 2, obj: null, errorMes: error };
            ctx.status = status;
        }
    }
};