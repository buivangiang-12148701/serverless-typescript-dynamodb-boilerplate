const npsUtils = require('nps-utils')

module.exports = {
  scripts: {
    local: {
      default: {
        script: 'node node_modules/serverless/bin/serverless offline start --reloadHandler --stage local',
        description: 'Start serverless offline'
      },
      debug: {
        script: 'export SLS_DEBUG=* && node --inspect node_modules/serverless/bin/serverless offline start --stage local',
        description: 'Start serverless offline in debug mode'
      }
    },
    lint: {
      default: {
        script: 'eslint .',
        description: 'Lint all files'
      },
      fix: {
        script: 'npx eslint . --fix',
        description: 'Lint all files and fix'
      }
    },
    test: {
      default: {
        script: 'npx jest --passWithNoTests --no-cache --runInBand',
        description: 'Run all tests'
      },
      watch: {
        script: 'npx jest --passWithNoTests --no-cache --runInBand --watch',
        description: 'Run all tests in watch mode'
      },
      staged: {
        script: 'npx jest --passWithNoTests --no-cache --runInBand --findRelatedTests',
        description: 'Run tests related to staged files'
      },
      coverage: {
        script: 'npx jest --passWithNoTests --no-cache --runInBand --coverage',
        description: 'Run all tests and generate coverage report'
      }
    },
    prepare: {
      default: {
        script: npsUtils.series('nps prepare.chmod', 'nps prepare.after-install'),
        description: 'Prepare for local development'
      },
      chmod: {
        script: 'chmod +x scripts/*.sh',
        description: 'Change permission of scripts'
      },
      'after-install': {
        script: './scripts/post-install.sh',
        description: 'Run after install'
      }
    },
    db: {
      default: 'sls dynamodb start --migrate --stage local',
      description: 'Start dynamodb local'
    },
    deploy: {
      dev: {
        script: npsUtils.series('export AWS_CLIENT_TIMEOUT=1800000', 'node node_modules/serverless/bin/serverless deploy --verbose --stage dev'),
        description: 'Deploy to dev environment with timeout 30 minutes'
      },
      remove: {
        dev: {
          script: 'node node_modules/serverless/bin/serverless remove --verbose --stage dev',
          description: 'Remove dev environment'
        }
      }
    },
    document: {
      generate: {
        script: npsUtils.series('rimraf ./swagger/openapi.json', 'rimraf ./swagger/postman.json', 'serverless openapi generate -o ./swagger/openapi.json -f json -a 3.0.3 -p ./swagger/postman.json'),
        description: 'Generate swagger document'
      },
      view: {
        script: './scripts/open-document-view.sh',
        description: 'View Swagger document on browser'
      },
      stop: {
        script: './scripts/delete-document-view.sh',
        description: 'Stop processing Swagger document on browser'
      }
    },
    clean: {
      common: {
        script: npsUtils.series('rimraf .webpack', 'rimraf package-lock.json', 'rimraf .webpackCache', 'rimraf .serverless'),
        description: 'Clean common files'
      },
      cleanExcludeDynamodb: {
        script: npsUtils.series('nps clean.common', 'rimraf node_modules'),
        description: 'Clean all files except Dynamodb local'
      },
      all: {
        script: npsUtils.series('nps clean.common', 'rimraf .dynamodb', 'rimraf node_modules'),
        description: 'Clean everything'
      }
    }
  }
}
