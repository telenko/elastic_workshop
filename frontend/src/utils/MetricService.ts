import { init as initApm } from '@elastic/apm-rum'

var apm = initApm({

    // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
    serviceName: 'elastic-workshop-frontend',

    // Set custom APM Server URL (default: http://localhost:8200)
    serverUrl: 'https://79a5ea4cd26c4e9e91a71f7984cbe1a3.apm.us-central1.gcp.cloud.es.io:443',

    // Set the service version (required for source map feature)
    serviceVersion: '',

    // Set the service environment
    environment: 'production'
})

export default class MetricService {

    static get client() {
        return apm;
    }

}