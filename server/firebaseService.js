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
                tmp1.push(response.val().followId[key].followId);
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

    addComment(uId, _coinId, _commentText) {
        const db = getDatabase();
        let commetsRef = ref(db, `comments/`);
        push(commetsRef, {
            userId: uId,
            coinId: _coinId,
            text: _commentText
        });
    }

    // TODO: добавляет запись при неверном id
    changeUserPhoto(uId, image) {
        const db = getDatabase();
        let userImageRef = ref(db, `usersInfo/${uId}/image/`);
        set(userImageRef, image);
    }

    createUserInfo(id) {
        const db = getDatabase();
        const usersInfoRef = ref(db, `usersInfo/${id}`)
        const newUserInfo = {
            image: "url"
        }
        set(usersInfoRef, newUserInfo);
    }

    editUserWallet(id, coin_name, _count) {
        const db = getDatabase();
        const dbRef = ref(db);
        get(child(dbRef, `usersInfo/${id}/wallet/`)).then((response) => {
            if (response.exists()) {
                for (let key in response.val()) {
                    if (response.val()[key].coin_name == coin_name) {
                        update(ref(db, `usersInfo/${id}/wallet/` + key), {
                            count: _count
                        });
                        return
                    }
                }
            }
            push(ref(db, `usersInfo/${id}/wallet/`), {
                coin_name: coin_name,
                count: _count
            });
        });
    }

    // TODO: добавляет запись при неверном id
    // TODO:  Проверка на сушествующий фолов
    addFollow(id, followId) {
        const db = getDatabase();
        const dbRef = ref(db);
        let followersRef = ref(db, `usersInfo/${id}/followsId/`);
        push(followersRef, {
            followId: followId
        });
    }

    // TODO: добавляет запись при неверном id
    // TODO:  Проверка на сушествующий фолов
    addFollowing(id, followingId) {
        const db = getDatabase();
        const dbRef = ref(db);
        const followingsRef = ref(db, `usersInfo/${id}/followingsId/`);
        push(followingsRef, {
            followingId
        });
    }
}

export default new FirebaseService();