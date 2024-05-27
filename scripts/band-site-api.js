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
        const response = await axios.get(`${this.baseUrl}comments/?api_key=${this.apiKey}`);
        const commentsList = response.data;

        //Sort comments from newest to oldest
        return commentsList.sort((commentA, commentB) => {
            return commentB.timestamp - commentA.timestamp
        })
    }

    async deleteComment (commentId) {
        await axios.delete(`${this.baseUrl}comments/${commentId}?api_key=${this.apiKey}`);
    }

    async likeComment (commentId) {
        const newComment = await axios.put(
            `${this.baseUrl}comments/${commentId}/like?api_key=${this.apiKey}`
        )
    }

    async getShows () {
        const response = await axios.get(`${this.baseUrl}showdates/?api_key=${this.apiKey}`);
        const showDates = response.data;
        return showDates;
    }
        
}

