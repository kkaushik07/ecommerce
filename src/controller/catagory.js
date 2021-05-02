const Catagory = require('../models/catagory');
const slugify = require('slugify');

exports.addCatagory = (req, res) => {
    const { name, parentId } = req.body;
    const catagory = new Catagory({
        name,
        slug: slugify(name),
        parentId
    });

    catagory.save((err, cat) => {
        if (err) {
            return res.status(400).json({ err })
        };
        if (cat) {
            return res.status(201).json({ cat, message: "catagory added successfully" })
        }
    })
};

exports.fetchCatagories = (req, res) => {
    Catagory.find({}).exec((err, catagories) => {
        if (err) { return res.status(400).json({ err }) };
        if (catagories) {
            const catagoryList = listCatagories(catagories);
            return res.status(200).json({ catagoryList });
        }
    });
};

function listCatagories(catagories, parentId = null) {

    const catagoryList = [];
    let catagory;

    if (parentId == null) {
        catagory = catagories.filter(cat => cat.parentId == undefined);
    }
    else {
        catagory = catagories.filter(cat => cat.parentId == parentId)
    };

    //reccursive approach #important function approach
    for (let cat of catagory) {
        catagoryList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            children: listCatagories(catagories, cat._id)
        })
    };

    return catagoryList;

};