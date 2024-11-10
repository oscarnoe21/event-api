/* eslint-disable prettier/prettier */
const sonarqubeScanner = require('sonarqube-scanner');
sonarqubeScanner(
  {
    serverUrl: 'http://192.168.162.26:9004/',
    token: 'sqa_8fce4be5d49a7eecedaf67c17fecdb74e108cf6a',
    options: {
      'sonar.projectName': 'eventmanamegent-catcher-api',
      'sonar.projectDescription':'Api que recibe los eventos del event Manager y los deposita en el topico de Kafka del Event Manager',
      'sonar.sources': 'src',
      'sonar.tests': 'test',
      'sonar.inclusions': '**',
      'sonar.test.inclusions':
        'test/**/*.spec.ts',
      'sonar.coverage.exclusions':
        'src/**/*.spec.ts,src/**/main.ts,src/**/app.module.ts',
    },
  },
  () => {},
);
