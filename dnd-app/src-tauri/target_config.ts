const target_tauri = false

export const api_proxy_addr = "http://127.0.0.1:8000"
export const img_proxy_addr = "http://localhost:9001"
export const dest_api = (target_tauri) ? api_proxy_addr : "api"
export const dest_img =  (target_tauri) ?  img_proxy_addr : "img-proxy"
export const dest_root = (target_tauri) ? "" : "/RIP_Frontend"