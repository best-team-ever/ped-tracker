const status = {
  active: "Active",
  wait: "Awaiting deployment",
  maintenance: "In maintenance",
  transport: "Waiting transport between sites/locations",
  stored: "In storage",
  retired: "Retired/deactivated",
  lost: "Lost/stolen",
  forbidden: "Forbidden",
  refused: "Refused/returned"
}

function getStatus(request, result){
  return result.status(200).send(status)
}

module.exports = {
  getStatus: getStatus,
  status: status
}
