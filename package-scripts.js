const npsUtils = require('nps-utils')
module.exports = {
  scripts: {
    test: 'echo "Error: no test specified" && exit 1',
    prepare: {
      default: {
        script: npsUtils.series('nps prepare.chmod', 'nps prepare.after-install'),
        description: "Prepare for local development",
      },
      chmod: {
        script: "chmod +x scripts/*.sh",
        description: "Change permission of scripts",
      },
      'after-install': {
        script: "./scripts/post-install.sh",
        description: "Run after install",
      },
    },
    db: {
      default: 'sls dynamodb start --migrate --stage local',
      description: "Start dynamodb local",
    },
    local: {
      default: {
        script: 'node node_modules/serverless/bin/serverless offline start --reloadHandler --stage local',
        description: "Start serverless offline",
      },
      debug: {
        script: 'export SLS_DEBUG=* && node --inspect node_modules/serverless/bin/serverless offline start --stage local',
        description: "Start serverless offline in debug mode",
      },
    },
    deploy: {
      dev: {
        script: 'node node_modules/serverless/bin/serverless deploy --verbose --stage dev',
        description: "Deploy to dev environment",
      },
      remove: {
        dev: {
          script: 'node node_modules/serverless/bin/serverless remove --verbose --stage dev',
          description: "Remove dev environment",
        }
      }
    },
    document: {
      generate: {
        script: npsUtils.series('rimraf ./swagger/openapi.json', 'rimraf ./swagger/postman.json', 'serverless openapi generate -o ./swagger/openapi.json -f json -a 3.0.3 -p ./swagger/postman.json'),
        description: "Generate swagger document",
      },
      view: {
        script: './scripts/open-document-view.sh',
        description: "View Swagger document on browser",
      },
      stop: {
        script: './scripts/delete-document-view.sh',
        description: "Stop processing Swagger document on browser",
      }
    },
    clean: {
      common: {
        script: npsUtils.series('rimraf .webpack', 'rimraf package-lock.json', 'rimraf .webpackCache', 'rimraf .serverless'),
        description: "Clean common files",
      },
      cleanExcludeDynamodb: {
        script: npsUtils.series('nps clean.common', 'rimraf node_modules'),
        description: "Clean all files except Dynamodb local",
      },
      all: {
        script: npsUtils.series('nps clean.common', 'rimraf .dynamodb', 'rimraf node_modules'),
        description: "Clean everything",
      },
    }
  }
};
