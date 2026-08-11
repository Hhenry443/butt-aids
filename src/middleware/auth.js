// Various Authorisation Middleware

// This is a general case auth. It just checks a user is logged in via the user ID in the session
export function requireAuth(req, res, next) {
    if (!req.session.userId) return res.redirect('/login');
    next();
}

// This is a more specific use case where we can check for a specific role
// Not to be used to check if a user is an author of the blog
export function requireRole(role) {
    return (req, res, next) => {
        if (req.session.role !== role) {
            return res.status(403).send('Forbidden');
        }
        next();
    };
}