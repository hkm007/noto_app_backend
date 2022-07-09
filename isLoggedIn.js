module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization) {
       return res.status(401).json({ error: "Access denied!" });
    }

    const token = authorization.replace("Bearer ", "");

    if(!token || token.length < 5) {
        return res.status(401).json({ error: "Access denied!" });
    }

    next();
}
