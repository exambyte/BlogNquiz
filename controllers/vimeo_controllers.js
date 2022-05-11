const vimeo = require('vimeo').Vimeo;
const env = require('dotenv');

env.config({ path: '../config.env' });


exports.get_freeVideos = (req, res) => {
  console.log(process.env.CLIENT_ID)
  console.log('coming here');

  let client = new vimeo(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.ACCESS_TOKEN);

  client.request({
    method: 'GET',
    path: '/me/videos'
  },
    function (error, body, status_code, headers) {
      if (error) {
        console.log(error)
      }
      // console.log(body);
      let data =[];
      body.data.forEach(element=>{
        data.push({element});
      });
      console.log(body);
      res.status(status_code).json(data);
    }
  )
}