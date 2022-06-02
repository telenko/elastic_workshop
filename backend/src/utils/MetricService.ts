import { start } from 'elastic-apm-node';

// Add this to the VERY top of the first file loaded in your app
var apm = start({

    // Override the service name from package.json
    // Allowed characters: a-z, A-Z, 0-9, -, _, and space
    serviceName: 'elastic-workshop-backend',

    // Use if APM Server requires a secret token
    secretToken: 'ZGZjUOHXOdL6i7PWPT',

    // Set the custom APM Server URL (default: http://localhost:8200)
    serverUrl: 'https://79a5ea4cd26c4e9e91a71f7984cbe1a3.apm.us-central1.gcp.cloud.es.io:443',

    // Set the service environment
    environment: 'production'
});

export default class MetricService {

    static get client() {
        return apm;
    }

}