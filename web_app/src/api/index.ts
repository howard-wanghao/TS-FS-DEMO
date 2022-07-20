import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";

const baseURL = 'http://localhost:7001';

type Request = (url: string, data?: object) => Promise<any>

interface HttpRequest {
    get?: Request;
    post?: Request;
}

const methods: ['get', 'post'] = ['get', 'post'];

const http: HttpRequest = {};

methods.forEach(m => {
    http[m] = (url: string, data: any) => {
        const config: AxiosRequestConfig = {
            url,
            method: m,
            baseURL
        }
        const instance = axios.create({
            baseURL
        })
        // 请求拦截器
        instance.interceptors.request.use(
            cfg => {
                // 在这里可以对请求添加头部信息
                return cfg;
            },
            error => {
                // 错误抛出
                return Promise.reject(error);
            }
        )
        // 结果拦截器
        instance.interceptors.response.use(
            res => {
                if (res && res.data) {
                    return res.data;
                }
                return res;
            },
            error => {
                // 错误抛出
                return Promise.reject(error);
            }
        )

        if (m === 'get') {
            config.params = data;
        } else {
            for (let i in data) {
              if (Array.isArray(data[i])) {
                if (data[i].length === 0) {
                  data[i] = null;
                }
              }
            }
            config.data = qs.stringify(data);
        }

        return instance
            .request(config)
            .then(res => {
                return res;
            })
            .catch(err => {
                // 错误集中处理
                return Promise.reject(err);
            })
    }
});

export default http;