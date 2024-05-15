//6d214e4c-4b00-4c47-a134-6d78a8c8e62e

export default class BandSiteApi {
    constructor (apiKey) {
        this.apiKey = apiKey,
        this.baseUrl = 'https://unit-2-project-api-25c1595833b2.herokuapp.com/'
    }

    async postComment (newCommentObject) {
        const newComment = await axios.post(
            `${this.baseUrl}comments/?api_key=${this.apiKey}`, newCommentObject
        )
    }

    async getCommentList () {
        const commentsList = await axios.get(`${this.baseUrl}comments/?api_key=${this.apiKey}`);
        return commentsList;
    }
        
}

