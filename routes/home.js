/**
 * @file Home.js inside Routes will be used to route to home page
 * @see <a href="routes_home.js.html">see the source code Here</a>
 */

const express = require("express");
const router = express.Router();
const controller = require("../controllers/home");
const authenticate = require("../middlewares/authenticate");
const vimeoController = require("../controllers/vimeo_controllers");

router.get("/", authenticate, controller.getHome);

router.get("/getData", authenticate, controller.getData);

router.get("/userTestsSection", controller.getUserTest);

router.get("/allTests", controller.allTests_get);

// Vimeo videos section routes

/**
 * Route to get free videos
 * @module get_freeVideos
 * @method GET
 */
router.get("/getfreevideos", vimeoController.get_freeVideos);
/**
 * Route to upload videos from local computer to vimeo
 * @module upload_video
 * @method GET
 */
router.get("/uploadvideo/info", vimeoController.upload_video);
/**
 * Route to get video from vimeo with specific folder names
 * @module showVideoByFolder
 * @method GET
 */
router.get("/showVideo/data", vimeoController.showVideoByFolder);
/**
 * Route to add video in vimeo server
 * @module post_vimeoVideoData
 * @method POST
 */
router.post("/addVimeoVideoData", vimeoController.post_vimeoVideoData);
/**
 * Route to get video from vimeo server
 * @module get_VimeoCourseData
 * @method GET
 */
router.get("/getVimeoCourseData", vimeoController.get_VimeoCourseData);
/**
 * Route to get video from vimeo server with specific  vimeo folder id
 * @module get_exploreCourse
 * @method GET
 */
router.get("/exploreCourse/:id", authenticate, vimeoController.get_exploreCourse);
/**
 * Route to get video from database with specific  vimeo folder id
 * @module get_VimeoCoursePreview
 * @method GET
 */
router.get("/coursePreview/:id",authenticate, vimeoController.get_VimeoCoursePreview);
/**
 * Route to get video from database with specific  vimeo folder id
 * @module get_VimeoCoursePreview
 * @method GET
 */
router.get("/exploreSubTopic/:id",authenticate, vimeoController.get_exploreSubTopic);
/**
 * Route to get vidios from a subtopic through the url
 * @module get_subTopicVideo
 * @method GET
 */
router.get("/subTopicVideo/:url",vimeoController.get_subTopicVideo);
/**
 * Route to get all courses from database 
 * @module get_myCourses
 * @method GET
 */
router.get('/myCourses/:id',vimeoController.get_myCourses);

// router.put('/like/:id', authenticate, controller.like);

// router.put('/bookmark/:id', authenticate, controller.bookmark_put);

// router.get("/courseFullView", controller.getFullView);

router.get("/payment/:id", controller.getPayment);

router.post("/payment_gateway/payumoney", controller.postPayment);

router.post("/payment/success/:id" , controller.post_paymentSuccess);

router.post("/payment/fail" , controller.post_paymentFail);


// payment for subtopics
router.get("/payment2/:id", controller.getPayment2);

router.post("/payment_gateway2/payumoney", controller.postPayment2);

router.post("/payment2/success/:id" , controller.post_paymentSuccess2);

router.post("/payment2/fail" , controller.post_paymentFail2);



// router.get("/myCourses/:id"  ,authenticate ,controller.get_myCourses);



//......................Route for terms and condition.......................
router.get("/terms-condition", controller.get_termsAndConditions);


module.exports = router;
