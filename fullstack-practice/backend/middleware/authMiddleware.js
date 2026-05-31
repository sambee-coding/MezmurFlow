function verifyToken(req, res, next) {
    // 1️⃣ Grab the token from the request
    //   • Most clients send it as `Authorization: Bearer <token>`
    const authHeader = req.headers.authorization;

    // 2️⃣ If the header is missing → 401 Unauthorized
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized. please sign in' });
    }

    // 3️⃣ Extract the raw token value
    const token = authHeader.split(' ')[1];

    // 4️⃣ Verify the token using your secret
    try {
        // `jwt.verify` returns the decoded payload (e.g. { userId, email })
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 5️⃣ Attach useful data to the request for downstream handlers
        //    (you can store the whole payload or just the user id)
        req.user = decoded;   // e.g. { userId: "...", email: "..." }

        // 6️⃣ Continue to the next middleware / route handler
        next();
    } catch (err) {
        // 7️⃣ Token is invalid or expired → 401
        return res.status(401).json({ message: 'Unauthorized. please sign in' });
    }
}

module.exports = verifyToken;
