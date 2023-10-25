exports.uploadDocument = async (req, res) => {
  //req.file.filename
  console.log("req, file", req.file);
  return res.status(200).json({
    message: "File Uploaded Successfully.",
    status: true,
    error: "",
    data: {
      id: req.file.filename,
      original_name: req.file.originalname,
      path: req.file.path,
    },
  });
};
