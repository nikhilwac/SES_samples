
module.exports.exceptions = async (message, dataPayload, errors, statusCode, isSuccess) => {
  let body =  JSON.stringify({
    statusCode,
    message,
    data:dataPayload,
    success: isSuccess,
    errors
  })
  return {statusCode,body}
}