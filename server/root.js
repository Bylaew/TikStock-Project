import FirebaseService from './firebaseService.js';
import AlphavantageService from './alphavantageService.js';
const root = {
    //  Query
    getUserInfoById: ({ userId }) => {
        return FirebaseService.getUserInfoById(userId);
    },
    getCommentsByCoinName: ({ coinId }) => {
        return FirebaseService.getCommentsByCoinName(coinId);
    },
    getCommentsByUserId: ({ userId }) => {
        return FirebaseService.getCommentsByUserId(userId);
    },

    //  Alphavantage
    getStockTimeSeriesIntraday: ({ coin_name, interval }) => {
        return AlphavantageService.getStockTimeSeriesIntraday(coin_name, interval);
    },
    getStockTimeSeriesDaily: ({ coin_name }) => {
        return AlphavantageService.getStockTimeSeriesDaily(coin_name);
    },
    getStockTimeSeriesWeekly: ({ coin_name }) => {
        return AlphavantageService.getStockTimeSeriesWeekly(coin_name);
    },
    getStockTimeSeriesMonthly: ({ coin_name }) => {
        return AlphavantageService.getStockTimeSeriesMonthly(coin_name);
    },

    getCryptoTimeSeriesIntraday: ({ coin_name, interval }) => {
        return AlphavantageService.getCryptoTimeSeriesIntraday(coin_name, interval);
    },
    getCryptoTimeSeriesDaily: ({ coin_name }) => {
        return AlphavantageService.getCryptoTimeSeriesDaily(coin_name);
    },
    getCryptoTimeSeriesWeekly: ({ coin_name }) => {
        return AlphavantageService.getCryptoTimeSeriesWeekly(coin_name);
    },
    getCryptoTimeSeriesMonthly: ({ coin_name }) => {
        return AlphavantageService.getCryptoTimeSeriesMonthly(coin_name);
    },

    //  mutations
    addComment: ({ input }) => {
        return FirebaseService.addComment(input.userId, input.coinId, input.text);
    },
    createUserInfo: ({ userId }) => {
        return FirebaseService.createUserInfo(userId);
    },
    editUserWallet: ({ input }) => {
        return FirebaseService.editUserWallet(input.userId, input.coin_name, input.count);
    },
    addFollow: ({ input }) => {
        return FirebaseService.addFollow(input.userId, input.followId);
    },
    addFollowing: ({ input }) => {
        return FirebaseService.addFollowing(input.userId, input.followId);
    },
    changeUserPhoto: ({ input }) => {
        return FirebaseService.changeUserPhoto(input.userId, input.image);
    }
}
export default root;