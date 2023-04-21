module.exports = {
  "*.ts": [
    // run nps lint.fix by node
    "npx eslint . --fix",

    // run nps test.staged by node
    "npx jest --passWithNoTests --no-cache --runInBand --findRelatedTests"
  ]
}
