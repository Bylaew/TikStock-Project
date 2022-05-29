import { getDatabase, ref, get, child, set, update, push } from "firebase/database";

class FirebaseService {
    getUserInfoById(id) {
        const dbRef = ref(getDatabase());
        return get(child(dbRef, `usersInfo/${id}`)).then((response) => {
            return response.val()
        });
    }

    getCommentsByCoinName(_coin_name) {
        const dbRef = ref(getDatabase());
        let result_comments = [];
        return get(child(dbRef, `comments/`)).then((response) => {
            for (let key in response.val()) {
                if (response.val()[key].coinId == _coin_name) {
                    result_comments.push(response.val()[key])
                }
            }
            return result_comments
        });
    }

    getCommentsByUserId(_userId) {
        const dbRef = ref(getDatabase());
        let result_comments = [];
        return get(child(dbRef, `comments/`)).then((response) => {
            for (let key in response.val()) {
                if (response.val()[key].userId == _userId) {
                    result_comments.push(response.val()[key])
                }
            }
            return result_comments
        });
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
            follows: 0,
            followings: 0,
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

    // TODO:  Проверка на сушествующий фолов
    // TODO:  замена push на update
    addFollow(id, followId) {
        const db = getDatabase();
        const dbRef = ref(db);
        let followersRef = ref(db, `usersInfo/${id}/followsId/`);
        push(followersRef, {
            followId: followId
        });
        get(child(dbRef, `usersInfo/${id}/`)).then((response) => {
            let new_follows = response.val().follows + 1;
            update(ref(db, `usersInfo/${id}/`), {
                follows: new_follows
            });
        });
    }

    // TODO:  Проверка на сушествующий фолов
    // TODO:  замена push на update
    addFollowing(id, followId) {
        const db = getDatabase();
        const dbRef = ref(db);
        let followingsRef = ref(db, `usersInfo/${id}/followingsId/`);
        push(followingsRef, {
            followId
        });
        get(child(dbRef, `usersInfo/${id}/`)).then((response) => {
            let new_followings = response.val().followings + 1;
            update(ref(db, `usersInfo/${id}/`), {
                followings: new_followings
            });
        });
    }
}

export default new FirebaseService();