const vimeo = require("vimeo").Vimeo;
const env = require("dotenv");
const axios = require("axios");

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
      console.log(body);
      let data = [];
      body.data.forEach((element) => {
        data.push({ element });
      });
      // console.log(body);
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

exports.showVideoByFolder = (req, res) => {
  let project_id = 0;
  let className = req.params.folder;
  if (className == "11") {
    project_id = 10695809;
  } else if (className == "12") {
    project_id = "class-12";
  } else {
    project_id = 10697891;
  }

  let client = new vimeo(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.ACCESS_TOKEN
  );
  client.request(
    {
      method: "GET",
      path: `/me/projects/${project_id}/videos`,
    },
    function (error, body, status_code, headers) {
      if (error) {
        console.log(error);
      }
      console.log(body.data);
      // let data = [];
      // body.data.forEach(element => {
      //   data.push({ element });
      // });
      // console.log(body);
      // res.status(status_code).json(data);
    }
  );
};
