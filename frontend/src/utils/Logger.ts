import MetricService from "./MetricService";

export default class Logger {

    static error(error: Error | string) {
        MetricService.client.captureError(error);
    }

}