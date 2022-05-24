import { buildSchema } from 'graphql'



const schema = buildSchema(`

    type UserInfo {
        image: String
        subs: Int
        wallet: [Coin]
    }

    type Coin {
        coin_name: String
        count: Int
    }

    type Comment {
        coinId: String
        text: String
        userId: String
    }
    
    type AlphavantageData {
        date: String,
        open: Float,
        high: Float,
        low: Float,
        close: Float,
        adjusted_close: Float,
        volume: Float,
        dividend_amount: Float
    }

    input UserImageInput {
        userId: String!
        image: String!
    }

    input CoinInput {
        id: String!
        coin_name: String!
        count: Int!
    }

    input CommentInput {
        userId: String!
        coinId: String!
        text: String!
    }

    input FollowInput {
        userId: String!
        followId: String!
    }

    type Query {
        getUserInfoById(id: ID): UserInfo
        getCommentsByCoinName(coinId: String): [Comment]
        getCommentsByUserId(userId: String): [Comment]
        getFollowsByUserId(userId: String): [String]
        getFollowingsByUserId(userId: String): [String]
        
        getStockTimeSeriesDaily(coin_name: String): [AlphavantageData]
        getStockTimeSeriesWeekly(coin_name: String): [AlphavantageData]
        getStockTimeSeriesMonthly(coin_name: String): [AlphavantageData]
        getCryptoTimeSeriesDaily(coin_name: String): [AlphavantageData]
        getCryptoTimeSeriesWeekly(coin_name: String): [AlphavantageData]
        getCryptoTimeSeriesMonthly(coin_name: String): [AlphavantageData]
    }

    type Mutation {
        createUserInfo(id: ID): String
        changeUserPhoto(input: UserImageInput): String
        editUserWallet(input: CoinInput): String
        addComment(input: CommentInput): String
        addFollowing(input: FollowInput): String
        addFollow(input: FollowInput): String
    }

`);
// Написать мутации

export default schema;