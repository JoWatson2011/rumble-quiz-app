import axios from "axios";

const rumbleQuizApi = axios.create({
  baseURL: "https://rumble-quiz-server.onrender.com/api",
});

export const getUserByUsername = (userLogged) => {
  return rumbleQuizApi
    .get(`/users/${userLogged}`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log("Error getting user data:", error);
    });
};

export const patchUserByUsername = (userLogged, patchBody) => {
  return rumbleQuizApi
    .patch(`/users/${userLogged}`, patchBody)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log("Error patching user:", error);
    });
};

export const postUserLogin = (postBody) => {
  return rumbleQuizApi
    .post(`/users/login`, postBody)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log("Error logging in user:", error);
    });
};

export const getAvatars = () => {
  return rumbleQuizApi
    .get("/avatars")
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log("Error getting avatars:", error);
    });
};

export const getAvatar = (id) => {
  return rumbleQuizApi
    .get(`/avatars/${id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log("Error getting avatar:", error);
    });
};

export const getUserStats = (userLogged) => {
  return rumbleQuizApi
    .get(`/users/${userLogged}/logs`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log("Error getting user stats:", error);
    });
};

export const getUsersPoints = () => {
  return rumbleQuizApi
    .get("/logs")
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log("Error getting leaderboard:", error);
    });
};

export const getFriends = (userLogged) => {
  return rumbleQuizApi
    .get(`/users/${userLogged}/friends`)
    .then(({ data }) => {
      return data.friends;
    })
    .catch((error) => {
      console.log("Error getting friends:", error);
    });
};

export const postNewUser = (postBody) => {
  return rumbleQuizApi
    .post("/users", postBody)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log("Error creating new user:", error);
    });
};
