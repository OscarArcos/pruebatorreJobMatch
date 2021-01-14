import mongo from './mongo'
const ObjectID = mongo.ObjectID

async function handleCall(req, res, next){
    if(req.url !== '/likes'){
        return next;
    }

    await mongo.db('torrepruebadb').collection('likes')
    .replaceOne({
        _id: new ObjectID()
    },{
        date: new Date()
    },{
        upsert: true
    });
}

export default function (req, res, next){

    handleCall(req, res, next).then(n => {
        if(n) n();
    })

}