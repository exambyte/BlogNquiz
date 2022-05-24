const vimeo = require("vimeo").Vimeo;
const env = require("dotenv");

env.config({ path: "../config.env" });

env.config({ path: "../config.env" });

exports.get_freeVideos = (req, res) => {
  console.log(process.env.CLIENT_ID);
  console.log("coming here");

  let client = new vimeo(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.ACCESS_TOKEN
  );

  client.request(
    {
      method: "GET",
      path: "/me/videos",
    },
    function (error, body, status_code, headers) {
      if (error) {
        console.log(error);
      }
      // console.log(body);
      let data = [];
      body.data.forEach((element) => {
        data.push({ element });
      });
      console.log(body);
      res.status(status_code).json(data);
    }
  );
};

exports.upload_video = (req, res) => {
  let file_name = req.query.path;
  const description = req.query.description;
  const name = req.query.name;
  console.log(file_name, description, name);
  let client = new vimeo(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.ACCESS_TOKEN
  );
  client.upload(
    file_name,
    {
      name: name,
      description: description,
    },
    function (uri) {
      console.log("Your video URI is: " + uri);
    },
    function (bytes_uploaded, bytes_total) {
      var percentage = ((bytes_uploaded / bytes_total) * 100).toFixed(2);
      console.log(bytes_uploaded, bytes_total, percentage + "%");
    },
    function (error) {
      console.log("Failed because: " + error);
    }
  );
};
