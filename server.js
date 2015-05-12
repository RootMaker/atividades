var express = require('express');
var mongoose = require('mongoose');
var atividadesModel = require("./models/atividades");
var Post = mongoose.model('atividades');
var app= express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('views',__dirname);
app.set('view engine','jade');
app.use(express.static(__dirname + '/public'));
app.get('/api/atividades',function(req, res) {
    Post.find({}).exec(function(error,collection){
        res.jsonp(collection);
    })
});
app.get('*', function(req,res){
    res.render('index');
});

//mongoose.connect('mongodb://localhost/atividades');
mongoose.connect('mongodb://rootmaker:123456p@ds051841.mongolab.com:51841/atividades')
var con = mongoose.connection;
con.once('open',function(){
    console.log('Ligação ao MongoDB efetuada com sucesso!')
    atividadesModel.criaAtividades();
});
app.listen(process.env.PORT,process.env.IP);

app.post('/posts',function(req,res){
    var post = new Post();
    post.descricao=req.body.descricao;
    post.nome=req.body.nome;
    post.save(function(err,post){
        if (err){
            return res.send(500,err);
        }
        console.log('Post no MongoDB efetuado com sucesso');
        return res.json(post);
    });
});

app.delete('/posts/:id',function(req,res){
    Post.findByIdAndRemove(req.params.id,function(err){
        if (err){
            return res.send(500,err);
        }
        console.log('Post no MongoDB removido com sucesso');
    });
});

app.put('/posts/:id',function(req,res){
    var atualizaPost = req.body;
    delete atualizaPost._id;
    Post.findByIdAndUpdate(req.params.id,atualizaPost,function(err){
        if(err){
            return res.send(500,err);
        }
        console.log('Post no MongoDB atualizado com sucesso');
        return res.json(' ');
    });
});