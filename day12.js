const express = require('express');
const app = express();

// Use Rate Limiter Middleware for all requests
app.use(rateLimitMiddleware);

app.get('/', (req, res) => {
    res.send("Welcome to the Request Rate-Limiting Middleware Problem");
})

app.get('/limit', (req, res) => {
    res.send("Limit not reached yet!");
})


// Create (IP Adrress - Time Limit) Map
const ipRequestMap = new Map();

/**
 * Rate-limiting middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function rateLimitMiddleware(req, res, next) {
    // Your implementation here
    const ip = req.ip;
    const requestLimit = 5; // 5 request
    const requestLimitTimeInMinutes = 1; // within 1 minute
    if (!ipRequestMap[ip]) {
        const ipDetails = {
            requestCount: 1,
            rateLimitTime: new Date(Date.now()).getTime() + (requestLimitTimeInMinutes * 60 * 1000),
        }
        ipRequestMap[ip] = ipDetails;
    } else {
        // Check if Set Time in Minutes has Exceeded, Reset Counter
        if (new Date(Date.now()).valueOf() > ipRequestMap[ip]["rateLimitTime"]) {
            ipRequestMap[ip]["requestCount"] = 1;
            ipRequestMap[ip]["rateLimitTime"] = new Date(Date.now()).getTime() + (requestLimitTimeInMinutes * 60 * 1000);
        } else {
            ipRequestMap[ip]["requestCount"] = ipRequestMap[ip]["requestCount"] + 1;;
        }
    }
    console.log(ipRequestMap);
    console.log(`Time: ${new Date(ipRequestMap[ip]["rateLimitTime"])}`);

    // Check if Set Time in Minutes has Not Exceeded And Request Limit has Reached, Throw 429 Too Many Request Status Code
    if ((new Date(Date.now()).valueOf() < ipRequestMap[ip]["rateLimitTime"]) &&
        (ipRequestMap[ip]["requestCount"] > requestLimit)) {
        return res.status(429).send(`You have exceeded your ${requestLimit} requests per ${requestLimitTimeInMinutes} minute(s) limit.`);
    } else {
        next();
    }
}

const port = process.env.PORT || 3000;
app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Listening at http:127.0.0.1:${port}`);
    }
})