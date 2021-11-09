const { application } = require("express");
const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;



//Create and save
exports.create = (req, res) => {

    //Validating the title
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }


    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false

    };

    //Save Tutorial in the database
    Tutorial.create(tutorial)
    .then(data=>{
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error ocurred while creating the Tutorial."
        });
    });

};

//Retrieve all tutorials from the db
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title: { [Op.like]: `%${title}%`}
}: null;


Tutorial.findAll({where: condition}).then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
        message:
        err.message || "Some error ocurred retrieving tutorials"
    });
});

};

//Find one tutorial
exports.findOne = (req, res) => {
    const id = req.params.id;
    
    Tutorial.findByPk(id).then(data => {
        if(data){
            res.send(data);
        } else{
            res.status(404).send({
                message: `Cannot find tutorial with id=${id}`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error retrieving tutorial with id " +id
        });
    });
};


//Update one tutorial by id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body,{
        where: {id: id}
    }).then(num => {
        if(num ==1){
            res.send({
                message: "Tutorial was updated successfully. ja"
            });
        } else{
            res.send({
                message: `Can not update tutorial with id=${id}. Maybe tutorial was not found or req.body is empty`
            });
        }
    }).catch(err =>{
        res.status(500).send({
            message: "Error updating tutorial with id "  +id
        });
    });

};

//Delete one tutorial by id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
        where: {id: id}
    }).then(num =>{ 
        if(num ==1){
            res.send({
                message: "Tutorial was deleted successfully"
            });
        } else {
            res.send({
                message: `Cannot delete tutorial with id=${id}. Maybe tutorial was not found`
            });
        }

    }).catch(err => {
        res.status(500).send({
            message: "Could not delete tutorial with id " +id
        });
    });

};

//Delete all
exports.deleteAll = (req, res) => {

    Tutorial.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({message: `${nums} Tutorials were deleted`});
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error ocurred while removing all tutorials"
        });
    });

};


//Find all the tutorial published
exports.findAllPublished = (req, res) => {
    
    Tutorial.findAll({where: {published: true}})
.then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
        message:
        err.message || "Some error ocurred while retrieving tutorials"
    });
});
};


