const Blog = require('../model/Blog.js');

const create = (body) => Blog.create(body);

const getAll = (id) => Blog.find({userId: id}).exec();

const getById = ({id, userID}) => Blog.find({_id: id, userId: userID}).exec();

const editOne = ({id, userID, body}) => Blog.findOneAndUpdate({ _id: id, userId: userID }, body, { new: true }).exec();

const deleteOne = ({ id, userID }) => Blog.findOneAndDelete({ _id: id, userId: userID }).exec();

module.exports = {
    create,
    getAll,
    getById,
    editOne,
    deleteOne
}