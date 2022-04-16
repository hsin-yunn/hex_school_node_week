const http = require('http');
const mongoose = require('mongoose');
const Post = require('./models/post');
const dotenv = require('dotenv');
const header = require('./header');
const responseHelper = require('./helpers/responseHelper');

//env
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

//連接資料庫
mongoose
  .connect(DB)
  .then(() => {
    console.log('資料庫連線成功');
  })
  .catch((error) => {
    console.log(error);
  });

//api
const requestListener = async (req, res) => {
  let body = '';
  req.setEncoding('utf8');
  req.on('data', function (chunk) {
    body += chunk;
  });

  if (req.url === '/posts' && req.method === 'GET') {
    //posts index
    try {
      const posts = await Post.find();
      responseHelper.successHandler(res, 200, posts);
    } catch (err) {
      responseHelper.errorHandler(res, 400, 'get posts error');
    }
  } else if (req.url === '/posts' && req.method === 'POST') {
    req.on('end', async function () {
      try {
        const postData = JSON.parse(body);
        //name check
        if (!postData.name) {
          responseHelper.errorHandler(res, 400, 'name is required');
        } else {
          const post = await Post.create(postData);
          responseHelper.successHandler(res, 201, post);
        }
      } catch (err) {
        responseHelper.errorHandler(res, 400, 'data format is not correct');
      }
    });
  } else if (req.method === 'OPTIONS') {
    //OPTIONS
    res.writeHead(200, header);
    res.end();
  } else {
    res.writeHead(404, header);
    res.write(
      JSON.stringify({
        status: 'failed',
        message: 'Page not found',
      }),
    );
    res.end();
  }
};

const server = http.createServer(requestListener);

server.listen(process.env.PORT || 3000);
