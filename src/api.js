import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {

    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you 
    //pass it in the header. this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;

    const headers = { Authorization: `Bearer ${JoblyApi.token}` };

    const params = (method === "get") ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /**POST request to '/:username/jobs/:id' to add a job to the user's account */
  static async userApplyForJob(username, id) {
    let resp = await this.request(`users/${username}/jobs/${(id).toString()}`, {}, 'post')
    return resp
  }

  /**PATCH request to 'users/:username' to update user info */
  static async updateProfile(username, data) {
    let resp = await this.request(`users/${username}`, data, 'patch')
    return resp.user
  }

  /**GET request to 'users/:username' to get info about user */
  static async getUserInfo(username) {
    let resp = await this.request(`users/${username}`)
    return resp.user
  }

  /**GET request to '/jobs' to get all jobs */
  static async getAllJobs(queryStringParams) {
    let resp = await this.request('jobs', queryStringParams)
    return resp.jobs
  }

  /**GET request to '/companies' to get all companies */
  static async getAllCompanies(queryStringsParams) {
    let resp = await this.request('companies', queryStringsParams)
    return resp
  }

  /** GET request to `companies/:handle` to get details on a company by handle. */
  static async getCompany(handle) {
    let resp = await this.request(`companies/${handle}`);
    return resp.company;
  }

  /**POST request to 'auth/token' to login and get a token */
  static async login(data) {
    let resp = await this.request('auth/token', data, 'post')
    return resp.token
  }

  /**POST request to 'auth/register' to sign up a user and get a token*/
  static async register(data) {
    let resp = await this.request('auth/register', data, 'post')
    return resp.token
  }
}

export default JoblyApi;
