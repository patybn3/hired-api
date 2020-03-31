require('dotenv').config()
// Load the SDK and UUID
const AWS = require('aws-sdk')
const mime = require('mime-types')
const fs = require('fs')
const path = require('path')
// const uuid = require('uuid')

const bucketName = process.env.BUCKET_NAME

const s3 = new AWS.S3({
  apiVersion: '2006-03-01'
})

// file passed in as an argument from the command line
// var file = process.argv[2]

const s3Upload = function (file, mimetype) {
  // call S3 to retrieve upload file to specified bucket
  const uploadParams = {
    Bucket: bucketName,
    Key: '',
    Body: '',
    ACL: 'public-read',
    ContentType: ''
  }
  // Configure the file stream and obtain the upload parameters
  const fileStream = fs.createReadStream(file)
  fileStream.on('error', function (err) {
    console.log('File Error', err)
  })
  // body is the file we want to upload with a stream format
  uploadParams.Body = fileStream
  // key is the name of the file
  uploadParams.Key = path.basename(file)

  uploadParams.ContentType = mimetype || mime.lookup(file)

  // console.log(uploadParams)
  // call S3 to retrieve upload file to specified bucket

  return s3.upload(uploadParams).promise()
}

module.exports = s3Upload
