// const backend = '172.16.6.74'
const backend = process.env.backend || 'localhost'
const backendLink = process.env.backendlink || `http://${backend}:3000`
const frontendLink = process.env.frontendlink || `http://${backend}:3001`

const express = require('express');
var passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const mysql = require('mysql2');
const cors = require('cors')


const app = express();
const jwt = require('jsonwebtoken');
app.use(express.json())
app.use(cors())

app.use(session({
    secret: 'resail',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: '132812053619-5o2cc85cb4um3voct0i2pa2bldb1p67i.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: `${backendLink}/auth/google/callback`,
    scope: ['profile', 'email']
},
    async function (req, accessToken, refreshToken, profile, done) {
        console.log(profile._json.name)
        console.log(profile.emails[0].value);
        return done(null, profile);
    }
));


const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const numbers = '0123456789';
function generateOrderID(length) {
    let result = '';
    const charactersLength = numbers.length;
    for (let i = 0; i < length; i++) {
        result += numbers.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}




//Google Sign In
app.get('/loginsuccess', (res, req) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "Success",
            user: req.user,
        })
    }
});


app.get('/auth/google',
    passport.authenticate('google'));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        session: false
    }),
    async function (req, res) {
        const query = `SELECT * FROM users WHERE email='${req.user.emails[0].value}'`
        const newquery = `INSERT INTO users (name, email,picture) VALUES('${req.user._json.name}', '${req.user._json.email}', '${req.user._json.picture}')`;
        connection.query(query, (error, results) => {
            if (error) throw error;
            if (results.length == 0) {
                connection.query(newquery, (error, results) => {
                    if (error) throw error;
                    console.log('New user Created\n');
                });
            }
        });
        const jwttoken = jwt.sign(req.user.emails[0].value, 'resail')
        console.log(req.user._json.picture)
        res.redirect(`${frontendLink}/OAuthRedirecting?token=${jwttoken}&picture=${req.user._json.picture}`);
    }

);



passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// Test End Points
app.use('/test', (req, res) => {
    res.json({ test: "Success", message: "If you are seeing this its a success" });
})

// const onlineconnection = mysql.createConnection({
//     host: 'sql9.freemysqlhosting.net',
//     user: 'sql9605257',
//     password: 'c3BZZmSiUR',
//     database: 'sql9605257'
// });

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'resail'
// });

// const connection = mysql.createConnection({
//     database: 'resail',
//     username: 'vys6rf089lbvfmfxf87y',
//     host: 'aws.connect.psdb.cloud',
//     password: 'pscale_pw_bs9vrMOPBRdRpw4y321xqOrwfohZsj1SBZOHhKj5F7A'    
// });
const connection = process.env.DATABASE_URL ? mysql.createConnection(process.env.DATABASE_URL) :
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'resail'
    });

// const connection = mysql.createConnection(process.env.DATABASE_URL)
// connection.connect()


connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

//Check if Credentials are correct
const verifyUser = (req, res, next) => {
    const token = req.headers["x-access-token"]
    if (!token) {
        res.json({ auth: false, message: "Invalid Token" })
    } else {
        jwt.verify(token, "resail", (err, email) => {
            if (err) {
                res.json({ auth: false, message: "Invalid Token" });
            }
            else {
                res.locals.email = email;
                next();
            }
        });
    }

}

// Define API endpoint to fetch user details
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});




//Product API Calls
app.get('/products', (req, res) => {
    // let countquery = ''
    // try {
    //     const count = req.body.count ?? req.query.count;
    //     countquery = `limit ${count}` ?? ''
    // }
    // catch (error) {
    //     console.log(error)
    // }
    const countquery = ''

    if (req.body.order_by == 'latest' || req.query.order_by == 'latest') {
        const query = `SELECT x.product_id,x.name,x.description,x.exp_price as price,x.images,x.posted_on,y.mobile as phonenumber FROM products x LEFT JOIN users y ON x.email=y.email ORDER BY posted_on desc ${countquery} `;

        connection.query(query, (error, results) => {
            if (error) throw error;

            res.send(results);
        })
    }
    else if (req.body.order_by == 'price_asc' || req.query.order_by == 'price_asc') {
        const query = `SELECT x.product_id,x.name,x.description,x.exp_price as price,x.images,x.posted_on,y.mobile as phonenumber FROM products x LEFT JOIN users y ON x.email=y.email ORDER BY price ${countquery} `;

        connection.query(query, (error, results) => {
            if (error) throw error;

            res.send(results);
        })
    }
    else if (req.body.order_by == 'price_desc' || req.query.order_by == 'price_desc') {
        const query = `SELECT x.product_id,x.name,x.description,x.exp_price as price,x.images,x.posted_on,y.mobile as phonenumber FROM products x LEFT JOIN users y ON x.email=y.email ORDER BY price desc ${countquery} `;

        connection.query(query, (error, results) => {
            if (error) throw error;

            res.send(results);
        })
    }
    else {
        const query = `SELECT x.product_id,x.name,x.description,x.exp_price as price,x.images,x.posted_on,y.mobile as phonenumber FROM products x LEFT JOIN users y ON x.email=y.email  ${countquery}`;

        connection.query(query, (error, results) => {
            if (error) throw error;
            res.send(results);
        })
    }
})

app.get('/getproduct', (req, res) => {
    const product_id = req.body.product_id ?? req.query.product_id;
    const query = `SELECT x.product_id,x.name,x.description,x.exp_price as price,x.images,x.posted_on,y.mobile as phonenumber FROM products x LEFT JOIN users y ON x.email=y.email HAVING x.product_id=${product_id}`;

    connection.query(query, (error, results) => {
        if (error) throw error;
        res.send(results);
    })


})

app.get('/productsearch', (req, res) => {

    const search = req.body.search ?? req.query.search ?? '';
    console.log(search)
    const searchquery = `WHERE name like '%${search}%'` ?? ''

    if (req.body.order_by == 'latest' || req.query.order_by == 'latest') {
        const query = `SELECT product_id,name,description,exp_price as price,images,posted_on FROM products ${searchquery} ORDER BY posted_on desc `;

        connection.query(query, (error, results) => {
            if (error) throw error;

            res.send(results);
        })
    }
    else if (req.body.order_by == 'price_asc' || req.query.order_by == 'price_asc') {
        const query = `SELECT product_id,name,description,exp_price as price,images,posted_on FROM products ${searchquery} ORDER BY price `;

        connection.query(query, (error, results) => {
            if (error) throw error;

            res.send(results);
        })
    }
    else if (req.body.order_by == 'price_desc' || req.query.order_by == 'price_desc') {
        const query = `SELECT product_id,name,description,exp_price as price,images,posted_on FROM products ${searchquery} ORDER BY price desc `;

        connection.query(query, (error, results) => {
            if (error) throw error;

            res.send(results);
        })
    }
    else {
        const query = `SELECT product_id,name,description,exp_price as price,images,posted_on FROM products ${searchquery}`;

        connection.query(query, (error, results) => {
            if (error) throw error;
            res.send(results);
        })
    }
})

app.get('/searchproducts', (req, res) => {
    const search = req.body.search ?? req.query.search;
    const query = `SELECT product_id,name,description,exp_price as price,images,posted_on FROM products WHERE name like '%${search}%' limit 10`;
    connection.query(query, (error, results) => {
        if (error) throw error;
        // if(results.length > 0){
        res.send(results);
        // }
    })
})

app.post('/postproduct', verifyUser, (req, res) => {
    const previousquery = 'SELECT MAX(product_id) as product_id FROM products';
    connection.query(previousquery, [res.locals.email], (error, results) => {
        if (error) throw error;
        const product_id = results[0]['product_id'] + 1;
        const query = 'INSERT INTO products VALUES(?,?,?,?,?,?,?,?)';
        const now = new Date();
        connection.query(query, [product_id, req.body.name, req.body.description, req.body.ask_price, req.body.exp_price, req.body.pictures, now.toISOString().slice(0, -5), res.locals.email], (error, results) => {
            if (error) throw error;
            res.json({ success: true, product_id: product_id });
        });
    });
});


//Cart API Calls
app.get('/getcart', verifyUser, (req, res) => {
    // const query = 'SELECT * FROM cart WHERE email=?';
    const query = `select cart.card_id, products.product_id, products.name, products.images, products.exp_price as price, products.description from cart inner join products on cart.product_id=products.product_id where cart.email=?`
    connection.query(query, [res.locals.email], (error, results1) => {
        if (error) throw error;
        const query = `select sum(products.exp_price) as total from cart inner join products on cart.product_id=products.product_id where cart.email='${res.locals.email}'`
        connection.query(query, (error, results2) => {
            if (error) throw error;
            res.json({ total: results2[0].total, data: results1 })
        });
        // res.send(results);
    });
});

app.post('/checkcart', verifyUser, (req, res) => {
    const product_id = req.body.product_id ?? req.query.product_id
    const query = `SELECT * FROM cart WHERE email='${res.locals.email}' and product_id=${product_id}`;
    connection.query(query, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json({ ispresent: true })
        }
        else {
            res.json({ ispresent: false })
        }
    });
});

app.post('/postcart', verifyUser, (req, res) => {
    const product_id = req.body.product_id ?? req.query.product_id
    const query = `INSERT INTO cart VALUES('${generateString(10)}','${product_id}','${res.locals.email}')`;
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json({ added: 1 });
    });
});

app.post('/removecart', verifyUser, (req, res) => {
    const product_id = req.body.product_id ?? req.query.product_id
    const query = `DELETE FROM cart WHERE email='${res.locals.email}' and product_id=${product_id}`;
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json({ removed: true, product_id: product_id });
    });
});

// Orders
app.post('/checkout', verifyUser, (req, res) => {
    let orderid = generateOrderID(5)
    let orderresult = [1]

    if (req.body.order_status) {
        if (orderresult.length != 0) {
            const query = `SELECT order_id from orderlist where order_id=${orderid}`
            connection.query(query, (error, results) => {
                if (error) throw error;
                orderresult = results
                orderid = generateOrderID(5)
            })
        }
        const insertquery = `INSERT INTO orders SELECT ${orderid} as order_id, product_id,email FROM cart WHERE email='${res.locals.email}'`
        connection.query(insertquery)

        const maininsertquery = `INSERT INTO orderlist select ${orderid} as order_id, '${res.locals.email}' as email, NULL as transaction_id, sum(products.exp_price), 'Processing' as status from cart inner join products on cart.product_id=products.product_id where cart.email='${res.locals.email}'`
        connection.query(maininsertquery)

        res.send({ url: `${frontendLink}/order?order_id=${orderid}` })
    }
})

app.post('/placeorder', verifyUser, (req, res) => {
    const transaction_id = req.body.transaction_id ?? req.query.transaction_id;
    const query = `UPDATE orderlist SET transaction_id=${transaction_id},status='Processing' WHERE email='${res.locals.email}' and order_id=${req.body.order_id}`
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json({ url: `${frontendLink}/myorders` })
    })
})

app.get('/getorderdetails', verifyUser, (req, res) => {
    const order_id = req.body.order_id ?? req.query.order_id;
    const query = `SELECT amount FROM orderlist WHERE order_id=${order_id} AND email='${res.locals.email}'`
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.send(results[0])
    })
})

app.get('/getorder', verifyUser, (req, res) => {
    const query = `SELECT x.order_id, y.name, y.exp_price as amount, y.images, z.status FROM orders x JOIN products y ON x.product_id = y.product_id JOIN orderlist z ON z.order_id=x.order_id WHERE z.transaction_id IS NOT NULL and x.email='${res.locals.email}';`
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.send(results)
        
    })



})

app.get('/getprofile', verifyUser, (req, res) => {
    const query = `select email,name,hostel, hostel_room as room, mobile as phone from users where email='${res.locals.email}'`
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.send(results[0])
    })

})

app.post('/editprofile', verifyUser, (req, res) => {
    const hostel = req.body.hostel ?? req.query.hostel;
    const room = req.body.room ?? req.query.room;
    const phone = req.body.phone ?? req.query.phone;
    const query = `UPDATE users SET hostel = '${hostel}', hostel_room = '${room}', Mobile='${phone}' WHERE email = '${res.locals.email}'`
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.send(results)
    })

})
//Sell Now. Add Products to Products Database


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server started on port ' + port);
});

app.get("/", (req, res) => {
    res.send("Success!");
});

app.get("/test", (req, res) => {
    res.send("Test is a Success!");
});