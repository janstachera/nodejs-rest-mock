const handleError = ({ res, error }) => {
    const code = error.code || 500;
    const msg = error.msg || error || 'Unhandled error';
    res.status(code).json({ code, msg });
}

module.exports = {
    handleError: handleError,
};