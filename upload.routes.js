const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { uploadDocument } = require("./upload.controllers");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  const liverurlnew = "./public";

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, liverurlnew);
      //     if(file.fieldname == 'studio_img'){
      //         cb(null,liverurlnew+"/studio_img")
      //     }
      //     if(file.fieldname == 'services_img'){
      //       cb(null,liverurlnew+"/services_img")
      //   }
      //   if(file.fieldname == 'session_img'){
      //     cb(null,liverurlnew+"/session_img")
      // }
    },

    filename: (req, file, cb) => {
      const filename = `${file.fieldname}_${Date.now()}${path.extname(
        file.originalname
      )}`;
      console.log("Generated Filename:", filename); // Log the filename to the console
      cb(null, filename);
    },
  });

  const upload = multer({
    storage: storage,
  });

  app.post("/api/upload-document", upload.single("document"), uploadDocument);

  app.get("/api/download/:filename", async (req, res) => {
    const filename = req.params.filename;
    const file = await fs.promises.readFile(`./public/${filename}`);

    res.set("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.send(file);
  });
};
