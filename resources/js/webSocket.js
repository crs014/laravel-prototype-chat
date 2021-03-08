import Echo from 'laravel-echo';
import Pusher from "pusher-js";

const options = {
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
    authEndpoint: "/broadcasting/auth",
    auth: {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json"
        }
    }
};

window.Pusher = Pusher;
window.Echo = new Echo(options);

export default window.Echo;

