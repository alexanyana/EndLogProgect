var express=require("express");
var path=require("path");
var mysql=require("mysql");
var bodyParser=require("body-parser");

var connection=mysql.createConnection({
//    host:'127.0.0.1',
    host:'localhost',
    user:'root',
    password:'12345',
    database:'shop'
});
var app=express();
connection.connect( function(err){
    if(err)throw err
    console.log('connection success')
} );
app.use(bodyParser.json());
app.listen('8080', function(){
    console.log('listen to port 8080')
});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/getHairGoods',function(req,res){
    connection.query('SELECT goods.id, goods.Name_good, goods.Category, goods.Weight, goods.Price, goods.Photo, goods.code_good, brands.Brand, sub_category.Sub_category, country.Country   FROM goods, brands, sub_category, country where goods.Category=1 and brands.id_good=goods.Brand and goods.Sub_category=sub_category.subid_good and goods.Country=country.id_good ;', function(err,rows,fields){
        console.log(rows)
        res.send(rows)
    }
    )
});

app.get('/getNailGoods',function(req,res){
    connection.query('SELECT goods.id, goods.Name_good, goods.Category, goods.Weight, goods.Price, goods.Photo, goods.code_good, brands.Brand, sub_category.Sub_category, country.Country   FROM goods, brands, sub_category, country where goods.Category=3 and brands.id_good=goods.Brand and goods.Sub_category=sub_category.subid_good and goods.Country=country.id_good ;', function(err,rows,fields){
        console.log(rows)
        res.send(rows)
    }
    )
});
app.get('/getBodyGoods',function(req,res){
    connection.query('SELECT goods.id, goods.Name_good, goods.Category, goods.Weight, goods.Price, goods.Photo, goods.code_good, brands.Brand, sub_category.Sub_category, country.Country   FROM goods, brands, sub_category, country where goods.Category=2 and brands.id_good=goods.Brand and goods.Sub_category=sub_category.subid_good and goods.Country=country.id_good ;', function(err,rows,fields){
        console.log(rows)
        res.send(rows)
    }
    )
});
app.get('/getFaceGoods',function(req,res){
    connection.query('SELECT goods.id, goods.Name_good, goods.Category, goods.Weight, goods.Price, goods.Photo, goods.code_good, brands.Brand, sub_category.Sub_category, country.Country   FROM goods, brands, sub_category, country where goods.Category=4 and brands.id_good=goods.Brand and goods.Sub_category=sub_category.subid_good and goods.Country=country.id_good ;', function(err,rows,fields){
        console.log(rows)
        res.send(rows)
    }
    )
});
app.get('/getGoodsCountry1',function(req,res){
    connection.query('SELECT distinct country.Country, country.id_good FROM goods, country where goods.Category=1 and country.id_good=goods.Country ;', function(err,rows,fields){
        console.log(rows)
        res.send(rows)
    }
    )
});
app.get('/getGoodsCountry2',function(req,res){
    connection.query('SELECT distinct country.Country, country.id_good FROM goods, country where goods.Category=2 and country.id_good=goods.Country ;', function(err,rows,fields){
        console.log(rows)
        res.send(rows)
    }
    )
});
app.get('/getGoodsCountry3',function(req,res){
    connection.query('SELECT distinct country.Country, country.id_good FROM goods, country where goods.Category=3 and country.id_good=goods.Country ;', function(err,rows,fields){
        console.log(rows)
        res.send(rows)
    }
    )
});
app.get('/getGoodsCountry4',function(req,res){
    connection.query('SELECT distinct country.Country, country.id_good FROM goods, country where goods.Category=4 and country.id_good=goods.Country ;', function(err,rows,fields){
        console.log(rows)
        res.send(rows)
    }
    )
});
app.get('/getGoodsGroup1',function(req,res){
    connection.query('SELECT distinct sub_category.Sub_category, sub_category.subid_good   FROM goods, sub_category where goods.Category=1 and sub_category.subid_good=goods.Sub_category ;', function(err,rows,fields){
        console.log(rows)
        res.send(rows)
    }
    )
});
app.get('/getGoodsGroup2',function(req,res){
    connection.query('SELECT distinct sub_category.Sub_category, sub_category.subid_good   FROM goods, sub_category where goods.Category=2 and sub_category.subid_good=goods.Sub_category ;', function(err,rows,fields){
        console.log(rows)
        res.send(rows)
    }
    )
});
app.get('/getGoodsGroup3',function(req,res){
    connection.query('SELECT distinct sub_category.Sub_category, sub_category.subid_good   FROM goods, sub_category where goods.Category=3 and sub_category.subid_good=goods.Sub_category ;', function(err,rows,fields){
        console.log(rows)
        res.send(rows)
    }
    )
});
app.get('/getGoodsGroup4',function(req,res){
    connection.query('SELECT distinct sub_category.Sub_category, sub_category.subid_good   FROM goods, sub_category where goods.Category=4 and sub_category.subid_good=goods.Sub_category  ;', function(err,rows,fields){
        console.log(rows)
        res.send(rows)
    }
    )
});
app.get('/getGoodsBrand1',function(req,res){
    connection.query('SELECT distinct brands.Brand, brands.id_good   FROM goods, brands where goods.Category=1 and brands.id_good=goods.Brand;', function(err,rows,fields){
        console.log(rows)
        res.send(rows)
    }
    )
});
app.get('/getGoodsBrand2',function(req,res){
    connection.query('SELECT distinct brands.Brand, brands.id_good   FROM goods, brands where goods.Category=2 and brands.id_good=goods.Brand;', function(err,rows,fields){
        console.log(rows)
        res.send(rows)
    }
    )
});
app.get('/getGoodsBrand3',function(req,res){
    connection.query('SELECT distinct brands.Brand, brands.id_good   FROM goods, brands where goods.Category=3 and brands.id_good=goods.Brand;', function(err,rows,fields){
        console.log(rows)
        res.send(rows)
    }
    )
});
app.get('/getGoodsBrand4',function(req,res){
    connection.query('SELECT distinct brands.Brand, brands.id_good   FROM goods, brands where goods.Category=4 and brands.id_good=goods.Brand;', function(err,rows,fields){
        console.log(rows)
        res.send(rows)
    }
    )
});
app.get('/getAllGoodsBrands',function(req,res){
    connection.query('SELECT  * FROM  brands', function(err,rows,fields){
        console.log(rows)
        res.send(rows)
    }
    )
});
app.get('/getBaseUser',function(req,res){
    connection.query('SELECT * FROM shop.users;', function(err,rows,fields){
        console.log(rows)
        res.send(rows)
    }
    )
});


//передача даних в базу
app.post('/someUserUrl', function(req, res){
var material = req.body;
	console.log(material);
	connection.query("insert into users (u_name, u_sname, u_login, u_pass, u_phone) value ('"+material.name+"','"+material.sname +"','"+material.login +"','"+material.pass +"','"+material.phone +"');")
});
app.post('/setGoodOrder', function(req, res){
var order = req.body;
	console.log(order);
	connection.query("insert into orders (id_order, user_id, good_code, count, good_price, user_phone, date_or, ready) value ('"+order.id_order+"','"+order.user_id +"','"+order.good_code +"','"+order.count +"','"+order.good_price +"','"+order.user_phone +"','"+order.date +"','"+order.ready +"');")
});





