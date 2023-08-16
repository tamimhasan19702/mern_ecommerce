/**
 * * title: url config
 * * description: this is the backend url configuration file call the api
 * * author: Tareq Monower
 * *
 *
 * @format
 */

export const api = "http://localhost:3000/api";

export const generatePublicUrl = (filename) => {
    return `http://localhost:3000/public/${filename}`
}