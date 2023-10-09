import axiosIns from "./axios";
import { HELPERS } from "./helpers";

const setupInterceptors = (store) => {
    axiosIns.interceptors.request.use(
        (config) => {
            const { accessToken } = localStorage
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        },


        (error) => {
            return Promise.reject(error);
        }
    );

    axiosIns.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;

            if (originalConfig.url !== `${HELPERS.API_URL}api/login`) {
                console.log(originalConfig.url)

                // Access Token was expired
                if (err.response && err.response.status === 401) {
                    // const router = useRouter();
                    // originalConfig._retry = true;


                    // try {
                    //     const rs = await axiosIns.post("/refreshToken");
                    //     console.log(rs)
                    //     const { access_token } = rs.data;
                    //     let response = store.dispatch('appAuth/logout')
                    //     if (response) {
                    //         router.push({ name: ROUTES.SIGNIN });
                    //     }
                    //     store.dispatch('auth/refreshToken', access_token);

                    //     return axiosIns(originalConfig);
                    // } catch (_error) {
                    //     return Promise.reject(_error);
                    // }
                }
            }

            return Promise.reject(err);
        }
    );
};

export default setupInterceptors;
