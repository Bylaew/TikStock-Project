import { getDatabase, ref, get, child, set, update, push } from "firebase/database";

class FirebaseService {
    async getUserInfoById(id) {
        const dbRef = ref(getDatabase());
        const response = await get(child(dbRef, `usersInfo/${id}`));
        if (!response.exists()) return null;

        let result_response = response.val();
        if (response.val().followsId != null) {
            let tmp1 = [];
            for (let key in response.val().followsId) {
                tmp1.push(response.val().followsId[key].followId);
            }
            result_response['followsId'] = tmp1;
        }

        if (response.val().followingsId != null) {
            let tmp1_1 = [];
            for (let key_1 in response.val().followingsId) {
                tmp1_1.push(response.val().followingsId[key_1].followingId);
            }
            result_response['followingsId'] = tmp1_1;
        }

        if (response.val().wallet != null) {
            result_response['wallet'] = Object.values(result_response['wallet']);
        }

        return result_response;
    }

    async getCommentsByCoinName(_coin_name) {
        const dbRef = ref(getDatabase());
        let result_comments = [];
        const response = await get(child(dbRef, `comments/`));

        for (let key in response.val()) {
            if (response.val()[key].coinId == _coin_name) {
                result_comments.push(response.val()[key]);
            }
        }
        return result_comments;
    }

    async getCommentsByUserId(_userId) {
        const dbRef = ref(getDatabase());
        let result_comments = [];
        const response = await get(child(dbRef, `comments/`));
        for (let key in response.val()) {
            if (response.val()[key].userId == _userId) {
                result_comments.push(response.val()[key]);
            }
        }
        return result_comments;
    }

    async addComment(uId, _coinId, _commentText) {
        if (!(await isIdExist(uId))) return "Status 400. Error: User Id does not exist";

        const db = getDatabase();
        let commetsRef = ref(db, `comments/`);
        push(commetsRef, {
            userId: uId,
            coinId: _coinId,
            text: _commentText
        });
        return "Status: 200 OK";

    }

    // TODO: добавляет запись при неверном id
    async changeUserPhoto(uId, image) {
        if (!(await isIdExist(uId))) return "Status 400. Error: User Id does not exist";

        const db = getDatabase();
        let userImageRef = ref(db, `usersInfo/${uId}/image/`);
        set(userImageRef, image);
        return "Status: 200 OK";
    }

    async createUserInfo(uId) {
        if (await isIdExist(uId)) {
            return "Status 400. Error: User Id already exists";
        }

        const db = getDatabase();
        const usersInfoRef = ref(db, `usersInfo/${uId}`)
        const newUserInfo = {
            image: "url",
        }
        set(usersInfoRef, newUserInfo);
        return "Status: 200 OK";
    }

    async editUserWallet(uId, coin_name, _count) {
        if (!(await isIdExist(uId))) return "Status 400. Error: User Id does not exist";

        const db = getDatabase();
        const dbRef = ref(db);
        get(child(dbRef, `usersInfo/${uId}/wallet/`)).then((response) => {
            if (response.exists()) {
                for (let key in response.val()) {
                    if (response.val()[key].coin_name == coin_name) {
                        update(ref(db, `usersInfo/${uId}/wallet/` + key), {
                            count: _count
                        });
                        return "Status: 200 OK";
                    }
                }
            }
            push(ref(db, `usersInfo/${uId}/wallet/`), {
                coin_name: coin_name,
                count: _count
            });
        });
        return "Status: 200 OK";
    }

    async addFollow(uId, followId) {
        if (!(await isIdExist(uId))) return "Status 400. Error: User Id does not exist";
        if (!(await isIdExist(followId))) return "Status 400. Error: Follow Id does not exist";

        const db = getDatabase();
        let followersRef = ref(db, `usersInfo/${uId}/followsId/`);
        push(followersRef, {
            followId: followId
        });
        return "Status: 200 OK";
    }

    async addFollowing(uId, followingId) {
        if (!(await isIdExist(uId))) return "Status 400. Error: User Id does not exists";
        if (!(await isIdExist(followingId))) return "Status 400. Error: Following Id does not exists";

        const db = getDatabase();
        const followingsRef = ref(db, `usersInfo/${uId}/followingsId/`);
        push(followingsRef, {
            followingId
        });
        return "Status: 200 OK";
    }
}

async function isIdExist(id) {
    const dbRef = ref(getDatabase());
    const response = await get(child(dbRef, `usersInfo/${id}`));
    return response.exists();
}

export default new FirebaseService();