var mongoose = require("mongoose");

var atividadesSchema = mongoose.Schema({
    nome:{type:String},
    descricao:{type:String}
});

var atividades = mongoose.model('atividades',atividadesSchema);

exports.criaAtividades = function(){
    atividades.find({}).exec(function(error,collection){
        if(collection.length==0){
            atividades.create({nome: 'Workshop de Robótica',descricao: 'Demonstração dos Robôs NXT, Roamer, Robonova e Pleo pelo projecto CAPER'});
            atividades.create({nome: 'Demonstração de Robótica e Inteligência Artificial',descricao: 'Apresentação dos projectos de alunos de Engenharia da UMa'});
        }
    })
}