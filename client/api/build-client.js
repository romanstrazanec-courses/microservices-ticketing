import axios from "axios";

export default ({req}) => {
    if (typeof window === 'undefined') {
        // noinspection HttpUrlsUsage
        return axios.create({
            baseURL: 'http://ingress-nginx.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });
    } else {
        return axios.create({
            baseURL: '/'
        });
    }
};
