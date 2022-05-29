import FirebaseService from './firebaseService.js';
import AlphavantageService from './alphavantageService.js';
const root = {
    //  Query
    getUserInfoById: ({ id }) => {
        return FirebaseService.getUserInfoById(id);
    },
    getCommentsByCoinName: ({ coinId }) => {
        return FirebaseService.getCommentsByCoinName(coinId);
    },
    getCommentsByUserId: ({ userId }) => {
        return FirebaseService.getCommentsByUserId(userId);
    },
    getFollowsByUserId: ({ userId }) => {
        return FirebaseService.getFollowsByUserId(userId);
    },
    getFollowingsByUserId: ({ userId }) => {
        return FirebaseService.getFollowingsByUserId(userId);
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
        FirebaseService.addComment(input.userId, input.coinId, input.text);
        return "es";
    },
    createUserInfo: ({ id }) => {
        FirebaseService.createUserInfo(id);
        return "es";
    },
    editUserWallet: ({ input }) => {
        FirebaseService.editUserWallet(input.id, input.coin_name, input.count);
        return "es";
    },
    addFollow: ({ input }) => {
        FirebaseService.addFollow(input.userId, input.followId);
        return "es";
    },
    addFollowing: ({ input }) => {
        FirebaseService.addFollowing(input.userId, input.followId);
        return "es";
    },
    changeUserPhoto: ({ input }) => {
        FirebaseService.changeUserPhoto(input.userId, input.image);
        return "es";
    }
}
export default root;