const User = require('../model/User');
const Blog = require('../model/Blog');

const edit = ({ id, body }) => User.findByIdAndUpdate(id, body, { new: true }).exec();

const del = (id) => User.findByIdAndDelete(id);

const follow = async ({ id, f_id }) => {
    // check if f_id exist or not
    const isExistF_ID = await User.findOne({ _id: f_id }).exec();
    if (!isExistF_ID) {
        throw Error('UN-EXIST'); 
    }
    const FoundUser = await User.findOne({ _id: id }).exec();
    let { followers } = FoundUser;
    //check if already followed or not 
    const index = followers.findIndex((value) => {
        return value == f_id;
    })
    let flag = "";
    if (index === -1)
    {
        followers.push(f_id);
        flag = "Now you Follow " + isExistF_ID.username;
    } else {
        followers.splice(index, 1);
        flag = "Now you stop Following " + isExistF_ID.username;
    }
    
    const user = await User.findOneAndUpdate({ _id: id }, { followers: followers }, { new: true }).exec();
    return {...user, flag: flag};
}
// searching for blogs with {tag, title, author username}
const searchBlog = async (searched) => {
    if (!searched)
    {// return blogs of user who he is following
        const blogs = {};
        return blogs;
    }
    else 
    {
        const blogs = await Blog.find({ $or: [{ tags: new RegExp(searched, 'i') }, { title: new RegExp(searched, 'i') }, { author: new RegExp(searched, 'i') }] }).exec();
        return blogs;
    }
}
//returns user & its blogs
const searchUser = async(username) => {
    const user = await User.findOne({username: username }).exec();
    const blogs = await Blog.find({ author: username }).exec();
    return [ user, ...blogs ];
};

module.exports = {
    edit,
    del,
    follow,
    searchBlog,
    searchUser,
}