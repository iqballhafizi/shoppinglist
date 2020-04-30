const express = require('express');
const router = express.Router();


const Item = require('../../models/item');

router.get('/', (req, res) => {
        Item.find()
        .sort({date: -1})
        .then(items => res.json(items))
});

router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item))
});

router.delete('/:id', (req, res) => {
   Item.findById(req.params.id).then(
       item => item.remove().then(()=> res.json({succcess: true}))
       .catch(err => res.status(404).json({succcess:false}))
   ).catch(err => res.status(404).json({msg: 'item not found'}))
});

module.exports = router;