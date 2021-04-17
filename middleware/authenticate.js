
const authenticate = (req, res, next) => {
    try {
        if(req.signedCookies.user != undefined) {
            req.user = req.signedCookies.user;
            next();
        } else {
            res.redirect('/login');
        }
        
    } catch(err) {
        res.render('login', {error: "error authenticating user"});
        console.log(err);
    }
}

module.exports = authenticate;